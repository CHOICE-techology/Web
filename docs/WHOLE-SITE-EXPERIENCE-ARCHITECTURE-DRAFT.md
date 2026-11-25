# Whole-site experience architecture (DRAFT for approval)

Date: 25 Nov 2026. Author: Claude, from ChatGPT's proposal of the same day plus the approved documents. Text only. No code, no renders, no model changes, nothing in /app. NOTHING IN THIS FILE IS APPROVED. Every item marked DECISION needs Alexander.

## 1. Purpose
Answer one question before anyone builds the full site: how does the existing 3D world (monolith with profile, glass ribbon, rings, five tiles) carry the whole CHOICE iD story, while every existing word, link and form keeps working as real HTML. This replaces the loose idea of "a 3D hero followed by an ordinary site".

## 2. What was checked
- docs/BRIEF-CINEMATIC-3D-FOR-OPUS.md (22 Nov decisions, six film stages, rules).
- docs/HANDOVER-23NOV-CINEMATIC-SITE.md and docs/BRAND-CONFIRMATIONS-AND-AMENDMENTS-23NOV.md.
- source/prototype/index.html (25 Nov): one full-screen canvas, one folder button, one HTML panel (ADD), Skip and Replay. Nothing else of the site exists in the prototype.
- Live site https://choice-id.work, fetched 25 Nov (headings, counts, navigation, footer). Exact copy was NOT captured; Task 01 (content inventory) still owns that.
- ChatGPT's proposal (experience map, four interaction types).

## 3. Principles (all from approved documents unless marked)
1. One continuous scene. The same objects appear throughout; camera and object states change, not the object set.
2. Information is real HTML (searchable, readable by screen readers, selectable). Never text painted onto 3D or baked into video.
3. Motion must explain, not decorate. Brand rule: if the animation can be removed without losing meaning, simplify it. Motion principles: TRACE (evidence appears), CONNECT (pieces join), REVEAL (text and camera introduce information), RELEASE (settle, read, choose).
4. Reading is never blocked. On long reading sections the page scrolls natively.
5. Hard rules: every word, link and CTA stays; no dashes in copy; no check marks, scores or rankings; no pink, purple or blue; cyan #34FAFB only as a thin signal; no invented product UI; /app untouched.

## 4. Three time layers (this is the part ChatGPT's map blurs)
| Layer | What it is | Source | Scroll behaviour |
|---|---|---|---|
| A. Intro | 7 s load-time film built from the live scene (horizon, ribbon grows, tiles arrive, monolith revealed, traces meet, final arc). Skippable, replayable. | V4 and V4.1a prototype | Plays by itself; skipped by the Skip button, the wheel after 0.6 s, or the keys Enter, Space, Escape, Arrow Down and Page Down (not by an arbitrary click) |
| B. Film zone | Staged story, Hero to No score, six stages. | Brief 22 Nov section 5 | Takes over scrolling (approved), one gesture runs one stage |
| C. Reading zone | The rest of the page. | Brief 22 Nov: "Do not take over scrolling on long reading sections" | Native scroll; the scene stays present and changes state quietly |
DECISION 1: ChatGPT proposes 3D state changes through every section (layer C). That extends the approved plan, which said the rest of the page scrolls normally. Recommended reading: allowed as quiet, non-blocking state changes (the canvas is a fixed layer; the camera eases to a named pose when a section enters view), with no pinning and no scroll takeover. Alexander to confirm.
DECISION 2: the 22 Nov brief says staged moves (one gesture, one complete eased camera move, input locked during the move). The 23 Nov handover says "pinned and scrubbed (GSAP + ScrollTrigger)". These are different feels. Which one is the film zone?

## 5. Section map (live headings as fetched 25 Nov; approved order unchanged)
Object names are the ones in MODELS.md: ribbon, monolith (glass case, plinth, profile bust, cyan seam), orbit rings, bead, floor halo, tiles (graduation cap, briefcase, certificate, folder, globe). No new objects.

