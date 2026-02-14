# Agentic CRM

Enterprise-ready Next.js CRM with Firebase auth/profile management and AI-assisted marketing workflows.

## Tech Stack
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS + Radix/shadcn UI
- Firebase Auth + Firestore
- Perplexity + Gemini integrations for marketing research

## Enterprise Upgrades Added

### 1) API reliability and contracts
- Added shared API response helpers (`ok`, `fail`) and request correlation IDs.
- Added structured error response payloads and validation failure details.
- Added standardized operational logging helpers.

### 2) Runtime input validation
- Added strict `zod` validation for marketing generation and research API payloads.
- Added clear 400 validation responses instead of implicit runtime failures.

### 3) Environment governance
- Added centralized environment parsing in `lib/env.ts`.
- Firebase public client env vars are now validated before client initialization.
- Server AI provider keys are typed and consumed from one place.

### 4) Security baseline hardening
- Added secure HTTP response headers in middleware:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` deny-list for sensitive APIs

## Local Setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Configure environment variables (create `.env.local`):
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=

   PERPLEXITY_API_KEY=
   GEMINI_API_KEY=
   ```
3. Run the app
   ```bash
   npm run dev
   ```

## Next Enterprise Steps (recommended)
- Replace placeholder middleware auth with verified server session/JWT strategy.
- Add database security rules review and automated policy tests.
- Introduce audit logs and role-based access control.
- Add Sentry/OpenTelemetry tracing and error dashboards.
- Add CI checks for lint, type-check, tests, and dependency vulnerability scans.
