# Product Images Guide

## Folder Structure

Place ALL your product images inside the storefront `public/images/products/` folder.
Each product gets its own subfolder named exactly after its `handle` (URL slug).

```
storefront/public/images/products/
├── emerald-pendant/
│   ├── main.jpg        ← Main product photo (thumbnail shown on listing page)
│   └── side.jpg        ← Additional photo shown in product gallery
│
├── onyx-ring/
│   ├── main.jpg
│   └── close.jpg
│
└── your-product-handle/   ← Add new folders for each product you add!
    ├── main.jpg
    └── alt.jpg
```

## Image Tips

- **Format**: Use `.jpg` or `.webp` for best performance.
- **Size**: Resize images to 800×1000px (4:5 ratio) before saving.
- **File size**: Keep under 300KB per image for fast loading.
- **Main image**: Always name your primary photo `main.jpg` and use it as the `thumbnail`.

## Referencing Images in seed.ts

In your `seed.ts`, reference images like this:

```typescript
thumbnail: "/images/products/emerald-pendant/main.jpg",
images: [
  { url: "/images/products/emerald-pendant/main.jpg" },
  { url: "/images/products/emerald-pendant/side.jpg" },
],
```

These paths start with `/` which means they are served from the `public/` folder automatically.

## After Adding Images

1. Add your images to the correct folders above.
2. Run the seed script: `cd backend-api && npm run seed`
3. Build the storefront: `cd storefront && npm run build`
4. Upload the `storefront/out` folder to Hostinger `public_html`.
