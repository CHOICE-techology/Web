# Content to motion map (Task 02)

Date: 26 Nov 2026. Author: Claude, from docs/CONTENT-INVENTORY-DRAFT.md (Task 01, ChatGPT, checked by Claude) and docs/WHOLE-SITE-EXPERIENCE-ARCHITECTURE-DRAFT.md. Text only. No code, no renders, no model changes, nothing in /app. NOTHING HERE IS APPROVED. Every DECISION needs Alexander.

## 1. Rules applied
- Principles (brand book): TRACE (evidence appears), CONNECT (pieces join), REVEAL (text and camera introduce information), RELEASE (settle, read, choose).
- Removal test (brand book): if the motion can be removed without losing meaning, simplify it. A section that fails the test gets "quiet" (a held pose, no move), not a new animation.
- Section order is the approved one. No section added, merged, renamed or removed. Live copy untouched: where the live page and the rules conflict, the conflict is listed in section 4 and not fixed.
- Objects: only those in MODELS.md (ribbon, monolith with profile, orbit rings, five tiles). The six cards in 03b and in 04 do not map one to one to five tiles; "Never" is never matched to a tile.
- Every motion row has a reduced-motion version: the final pose, no camera travel.

## 2. The map
Verdict key: KEEP = motion carries meaning. SIMPLIFY = a smaller move or a held pose is enough. NONE = plain reading, scene quiet.

| # | Section (live heading; nav label) | Layer | Principle | Why it carries meaning (or does not) | Verdict | Reduced motion | Copy status for this section |
|---|---|---|---|---|---|---|---|
| 1 | Hero: "Work with love, or income? Why not both?" | A, B | REVEAL | Pieces assembling into one object says "one identity". This is the 7 s film. | KEEP | Final pose, no intro | Verified |
| 1a | "Tap a dot": PROOF, YOU, WORK (inside the hero, not a section) | B | REVEAL | A tap highlights one part of the object and shows its sentence. Meaning is in the sentence, the highlight only points. | SIMPLIFY (highlight only, no camera travel) | Sentence shows on tap, no highlight animation | PROOF verified. YOU and WORK text NOT captured (needs choice-id-preview-source.zip) |
| 2 | "You sent the application. Nobody answered." (nav: Sound familiar?) | B | TRACE | Copy says "Your skills are scattered". Pieces drifting apart shows that. Statistic and source stay as HTML. | KEEP, subtle | Static scattered pose | Verified |
| 3 | 00 The short version (nav: In short) | B | CONNECT | Copy says "one place". Pieces returning to the monolith shows that. | KEEP, short | Static joined pose | Verified |
| 4 | 01 How it works: ADD, DISCOVER, FIND, APPLY, SHARE | B | CONNECT, then REVEAL | A sequence of five steps is order, so a pose per step carries meaning. | KEEP | Five stacked cards, step by tap, no camera move | Labels verified. Only ADD text verified. DISCOVER, FIND, APPLY, SHARE text MISSING (needs the zip or DOM) |
| 5 | 02 Our promise, "NO SCORE." (nav: No score) | B end | RELEASE | Calm, level, nothing ranked above anything else. The held pose is the statement. | KEEP, held pose only | Same pose | Verified, with the symbol conflict in section 4 |
| 6 | 03 One link, two sides (nav: For you & for hiring) | C | CONNECT | Toggle "I'm looking for work" / "I am hiring" swaps text. Highlighting a side of the ribbon adds little. | SIMPLIFY (toggle works with no 3D, optional gentle highlight) | Toggle only | Toggle labels verified. Second state NOT captured |
| 7 | 03b What you get (six cards) | C | REVEAL | Six cards, five tiles: tiles arriving one by one would suggest a mapping that does not exist. | SIMPLIFY (one "forward" pose on entry, no per-card sync) | Cards read normally | Verified |
| 8 | 03c Worried about your data? (three cards) | C | TRACE | "Glass case as focus" is weak. The three promises are plain statements. | NONE or a held "case" pose | Static | Verified |
| 9 | 04 What counts as proof (six cards, sixth is "Never") | C | REVEAL | Folder opening fits "accounts and documents". Certificate and briefcase interactions are V4.1b, blocked. | HOLD until V4.1b gate. Default NONE | Panel as a normal section | Verified |
| 10 | 05 Watch (loads from YouTube on tap) | C | RELEASE | Nothing may compete with the video or its click-to-load promise. | NONE | Unchanged | Verified |
| 11 | 06 Team (six people) | C | RELEASE | People, not objects. | NONE | Static | Verified |
| 12 | 06b Why we build it | C | CONNECT | One still, connected pose is enough. | NONE (held pose) | Static | Verified. Taila image section ownership unverified |
| 13 | 07 Meet Taila | C | RELEASE | Taila's image is the focus. Copy says she is an AI; keep the scene out of that statement. | NONE | Static | Verified |
| 14 | 08 Ask a question | C | RELEASE | Live form must work exactly as today. | NONE | Static | Heading only. Form code NOT provided |
| 15 | 09 Questions (11 FAQs) | C | RELEASE | Dense text, accordions. Scene never behind text. | NONE | Static | Verified |
| 16 | Closing: "Your story belongs to you. Nobody should be quietly ranked." | C | CONNECT | One reconnect move that echoes the hero. Buttons unchanged. | KEEP, short (or held pose) | Static | Verified. Email address not captured |
| 17 | Footer | C | RELEASE | Settled. | NONE | Static | Verified |

