# Handover, 22 Nov 2026 (updated 16:30): choice-id.work "The Identity Journey" rebuild

Alexander asked to move to a new chat (the old one got too heavy). This file is where to start.

## Where the code is (read first)
Repo `CHOICE-techology/SANDBOX`, branch `site/identity-journey-wip`. Latest commit `8e50024` ("Identity Journey world builds"), made on the Mac in the worktree `~/SANDBOX/identity-wip`. **Not pushed yet**: Alexander pushes it from Terminal (`cd ~/SANDBOX/identity-wip && git push`). `~/SANDBOX` itself stays on `main` with Alexander's own uncommitted edits (`src/data/jobsData.ts`, `src/types.ts`); do not touch them. Never start from scratch.

## Status in one line
The world builds and runs: `npm run verify` passes (typecheck, 23 tests, build). Preview artifact republished (slug `0541d91c-cbb7-467a-933d-8cf62510d475`, version `1795357823-1fef`). Waiting for Alexander's approval. Draft PR #279 unchanged. No merge, no deploy.

## Rules that still hold
- Public marketing site only (`choice-id-work/`). Do not touch /app, root package.json, lockfile, src/, api/, worker/.
- Every word, link and CTA stays as it is; the logo and fonts stay; no dashes; cyan #34FAFB only as a signal; no pink, purple or blue.
- No check marks or "verified" visuals; no scores or rankings.
- Three.js r186 only (no GSAP, React, R3F or Lenis). DPR cap: 1.5 desktop, 1.25 mobile.
- Scope until Alexander approves: hero, first scroll, "Sound familiar?", "In short".
- Do not merge PR #279. Do not deploy.

## The brief (short)
- A light silver-grey studio (#F4F5F6 to #E7E9EB) with a reflective floor.
- One monumental glass ID monolith (60 to 70% of the hero visual), with a soft abstract human presence inside and an engraved ID-card mark.
- Five evidence pieces: coin (Accounts), curled sheet (Your CV), scroll (Diplomas & certificates), chip (Digital certificates), plaque (Courses & community).
- Thin cyan connection lines: dim in the hero, broken in "Sound familiar?", whole and bright in "In short".
- Camera: arrives wide and settles close, pushes in on the first scroll, pulls back for the scatter, comes in close for the convergence, and reverses on scroll up.
- Interaction: hover brings a piece forward; click docks it, with a cyan line, a light impulse and the proof sentence; drag turns the core with weight; PROOF, YOU and WORK are three states of the same world.
- Reference image: the glass ID monolith with a person inside (`generated-image_1.jpg` in the old chat).

## Done
Earlier (commit `75e5a0d`, `tools/identity-scene/src/`): config, quality (DPR 1.5), icons, materials, core (new), evidence, layout, chapters, stage, connections (new); profile deleted.

Commit `8e50024`:
- `world.ts` rewritten: `createCore` + `presenceTexture`, `heroPose`, FLOOR_Y -2.0, cyan lines every frame (socket to core outline; strength from connect, docking, hover and the dock impulse; reach from the story; hidden while pieces fly in), camera arrival wide to close over 2.4 s, fixed portal arc (facing 0), trio (PROOF forward, YOU faces the core, WORK raises portals), traces end at `core.signal` after the camera settles.
- `layout.ts`: hero pieces pulled in so none crosses the hero text at 1280 and 1440.
- `chapters.ts`: "In short" camera further back (no cropped core). `chapters.test.ts`: snap test uses 0.7 (new key spacing). No `profileTurn` or `ribbonTight` left.
- New poster `media/identity-core-poster.webp` from the settled hero; `index.html` poster `?v=2` (only that query string changed).

## QA
Software GL in Chrome with a fake GPU name. Shots at 1440×900, 1280×800, 390×844, 360×800, plus reduced motion and no-WebGL. No console errors and no failed requests at any size. Frame timing in software GL is not meaningful; check on a real Mac.

## Open questions for Alexander
1. Mobile: the opaque white hero card covers the core at 390 and 360; only pieces at the edges show. Needs a layout decision (core above the card, see-through card, or poster only on phones).
2. "In short": clear-glass pieces are hard to see against the light studio; some docked pieces nearly vanish. Option: stronger silver rims on the gloss pieces.
3. Hero: the curled sheet now overlaps the core's left edge instead of the text. OK?

## Next
Push `8e50024`, get Alexander's verdict on the preview and the three questions, then continue.
