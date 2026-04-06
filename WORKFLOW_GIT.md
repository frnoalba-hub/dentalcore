# Git workflow: Cursor, GitHub, Base44

**Canonical source:** the `dentalcore` repo on GitHub (`frnoalba-hub/dentalcore`). Production deploy should track this repo, not uncommitted local-only copies.

## Before you edit (every session)

1. `git pull` in this folder (`_WEB_SYSTEM/dentalcore`).
2. If you changed anything in **Base44** since last pull, pull again and resolve conflicts **before** opening large refactors in Cursor.

## After Base44 pushes

Pull immediately in Cursor so local files match GitHub. Editing on stale local copies is what causes “Base44 broke what Cursor did” (and the reverse).

## Optional hardening

- Use a **feature branch** for risky changes; merge via PR when Base44 supports it.
- Run `npm run build` locally before pushing to catch broken imports or sitemap generation errors.

## Sitemap

`npm run build` runs `scripts/generate-sitemap.mjs` first (via `prebuild`). After deploy, confirm `https://www.dentalcoreinstruments.com/sitemap.xml` returns XML and submit it in Google Search Console if needed.

## `pages.config.js` (Base44)

If a generator re-adds **ProductDetail** to `PAGES`, remove it again: product pages must use only **`/product?id=...`** (see `App.jsx` and `siteUrl.js`) so SEO stays consistent.
