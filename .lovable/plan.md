## Scope

Add learning + quiz functionality on top of the current home page without changing existing design, colors, or layout. v1 stays frontend-only (no auth, no Cloud writes) — question bank and category content live in `src/data/*`. Bilingual EN/ML throughout, matching the existing `lang` toggle pattern.

## New Routes

```
src/routes/
  category.$slug.tsx        → detailed learning page per category
  quiz.index.tsx            → test-set picker (Sets 1–10, shows completed badges)
  quiz.$setId.tsx           → 25-question runner (one at a time, 20s timer)
  quiz.$setId.result.tsx    → score + review + "Next Set" CTA
  signs.tsx                 → traffic signs gallery (SVG, official colors)
```

Home page (`src/routes/index.tsx`) keeps its current design. Category cards become `<Link to="/category/$slug">`. Add a small "Take a Test" link in the existing header — no layout changes.

## Category Detail Page

Single template reads from an expanded `CATEGORIES` entry. Sections (all bilingual):

- Overview / detailed explanation
- Examples
- Important notes
- Exam tips
- Related signs (filtered from `signs.ts` by category tag)
- "Practice Questions" CTA → `/quiz`

Content is hand-authored in `src/data/categories.ts` (extend the existing `content` field with `examples`, `notes`, `examTips`, `relatedSignSlugs`). No AI calls in v1 — "AI-generated study materials" is just well-structured static content; we can wire Lovable AI later if the user wants live generation.

## Quiz System

- Expand `src/data/questions.ts` to **250 questions** (10 sets × 25), each tagged `setId: 1..10`, with `question/options/correctIndex/explanation` in EN+ML and optional `signSlug` to show the sign above the question.
- `quiz.$setId.tsx`:
  - Loads the 25 questions for that set
  - One question per screen, 4 options, 20s countdown (auto-submits on timeout as wrong)
  - Selected option: green if correct, red if wrong; correct answer always highlighted green after submit
  - Explanation panel appears immediately after answer
  - "Next" advances; tracks score in component state
- `quiz.$setId.result.tsx`: score, per-question review, "Next Set" button → `/quiz/{n+1}`
- Completed sets tracked in `localStorage` (`rto_completed_sets`) — shown as ✓ on the picker

## Traffic Signs

`src/data/signs.ts` extended with inline SVG strings using official colors (red circle for mandatory/prohibitory, yellow triangle for warning, blue rectangle for informational, white/black detail). Rendered both in `/signs` gallery and inline above sign-related quiz questions. No color tinting from the theme — SVGs use hardcoded official hex values.

## Out of scope for v1

- Live AI content generation (static structured content instead)
- Auth, user profiles, server-side progress sync
- 3D/photoreal sign assets (using clean SVGs in official colors — sharp at any DPR)

If you want any of those, say which and I'll add a follow-up.

## Technical notes

- All new routes use `createFileRoute` with `head()` metadata.
- Bilingual via the same `lang` prop pattern as `index.tsx`; lift `lang` into `localStorage` so it persists across routes.
- No edits to `src/styles.css` tokens, `__root.tsx` shell, or existing components.
