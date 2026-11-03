# Plano: Date & Hangout Planner

## What this is
A web app for planning romantic dates and friend hangouts. Users search a live map, add spots to a plan, organize them into a timed itinerary, add notes (theme, dress code, budget), and share the plan with a link. A built-in chat agent can plan or edit the date for them.

## Tech stack (keep it free to run)
- React + TypeScript + Vite + Tailwind
- Map: Leaflet + react-leaflet with OpenStreetMap tiles (no Google Maps, no billing)
- Place search: Nominatim / Overpass API (free, respect their usage policy, debounce requests)
- Drag and drop: dnd-kit
- Database, auth, share links: Supabase (free tier)
- Hosting: Vercel (free tier), API routes as Vercel serverless functions in /api
- AI: Anthropic API, Claude Haiku model, called ONLY from /api (server side)

## Core features (build in this order)
1. Map + search: search places near a location, show results as pins and a list, "Add to plan" button.
2. Itinerary: list of stops with time, drag to reorder, remove, per-stop notes. Route line between stops on the map.
3. Plan details: title, date, plan type (date or hangout), theme, dress code, budget (PHP), general notes.
4. Save + share: save plans to Supabase, public read-only share link /p/:id that works without an account.
5. Chat agent: side panel chat. Claude uses tools to control the app:
   - search_places(query, near)
   - add_stop(place, time, note)
   - update_stop(stop_id, fields)
   - remove_stop(stop_id)
   - reorder_stops(order)
   - set_plan_details(theme, dress_code, budget, notes)
   The itinerary and map update live as the agent works.
6. Friend mode: RSVP and voting on stops via the share link.

## AI cost rules (hard cap is $100 of free credit, never exceed it)
- API key lives only in the ANTHROPIC_API_KEY environment variable. Never in frontend code, never committed.
- Use a Haiku model. Use prompt caching for the system prompt and tool definitions.
- Max 10 messages per chat, max 3 chats per user per day (track in Supabase).
- Global kill switch: env var AI_ENABLED=false disables the chat and shows a friendly message.
- The app must work fully with AI off.

## Style
- Mobile first, clean and warm design, works great on a phone.
- Default location: Metro Manila. Currency: PHP.
- Simple, readable code. No em dashes in UI copy.
