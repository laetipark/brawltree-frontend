---
apply: always
---

# Frontend Development Guide

## Stack and Layout
- Stack: React 18, TypeScript, Vite, SCSS.
- Primary source root: `frontend/src`.
- Preferred folders: `components`, `pages`, `services`, `hooks`, `utils`, `context`.

## API Layer
- Route API calls through modules in `src/services`.
- Avoid direct axios calls in page-level components when a service exists.
- Keep response shaping consistent in service functions.

## CDN/Data Caching Rules
- Do not add unconditional cache-buster query params (for example `time=Date.now()`) to every CDN request.
- Prefer language/resource keyed cache with bounded TTL.
- For static locale/content JSON, use memory + session cache first, then network fallback.
- Keep cache failures non-fatal (storage unavailable, quota exceeded).
- Keep react-query defaults tuned for read-heavy pages (`staleTime`, `cacheTime`, `keepPreviousData`).

## Component Conventions
- Keep components focused and split large screens by feature sections.
- Keep side effects in `useEffect`/hooks, not inline in render branches.
- Reuse common components before adding new one-off UI blocks.

## Styling
- Continue using existing SCSS/CSS convention in the module.
- Preserve responsive behavior for desktop/mobile routes.

## Validation
- Dev server: `npm run dev`
- Build: `npm run build`
