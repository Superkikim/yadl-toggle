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
    let nextScheme = (selected_scheme + 1) % color_schemes.length;
    if (selected_scheme === -1) {
        nextScheme = color_schemes.indexOf('dark');  // Cycle to 'dark' after 'system'
    }

    browser.browserAction.setTitle({
        title: `Change color scheme to ${color_schemes[nextScheme]}`
    });

    let iconPath;
    if (selected_scheme === -1) {
        // Use the system icon
        iconPath = {
            48: "icons/system_48x48.png",
            96: "icons/system_96x96.png",
            128: "icons/system_128x128.png",
            256: "icons/system_256x256.png"
        };
    } else {
        // Use dark or light icon
        iconPath = {
            48: `icons/${color_schemes[selected_scheme]}_48x48.png`,
            96: `icons/${color_schemes[selected_scheme]}_96x96.png`,
            128: `icons/${color_schemes[selected_scheme]}_128x128.png`,
            256: `icons/${color_schemes[selected_scheme]}_256x256.png`
        };
    }

    browser.browserAction.setIcon({ path: iconPath });
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

function cycleScheme(tabId) {
	selected_scheme = (selected_scheme + 1) % color_schemes.length;
	browser.browserSettings.overrideContentColorScheme.set({ value: color_schemes[selected_scheme] });
}

// Set the color scheme
Promise.all([
//	browser.storage.local.get({ include: default_color_schemes }).then(updatePrefs),
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
