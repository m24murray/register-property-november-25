# Changelog

## [2025-11-17] Plan Initialization
- Created `spec.md` for Node.js Express property registration demo (refined from prompts).
- Added `implementation-plan.md` with 11 concise iterations.
- Established initial structure for future scaffolding.

(Use this file to record each iteration's code changes.)
## [2025-11-17] Iteration 1 Complete
- Added `package.json` with dependencies and scripts.
- Implemented `server.js` with Express, helmet, morgan, session, Nunjucks, `/health` endpoint.
- Created initial `views/layout.njk` placeholder template.
- Added Jest + Supertest test `tests/health.test.js`.
- Added `README.md` quick start documentation.
- Updated implementation plan marking Iteration 1 complete.

## [2025-11-17] Iteration 2 Complete
- Added refined `views/layout.njk` with nav.
- Added `routes/start.js` and `views/start.njk` start page.
- Updated `server.js` to mount start route.
- Added test `tests/start.test.js` verifying start page link to /contact.
- Marked Iteration 2 complete in implementation plan.

## [2025-11-17] Iteration 3 Complete
- Added contact form template `views/contact.njk` and error partial `views/partials/form-errors.njk`.
- Implemented `routes/contact.js` with GET and POST handlers.
- Added validation module `validation/contactValidation.js`.
- Updated `server.js` to mount contact route.
- Added validation tests `tests/validation/contactValidation.test.js`.
- Added route tests `tests/contact.test.js` for success and failure paths.
- Updated implementation plan marking Iteration 3 complete.
- Added address validation module `validation/addressValidation.js` with postcode regex.
- Implemented `routes/address.js` GET/POST with guard redirect to /contact when contact missing.
- Added address form template `views/address.njk`.
- Updated `server.js` to mount address route.
- Added validation tests `tests/validation/addressValidation.test.js`.
- Added route tests `tests/address.test.js` covering guard, invalid input, success redirect to /summary.
- Updated implementation plan marking Iteration 4 complete.

## [2025-11-17] Iteration 5 Complete
- Added summary route `routes/summary.js` with guards redirecting to /contact or /address.
- Added `views/summary.njk` template displaying contact & address data.
- Mounted summary route in `server.js`.
- Added route tests `tests/summary.test.js` covering guard redirects and successful render.
- Updated implementation plan marking Iteration 5 complete.
\n+## [2025-11-17] Iteration 6 Complete
- Added service stub `services/registrationService.js` generating UUID.
- Implemented submit routes `routes/submit.js` (POST /submit, GET /submitted) with guard redirects.
- Added submitted confirmation template `views/submitted.njk`.
- Mounted submit routes in `server.js`.
- Added tests `tests/submit.test.js` verifying guards, successful submission, id format, session clearing.
- Structured event logging on submission.
- Updated implementation plan marking Iteration 6 complete.
