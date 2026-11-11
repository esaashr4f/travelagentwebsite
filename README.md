# Travel agent landing page — template

A one-page site for an independent luxury travel advisor, in a quiet, editorial style
(paper-white page, one serif, photography doing the talking): photo-slideshow hero, intro,
collections, a row of signature journeys, reviews and an enquiry form.
Shown here as the fictional **Oriel Travel**.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
```

## Re-skinning it for a client

1. **Brand and contact details:** `src/config/brand.ts` (agency name, advisor's name,
   email, Instagram, WhatsApp, footer wording).
2. **Content:** `src/data/site.ts` (hero slides, collections, journeys, reviews).
   The reviews are samples and are labelled "Sample review" on the page; replace them
   with the client's real reviews, with their clients' permission.
3. **Photos:** `public/images/` (WebP, about 1100–1900 px wide). Credits for the
   placeholder Unsplash photos are in `public/images/CREDITS.md`.
4. **Colours and fonts:** the tokens at the top of `src/index.css` (`--paper`, `--tint`,
   `--ink`, `--line`; Newsreader, a free variable serif).
5. **Page title and share preview:** `index.html`.
6. **Hero video (optional):** pass `video={{ src, poster }}` to `<Hero />` in
   `src/pages/home.tsx` to replace the slideshow with a looping clip (one muted MP4,
   ~720p, under ~6 MB, plus a poster frame).

The enquiry form is a front-end demo; connect it to Formspree, Netlify Forms or email
before launch.

## How it's built

- **Vite + React + TypeScript**, styled with **Tailwind v4**.
- **Lenis** smooths the page scroll and in-page anchor links (`src/hooks/use-smooth-scroll.ts`).
- Motion is deliberately small, so it can't stutter:
  - blocks marked `data-reveal` fade and settle up once as they enter the view (a CSS
    transition triggered by an IntersectionObserver, staggered with `--reveal-delay`);
  - images marked `data-parallax` drift slightly with the scroll on laptops (GSAP
    ScrollTrigger, scrubbed; `src/hooks/use-scroll-motion.ts`);
  - the hero slideshow crossfades with a slow zoom; collections and reviews crossfade.
- `respectReducedMotion` in `src/config/brand.ts` decides whether visitors with the OS
  "reduce motion" setting get the full experience (`false`, the default) or a calm,
  static page (`true`). The slideshow has a pause control either way.

## Previewing with Epicene (Klim test fonts)

The design was drawn with Klim's Epicene in mind. Its test fonts are free for mock-ups but
may not be distributed, so they are not in this (public) repository:

1. Download the test fonts yourself at klim.co.nz/test-fonts (you accept the licence).
2. Copy the Epicene Display and Epicene Text WOFF2 files into `public/fonts/klim/`, named
   `epicene-display.woff2` and `epicene-text.woff2`.
3. `npm run dev`. The page picks them up automatically; without them it uses Newsreader.

`public/fonts/klim/` is git-ignored: never commit or deploy those files. The test fonts
also have a limited character set, so some punctuation falls back to Newsreader.

## Adding components

`components.json` is set up for the shadcn CLI, with the React Bits and Fancy Components
registries, e.g. `npx shadcn@latest add @react-bits/SplitText-TS-TW`.
