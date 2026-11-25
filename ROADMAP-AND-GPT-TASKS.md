# Roadmap by credit cost, and tasks for ChatGPT

Date: 25 Nov 2026. Owner: Alexander. Anyone on the team (for example Raffaella) can continue from this file.

## How the work is split

- ChatGPT (free, daily limit): text work only. Reading repo files by raw link, research, inventories, checklists, written specs, code review of text files. It cannot show previews, cannot run the 3D scene, and has a small image limit. Never ask it for renders, visual judgements on motion, or anything that needs to be seen moving.
- Claude (credits): anything that must run or be seen. Code changes, previews, film re-render, benchmark pages, Blender or Cycles work.
- Alexander: decisions and approvals. Nothing moves past a gate without him.
- Raffaella: real-device tests and code review once files are in the repo.

## Rules that every task must keep

No dashes in site copy. No check marks, scores or rankings. No pink, purple or blue. Keep every word and link from the live site. Cyan #34FAFB only as a thin signal. Do not touch /app. No invented product UI. No merge or deploy. Keep the approved section order exactly.

## Roadmap, cheapest first

Level 0, free (ChatGPT, text only), do now and over the next days
1. Content inventory of the live site (Task 01)
2. Content to motion map (Task 02)
3. Written storyboard for the film zone, no images (Task 03)
4. Real-device test checklist for Raffaella (Task 04)
5. Accessibility and no-WebGL fallback spec (Task 05)
6. Code review of the V4.1a source for performance and risks (Task 06)
7. Decision register (Task 07)

Level 1, small Claude cost (no video)
8. Retune the intro early-shot camera, fix the dark strips behind the ribbon. Preview in the browser only.
9. Check ChatGPT's findings against the code and apply the safe ones.

Level 2, Saturday 28 Nov
10. Alexander approves profile B at 0.72, edges "both", font (Nunito or Public Sans), licence for source/.
11. Real-device benchmark numbers (#bench) from Mac and phone.
12. Re-render the 7 s film once, with every decision applied. Then the animatic review. Stop for approval.

Level 3, after approval
13. Film zone build.
14. V4.1b certificate and briefcase interactions.

Level 4, highest cost
15. Full site integration, responsive, accessibility build, final performance pass. Homepage only after all gates.

## Start of every ChatGPT chat (paste once per chat)

You are an independent text-only helper on the CHOICE iD Identity Studio project. Repo: https://github.com/CHOICE-techology/Web. Read files through raw links, for example https://raw.githubusercontent.com/CHOICE-techology/Web/main/STATUS.md. Do not design, do not invent content, do not rewrite existing copy. If you cannot open a link or a file, say so and stop, do not guess. Mark every statement as VERIFIED (you read it) or UNVERIFIED. Output plain Markdown, ready to save as a file.

## Task 01: Content inventory (most valuable)

Research only. Read docs/HANDOVER-23NOV-CINEMATIC-SITE.md and docs/BRAND-CONFIRMATIONS-AND-AMENDMENTS-23NOV.md. Then try to open https://choice-id.work. If you cannot, ask Alexander to paste the page text, and work from that.
Inventory every section in the approved order (do not merge, rename, reorder or remove): Hero, Tap a dot, Sound familiar, 00 The short version, 01 How it works, 02 No score, 03 One link two sides, 03B What you get, 03C Your controls, 04 What counts as proof, 05 Watch, 06 Team, 06B Why we build it, 07 Meet Taila, 08 Ask a question, 09 Questions, closing, footer.
For each item give a table row: section, exact title, exact text, image or video asset, link and destination URL, statistic and its source, CTA, verification status (VERIFIED or UNVERIFIED), and what is missing.
Compare with the 23 Nov snapshot and list anything changed, missing or inaccessible. Include any blog pages you can find. List everything that needs Alexander's input. Output file: docs/CONTENT-INVENTORY-DRAFT.md. Stop after this.

## Task 02: Content to motion map

Use the inventory. For each section, say which of the four motion principles (TRACE, CONNECT, REVEAL, RELEASE) could introduce it, and which sections must stay plain reading with no motion. Rule from the brand book: if the animation can be removed without losing meaning, simplify it. Do not add sections or content. Output: docs/CONTENT-TO-MOTION-MAP.md.

## Task 03: Written storyboard for the film zone (Hero to How it works)

Text only. Six stages as a table: stage, section shown, what the camera does, which 3D objects appear (ribbon, monolith, profile, rings, tiles), what text appears, duration in seconds, what a reduced-motion visitor sees instead. Use only objects that exist in MODELS.md. No new objects, no new UI. Output: docs/STORYBOARD-DRAFT.md.

## Task 04: Real-device test checklist for Raffaella

Write a step by step checklist to open the prototype with #bench on a Mac and a phone, record fps, load time and any glitch, and to test reduced motion with the real operating system setting (macOS: Reduce motion; iOS: Reduce Motion). Include a results table to fill in and the exact devices and browsers to note. Output: docs/DEVICE-TEST-CHECKLIST.md.

## Task 05: Accessibility and fallback spec

Based on STATUS.md and the V4.1a report, write what the site must do for keyboard users (2 px black focus outline per the brand book), screen readers, reduced motion, no WebGL, and slow phones. Plain bullet list, each item testable. Output: docs/ACCESSIBILITY-SPEC-DRAFT.md.

## Task 06: Code review of the V4.1a source

Read the files under source/ by raw link. List risks only: performance (draw calls, extra render pass, texture sizes), memory leaks, missing disposal, resize handling, pause and wake logic, shader risks. For each risk give the file and line, how serious it is, and a suggested fix as text. Do not rewrite files. Claude will verify each point before anything changes. Output: docs/CODE-REVIEW-GPT.md.

## Task 07: Decision register

One table: decision, status (confirmed, open, blocked), who decides, what it blocks. Include: profile material, edge treatment, font (Nunito per brand book, Public Sans on live site), licence for source/, the "Ask a question" box code, Blender source files missing from the repo, new Cycles renders, V4.1b, homepage integration. Output: docs/DECISION-REGISTER.md.

## How to use the free daily limit

One task per day, in the order above. Save each answer as the named file in ~/Desktop/Web/docs, commit and push. Send the answer to Claude to verify. Claude only checks and applies, which is cheap.

## Always verify

ChatGPT output is a draft. Anything it says about the code, the live site or the visuals is checked by Claude or Raffaella before anyone acts on it.
