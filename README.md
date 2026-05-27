![YADL Toggle](icons/system_96x96.png)

# Yet Another Dark-Light Toggle ! [![Mozilla Add-on](https://img.shields.io/amo/v/yadl-toggle)](https://addons.mozilla.org/en-US/firefox/addon/yadl-toggle/)

**For Firefox version > 95.**

> **⚠️ Important Note**  
> This add-on only affects websites that support both dark and light themes using standard web technology.  
> If a website doesn’t support dark mode, this extension cannot make it dark.
>
> Website designers may choose to implement both light and dark themes. If they don’t, this extension can’t compensate.  
> There’s no reliable way to detect that in advance. If toggling has no effect, it simply means the site doesn’t support it.  
> **Please direct your frustration accordingly.**

## Minimal add-on

This is the simplest possible add-on with the least possible permissions.

Clicking the add-on icon in your toolbar cycles the color scheme preference _for browser content_, between the following values:

1. **Dark mode** — forces dark colors
2. **Light mode** — forces light colors
3. **System mode** — inherits your OS setting

You can enable or disable any of these values from the add-on settings.

A small popup briefly confirms the selected mode. It appears briefly after clicking and closes after 1 second.

## Website support

This add-on relies on the fact that websites have their own proper stylesheets for dark and light modes, for example [DuckDuckGo](https://duckduckgo.com/).  
An increasing number of websites now offer light and dark schemes, though you may need to select a specific option to inherit your browser’s colors, e.g. Google, GitHub, StackOverflow, and many more.

## Development

### Prerequisites

Node.js ≥ 18 (for dev tooling only — nothing ships in the extension).

```bash
npm install        # Install ESLint + web-ext
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
git tag v1.1.0
git push --tags
```

The pipeline runs all lints, verifies the tag matches `manifest.json`, then waits for a manual approval before submitting to AMO. See `CLAUDE.md` for one-time GitHub setup.

## Links

https://addons.mozilla.org/en-US/firefox/addon/yadl-toggle/

## License and Credits

This project is licensed under the MIT License.  
Based on [Toggle Dark Mode](https://github.com/Cimbali/toggle-dark-mode) by Cimbali, originally licensed under the WTFPL.
