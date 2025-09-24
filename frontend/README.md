# Frontend (Product Data Explorer)

## Local dev
1. Copy `.env.local.example` to `.env.local` and set `NEXT_PUBLIC_API_URL`.
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev` (http://localhost:3000)
4. Build for production: `npm run build`, `npm run start`

## API
The frontend expects the following backend endpoints:
- GET /navigation
- GET /categories?navigationSlug=<slug>
- GET /products?categorySlug=<slug>&page=1&limit=20
- GET /product/:id
- GET /product-detail/:id
- GET /product/:id/reviews
- POST /view-history

## UX & accessibility
- Loading skeletons shown when fetching
- Images contain alt text
- Keyboard navigable and aria attributes for important controls
