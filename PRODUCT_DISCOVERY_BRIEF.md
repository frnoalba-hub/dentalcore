# Product Discovery brief (repeat per SKU)

Use this file so **humans and Cursor** run the same steps for every product: gallery, optional official video, Discovery copy (AEO / answer-style), and JSON-LD `VideoObject` when a video URL is present.

**Code already wired:** `ProductDiscoveryBlock`, `ProductJsonLd` (`VideoObject` + `Product.subjectOf`), `ProductDetail` layout. You only maintain data in `src/components/dentalcore/productsData.jsx` and assets in `public/products/`.

---

## 1) Copy-paste brief (fill one block per product)

```text
SKU / id:
URL slug (must match sitemap /p/{slug}):
MPN (if any):
Category:
Hero image filename (public/products/):
Gallery filenames in order (optional extra shots):
Official video URL (YouTube watch or youtu.be, or "none"):
Video title for schema (short, factual, e.g. "Model — overview"):
Discovery H2 (discoveryHeading, ~6–12 words):
Discovery paragraph (discoveryParagraph, ~120–220 words):
  - Who it is for (role + setting)
  - Problem → what this adds (workflow fit, not a cure)
  - Compliance line (IFU, training, compatible irrigants/accessories as applicable)
Optional FAQ lines (question + answer), one per line if adding:
Sources (label | URL) for citations / trust:
Claims we must NOT make (off-label, guaranteed outcomes, etc.):
```

Paste the filled block into a GitHub issue, Slack thread, or Cursor chat when requesting the update.

---

## 2) Field map → `productsData.jsx`

| Brief field | Product object field | Notes |
|-------------|----------------------|--------|
| Hero + gallery files | `image`, `images[]` | `image` = first hero; `images` = full gallery order |
| Video URL | `videoUrl` | Triggers embed + `VideoObject` in JSON-LD |
| Video title | `videoTitle` | `VideoObject.name` |
| Discovery H2 | `discoveryHeading` | Section heading; optional, has default in UI |
| Discovery paragraph | `discoveryParagraph` | Main answer-style copy |
| FAQ lines | `faqs[]` | `{ question, answer }`; first visible + structured FAQ |
| Sources | `sources[]` | `{ label, url, note? }` |

**Images:** Add each new file to `public/products/`, then add a key under `const img = { … }` using `resolveImage('Exact_File_Name.png')`, and reference that key in the product’s `image` / `images`.

---

## 3) Cursor / agent checklist (do in order)

1. Save assets under `public/products/` (exact filenames; avoid duplicate keys in `img`).
2. In `productsData.jsx`, extend `img` with `resolveImage('…')` entries for new files.
3. On the product object: set `image`, `images`, and optionally `videoUrl`, `videoTitle`, `discoveryHeading`, `discoveryParagraph`; extend `faqs` / `sources` as needed.
4. Run `npm run build` (runs sitemap; confirms slugs and no broken imports).
5. Spot-check `/p/{slug}`: gallery, Discovery section, video embed, FAQ, GEO block.

---

## 4) Reference implementation

**UC-ONE** (`id: "1002-1"`, `slug: "uc-one"`) includes `videoUrl`, `discoveryHeading`, `discoveryParagraph`, expanded `images`, and a FAQ that points to the Discovery block. Use it as the pattern for the next SKU.
