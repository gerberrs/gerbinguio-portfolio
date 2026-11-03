# Plano

Date and hangout planner for Metro Manila. See `CLAUDE.md` for the full spec.

Built so far: **1. Map + search** and **2. Itinerary**.

## Run

```bash
cd plano
yarn install
yarn dev        # http://localhost:5173
yarn build      # type-check + production build
yarn lint
```

Node 22 (`.nvmrc`). Copy `.env.example` to `.env.local` if you want to change defaults; nothing is required.

## How it fits together

- `src/lib/places.ts` searches Nominatim inside the visible map area, widens to Metro Manila if nothing is found, and caches results. Requests are debounced (600 ms) and throttled to 1 per second per the Nominatim usage policy. If Nominatim fails, or `VITE_USE_MOCK_PLACES=true`, it uses the sample places in `src/data/mockPlaces.ts`.
- `src/state/planReducer.ts` holds every plan change as an action (`add_stop`, `update_stop`, `remove_stop`, `reorder_stops`, ...). These match the planned chat agent tools, so the agent can dispatch the same actions later.
- `src/lib/storage.ts` saves the draft plan to localStorage. This is a stand-in for Supabase (feature 4).
- `src/components/MapView.tsx` uses react-leaflet with OSM tiles: emoji pins for results, numbered pins for stops, and a dashed route line in stop order.
- `src/components/Itinerary.tsx` uses dnd-kit: mouse, touch (short press on the handle) and keyboard (Space, arrows, Space) reordering.

## Deploy (Vercel)

Set the project's Root Directory to `plano`. `vercel.json` sends every path except `/api/*` to the SPA.
