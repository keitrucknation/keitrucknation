# KeiTruckNation

Website for KeiTruckNation, an importer and seller of Japanese kei (mini) trucks in the USA.
Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS.

## Run it on your computer

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev            # http://localhost:4028
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Production build (needs internet for Google Fonts) |
| `npm run serve` | Runs the production build locally |
| `npm run type-check` | TypeScript check |
| `npm run lint` | ESLint |

## Where things live

```
src/
├── app/                    One folder per page (about, blog, cart, inventory, ...)
│   ├── blog/data/articles.ts   All blog articles (list, pages and sitemap come from here)
│   ├── inventory/              Category pages (/inventory/[slug])
│   ├── trucks/[id]/            Truck detail page (accepts slug or id)
│   ├── api/                    API routes (contact, inventory, vin-lookup)
│   ├── sitemap.ts, robots.ts   SEO
├── components/             Header, Footer, search, language, cookie banner, chat
├── lib/
│   ├── inventory.ts        All trucks (single source of truth)
│   ├── translations.ts     UI text in 10 languages
│   ├── cartStore.ts, wishlistStore.ts   Saved in the visitor's browser for now
public/assets/              Logos, icons, flags
public/images/              Site photos (being added - see the photo shoot list)
```

## Environment variables

See `.env.example` for the full list. The real `.env` file is git-ignored and must never be committed.
On Vercel, add the same names under **Project > Settings > Environment Variables**.
`NEXT_PUBLIC_SITE_URL` must be set to the live domain.

## Status

Still being built. Planned next:

- Real site photos in `public/images/`, compressed to WebP
- Supabase: database for inventory, parts, blog, orders and form submissions; auth; admin dashboard
- Deploy on Vercel
- Before launch: review the reviews/testimonials/dealers content and the checkout payment flow

## Acknowledgments

- Powered by Next.js and React
- Styled with Tailwind CSS

Built with ❤️
