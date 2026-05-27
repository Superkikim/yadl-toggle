![Dark Light System Toggle](icons/system_96x96.png)

# Dark Light System Toggle [![Mozilla Add-on](https://img.shields.io/amo/v/yadl-toggle)](https://addons.mozilla.org/en-US/firefox/addon/yadl-toggle/)

**For Firefox version ≥ 95.**

> **⚠️ Important Note**  
> This add-on only affects websites that support both dark and light themes using standard web technology.  
> If a website doesn't support dark mode, this extension cannot make it dark.
>
> Website designers may choose to implement both light and dark themes. If they don't, this extension can't compensate.  
> There's no reliable way to detect that in advance. If toggling has no effect, it simply means the site doesn't support it.  
> **Please direct your frustration accordingly.**

## Why this one?

| | Dark Light System Toggle | Most alternatives |
|---|:---:|:---:|
| Dark mode | ✓ | ✓ |
| Light mode | ✓ | ✓ |
| **System mode** | **✓** | ✗ |
| Native Firefox API (no CSS injection) | ✓ | ✗ |
| Zero invasive permissions | ✓ | ✗ |

- **3 modes** — dark, light, and system (inherits your OS setting). Most alternatives only offer 2.
- **Native Firefox API** — uses `overrideContentColorScheme`, not CSS injection. Works reliably on all sites, no hacks.
- **Zero invasive permissions** — only `storage` and `browserSettings`. No "access to all websites" required.

## How it works

Clicking the toolbar icon (or pressing `Ctrl+Shift+L`) cycles through the enabled modes.  
A small popup briefly confirms the new mode and closes after 1 second.  
The toolbar icon updates to reflect the active scheme.

Modes available (configurable in options): **dark**, **light**, **system**.

## Development

### Prerequisites

Node.js ≥ 18 (for dev tooling only — nothing ships in the extension).

```bash
npm install                          # Install ESLint + web-ext
git config core.hooksPath .githooks  # Enable pre-push lint hook (once per clone)
```

### Quality checks

```bash
npm run lint       # ESLint on JS source files
npm run lint:ext   # web-ext manifest + packaging validation
npm run lint:all   # Both — run before every commit
```

### Build

```bash
npm run build      # Creates web-ext-artifacts/yadl_toggle-x.y.z.zip
```

### Test locally

1. Open Firefox → `about:debugging#/runtime/this-firefox`
2. Click **"Load Temporary Add-on"**
3. Select `manifest.json`

The extension loads unsigned and disappears on browser restart.

### Publishing to AMO

Push a semver tag to trigger the CI pipeline:

```bash
# After bumping version in manifest.json and committing
git tag v1.2.0
git push --tags
```

The pipeline runs all lints, verifies the tag matches `manifest.json`, then waits for a manual approval before submitting to AMO. See `CLAUDE.md` for one-time GitHub setup.

## Links

https://addons.mozilla.org/en-US/firefox/addon/yadl-toggle/

## License and Credits

This project is licensed under the MIT License.  
Based on [Toggle Dark Mode](https://github.com/Cimbali/toggle-dark-mode) by Cimbali, originally licensed under the WTFPL.
