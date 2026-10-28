# Seyran Syria (`syria-booking-app`): Agent Guide

Booking platform for farms, chalets, villas, and Damascus heritage hotels (Arabic RTL, prices in USD/SYP).

## Services & Ports
| Service | Port | Start command | Health check |
|---|---|---|---|
| Frontend (Vite + React 18 + TS + Tailwind) | **3000** | `npm run dev` (host `0.0.0.0`, from `vite.config.ts`) | `GET http://localhost:3000/` |
| API (Express 5, ESM) | **5001** | `node server.js` run inside `server/` | `GET http://localhost:5001/api/health` |

- The API persists to the JSON file **`server/db.json`** (`properties`, `bookings`, `chatMessages`). There is no real database.
- The frontend works offline. Every `api.*` call in `src/services/api.ts` returns `null` on failure, and `AppContext` falls back to `MOCK_PROPERTIES` and `localStorage`.
- `getBaseUrl()` in `api.ts` maps `localhost` → `localhost:5001`, and the Android WebView (`appassets.androidplatform.net`) → `192.168.1.6:5001` (hardcoded LAN IP).

## Layout
- `src/context/AppContext.tsx`: **single global state store** (filters, modals, bookings, chat, host portal). Add new shared state here and expose it through the `value={{...}}` object at the bottom.
- `src/types/index.ts`: `Property`, `BookingRequest`, `ChatMessage`, `AdvancedFilterState`.
- `src/data/mockData.ts`: about 4,000 lines of seed properties. Do not rewrite it wholesale; edit specific entries.
- `src/components/*Modal.tsx`: all modals are mounted globally in `App.tsx` and toggled via context flags.
- `src/components/WhatsAppSupportFAB.tsx`: dual-mode chat (in-app concierge + WhatsApp). Mobile offset `bottom-20` keeps it clear of `BottomNavBar`.
- `server/server.js`: REST endpoints plus keyword-based Arabic concierge auto-replies (`POST /api/chat/messages`).
- Root `*.cjs` scripts (`fix_*`, `inspect_*`, `verify_photos`) are one-off data-maintenance scripts, not part of the app.

## Verify before claiming done
```powershell
npx tsc --noEmit          # must exit 0
npm run build             # tsc && vite build (≈2 min; >500 kB chunk warning is known/accepted)
npm test                  # unit tests (vitest)
npm run test:e2e          # Playwright E2E (needs ports 3000 + 5001 running)
```

## Conventions & gotchas
- UI text is Arabic; keep `dir="rtl"` semantics, and format prices via `formatPrice()` from context (never hand-format `$`).
- WhatsApp numbers must be normalized to international format: strip non-digits, then replace a leading `0` with `963`.
- The PDF voucher endpoint shells out to `python generate_voucher_pdf.py` inside `server/`.
- Commit after each working change: `git add -A && git commit -m "..."`.
