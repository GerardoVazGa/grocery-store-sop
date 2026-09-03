# Abarrotes POS

Abarrotes POS is a desktop point-of-sale application for small retail stores. It is implemented with Electron (main process), React + Vite (renderer) and SQLite (`better-sqlite3`) for local persistence.

## Overview
- Purpose: single-station POS for registering sales, basic inventory, and daily cash cuts.
- Data separation: sales associated to a cash cut are linked by `cash_cut_id`. Dashboard/Reports provide daily metrics that are computed independently of a specific cash cut (they aggregate sales for the day regardless of the cash cut association).

## What problem this project addresses
- Provide an offline-capable POS that supports barcode scanning and local receipt printing.
- Validate inventory at sale time and keep simple daily cash tracking via cash cuts.

## Implemented features (code-backed)
- Product CRUD (create, read, update, delete) with DB-level constraints (barcode uniqueness).
- Add products to a sale via search or barcode scanner integration (`@ericblade/quagga2`).
- Cart and sale creation flow with server-side validations: items required, integer positive quantities, product existence and stock checks, and restricted payment methods (`cash`, `card`, `transfer`).
- Sales are linked to the active cash cut via `cash_cut_id` when created.
- Cash-cut operations: open, close, reopen, and obtain summaries and sales for a given cash cut.
- Local printing integration (handled from Electron main process).

> Note: The above list reflects functionality implemented in the repository. The project does not implement multi-user sync, external providers, or advanced inventory flows.

## Technology stack
- Frontend: React, Vite
- Desktop runtime: Electron
- Database: SQLite via `better-sqlite3`
- State: `zustand`
- Forms/validation: `react-hook-form`, `zod`
- Barcode scanning: `@ericblade/quagga2`
- Styling: Tailwind (project-specific setup)

## Application architecture and communication flow
This section explains how the current codebase communicates across layers (not a re-design):

React UI
→ hooks / API layer (frontend wrappers)
→ `window.api` (renderer-exposed object)
→ Electron `preload` (contextBridge)
→ IPC handlers (main process)
→ repositories (data access logic)
→ SQLite (persistence)

Brief responsibilities:
- React: renders the UI and uses hooks to call the API layer.
- Hooks / API layer: encapsulate frontend calls and transform data for the UI.
- `preload` (contextBridge): exposes a controlled API surface to the renderer (`window.api.*`).
- IPC handlers: receive requests from `preload` and invoke repository services.
- Repositories: encapsulate SQL queries against the SQLite database.
- Electron (main): manages the local runtime, database file, printing and filesystem access.

## Key technical decisions
- Use Electron for a desktop runtime that provides native printing and filesystem access.
- Use React for the renderer and UI composition.
- Use SQLite (`better-sqlite3`) for a local, serverless persistent store.
- Expose a controlled API via `preload`/`contextBridge` to avoid direct renderer access to Node/Electron internals.
- Use IPC to separate renderer requests from main-process operations.
- Encapsulate SQL interactions in repositories to keep query logic isolated from handlers.
- Organize code feature-by-feature (feature-based folders) to group related UI, handlers and repositories.
- Associate sales to a cash cut using `cash_cut_id` so cash-cut-specific views can query sales belonging to that cut; daily reports aggregate sales by date independently.

## Cash-Cut Management (implemented behavior)
- Each cash cut record includes `opening_amount` and optional `expected_cash`, `counted_cash`, `difference`, and `status`.
- Sales that belong to a cash cut are those with `sales.cash_cut_id = cash_cuts.id` (the repository queries sales by `cash_cut_id`).
- The Dashboard/Reports compute daily aggregates independently (they operate over sales for the day regardless of `cash_cut_id`).
- Closing a cash cut (repository logic) computes the sum of sales with `payment_method = 'cash'` for that `cash_cut_id` and stores it in the `expected_cash` field. The repository then records `counted_cash` and computes `difference = counted_cash - expected_cash`, and sets `status = 'CLOSED'` and `closed_at` timestamp.
- The frontend summary query (`getCashCutSummary`) returns `opening_amount` and the total cash sales separately; user-interface code can present the expected cash for the session as `opening_amount + totalCash` (this is the intended displayed value). Note: the repository currently stores `expected_cash` as the sum of cash sales; `opening_amount` is kept in the cash cut row and can be added when presenting the expected total in the UI if desired.
- Reopening a cash cut is supported as an explicit correction operation: it clears the `closed_at`, `counted_cash`, `expected_cash` and `difference` fields and sets `status = 'OPEN'`.

### Expected cash calculation
- Displayed expected cash (session total) = `opening_amount + cash sales`.
- Card and transfer payments are excluded from the expected cash calculation.

## Business rules observed in the code
Only rules enforced by the current implementation (repository or service layer):
- A sale must include at least one product (service validation).
- Quantity must be an integer greater than 0 (service validation).
- Product must exist before being added to a sale (service validation).
- Product stock must be sufficient for the requested quantity (service validation).
- Valid payment methods enforced: `cash`, `card`, `transfer` (service validation).
- A sale cannot be created unless there is an active cash cut (service validation uses `getActiveCashCut`).
- Barcode uniqueness is enforced by the database schema (unique index on `products.barcode`).

## Project structure (high level)
The repository groups code by feature. Key folders in this workspace:

- electron/
	- configs/
	- db/
		- migrations/
	- features/
		- brands/
		- cashCuts/
		- categories/
		- printer/
		- products/
		- reports/
		- sales/
	- main/
	- preload/
	- shared/
- src/
	- app/
	- features/
	- shared/
- public/
- package.json
- vite.config.js
- nodemon.json

Verify this list in the repository root if you want a more detailed tree.

## Environment variables
The project uses `dotenv` in `electron/configs/env.js`, but all values have sensible defaults. A top-level `.env` is optional. The repository reads these environment variables when present:

- `APP_NAME` — application display name (default provided)
- `DEV_SERVER_HOST` — dev server host (default `localhost`)
- `DEV_SERVER_PORT` — dev server port (default `5173`)
- `DATABASE_PATH` — local DB file name (default `abarrotes-pos.sqlite`)

Do not commit secrets to `.env`. The project will run with defaults for local development.

## Requirements
- Node.js: no `engines` field is declared in `package.json`; use a current LTS Node.js that is compatible with the Electron version in `devDependencies`. If you maintain the project, pin an `engines.node` entry in `package.json` for reproducible installs.
- npm (or an equivalent package manager).

## Installation
Use the project scripts and package manager commands below:

```bash
git clone <repo-url>
cd abarrotes-pos
npm install
```

If you use an `.env`, place it at the repository root. Not required for a clean install.

## Running in development
Frontend + Electron (development):

```bash
npm run electron:dev
```

This script runs the Vite dev server and the Electron process (see `package.json` for exact behavior).

## Production build
The repository exposes the following scripts (as defined in `package.json`):

```bash
npm run build
npm run electron:build
```

`npm run build` creates the web build; `npm run electron:build` triggers the packaging step using `electron-builder` as configured in the project.

## Future roadmap (not implemented)
- User authentication and permissions
- Supplier / purchase management
- Advanced inventory adjustments and stock movement tracking
- Export (PDF / Excel) of reports
- Multi-store synchronization or cloud backup

These items are roadmap ideas and are not part of the current implementation.