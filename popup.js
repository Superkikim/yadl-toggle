'use strict';

// default_color_schemes and detectDarkScheme come from utils.js,
// loaded via <script src="utils.js"> before this file in popup.html.

const list = document.getElementById('mode-list');
let modes = [];
let selected_scheme = -1;

const color_schemes_labels = {
	dark:   browser.i18n.getMessage('modeDark'),
	light:  browser.i18n.getMessage('modeLight'),
	system: browser.i18n.getMessage('modeSystem')
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

function displayReviewPrompt() {
	const p = document.createElement('p');
	p.className = 'review-prompt';
	const a = document.createElement('a');
	a.href = 'https://addons.mozilla.org/firefox/addon/yadl-toggle/reviews/';
	a.target = '_blank';
	a.rel = 'noopener noreferrer';
	a.textContent = browser.i18n.getMessage('reviewPrompt');
	p.appendChild(a);
	document.body.appendChild(p);
}

// Main logic: read prefs → get current scheme → cycle → track → display → close
const VALID_SCHEMES = ['dark', 'light', 'system'];

browser.storage.local.get({ include: default_color_schemes })
	.then(function(result) {
		modes = Object.keys(result.include).filter(function(s) {
			return VALID_SCHEMES.includes(s) && result.include[s];
		});
		return browser.browserSettings.overrideContentColorScheme.get({});
	})
	.then(function(result) {
		updateSelectedScheme(result.value);
		return cycleScheme();
	})
	.then(function() {
		return browser.storage.local.get({ useCount: 0, reviewPromptShown: false });
	})
	.then(function(result) {
		const newCount = result.useCount + 1;
		const showReview = newCount === 10 && !result.reviewPromptShown;
		const updates = { useCount: newCount };
		if (showReview) {
			updates.reviewPromptShown = true;
		}
		return browser.storage.local.set(updates).then(function() {
			return showReview;
		});
	})
	.then(function(showReview) {
		displayActiveMode();
		if (showReview) {
			displayReviewPrompt();
		}
		setTimeout(function() { window.close(); }, showReview ? 3000 : 1000);
	})
	.catch(console.error);
