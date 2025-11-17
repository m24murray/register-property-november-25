# Register Property Details (Demo)

Concise Express + Nunjucks demo collecting contact and UK address details through a 5‑screen flow. Data is stored transiently in session and never persisted.

## Flow
Start → Contact → Address → Summary → Submit → Confirmation.

## Quick Start
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

## Tech Stack
Express 4, Nunjucks, Bootstrap 5 (CDN), express-session (MemoryStore), helmet, morgan, lodash, Jest + Supertest.

## Implemented (Iterations 1–6)
1. Bootstrap & health endpoint.
2. Layout + start page.
3. Contact form + validation.
4. Address form + validation + guard.
5. Summary page + guards.
6. Submit flow (UUID, structured log, confirmation).

## Remaining (Planned)
7. Error pages & partials polish.
8. CSRF protection integration.
9. Session config extraction & env polish.
10. Coverage expansion & lint cleanup.
11. Final review & refactors.

## Testing
`npm test` runs unit + route tests (currently 25 passing). Supertest agents exercise journey progression.

## Demo Notes
Not production ready: no persistence, MemoryStore session, basic validation, no auth. See `spec.md` for details and future extension ideas.

## Scripts
`npm start` (prod) · `npm run dev` (watch) · `npm test` (Jest)

Refer to `spec.md` and `implementation-plan.md` for full specification and progress.
