# Implementation Plan (Node.js Express Demo)

Specification source: `spec.md` (Node.js Express property registration demo). Objective: deliver working app incrementally. Each iteration builds safely on prior work; no orphaned code.

## Iteration 1 – Bootstrap & Hello World (Status: Complete)
Goals:
- Initialize `package.json` with dependencies (express, nunjucks, morgan, helmet, express-session, csurf, lodash, bootstrap, jest, supertest, nodemon, eslint).
- Create `server.js` with Express app: basic middleware (helmet, morgan), session config, Nunjucks setup (views/), placeholder layout.
- Implement `/health` endpoint returning `{ status: 'ok', msg: 'hello world' }`.
- Add Jest config + first test for `/health` using Supertest.
- Add minimal `README.md` quick start.
Prompts:
1. Create package.json scripts: start, dev, test, lint.
2. Implement server bootstrap with error logging on startup.
3. Add Nunjucks layout file with Bootstrap CDN.
4. Write health route + test (ensure 200 + JSON shape).
5. Confirm `npm test` passes.

## Iteration 2 – Layout & Start Page (Status: Complete)
Goals:
- Create `layout.njk` refined (nav placeholder, block definitions).
- Implement start page route (`GET /`) and `start.njk` template.
- Add a button linking to `/contact`.
Prompts:
1. Build base layout with container, header.
2. Start controller & route file.
3. Add basic text per spec.
4. Add accessibility landmarks (main, header, footer).
5. Snapshot/render test (optional minimal HTML assertion).

## Iteration 3 – Contact Form (Status: Complete)
Goals:
- Implement `GET /contact` & `POST /contact`.
- Create `contactValidation.js` (length checks + email regex).
- Store data in `session.registration.contact`.
- Render errors with partial `form-errors.njk`.
Prompts:
1. Build contact form fields (firstName, lastName, email, phone).
2. Validation + unit tests for boundaries & invalid email.
3. POST handler persists to session and redirects to `/address`.
4. Error display logic.
5. Route tests: success path & failure stays on page.

## Iteration 4 – Address Form (Status: Complete)
Goals:
- Implement `GET /address` & `POST /address` (guard: contact must exist).
- `addressValidation.js` with postcode regex.
- Persist to `session.registration.address`.
Prompts:
1. Build address form fields.
2. Validation tests (postcode positive/negative cases).
3. Guard redirect to `/contact` if missing contact.
4. POST success -> `/summary`.
5. Route tests for guard & success.

## Iteration 5 – Summary Page (Status: Complete)
Goals:
- `GET /summary`: read session, display data.
- If contact or address missing -> redirect appropriately.
Prompts:
1. Controller with guard logic.
2. Template rendering both sets of data.
3. Unit test: missing data redirects.
4. Link/button to submit.

## Iteration 6 – Submit Flow (Status: Complete)
Goals:
- `POST /submit` calls `registrationService.submit()` (stub) -> returns id.
- Store/return id; clear registration data (except maybe id for display).
- Redirect to `/submitted`.
- `GET /submitted` confirmation page with restart button.
Prompts:
1. Implement service stub using `crypto.randomUUID()`.
2. Logging structured event.
3. Submit controller + tests (service invoked once, id format).
4. Confirmation template.

## Iteration 7 – Error Handling & Partials (Status: Not started)
Goals:
- Centralize form error rendering partial.
- Add simple 404 and 500 handlers.
Prompts:
1. `form-errors.njk` partial.
2. Express 404 middleware.
3. Generic error middleware (log stack, show friendly message).
4. Tests for 404 path.

## Iteration 8 – Security & CSRF Integration (Status: Not started)
Goals:
- Add `csurf` protection to POST routes.
- Inject token into templates.
- Ensure failure scenario returns 403.
Prompts:
1. Middleware registration after session.
2. Template variable injection via locals.
3. Test missing/invalid token -> 403.

## Iteration 9 – Session & Config Polish (Status: Not started)
Goals:
- Extract session config module.
- Add env-driven `SESSION_SECRET` with fallback.
- Document production adjustments.
Prompts:
1. Create config helper.
2. Update README with session notes.
3. Test uses fallback when env missing.

## Iteration 10 – Testing Coverage & Cleanup (Status: Not started)
Goals:
- Ensure validation edge cases covered.
- Route progression full happy path test.
- ESLint setup & run clean.
Prompts:
1. Add additional tests for boundary lengths.
2. Full journey integration test: contact -> address -> summary -> submit -> submitted.
3. Add ESLint config & run.
4. Final README enhancements.

## Iteration 11 – Final Review (Status: Not started)
Goals:
- Verify all scripts run.
- Minor refactors for clarity (no functionality change).
- Update changelog final entry.
Prompts:
1. Manual run-through.
2. Address any lint warnings.
3. Changelog update.

---
Statuses updated through Iteration 1 completion. Keep changes concise per demo scope.
