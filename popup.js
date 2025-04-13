const list = document.getElementById('mode-list');
let modes = [];
let selected_scheme = -1;

const color_schemes_labels = {
	dark: "Dark mode",
	light: "Light mode",
	system: "System default"
};

function detectDarkScheme() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

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

// Main logic
browser.storage.local.get('include').then(({ include }) => {
	modes = Object.keys(include).filter(scheme => include[scheme]);
	browser.browserSettings.overrideContentColorScheme.get({}).then(({ value }) => {
		updateSelectedScheme(value);
		cycleScheme().then(() => {
			displayActiveMode();
           	setTimeout(() => window.close(), 1000);
		});
	});
});

