# Electronics Shop

Production-ready local-first electronics ecommerce starter built with React + Vite on the frontend and Express + SQLite on the backend.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express
- Database: SQLite using `better-sqlite3`
- Auth: JWT-based local authentication with hashed passwords
- Uploads: Local filesystem uploads served from the Express server
- Mail: SMTP-ready service with local mock logging fallback

## Features

- Premium responsive storefront with Home, About, Products, Product Detail, Contact, Cart, Checkout, Login, Sign Up, Order Success, and 404 pages
- Admin dashboard with product, category, order, review, contact, user, and branding management
- Local SQLite schema for users, products, categories, orders, order items, reviews, contact messages, settings, opening hours, banners, media, and email logs
- Seeded demo products, categories, reviews, banners, admin user, and shopper account
- Single settings area to update shop name, logo text, phone, WhatsApp, Instagram, email, address, opening hours, hero content, and banners
- Local file uploads for product media
- Contact form persistence plus email logging fallback when SMTP is not configured

## Demo Accounts

- Admin: `admin@nexora.local` / `Admin123!`
- User: `user@nexora.local` / `User123!`

## Project Structure

```text
electronics-shop/
+- client/
¦  +- public/
¦  +- src/
¦  ¦  +- api/
¦  ¦  +- components/
¦  ¦  +- context/
¦  ¦  +- hooks/
¦  ¦  +- lib/
¦  ¦  +- pages/
¦  ¦  +- styles/
¦  +- index.html
¦  +- package.json
¦  +- tailwind.config.js
¦  +- vite.config.js
+- server/
¦  +- data/
¦  +- src/
¦  ¦  +- config/
¦  ¦  +- controllers/
¦  ¦  +- db/
¦  ¦  +- middleware/
¦  ¦  +- routes/
¦  ¦  +- services/
¦  ¦  +- uploads/
¦  ¦  +- utils/
¦  +- package.json
+- .env.example
+- package.json
+- README.md
```

## Database Setup

The SQLite database is created automatically at:

```text
server/data/electronics-shop.sqlite
```

It is initialized on server start. If the database is empty, demo seed data is inserted automatically.

## Environment

1. Copy `.env.example` to `.env`
2. Update values if required

Example variables:

```env
CLIENT_URL=http://localhost:5173
SERVER_PORT=5000
JWT_SECRET=change-this-secret
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=no-reply@nexora-electronics.local
```

If SMTP is left blank, emails are not sent externally. Instead, the backend stores email logs in the local database.

## Local Run Instructions

### Install dependencies

```bash
npm install
npm install --prefix server
npm install --prefix client
```

### Start development servers

From the project root:

```bash
npm run dev
```

This starts:

- Frontend at `http://localhost:5173`
- Backend at `http://localhost:5000`

### Build the client

```bash
npm run build --prefix client
```

### Start the backend only

```bash
npm run start --prefix server
```

## API Overview

### Public routes

- `GET /api/store/bootstrap`
- `GET /api/store/products`
- `GET /api/store/products/:slug`
- `GET /api/store/categories`
- `GET /api/store/reviews`
- `POST /api/store/contact`
- `POST /api/store/orders`
- `POST /api/store/reviews` (authenticated)
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Admin routes

- `GET /api/admin/dashboard`
- `GET /api/admin/products`
- `POST /api/admin/products`
- `DELETE /api/admin/products/:id`
- `GET /api/admin/categories`
- `POST /api/admin/categories`
- `DELETE /api/admin/categories/:id`
- `GET /api/admin/orders`
- `PATCH /api/admin/orders/:id/status`
- `GET /api/admin/reviews`
- `PATCH /api/admin/reviews/:id/status`
- `DELETE /api/admin/reviews/:id`
- `GET /api/admin/messages`
- `GET /api/admin/users`
- `GET /api/admin/settings`
- `PUT /api/admin/settings`

## Notes

- Everything is stored locally. No hosted database services are used.
- Product images are uploaded to `server/src/uploads` and served from `/uploads/...`.
- Branding is editable from the admin dashboard and reflected across the storefront.
- The structure is intentionally modular so SQLite can be swapped later for another database implementation.