| # | Live section (heading) | Layer | 3D state (proposal) | Motion principle | Interaction | Mobile and reduced motion |
|---|---|---|---|---|---|---|
| 1 | Hero, with the "Tap a dot" PROOF / YOU / WORK element | B | Wide arrival settles on the united object (the 7 s intro ends here) | REVEAL | Orbit controls after the intro; tap a dot highlights a part | Own camera, no long pin; no intro, final pose |
| 2 | "You sent the application. Nobody answered." (nav: Sound familiar?) | B | Ribbon and tiles drift apart at different depths; cyan lines thin | TRACE (broken evidence) | none | Short cross-fade |
| 3 | 00 The short version (nav: In short) | B | Pieces fly home to the monolith; lines draw whole | CONNECT | none | Cross-fade |
| 4 | 01 How it works: ADD, DISCOVER, FIND, APPLY, SHARE | B | Five short holds along the ribbon; one pose per step | CONNECT then REVEAL | Folder opens the ADD card (exists today) | Five stacked cards, camera steps by tap |
| 5 | 02 Our promise (NO SCORE banner) | B end | Calm, level, symmetrical; no object ranked above another | RELEASE | none | Static final pose |
| 6 | 03 One link, two sides (toggle: I'm looking for work / I am hiring) | C | Ribbon spans two sides; toggle swaps the highlighted side, not the content | CONNECT | The existing toggle | Toggle works without 3D |
| 7 | 03b What you get (six cards) | C | Tiles come forward one by one | REVEAL | Hover or tap a tile (see DECISION 3) | Cards read normally |
| 8 | 03c Worried about your data? (three cards) | C | Glass case becomes the focus; the tiles stay put | TRACE | none | Static |
| 9 | 04 What counts as proof (six cards, the sixth is "Never") | C | Folder approaches and opens; certificate and briefcase are V4.1b | REVEAL | Folder panel (exists for ADD only) | Panel as a normal section |
| 10 | 05 Watch (embedded video, loads on tap) | C | Scene recedes and is quiet | RELEASE | Video unchanged | Video unchanged |
| 11 | 06 The people building it (six people) | C | Quiet, still composition | RELEASE | none | Static |
| 12 | 06b Why we build it (image of Taila) | C | Ribbon and monolith in a still, connected pose | CONNECT | none | Static |
| 13 | 07 Meet Taila | C | Scene quiet; Taila's own media is the focus | RELEASE | none | Static |
| 14 | 08 Ask a question | C | Scene quiet and out of the way | RELEASE | The live question box must work exactly as today | Static |
| 15 | 09 Questions (eleven FAQs) | C | Scene present but never behind dense text | RELEASE | Accordions unchanged | Static |
| 16 | Closing: "Your story belongs to you. Nobody should be quietly ranked." (two buttons, email link) | C | Ribbon reconnects to the whole object | CONNECT | Buttons unchanged | Static |
| 17 | "CHOICE Foundation builds CHOICE iD." and footer links | C | Settled | RELEASE | Links unchanged | Static |

Rules for the map:
- Poses are named states ("hero", "scatter", "home", "step1" to "step5", "calm", "link", "forward", "case", "folder", "quiet", "settled"). Each named state has a desktop camera and a separate mobile camera.
- Never repeat the same animation behind different text. A section with no narrative purpose gets "quiet", not a new move.
- A "Never" card (the sixth proof card) must not be matched to a tile. Six cards in 03b and in 04 do not map one to one to five tiles. Do not force it.

DECISION 3: tile meaning. Proposed, not decided: cap = diplomas and courses, briefcase = work and CV, certificate = certificates, folder = accounts and documents, globe = language and reach. The prototype's folder currently opens the ADD card ("Add what you already have"), not a proof card. Which text should the folder open, and which tile belongs to which card?

## 6. Interaction system (ChatGPT's A to D, with status)
| Type | What it is | Exists today | Missing | Gate |
|---|---|---|---|---|
| A Explore | Rotate, zoom, return to default | Orbit controls with distance and angle limits | A visible "reset view" control; keyboard alternative | Film zone |
| B Objects become information | Object comes forward and opens a real HTML panel | Folder opens the ADD panel | Same for certificate and briefcase | V4.1b (blocked) |
| C Scroll moves the story | Camera and states follow the page | Not built | Scene director with named states | Film zone, then full site |
| D Play with elements | Hover, select or tap; object comes forward, shows info, returns | Hover ring and lift on the folder only | Other tiles | V4.1b (blocked) |
Every pointer interaction needs a keyboard and touch equivalent, a visible focus (2 px black outline per the brand book) and a readable HTML alternative.

## 7. Architecture
- One fixed canvas behind the HTML. HTML sections stay normal DOM. The canvas must not capture pointer events outside the folder and tiles, so links, the question box, the toggle, the video and accordions keep working.
- A scene director holds named states and moves the camera and objects between them. Desktop and mobile each have their own camera for every state.
- Film zone only: pinned section, staged moves (DECISION 2). Reading zone: states change when a section enters view, eased, never blocking.
- Performance and loading: every figure here is a target, not a measurement. The 23 Nov decision lists 1.8 MB as a target still to be verified, and what it covers (whole scene or desktop budget) is not defined; the V4.1a GLB alone is about 306 KB brotli; pause rendering when idle, off screen or the tab is hidden (exists); phone profile with lower pixel ratio, no reflector, behind-case pass off (exists as defaults); real-device numbers are still missing (see DEVICE-TEST-CHECKLIST.md).
- Accessibility: reduced motion means no camera travel and no intro, final poses only; "Skip the film" link; no WebGL means the full page with a poster image; canvas has a text description; focus order follows the DOM.
- SEO: all content in HTML. The scene adds no text of its own.

## 8. Discrepancies found while checking (record, do not silently fix)
1. "Tap a dot" is part of the hero on the live site, not a separate section as the 23 Nov handover lists it.
2. Section headings and navigation labels differ on the live site: nav says "Sound familiar?", "In short", "No score", "For you & for hiring"; headings say "You sent the application. Nobody answered.", "00 The short version", "02 Our promise", "03 One link, two sides".
3. The 22 Nov brief and the 23 Nov handover disagree on staged moves versus scrubbing (DECISION 2).
4. The film-zone end differs: the brief ends the film at "No score" (six stages); the 23 Nov handover says film zone = Hero to How it works.
5. The prototype folder opens the ADD card, while ChatGPT's map assigns the folder to "What counts as proof".
6. The live "Ask a question" section shows only a heading in the fetched page text, so the question box code is still needed from Alexander.
7. The live site has a time-sensitive CTA ("Opening November", two links to choice.love). Wording will need an update after November; add to the decision register.
8. Brand book says Nunito for body, live site uses Public Sans (open since 23 Nov). The prototype page already loads Poppins and Nunito, so it follows the brand book, not the live site.
9. The prototype blocks page scrolling completely (html and body are overflow hidden) and the canvas has touch-action none. On a phone this stops a vertical swipe over the canvas from scrolling the page. The approved plan asks for native vertical scrolling on mobile, so the canvas will need touch-action pan-y (or a split between scrolling and rotating) before any scroll story is built. Not a V4.1a defect, but a blocker for the full site.
10. The prototype panel uses a 6 px backdrop blur. The 23 Nov brief says no excess blur. Small, but it should be confirmed with Alexander or removed.
11. The only HTML content in the prototype is one panel (ADD), Skip intro, Replay intro and an fps readout (hidden with the clean flag). The folder button is invisible until keyboard focus and is named "Open the folder: How it works, Add" for screen readers.
12. The live section "02 Our promise" shows four check marks and four cross marks in its two lists (per docs/CONTENT-INVENTORY-DRAFT.md). The hard rule forbids check marks. Keep the words; Alexander decides how the symbols are handled. Do not change them silently.
13. Not independently verified, and absent from two separate fetches of the live page text on 25 Nov: the detail text for DISCOVER, FIND, APPLY and SHARE; the YOU and WORK dot states; the "I am hiring" state of the toggle. They need the original choice-id-preview-source.zip (src/content.ts) or a DOM inspection. The Taila image's exact section (end of 06b or start of 07) also needs DOM verification.
14. The X link differs between fetches: one reading gives https://x.com/CHOICE_ID, two others give https://x.com/CHOICE_ID_WORK. Telegram (t.me/CHOICE_ID_WORK) and LinkedIn (company/choice-id) agree. Check the live DOM before any link is copied.

## 9. Open decisions for Alexander (summary)
1. Persistent quiet 3D state changes in the reading zone: yes or no (DECISION 1).
2. Film zone feel: staged or scrubbed, and where it ends (DECISION 2 and discrepancy 4).
3. Tile meaning and what the folder opens (DECISION 3).
4. Font: Nunito or Public Sans.
5. "Ask a question" box code.
6. Launch CTA wording after November.
7. Licence for source/ and credit line for the head scan (CC BY 3.0).
8. Check marks and cross marks in "02 Our promise" (discrepancy 12).
9. Upload the original choice-id-preview-source.zip (or src/content.ts) so the missing content can be recovered without guessing (discrepancy 13).

## 10. Order of work and cost (nothing starts without approval)
1. Free (ChatGPT, text): Task 01 content inventory with exact copy, then Task 02 motion map from this file, Task 03 written storyboard, decision register.
2. Low (Claude, text and stills): review those outputs, update this file, device results review.
3. Saturday 28 Nov: V4.1a verdicts, one 7 s film render, animatic approval.
4. After approval: scene director with named states (code, no new models), film zone, then V4.1b interactions, then the reading zone, then QA on real devices.
5. Last: full site integration. Each step is its own gate.

## 11. What this file does not do
It does not change the approved section order, copy, brand rules or models. It does not approve anything. It does not claim real-device performance. It does not capture exact live copy.