Count: 5 rows KEEP (hero, scattered, short version, how it works, closing), 4 SIMPLIFY (dot highlight, toggle, 03b, and 02 as held pose), 1 HOLD (04), 8 NONE. Plain reading with no scene change at all: 05 Watch, 06 Team, 07 Taila, 08 Ask, 09 Questions, footer.

## 3. What this means for the film
- Only rows 1 to 5 can be the film zone. The 22 Nov brief ends the film at "No score" (six stages); the 23 Nov handover ends it at "How it works". This map follows the brief (rows 1 to 5). DECISION 2 stays with Alexander.
- Rows 6 to 17 need no new moves. Quiet held poses from the same object set are enough, so the reading zone adds no render cost.
- Nothing here changes Saturday's single 7 s render: that render is row 1 only.

## 4. Open items, with status after the 26 Nov check
1. X link mismatch. RESOLVED by verification: the live page header and footer both link to https://x.com/CHOICE_ID_WORK (WebFetch of choice-id.work, 26 Nov, a third reading; two earlier Claude fetches agree). ChatGPT's inventory says https://x.com/CHOICE_ID; that is wrong. Telegram t.me/CHOICE_ID_WORK and LinkedIn company/choice-id are unchanged. Still worth one look in the live DOM before the link is copied into the build.
2. Hidden step text (DISCOVER, FIND, APPLY, SHARE), YOU and WORK dot text, and the second toggle state. BLOCKED: they need choice-id-preview-source.zip (src/content.ts) or a DOM inspection. The zip is not in the repo, not in the Project and not found on the connected folder. Alexander to upload it. Nothing is invented meanwhile.
3. Check marks and cross marks in "02 Our promise". Confirmed again on 26 Nov: four "×" lines and four "✓" lines. The rule forbids check marks. Motion must not animate them. DECISION for Alexander: keep the words and replace the symbols (for example plain "Never" and "Always" labels or a neutral mark) or approve an exception. Not changed.
4. Raffaella's device test (docs/DEVICE-TEST-CHECKLIST.md). WAITING for results from a Mac and a phone, plus reduced motion on a real device. Nothing here depends on it except whether `#cam-r` and `#strips-late` become defaults.
5. Hero YOU and WORK dots depend on item 2.

## 5. Decisions needed from Alexander
1. DECISION 1: quiet 3D state changes in the reading zone, yes or no. This map assumes yes, only as held poses.
2. DECISION 2: film zone staged or scrubbed, and where it ends (after "No score" or after "How it works").
3. DECISION 3: tile meaning and what the folder opens.
4. How to handle the symbols in 02 (item 3).
5. Upload the zip (item 2).

## 6. Next
Task 03 (written film-zone storyboard) uses rows 1 to 5 only. Task 05 (accessibility and fallback spec) uses the reduced-motion column.
