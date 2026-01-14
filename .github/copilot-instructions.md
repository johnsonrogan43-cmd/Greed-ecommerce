# GitHub Copilot / AI Agent Instructions — Greed E‑commerce

Purpose: provide concise, actionable guidance so an AI coding agent is productive immediately when editing, testing, or extending this repo.

## Quick Start ✅
- Backend: cd `backend` && `npm run dev` (uses `nodemon`) or `npm start` to run `server.js`.
- Frontend: cd `frontend` && `npm run dev` (Vite). Run frontend and backend in separate terminals.
- Environment: Create a `.env` with at least `MONGO_URI`, `JWT_SECRET`. (See `server.js` for usage.)

## High-level architecture (what matters) 🔧
- Two apps: `backend/` (Node + Express + Mongoose) and `frontend/` (React + Vite).
- Backend structure:
  - `controllers/` — business logic (e.g., `authController.js` handles register/login and uses `generateToken`)
  - `routes/` — route definitions (mounted under `/api/*` in `server.js`)
  - `models/` — Mongoose schemas (e.g., `User.js`, `Product.js`)
  - `middleware/` — reusable middleware like `protect` (auth) and validation hooks
- Frontend structure worth noting:
  - `src/components/` (UI pieces), `src/pages/` (views), `src/context/` (Auth/Cart contexts), `src/utils/api.js` (central API helper)

## Conventions & patterns to follow 🧭
- Responses: controllers return JSON shaped like `{ success, message, data }` (see `controllers/authController.js`). Match this structure for consistency.
- Authentication: JWT tokens are created in `authController.generateToken` and verified via `middleware/auth.js` (`protect` middleware). Use `Authorization: Bearer <token>` for protected endpoints.
- Validation: Input validation is done via `middleware/validator.js` and applied on routes (e.g., `validateRegister` in `routes/authRoutes.js`). Prefer using existing validators.
- Error handling: Express error middleware in `server.js` logs stack and returns stack trace only if `NODE_ENV === 'development'`.
- CORS: Allowed origins are explicit in `server.js` (includes `localhost:3000`, `localhost:5173`, and `https://greed-ecommerce.vercel.app`). Update this list if you add new frontends.
- Module style: Backend uses CommonJS (`require`/`module.exports`). Keep consistent when editing backend code.

## Integration points & external dependencies 🔗
- MongoDB via Mongoose — DB connection handled in `server.js` with `process.env.MONGO_URI`.
- JWT via `jsonwebtoken` and password hashing via `bcryptjs` (see `package.json`).
- Deployment: project references Vercel in CORS and `vercel.json` is present in both subprojects.

## Useful examples (copy-paste patterns) ✂️
- Protected route pattern (routes):
  router.get('/me', protect, getMe);
- Token creation (authController):
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
- Route mounting (server.js):
  app.use('/api/auth', authRoutes);

## Things not present / tests / TODOs ⚠️
- There are currently no automated tests in the repo. If adding tests, target controller logic and middleware as first priorities.
- No seed or CI configured; check `package.json` scripts before assuming seed commands.

## Best practices for PRs & edits ✍️
- Keep changes small and focused: update related `routes`, `controllers`, and `models` together.
- Update health check (`/`) endpoints or `server.js` if you add/remove top-level API routes.
- When adding new origins or env vars, document them in this file.

---
If this looks good, I can:
- open a PR with this file committed, or
- update/add more granular examples (route-level snippets, middleware contract examples) if you want.

Please tell me which follow-up you'd prefer or point out any missing contexts to add.