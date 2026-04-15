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

`npm run build` runs `scripts/generate-sitemap.mjs` first (via `prebuild`). It emits canonical **`/p/{slug}`** URLs parsed from `slug:` lines in `productsData.jsx`. Optional Base44-only rows: add `{ "slug": "your-slug" }` entries to `scripts/sitemap-extras.json`. After deploy, confirm `https://www.dentalcoreinstruments.com/sitemap.xml` returns XML and submit it in Google Search Console if needed.

## SPA routing (`/p/*`)

`public/_redirects` provides `/* → /index.html` (200) for hosts that honor Netlify-style redirects so deep links like `/p/uc-one` load the app. If your host uses different rules, mirror that behavior there.

## `pages.config.js` (Base44)

If a generator re-adds **ProductDetail** to `PAGES`, remove it again: **`ProductDetail`** stays only in `App.jsx` routes (`/p/:productSlug` and legacy `/product`). Canonical product URLs are **`/p/{slug}`**; `/product?id=…` redirects to the slug URL when known (see `ProductDetail.jsx`, `siteUrl.js`, `productPaths.js`).

**Admin:** Do not register `AdminProducts` in `PAGES` (avoids a public `/:page` route). Product admin lives at **`/admin/products`** behind `RequireAuth` in `App.jsx`; `/AdminProducts` redirects there.

## Product Discovery (video + AEO copy, per SKU)

Use **`PRODUCT_DISCOVERY_BRIEF.md`** in this folder: copy-paste template, field map to `productsData.jsx`, and a checklist for humans or Cursor. UC-ONE (`slug: uc-one`) is the reference row.
