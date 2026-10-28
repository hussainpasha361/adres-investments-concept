# Adres Investments — redesign concept

A pitch concept for a redesign of adresinvestments.com. Listings, photography and program figures are placeholders.

Pages: `index.html` (home, with an intro loader), `properties.html`, `citizenship.html` and `contact.html`.
Content lives in `src/data.js` and styles in `src/styles.css`. Motion uses GSAP and Lenis, loaded from a CDN.

## Run locally

There's no build step. Serve the folder with any static server, for example:

```
powershell -ExecutionPolicy Bypass -File tools/serve.ps1
```

Then open http://localhost:5173. Add `?intro` to the homepage URL to replay the intro.

## Deploy

Vercel serves the repository as a static site (see `vercel.json`).
