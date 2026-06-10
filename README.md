# BNA — Accessibility Widget (CDN)

Hosted accessibility menu for BNA's landing pages, compliant with Israeli law
(IS 5568 / WCAG 2.0–2.1 AA). Served via **jsDelivr** CDN.

## Embed (one line per page)

Paste into Rav-Messer → **Add element → Advanced › Code (מתקדם › קוד)**:

```html
<script src="https://cdn.jsdelivr.net/gh/<USER>/<REPO>@main/bna-a11y.min.js" defer></script>
```

Replace `<USER>/<REPO>` with this repository's path.

> Tip: for a version you fully control, push a git tag (e.g. `v1.0.0`) and use
> `.../gh/<USER>/<REPO>@v1.0.0/bna-a11y.min.js`. Branch (`@main`) URLs are CDN-cached;
> after pushing an update, purge at https://www.jsdelivr.com/tools/purge.

## Files
- `bna-a11y.min.js` — production (minified, ~35 KB). Use this in the embed.
- `bna-a11y.js` — readable source (same code).

## Updating details (coordinator, phone, color)
Edit the config block at the top of `bna-a11y.js`, re-minify, and push. All pages
that load the file update automatically (purge the jsDelivr cache to apply sooner).
