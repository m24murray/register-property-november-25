# Register Property Details – Specification (Demo)

## 1. Purpose / Scope
A demo Node.js Express web application allowing a user to enter contact and UK address details for a property registration flow (5 screens). Data is not persisted yet; it is logged and held transiently in session. Concise, non-production spec.

## 2. Technology Stack
- Runtime: Node.js 20 LTS
- Server: Express 4.x
- Templating: Nunjucks 3.x
- Styling: Bootstrap 5.3.8 (served from `node_modules` or CDN for demo)
- Utility: Lodash (latest) – light data helpers
- Validation: Custom lightweight functions + regex for email/postcode
- Sessions: `express-session` (MemoryStore for demo; flag for future external store)
- CSRF Protection: `csurf`
- Security hardening: `helmet` basic middleware
- Logging: `morgan` (HTTP) + simple console application logger
- Testing: Jest (unit tests for validation + route logic)
- Linting: ESLint (recommended rules) – optional but included in scripts

## 3. High-Level Architecture
```
client (browser)
  -> Express routes/controllers
       -> Session (in-memory demo)
       -> Validation helpers
       -> Service layer (stub) logs submission
       -> Views (Nunjucks templates)
```
Single process, no persistence. Separation:
- `routes/` defines endpoints & flow control
- `controllers/` isolate per-screen logic
- `services/registrationService.js` stub (logs & returns success id)
- `validation/` pure functions
- `views/` templates (layout + pages)

## 4. User Flow / Screens
1. Start (`GET /`) – Intro text + "Start" button -> contact details.
2. Contact Details (`GET /contact`, `POST /contact`) – Form for contact fields; on success redirect to address.
3. Address Details (`GET /address`, `POST /address`) – Form for address fields; on success redirect to summary.
4. Summary (`GET /summary`) – Display combined data; "Submit" button posts to `/submit`.
5. Submitted (`POST /submit` then redirect `GET /submitted`) – Confirmation page with "Register another" button returning to `/` (clears session data relevant to this journey).

## 5. Data Model (Transient Session Structure)
```js
session.registration = {
  contact: {
    firstName, lastName, email, phone
  },
  address: {
    addressLine1, addressLine2, townOrCity, county, postcode
  }
};
```

## 6. Fields & Validation (Sensible Defaults)
| Field | Required | Validation |
|-------|----------|------------|
| firstName | yes | length 1–20, trim, letters & basic punctuation |
| lastName | yes | length 1–20 |
| email | yes | length ≤ 50, simple email regex |
| phone | no  | if present: digits / spaces / +, length 7–15 |
| addressLine1 | yes | length 1–40 |
| addressLine2 | no | length 0–40 |
| townOrCity | yes | length 1–30 |
| county | no | length 0–30 |
| postcode | yes | UK postcode simplified regex (e.g. `/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i`) |
All fields trimmed. Errors surfaced inline above form with Bootstrap alert classes.

## 7. Error Handling & UX
- On validation failure: stay on same page, show summary alert + per-field error messages.
- Summary page defensively checks required session data; if missing redirects to appropriate form.
- CSRF token embedded as hidden field in all POST forms.

## 8. Routes
| Method | Path | Purpose |
|--------|------|---------|
| GET | / | Start screen |
| GET | /contact | Render contact form |
| POST | /contact | Validate & store contact data |
| GET | /address | Render address form (requires contact) |
| POST | /address | Validate & store address data |
| GET | /summary | Show combined data (requires contact+address) |
| POST | /submit | Final submission -> service stub, clear session partial, redirect |
| GET | /submitted | Confirmation screen |
| GET | /health | Simple health check (200 JSON) |

## 9. Templating Structure (Nunjucks)
```
views/
  layout.njk (base <head>, nav, footer, csrf meta)
  start.njk
  contact.njk
  address.njk
  summary.njk
  submitted.njk
  partials/
    form-errors.njk
```
Use `{% extends "layout.njk" %}` and block sections. Include Bootstrap CSS/JS from CDN for speed.

## 10. Security Considerations (Demo Level)
- `helmet()` for basic headers.
- `csurf` middleware on POST routes.
- Input validation & output escaping via Nunjucks autoescape.
- No authentication yet; annotate in README for future.
- Memory session not suitable for production (note in README).

## 11. Logging
- `morgan('combined')` for HTTP.
- Registration submission logs: structured JSON line: `{ event: 'registration_submitted', data: { ... } }`.

## 12. Service Stub
`registrationService.submit(registration)` returns `{ id: <uuid-like> }` (use `crypto.randomUUID()` Node 20). No persistence.

## 13. Project Structure
```
/ (root)
  package.json
  server.js
  routes/
    index.js
    contact.js
    address.js
    summary.js
    submit.js
  controllers/
    contactController.js
    addressController.js
    summaryController.js
    submitController.js
  services/
    registrationService.js
  validation/
    contactValidation.js
    addressValidation.js
    common.js
  views/ ... (see above)
  public/
    css/ (custom overrides if needed)
  tests/
    validation/*.test.js
    routes/*.test.js
  README.md
  spec.md
```

## 14. NPM Dependencies (Indicative)
Runtime deps:
- express
- nunjucks
- bootstrap (installed, but may use CDN for demo)
- lodash
- express-session
- csurf
- helmet
- morgan

Dev deps:
- jest
- supertest (route testing)
- eslint (+ eslint-config-recommended or airbnb-lite) – optional
- nodemon (dev script)

## 15. Scripts (package.json)
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "jest",
  "lint": "eslint .",
  "build": "echo 'No build step (static assets via CDN)'"
}
```

## 16. Session Handling
Configure `express-session` with a simple secret (env var `SESSION_SECRET` fallback to placeholder) and `cookie: { httpOnly: true, sameSite: 'lax', secure: false }` (document future production adjustments: secure true, external store like Redis).

## 17. Environment Configuration
`.env` (optional):
```
SESSION_SECRET=devlocalsecret
PORT=3000
NODE_ENV=development
```
Load with `dotenv` if included (optional; keep spec flexible).

## 18. Testing Strategy
- Validation tests: boundary lengths, regex acceptance/rejection.
- Route tests: happy path progression & redirect when missing data.
- Health endpoint returns 200.
- Use Supertest with an isolated Express app instance.

## 19. Non-Goals (Demo Constraints)
- No real persistence or database.
- No authentication/authorization.
- No production-grade session store.
- No advanced client-side JS beyond Bootstrap behavior.
- Minimal styling customization.

## 20. Future Extension Notes
- Replace service stub with API integration (REST or GraphQL).
- Add auth & user accounts.
- Enhance validation (postcode lookup API, phone E.164 formatting).
- Add accessibility audit & error summary focus management.
- Introduce persistence (e.g., Postgres) & data model migrations.

## 21. Acceptance Criteria (Demo)
- All five screens reachable in order with validation enforcing required fields.
- CSRF protection active (invalid token -> 403).
- Summary shows entered data accurately.
- Submission logs structured event and shows confirmation page.
- Jest tests pass (≥ basic coverage for validation + routes).
- Start command launches app on configured PORT.

## 22. Quick Start (for README reference)
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

---
End of concise demo specification.
