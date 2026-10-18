# MyArts — Ederlyn Sarmiento Art Portfolio

A static art gallery site (HTML + CSS + vanilla JS) showcasing artwork from **2015 to 2026**.

## Live link
Once GitHub Pages is enabled, this site lives at:

```
https://ecsarmiento.github.io/MyArts/
```

## Structure
```
MyArts/
├── index.html
├── css/style.css
├── js/script.js
└── images/
    ├── Eds.jpg      (portrait in the hero)
    └── 1.jpg … 24.jpg  (2026 collection)
```

## How to add older artworks (2015–2025)
1. Drop the image files into `images/` (e.g. `2015-flower.jpg`).
2. Open `js/script.js` and add entries to the `artworks` array **before** the 2026 loop:
   ```js
   artworks.push({ src: 'images/2015-flower.jpg', year: 2015, title: 'Flower Study' });
   ```
3. The year filter automatically picks up the count badge.

## Link back to your main profile
All "Back to Main Profile" buttons point to `https://ecsarmiento.github.io` — edit `index.html` if your main profile lives at a different URL.
