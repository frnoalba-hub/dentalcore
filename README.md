# Coretix (dentalcore)

Base44 / Vite SPA for **dentalcoreinstruments.com**.

- **Git / editors:** See [WORKFLOW_GIT.md](./WORKFLOW_GIT.md) (Cursor, GitHub, Base44).
- **SEO:** `npm run build` regenerates `public/sitemap.xml` (canonical **`/p/{slug}`** URLs). Legacy **`/product?id=…`** still resolves and redirects to the slug URL. Add extra catalog-only slugs in `scripts/sitemap-extras.json` if needed.
- **Generative optimization (GEO/AEO):** Central config lives in [`src/lib/generativeOptimizationEngine.js`](./src/lib/generativeOptimizationEngine.js) (entity copy, geo coordinates, FAQ entities, product audience strings). Update that file to tune answer-engine signals; keep `index.html` geo meta in sync with `ENGINE_GEO_COORDINATES`.
