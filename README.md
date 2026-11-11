# Travel agent landing page — template

A one-page site for an independent luxury travel advisor: photo-slideshow hero, intro,
collections, a scroll-driven row of signature journeys, reviews and an enquiry form.
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
4. **Colours and fonts:** the tokens at the top of `src/index.css` (`--cream`, `--sand`,
   `--terracotta`, `--espresso`, `--gold`; Bodoni Moda + Jost).
5. **Page title and share preview:** `index.html`.
6. **Hero video (optional):** pass `video={{ src, poster }}` to `<Hero />` in
   `src/pages/home.tsx` to replace the slideshow with a looping clip (one muted MP4,
   ~720p, under ~6 MB, plus a poster frame).

The enquiry form is a front-end demo; connect it to Formspree, Netlify Forms or email
before launch.

## How it's built

- **Vite + React + TypeScript**, styled with **Tailwind v4**.
- **Lenis** smooths the page scroll and in-page anchor links (`src/hooks/use-smooth-scroll.ts`).
- **GSAP + ScrollTrigger** drive the motion:
  - the pinned horizontal journeys row on desktop (`src/components/site/journeys.tsx`);
  - scroll-linked parallax and rises, declared with `data-parallax` and `data-rise`
    attributes (`src/hooks/use-scroll-motion.ts`);
  - headline and review text reveals (GSAP SplitText).
- On laptops each section is a full-screen scroll scene (pinned, scrubbed to the scroll);
  phones keep normal scrolling.
- `respectReducedMotion` in `src/config/brand.ts` decides whether visitors with the OS
  "reduce motion" setting get the full experience (`false`, the default) or a calm,
  static page (`true`). The slideshow has a pause control either way.

## Adding components

`components.json` is set up for the shadcn CLI, with the React Bits and Fancy Components
registries, e.g. `npx shadcn@latest add @react-bits/SplitText-TS-TW`.
