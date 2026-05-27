# CLAUDE.md — Dark Light System Toggle

## Project overview

**Dark Light System Toggle** is a minimalist Firefox extension that cycles browser content color schemes between dark, light, and system modes with one click. The AMO slug remains `yadl-toggle` (URL unchanged).

- Published on [addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/yadl-toggle/)
- Fork of [Toggle Dark Mode](https://github.com/Cimbali/toggle-dark-mode) by Cimbali (WTFPL) — substantially rewritten
- Author: Superkikim (`yadl-toggle@superkikim.github.com`)
- Firefox ≥ 95, Manifest V2
- Chrome port is planned

## What this extension does

Clicking the toolbar icon (or `Ctrl+Shift+L`) cycles `overrideContentColorScheme` through the enabled modes. A popup confirms the new mode and auto-closes after 1 second. The toolbar icon updates to match the active scheme.

Modes available (user-configurable in options): **dark**, **light**, **system**.

## UX improvements over the original fork

These are intentional additions — don't revert them:
1. **Confirmation popup** (`popup.html` + `popup.js`) — brief modal showing the newly active mode, closes after 1 s
2. **Dynamic toolbar icon** — changes to `light_*.png`, `dark_*.png`, or `system_*.png` based on the selected scheme (not the OS effective theme)
3. **Bug fixes** in scheme cycling and icon synchronisation at startup

## Architecture

```
manifest.json          Extension manifest (MV2)
utils.js               Shared constants + detectDarkScheme() — loaded first in background + popup
background.js          Core logic: scheme cycling, icon updates, storage sync
popup.html / popup.js  Confirmation UI (auto-closes after 1 s)
options.html / options.js  Settings page: which modes to include in the cycle
icons/                 PNG icons at 48 / 96 / 128 / 256 px
  light_*.png          Icon shown when "light" is active
  dark_*.png           Icon shown when "dark" is active
  system_*.png         Icon shown when "system" is active
  yadl-toggle_*.png    App icon (used on AMO and about:addons)
  yadl-toggle-light.svg   Source SVG → light PNGs
  yadl-toggle-dark.svg    Source SVG → dark PNGs
  yadl-toggle-icon.svg    Source SVG → system + app PNGs
AMO translations/      Localised store descriptions (not loaded by the extension)
.github/workflows/     CI/CD: lint on push, build+publish on version tag
```

No build system for the extension itself. Dev tooling (`eslint`, `web-ext`) is installed via npm as devDependencies — nothing ships in the extension package.

## Key APIs used

- `browser.browserSettings.overrideContentColorScheme` — sets the content color scheme
- `browser.browserAction.setIcon` / `setTitle` — updates the toolbar icon
- `browser.storage.local` — persists the enabled-modes config
- `browser.runtime.onMessage` — options page → background communication

## Permissions (minimal by design)

`storage`, `browserSettings` — nothing else. Keep it that way.

## Testing locally

1. Open Firefox → `about:debugging#/runtime/this-firefox`
2. Click **"Load Temporary Add-on"**
3. Select any file in the repo root (e.g. `manifest.json`)

The extension loads without signing. It disappears on browser restart.

## Tooling

Dev dependencies are declared in `package.json` (devDependencies only — nothing ships in the extension).

```bash
npm install        # Install ESLint + web-ext (first time)
npm run lint       # ESLint on JS files
npm run lint:ext   # web-ext lint (manifest + packaging validation)
npm run lint:all   # Both checks combined — run before every commit
npm run build      # Build .zip in web-ext-artifacts/ (replaces manual zip command)
```

## Packaging for AMO

Use `npm run build` to produce the `.zip` in `web-ext-artifacts/`. The CI pipeline runs `lint:all` automatically before building.

The `.xpi` file in the repo is the Mozilla-signed artefact from the last submission. Do not edit it manually.

## CI/CD — GitHub Actions

Two workflows in `.github/workflows/`:

- **`lint.yml`** — runs on every push to `master` / `dev-*` and on PRs to `master`. Runs `npm run lint` + `npm run lint:ext`.
- **`publish.yml`** — triggered by a semver tag (`v1.2.0`) or manual dispatch. Gates:
  1. All lints pass.
  2. Tag version must match `manifest.json` `version` field.
  3. Manual dispatch requires typing `PUBLISH` in the confirmation field.
  4. The `publish` job requires approval from the `amo-production` GitHub Environment.

**One-time setup for AMO publishing:**
1. Create environment `amo-production` in GitHub → Settings → Environments, add required reviewer.
2. Add secrets `AMO_API_KEY` and `AMO_API_SECRET` (from addons.mozilla.org → Tools → Manage API Keys).

**Convention:** bump `manifest.json version`, commit, then `git tag v1.x.x && git push --tags` to trigger the pipeline.

## Icon generation

Source SVGs live in `icons/`. Export PNGs with Inkscape:

```bash
#!/bin/bash
sizes=(48 96 128 256)
declare -A sources=(
  ["light"]="icons/yadl-toggle-light.svg"
  ["dark"]="icons/yadl-toggle-dark.svg"
  ["system"]="icons/yadl-toggle-icon.svg"
  ["yadl-toggle"]="icons/yadl-toggle-icon.svg"
)
for name in "${!sources[@]}"; do
  for size in "${sizes[@]}"; do
    inkscape "${sources[$name]}" \
      --export-type=png \
      --export-filename="icons/${name}_${size}x${size}.png" \
      --export-area-drawing \
      -w $size -h $size
  done
done
```

## Roadmap / planned work

- **Internationalisation (i18n)** — ✅ done in v1.2.0: `browser.i18n` + `_locales/` for 12 languages
- **Renaming** — ✅ done in v1.2.0: "YADL Toggle" → "Dark Light System Toggle" (slug unchanged)
- **Review prompt** — ✅ done in v1.2.0: one-time prompt after 10 activations
- **AMO listing** — add screenshots, boost discoverability (manual action post-v1.2.0)
- **Chrome port** — adapt manifest to MV3 for Chrome/Edge compatibility

## Git conventions

- Claude can commit when instructed to do so
- **Claude must never add itself to commit messages** — no `Co-Authored-By`, no `Generated by`, no AI attribution of any kind, anywhere (commits, comments, README, changelogs)
- Commits are signed as Superkikim's work; Claude is a tool, not a contributor

## Style conventions

- Vanilla JS, `'use strict'`
- Use `browser.*` (not `chrome.*`) — Firefox WebExtension API
- Async via `Promise` chains (no `async/await` yet, keep consistent with existing code unless refactoring)
- No external dependencies
