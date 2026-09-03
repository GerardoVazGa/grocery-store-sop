# Abarrotes POS

A desktop point-of-sale application for a neighborhood grocery store, built with Electron, React, and SQLite. The project is designed for local use on a single workstation and focuses on point-of-sale operations, stock validation, daily sales tracking, reporting, and cash-cut management.

## Overview

The current implementation covers the core operational flow of a retail store:

- Product catalog management with barcode, category, brand, price, cost, and stock.
- Barcode scanning support for product lookup and registration.
- Search and selection of products for a sale.
- Cart-based checkout with quantity adjustments and payment method selection.
- Transaction validation before completion, including stock checks and active cash-cut validation.
- Daily revenue and sales reporting through the dashboard.
- Cash-cut summary and daily sales review.
- Category and brand configuration.
- Local receipt printing support.

## Current Status

This project is a functional local POS prototype oriented to a single-store environment. It is designed around a desktop app workflow using Electron and a SQLite database, without external services or multi-user authentication.

## Technology Stack

- Frontend: React + Vite
- Desktop app: Electron
- Database: SQLite via better-sqlite3
- State management: Zustand
- Form validation: React Hook Form + Zod
- Routing: React Router DOM
- Styling: Tailwind-based UI system with modular component structure

## Implemented Functionality

### 1. Product Management

The product module allows:

- Creating products with barcode, name, category, brand, cost, price, and stock.
- Scanning barcodes directly into the product form for faster data entry.
- Editing existing products.
- Deleting products only when they are not tied to historical sales.
- Validating category and brand consistency before saving.
- Preventing duplicate barcodes.

Important business rule:

- A product cannot be deleted if it appears in sales history.
- A brand must belong to the selected category.

### 2. Sales Flow

The sales page is built around a cashier workflow:

- Product search from a dedicated search panel.
- Barcode scanning support to add products directly to the cart.
- Real-time cart updates.
- Quantity modification and item removal.
- Payment method selection: cash, card, or transfer.
- Sale creation only if there is an active cash cut.
- Stock reduction after a successful sale.

Important business rule:

- A sale cannot be created unless an active cash cut exists.
- A product cannot be sold if inventory is insufficient.

### 3. Dashboard and Reporting

The reporting module exposes operational summaries by period, including:

- Total revenue
- Total sales count
- Average ticket value
- Revenue split by payment method
- Top-selling products by category
- Sales grouped by category and brand
- Period-based filters such as day, week, and month

### 4. Cash-Cut Management

The cash-cut flow includes:

- Daily cash summary computation.
- Covered sales data for the current day.
- Cash-cut closing action.
- Locking the sales flow when the cash cut is closed.
- Reopening the cash cut if needed for correction.

This is enforced in the application layout logic: once a cash cut is closed, the sales route is disabled until reopened.

### 5. Configuration

The settings area includes:

- Category management
- Brand management
- Category-based filtering for brand listing

### 6. Printing

The application includes a local printing service for generating transaction receipts with Electron's browser printing API, including available printer detection through the main process.

## Application Architecture

The project is organized by feature and follows a clear separation between UI, business logic, and persistence layers.

### Frontend

The React application is located under the src folder and contains:

- app: router and shell layout
- features: feature-based modules for products, sales, reports, settings, brands, and cash cuts
- shared: reusable hooks and utilities

### Main Process / Data Layer

The Electron code under the electron folder handles:

- database initialization
- IPC communication with the renderer
- CRUD logic for each domain
- local file access for SQLite and printing

### Database

The project initializes a local SQLite database using a migration file:

- electron/db/migrations/001_init.sql

The schema includes:

- categories
- brands
- products
- cash cuts
- sales
- sale items

## Project Structure

```text
.
├── electron/
│   ├── configs/
│   ├── db/
│   │   ├── migrations/
│   ├── features/
│   │   ├── brands/
│   │   ├── cashCuts/
│   │   ├── categories/
│   │   ├── printer/
│   │   ├── products/
│   │   ├── reports/
│   │   └── sales/
│   ├── main/
│   ├── preload/
│   └── shared/
├── src/
│   ├── app/
│   ├── features/
│   └── shared/
├── .env
├── eslint.config.js
├── index.html
├── nodemon.json
├── package.json
├── vite.config.js
├── README.md
└── public/
```

## Requirements

- Node.js 18 or higher
- npm
- Electron-compatible operating system

## Installation

1. Clone the repository.
2. Install the dependencies:

```bash
npm install
```

3. Ensure the environment file `.env` is available and configured.

## Running in Development

```bash
npm run electron:dev
```

This command starts:

- Vite for the frontend UI
- Electron for the desktop application
- SQLite database initialization and runtime access

## Production Build

Web build:

```bash
npm run build
```

Electron package:

```bash
npm run electron:build
```

## Business Rules Observed in the Code

The current implementation reflects these rules:

- A sale requires an open cash cut.
- A sale must contain at least one product.
- Product quantity must be a positive integer.
- Product stock must be sufficient before sale completion.
- A sale may be paid by cash, card, or transfer.
- Product deletion is blocked when linked to previous sales.
- Brands are tied to a category and cannot be assigned across categories.
- Duplicate product barcodes are prevented.

## Main Modules

- src/features/products: product lifecycle and validation
- src/features/sales: cart and sale creation flow
- src/features/reports: metrics and dashboard
- src/features/cashCuts: cash summary and daily close operation
- src/features/categories: category handling
- src/features/brands: brand handling
- electron/features/*: database and IPC logic for each domain

## Future Roadmap

The following areas are considered for future implementation and are not part of the current scope:

- User authentication and permissions
- Supplier and purchase management
- Inventory adjustments and stock movements
- PDF and Excel export for reports
- Multi-store or cloud synchronization
- Batch and expiration tracking
- Alerts for low stock and sales anomalies

## Notes

This documentation is aligned to the current codebase and reflects the actual operational scope of the project. It intentionally excludes features that do not yet exist in the implementation and focuses on the workflows that are already active in the application.
