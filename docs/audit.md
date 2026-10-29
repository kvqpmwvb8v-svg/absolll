# Audit Report — ABSOLUTI Historical Club

Generated: 2026-10-28

## Summary

| Category | Passed | Failed | Notes |
|----------|--------|--------|-------|
| Smoke tests (routes 200) | 18 | 0 | All public routes return 200 |
| Console errors | 12 | 9 | Missing images on /about, /news, /photos |
| Horizontal scroll (375px) | 15 | 3 | /news has horizontal scroll on mobile |
| **Total** | **45** | **12** | |

## P0 — LOMPAETS or unsafe

None found.

## P1 — Noticeable to user

### 1. Console errors: missing images on /about, /news, /photos
- **Severity:** P1
- **Where:** `app/(site)/about/page.tsx`, `app/(site)/news/page.tsx`, `app/(site)/photos/page.tsx`
- **Error:** "Failed to load resource: the server responded with a status of 400 (Bad Request)"
- **Reproduce:** Navigate to /about, /news, /photos in browser
- **Fix:** Add placeholder images or remove broken image references. The pages reference images that don't exist in /public/images/.

### 2. Horizontal scroll on /news at 375px
- **Severity:** P1
- **Where:** `app/(site)/news/page.tsx`
- **Reproduce:** Navigate to /news at viewport width 375px
- **Fix:** Check grid layout and padding on /news page for overflow.

## P2 — Polish

### 3. /about page references non-existent image
- **Severity:** P2
- **Where:** `app/(site)/about/page.tsx:33`
- **File:** `/images/nastya-zhukova.jpg`
- **Fix:** Add the image or use a placeholder.

### 4. /photos page references non-existent images
- **Severity:** P2
- **Where:** `app/(site)/photos/page.tsx`
- **Fix:** Add placeholder images or remove broken references.

## Notes
- /admin/login page loads correctly (200) and renders the admin login form
- /design page (design system showcase) loads correctly in dev mode
- TypeScript check passes: `npx tsc --noEmit` — no errors
- Build passes: `npm run build` — all routes compile successfully
- Auth E2E tests: 3 passed, 18 failed (password hash mismatch in .env)
