'use strict';

// Shared constants and utilities used by background.js and popup.js.
// In MV2, background scripts listed in manifest share a single global scope
// (load order = declaration order). popup.html loads this file via <script>
// before popup.js so both execution contexts share the same definitions.

const default_color_schemes = {
	dark: true,
	light: true,
	system: false
};

/**
 * Returns true if the OS/browser is currently using a dark color scheme.
 * @returns {boolean}
 */
function detectDarkScheme() {
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
