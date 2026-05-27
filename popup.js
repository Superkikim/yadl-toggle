'use strict';

// default_color_schemes and detectDarkScheme come from utils.js,
// loaded via <script src="utils.js"> before this file in popup.html.

const list = document.getElementById('mode-list');
let modes = [];
let selected_scheme = -1;

const color_schemes_labels = {
	dark: "Dark mode",
	light: "Light mode",
	system: "System mode"
};

function updateSelectedScheme(value) {
	if (value === "auto") value = "system";

	selected_scheme = modes.indexOf(value);

	if (selected_scheme < 0) {
		selected_scheme = detectDarkScheme() ? modes.indexOf("dark") : modes.indexOf("light");
	}
	if (selected_scheme < 0) selected_scheme = 0;
}

function cycleScheme() {
	selected_scheme = (selected_scheme + 1) % modes.length;
	return browser.browserSettings.overrideContentColorScheme.set({
		value: modes[selected_scheme]
	});
}

function displayActiveMode() {
	const current = modes[selected_scheme];
	const label = color_schemes_labels[current] || current;

	const li = document.createElement('li');
	li.textContent = label;
	list.appendChild(li);
}

// Main logic: read prefs → get current scheme → cycle → display → close
const VALID_SCHEMES = ['dark', 'light', 'system'];

browser.storage.local.get({ include: default_color_schemes })
	.then(({ include }) => {
		modes = Object.keys(include).filter(s => VALID_SCHEMES.includes(s) && include[s]);
		return browser.browserSettings.overrideContentColorScheme.get({});
	})
	.then(({ value }) => {
		updateSelectedScheme(value);
		return cycleScheme();
	})
	.then(() => {
		displayActiveMode();
		setTimeout(() => window.close(), 1000);
	})
	.catch(console.error);
