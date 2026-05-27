'use strict';

const globals = require('globals');

// Symbols defined in utils.js and available in the shared MV2 background scope
// and via <script src="utils.js"> in popup.html — ESLint processes files
// individually and can't see cross-file globals without this declaration.
const utilsGlobals = {
  default_color_schemes: 'readonly',
  detectDarkScheme:      'readonly',
};

module.exports = [
  // utils.js — defines the shared symbols (no-unused-vars exemption handled by varsIgnorePattern)
  {
    files: ['utils.js'],
    languageOptions: {
      ecmaVersion: 2017,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.webextensions,
      }
    },
    rules: {
      'no-var': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^(default_color_schemes|detectDarkScheme)$' }],
      'no-undef': 'error',
      'strict': ['error', 'global'],
      'eqeqeq': 'error',
      'prefer-const': 'warn',
    }
  },

  // Consumer JS files — symbols from utils.js are declared as known globals
  {
    files: ['background.js', 'popup.js', 'options.js'],
    languageOptions: {
      ecmaVersion: 2017,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.webextensions,
        ...utilsGlobals,
      }
    },
    rules: {
      'no-var': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'strict': ['error', 'global'],
      'eqeqeq': 'error',
      'prefer-const': 'warn',
    }
  }
];
