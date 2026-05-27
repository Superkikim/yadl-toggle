'use strict';

// default_color_schemes and detectDarkScheme come from utils.js,
// which is loaded first via the manifest background.scripts array.

const color_schemes = [
	"dark",
	"light"
];
let selected_scheme = -1;

function updatePrefs(message) {
	if (
		!message ||
		typeof message !== 'object' ||
		typeof message.include !== 'object' ||
		message.include === null
	) {
		return;
	}
	const VALID_SCHEMES = ['dark', 'light', 'system'];
	const include = Object.fromEntries(
		Object.entries(message.include).filter(
			([k, v]) => VALID_SCHEMES.includes(k) && typeof v === 'boolean'
		)
	);
	const value = color_schemes[selected_scheme];
	color_schemes.splice(0, color_schemes.length, ...Object.keys(include).filter(scheme => include[scheme]));
	updateScheme({ value });
}

function setBadge() {
	const nextScheme = selected_scheme === -1
		? color_schemes.indexOf('dark')
		: (selected_scheme + 1) % color_schemes.length;

	browser.browserAction.setTitle({
		title: `Change color scheme to ${color_schemes[nextScheme]}`
	});

	const schemeName = selected_scheme === -1 ? 'system' : color_schemes[selected_scheme];
	browser.browserAction.setIcon({
		path: {
			48:  `icons/${schemeName}_48x48.png`,
			96:  `icons/${schemeName}_96x96.png`,
			128: `icons/${schemeName}_128x128.png`,
			256: `icons/${schemeName}_256x256.png`
		}
	});
}

function updateScheme({ value }) {
	if (value === "auto") value = "system";
	// Check if the value is 'system' first
	if (value === 'system') {
		selected_scheme = -1;  // Use -1 to represent 'system'
	} else {
		// For 'dark' and 'light', find the index in color_schemes
		selected_scheme = color_schemes.indexOf(value);

		// If not found, fallback to detecting the system theme
		if (selected_scheme < 0) {
			const basic = detectDarkScheme() ? "dark" : "light";
			selected_scheme = color_schemes.indexOf(basic);
		}
	}

	// Ensure we always have a valid selected_scheme
	if (selected_scheme < 0 && value !== 'system') {
		selected_scheme = 0;  // Default to the first scheme if all else fails
	}

	setBadge();
}

// Initialise: read current scheme, then listen for changes and messages
Promise.all([
	browser.browserSettings.overrideContentColorScheme.get({}).then(updateScheme),
]).then(() => {
	browser.browserSettings.overrideContentColorScheme.onChange.addListener(updateScheme);
	browser.runtime.onMessage.addListener(updatePrefs);
}).catch(console.error);

// Set default color schemes on install
browser.runtime.onInstalled.addListener(({ reason }) => {
	if (reason === 'install') {
		browser.storage.local.set({ include: default_color_schemes }).catch(console.error);
	}
});
