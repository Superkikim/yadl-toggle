### 🇬🇧 English (en-GB)

**Dark Light System Toggle**

Switch between dark, light, and system colour schemes with a single click — or use Ctrl+Shift+L.  
The icon reflects the current mode, and a popup briefly confirms the selected setting.

**For Firefox version ≥ 95**

**Why this one?**
- **3 modes:** dark, light, and system (follows your OS setting) — most similar add-ons only offer 2
- **Native Firefox API** (`overrideContentColorScheme`) — no CSS injection, works reliably on all sites
- **Zero invasive permissions** — only `storage` and `browserSettings`, nothing else

**⚠️ Important Note**  
This add-on only affects websites that support both dark and light themes using standard web technology.  
If a website doesn't support dark mode, this extension cannot make it dark.

Website designers may choose to implement both light and dark themes. If they don't, this extension can't compensate.  
There's no reliable way to detect that in advance. If toggling has no effect, it simply means the site doesn't support it.  
**Please direct your frustration accordingly.**

**Minimal add-on**  
This is the simplest possible add-on with the least possible permissions.

Clicking the add-on icon in your toolbar cycles the colour scheme preference for browser content between:

- dark colours
- light colours
- system colours (dark or light)

You can enable or disable any of these values from the add-on settings.

A small popup briefly confirms the selected mode. It appears after clicking and closes after 1 second.

**Website support**  
This add-on relies on the fact that websites have their own proper stylesheets for dark and light modes, for example DuckDuckGo.  
An increasing number of websites now offer light and dark schemes, though you may need to select a specific option to inherit your browser's colours, e.g. Google, GitHub, StackOverflow, and many more.

## Licence and Credits

This project is licensed under the MIT Licence.  
Based on [Toggle Dark Mode](https://github.com/Cimbali/toggle-dark-mode) by Cimbali, originally licensed under the WTFPL.

---
*Found it useful? Leave a rating ⭐ — it really helps!*
