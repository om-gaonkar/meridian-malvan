# Meridian Malvan website

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Zod 4 · React Hook Form · Lucide (no animation library).
Server Components by default. Client JavaScript is limited to the mobile menu, the booking bar, the
inquiry form and the gallery viewer.

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
npm run check          # eslint + tsc --noEmit + production build
```

Needs Node 20.9 or newer.

> **Not yet verified:** this project was written in a sandbox with no network access, so
> `npm install`, `npm run lint`, `tsc` and `next build` have **not** been run. Syntax, import/export
> wiring and the shared date, sanitising and rate-limit logic were checked locally. Run `npm run check`
> first and fix anything it reports. Also run Lighthouse on a deployed preview; no performance or
> accessibility scores have been measured.

## What the site does and does not claim

Nothing about the hotel is invented. Anything not yet supplied is `null` or `status: "placeholder"`:

| Shown on previews / dev | Shown on the live site |
| --- | --- |
| Dashed "Pending: …" markers, placeholder rooms, amenities and gallery tiles | Missing contact lines are hidden. Placeholder rooms, amenities, gallery tiles and unanswered FAQs are filtered out. Sections with nothing verified (amenities, gallery, testimonials) disappear, and Rooms shows an honest "details are being added" card |

"Live" means `ALLOW_INDEXING=true`. Placeholders are never written into JSON-LD or the sitemap.

## Information you need to supply

| What | Where |
| --- | --- |
| Address, phone, email, latitude/longitude | `src/config/site.ts` → `contact` |
| Google Maps share link (and optional embed URL) | `contact.googleMapsUrl`, `contact.googleMapsEmbedUrl` |
| Instagram, Facebook, Google Business Profile URLs | `social` |
| Price range (e.g. "₹₹"), only if verified | `priceRange` |
| External booking engine, if you adopt one | `booking.externalUrl` |
| Real room types, amenities, FAQs (check-in/out times, breakfast) | `src/data/rooms.ts`, `amenities.ts`, `faqs.ts` |
| Licensed photos in `public/images/` | `src/data/media.ts`, `gallery.ts`, rooms |
| Genuine guest reviews with source and date | `src/data/testimonials.ts` |
| Legal review, operator name, retention period | `siteConfig.legal`, then set `reviewed: true` |
| Owner-approved About copy | `src/app/about/page.tsx` |

The Hotel JSON-LD gains `address`, `telephone`, `geo`, `priceRange`, `image`, `sameAs` and
`amenityFeature` automatically once the matching data exists. Until the address is added, Google's Rich
Results Test will warn that `address` is missing.

## Environment variables

See `.env.example`. All secrets are read only in server code (`src/lib/inquiry-delivery.ts`).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production origin. Used for `metadataBase`, canonicals, sitemap, JSON-LD. |
| `ALLOW_INDEXING` | `true` on production **only**. Anything else → `noindex` meta, `X-Robots-Tag`, `Disallow: /`, empty sitemap. |
| `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL` | Email delivery of inquiries via Resend (plain text only). |
| `INQUIRY_WEBHOOK_URL`, `INQUIRY_WEBHOOK_SECRET` | Alternative: POST inquiries as JSON to a hotel-management/CRM endpoint (takes priority). |

If `ALLOW_INDEXING=true` but the URL is missing, `localhost`, `example.*` or not https, **the build fails on purpose**
so a placeholder domain can never reach production metadata.

## Inquiry workflow (honest by design)

`POST /api/inquiry` checks, in order: same-origin → rate limit (5 per 10 min per IP) → body size → Zod
validation (same schema and IST date rules as the browser) → honeypot → minimum fill time → sanitising → delivery.

- With **no** delivery configured the endpoint returns `503 not_configured`, the form says the message
  was **not** sent, and shows the hotel's phone/email if known. Success is shown only when delivery succeeded.
- There is no live availability, no reservation and no payment. Copy says so wherever the form appears.
- The rate limiter is in memory (per instance). On serverless or multiple instances, replace
  `src/lib/rate-limit.ts` with a shared store (e.g. Upstash Redis) or a platform rate-limit rule.
- The form needs JavaScript. Without it, visitors see the hotel's contact details instead.

## SEO notes

- Metadata API everywhere: unique title and description per page, title template, canonical per page,
  Open Graph and Twitter cards, `metadataBase` from the site config.
- `/og` renders a typographic brand card for social sharing. Replace it with a real photograph when available.
- JSON-LD: one `@graph` on the home page (`WebSite` + `Hotel`, linked by `@id`) and `BreadcrumbList` on
  inner pages, matching the visible breadcrumbs.
- **`FAQPage` markup is deliberately not emitted.** Google now shows FAQ rich results only for a narrow set of
  sites, so for a hotel it adds risk and no benefit. The FAQs remain visible, crawlable HTML (`<details>`).
- Legal pages stay `noindex` and out of the sitemap until `legal.reviewed` is `true`.
- `/sitemap.xml` and `/robots.txt` use Next conventions; `/api/` is disallowed.
- Destination facts on `/experiences` were checked in October 2026 against the sources listed in
  `src/data/experiences.ts`. Ferry times, fares and seasonal closures change, so re-verify before launch.

## Design and motion

A modern coastal theme: a cool light canvas, deep-ocean dark sections, a lagoon-aqua accent and a
sunset-coral call to action. Fonts are Bricolage Grotesque (display) and Hanken Grotesk (body) via `next/font`.
All tokens live at the top of `src/app/globals.css`; change a colour there and the whole site follows.

- **Identity:** the logomark is a sun resting on the horizon crossed by a vertical meridian line.
- **Hero:** until a photograph is set in `src/data/media.ts`, an animated SVG scene stands in (rising sun, drifting
  waves, water shimmer, twinkling stars). A real photo replaces it automatically and gets a slow ken-burns zoom.
  The headline reveals word by word.
- **Scroll motion:** sections, cards and FAQs rise into view, with staggered timing and a scroll-progress bar
  at the top. These use **CSS scroll-driven animations**, so there is no animation library and no extra JavaScript.
  Browsers without support simply show everything without the motion, and crawlers always see all content.
- **Other motion:** floating glass header that firms up on scroll, a destination marquee (pauses on hover),
  drifting background blobs, hover lift and image zoom on cards, arrow slides on buttons, and a smooth FAQ open/close.
- **Reduced motion:** `prefers-reduced-motion` switches every animation off (the marquee becomes a static, wrapped list).
- **Accessibility:** skip link, landmarks, visible focus rings (aqua on dark surfaces), native `<dialog>` lightbox
  (focus trap, Esc, arrow keys, focus return), `<details>` FAQs, inline errors with icon and text, `aria-current`
  in navigation. Decorative motion elements are `aria-hidden`.
- **Not done:** no Content-Security-Policy header (Next's inline scripts and JSON-LD need nonce setup; add one
  before launch if required), and no analytics or third-party scripts.

## Deployment checklist

1. Add real details and photos (table above). Optimise photos before adding them (roughly 2000px wide, JPEG/WebP).
2. Set the production env vars: `NEXT_PUBLIC_SITE_URL`, `ALLOW_INDEXING=true`, and one delivery route.
3. Send a real test inquiry on a preview deployment and confirm it arrives. Then test the 503 path by unsetting delivery.
4. Run `npm run check`, then Lighthouse (mobile) and an accessibility pass on the preview.
5. Validate home-page JSON-LD in Google's Rich Results Test and the Schema.org validator.
6. Deploy. Fetch `/robots.txt` and `/sitemap.xml` on production, then submit the sitemap in Search Console.
7. Claim the Google Business Profile and link it via `social.googleBusinessProfile` / `contact.googleMapsUrl`.
8. After a legal professional reviews `/privacy-policy` and `/terms`, set `legal.reviewed: true`.
