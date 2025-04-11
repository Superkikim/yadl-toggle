// Added by GitHub user superkikim: notification popup after theme toggle.

'use strict';

const default_color_schemes = {
	dark: true,
	light: true,
	system: false
}
const color_schemes = [
	"dark",
	"light"
]
var selected_scheme = -1;

// We need detection for system color scheme
function detectDarkScheme() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function updatePrefs({ include }) {
	const value = color_schemes[selected_scheme]
	color_schemes.splice(0, color_schemes.length, ...Object.keys(include).filter(scheme => include[scheme]));
	updateScheme({ value })
}

function setBadge() {
	browser.browserAction.setTitle({
		title: `Change color scheme to ${color_schemes[(selected_scheme + 1) % color_schemes.length]}`
	});
	const is_dark = detectDarkScheme();
	browser.browserAction.setIcon({
		path: {
			48: `icons/${color_schemes[selected_scheme]}_48x48.png`,
			96: `icons/${color_schemes[selected_scheme]}_96x96.png`,
		}
	});
}

function updateScheme({ value }) {
	// determine a guess for where we are in the list and update the badge.
	// if the value is in the list, EZ
	selected_scheme = color_schemes.indexOf(value);
	// fall back to the correct basic color scheme, as that’s all we can smartly detect
	if (selected_scheme < 0) {
		const basic = detectDarkScheme() ? "dark" : "light";
		selected_scheme = color_schemes.indexOf(basic);
	}
	// the scheme is not in the list, fallback to 'system'
	if (selected_scheme < 0) {
		selected_scheme = color_schemes.indexOf('system');
	}
	// this should never happen
	if (selected_scheme < 0) {
		selected_scheme = 0;
	}
	setBadge();
}

function cycleScheme(tabId) {
	selected_scheme = (selected_scheme + 1) % color_schemes.length;
	browser.browserSettings.overrideContentColorScheme.set({ value: color_schemes[selected_scheme] });
}

// Set the color scheme
Promise.all([
	browser.storage.local.get({ include: default_color_schemes }).then(updatePrefs),
	browser.browserSettings.overrideContentColorScheme.get({}).then(updateScheme),
]).then(() => {
	browser.browserSettings.overrideContentColorScheme.onChange.addListener(updateScheme);
	browser.runtime.onMessage.addListener(updatePrefs);
}).catch(console.error);





// Set default color schemes on install
browser.runtime.onInstalled.addListener(({ reason, temporary }) => {
	if (reason === 'install') {
		browser.storage.local.set({ include: default_color_schemes })
	}
});
