# Product Data Explorer
A full-stack web application to scrape, store, and explore product data (e.g., books from World of Books).
Built with **NestJS (backend)** + **Next.js (frontend)** + **PostgreSQL**.

---

## 🚀 Architecture Overview

### **Backend (NestJS)**

* Tech: **NestJS, TypeORM, PostgreSQL**
* Responsibilities:

  * Scraping products/categories using Playwright + Crawlee
  * Storing structured data (navigation, categories, products, reviews, scrape jobs, view history)
  * Exposing REST API with Swagger documentation
  * Tracking scrape jobs & logging errors
* Folder structure:

  ```
  backend/
    src/
      modules/
        scrape/        # scraping services + controllers
        products/      # entities + product logic
        categories/
        navigation/
        reviews/
        view-history/
      main.ts
      app.module.ts
  ```

### **Frontend (Next.js + Tailwind)**

* Tech: **React (Next.js App Router), TypeScript, Tailwind CSS**
* Responsibilities:

  * Displays navigation + categories + product grid
  * Product detail pages with reviews & recommendations
  * Persists browsing history (client-side + backend sync)
  * Uses **SWR/React Query** for data fetching
* Folder structure:

  ```
  frontend/
    src/
      app/
        page.tsx           # Landing page
        category/[slug]/   # Category drilldown
        product/[id]/      # Product detail
        about/             # About/Contact
      components/
        NavigationGrid.tsx
        ProductCard.tsx
        LoadingSkeleton.tsx
  ```

### **Database Schema**

Entities (with indexes + constraints):

```
navigation — id, title, slug, last_scraped_at

category — id, navigation_id, parent_id, title, slug, product_count, last_scraped_at

product — id, source_id, title, price, currency, image_url, source_url, last_scraped_at

product_detail — product_id (FK), description, specs (json), ratings_avg, reviews_count

review — id, product_id, author, rating, text, created_at

scrape_job — id, target_url, target_type, status, started_at, finished_at, error_log

view_history — id, user_id (optional), session_id, path_json, created_at
```

Indexes:

* `source_id` (for fast lookup)
* `last_scraped_at` (for recency queries)
  Unique:
* `source_url` + `source_id`

---

## 🎯 Design Decisions

* **NestJS** for modular backend + easy integration with TypeORM and Swagger.
* **Next.js App Router** for modern frontend routing + SSR for SEO.
* **SWR** chosen for client-side data fetching (reactive + caching).
* **Playwright + Crawlee** for robust scraping with retry + job tracking.
* **TypeORM** to simplify DB migrations, schema sync, and seeding.
* **Postgres** chosen for relational structure with JSON support (for product specs).
* **WCAG AA accessibility** targeted for frontend.

---

## 📦 Setup & Deployment

### 1. Clone & Install

```bash
git clone https://github.com/sharath-66b6/product-data-explorer.git
cd product-data-explorer
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

Backend runs on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

---

## 🧪 Tests

### Backend

```bash
cd backend
npm run test        # unit tests
npm run test:e2e    # integration tests
```

### Frontend

```bash
cd frontend
npm run test
```

---

## 📘 API Documentation

Backend exposes Swagger UI at:
`http://localhost:5000/api/docs`

Example endpoints:

* `GET /navigation` → list navigation headings
* `GET /categories/:id` → category details + subcategories
* `GET /products?category=:id` → paginated product list
* `GET /products/:id` → product detail (with reviews)
* `POST /scrape` → trigger scrape job
* `GET /scrape/jobs` → list scrape jobs

