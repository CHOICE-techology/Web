# Handover, 25 Nov 2026 (later): Identity Studio after V4.1a2b
Start the new chat from this file. It replaces nothing: it follows `HANDOVER-25NOV-V41A-REVIEW.md` and adds everything that happened afterwards.

## 1. One paragraph summary
V4.1a (visual quality) is delivered and still waiting for Alexander's verdict. Since then we set up a low-credit way of working, built two small opt-in fixes (V4.1a2: `#cam-r`, `#strips-late`), validated them with software-rendered stills (all checks passed), and wrote the real-device test instructions. ChatGPT (free account) is used as a text-only second reviewer and researcher. No video was rendered. Nothing was changed in the default build. Next gate is still the 7 s animatic, planned for Saturday 28 Nov when Claude credits return.

## 2. Gates and rules (unchanged, repeat in every task)
Gates in order: look-dev, 7 s animatic, film zone, full site. Stop at each for Alexander's approval. NOT started and must not start without approval: V4.1b (certificate and briefcase interactions), homepage integration, any change to /app, any merge or deploy.
Content rules: no dashes in site copy, no check marks, scores or rankings, no pink, purple or blue, keep every word and link from the live site, preview artifacts only, no invented product UI. Cyan #34FAFB only as a thin signal. Approved site section order is fixed (see docs/HANDOVER-23NOV-CINEMATIC-SITE.md): Hero, Tap a dot, Sound familiar, 00 The short version, 01 How it works (ADD, DISCOVER, FIND, APPLY, SHARE), 02 No score, 03 One link two sides, 03B What you get, 03C Your controls, 04 What counts as proof, 05 Watch, 06 Team, 06B Why we build it, 07 Meet Taila, 08 Ask a question, 09 Questions (11), closing, footer. Never reorder, merge, rename or remove.
Names: Alexander Aleksashev-Arno (owner), Raffaella Ciani (CTO, can continue the work from GitHub). Spell Raffaella correctly; ChatGPT once wrote "Alejandro" for Alexander, ignore that.

## 3. Credit situation and working mode
Claude credits are low until Saturday 28 Nov. Alexander wants: no video or big renders before then, small daily progress, ChatGPT's daily free limit used every day. So: cheap text and review work now, one single film re-render on Saturday with every decision applied. Do not render the film twice. If a task needs a render or a 3D change, say so and defer it.

## 4. Public review repo
https://github.com/CHOICE-techology/Web (public). Alexander pushes from `~/Desktop/Web` via Terminal. Claude cannot push (gh token invalid, add_repo was denied). Never use `git rm` in a chained command (an earlier one emptied the repo and had to be reverted). The sandbox can clone it read-only with `git clone --depth 1` (this worked on 25 Nov) and raw files are readable via raw.githubusercontent.com.
Last known GitHub state (checked 25 Nov): head commit `038397e Organise review room into folders`. Contains README, STATUS, NEXT-STEP, HISTORY, MODELS, docs/ (10 handovers and reports), images/2026-11-25-v41a/ (cycles_master_hero, side_by_side_v41a, cmp_materials_profile, cmp_materials_scene, cmp_behind_case, cmp_edges, before_v4_side_by_side as .jpg), video/, models/ (GLB ~988 KB total), source/prototype (index.html, main.js, package.json, HOW-TO-RUN.md) and source/tools.
NOT YET PUSHED (Alexander has these as downloads from the chat, check with a fresh clone before relying on them): CREDITS.md (created locally but untracked), ROADMAP-AND-GPT-TASKS.md, V41A2-NOTES.md, V41A2b-REPORT.md, the updated source/prototype/main.js (or v41a2-opt-in.patch), DEVICE-TEST-CHECKLIST.md, the two V41A2b comparison matrices. The original REVIEW-SHEET.jpg and CHATGPT-BRIEF.md were lost (not in Downloads); the sheet was rebuilt from repo images, the brief was replaced by the ROADMAP file. Suggested repo locations: ROADMAP-AND-GPT-TASKS.md and CREDITS.md in repo root, the others under docs/ (V41A2 files, DEVICE-TEST-CHECKLIST.md) and images/2026-11-25-v41a2b/ (matrices).

## 5. What was built and verified this session (V4.1a2, opt-in only)
Prototype source: `source/prototype/main.js` (Three.js 0.181, GSAP 3.15.1). Hash flags combine with dashes. Defaults unchanged.
- `#cam-r`: aspect-aware intro camera. Finding: on landscape 1200x750 the ribbon keeps about 30 percent margin (no change needed). On portrait 800x1000 the ribbon went past the screen edge (|x| about 1.05) from 1.6 s to 5.6 s and tiles were clipped. Fix: intro camera radius multiplied by `1 + (fitK() - 1) * camK.w`, `fitK = 1 + 0.5 * max(0, 1.45 - aspect)`, weight `camK.w` eased from 1 to 0 between 5.6 s and 7 s. After ChatGPT's review the factor is recalculated every frame (first version computed it once at load, which was wrong on resize or rotation). Hero pose and live camera untouched.
- `#strips-late`: the refraction-only dark strips (from the Cycles rig) showed through the bare ribbon before the case existed (from 1.2 s). Now they stay hidden until the monolith starts and fade in by blending colour toward the background (#F7F8F9) while `strips.visible` is false at monolith below 0.05. A transparency fade did not work because three.js transmission pass renders opaque objects only.
- `#nostrips` (already existed): full off diagnostic. Without strips the final glass looks plainer, so strips are worth keeping; ChatGPT agrees ("do not remove, delay").
Validation (software WebGL stills, same camera, material, lighting; frames 36, 48, 84, 120, 126, 147, 168, 200 at 30 fps):
- Default build vs original V4.1a build: 0 differing pixels in all frames.
- `#cam-r` on landscape: identical to default. On portrait at 7 s (frame 210): identical to original.
- Resize landscape to portrait mid intro: identical to a fresh portrait load. Back to landscape: identical to fresh landscape.
- `#strips-late` differs only in 2.8 s to 4.2 s; identical from 4.9 s.
- `#nostrips` still works.
Caveat: software rendering (headless Chrome, SwiftShader), not a real GPU. Colour and speed on real hardware are unmeasured.

## 6. Known facts about the prototype that matter for testing
- Default profile material is A. The candidate Alexander leans to (and ChatGPT prefers) is B at transmission 0.72. A benchmark must use `#bench-mat-b` to measure the candidate, not only `#bench`.
- Phones (max-width 760px or coarse pointer) use different defaults: behind-case pass OFF, transmission resolution 0.6, no floor reflector, lower shadow map. Never compare desktop and phone fps as if the rendering were the same. Record settings next to every number.
- `#bench` skips the intro and runs a fixed 12 s live camera sweep, then shows a result box and sets `window.benchResult`. It does NOT measure the 7 s intro. `window.studioStats()` gives parseMs, firstFrameMs, fpsLog (one value per second), modelBytes, pixel ratio, draw calls. The intro is observed by loading with no hash.
- Reduced motion: if the OS setting is on, the page skips the intro and shows the final scene. Not yet tested on a real device.
- The loop pauses after 8 s idle, off screen or hidden tab; wakes on pointer, key, resize.
- hashVal quirk: `#cam-r` is also read by the older `cam` option as value "r", which falls through to the Cycles camera. Harmless; do not "fix" without approval.
- Pending decisions inside the prototype: profile material (B at 0.72 leaning), edge treatment ("both" leaning, keep restrained), whether `#cam-r` and `#strips-late` become defaults (Claude and ChatGPT both lean yes, after real-device numbers).
- Not yet done: real-device fps (Mac and phone), reduced motion on a real device, new Cycles renders (no Blender in the sandbox, Blender source files are not in the repo), intro early-shot camera was only analysed numerically not re-tuned beyond `#cam-r`.

## 7. How the sandbox testing works (so the next chat does not rediscover it)
- Clone: `git clone --depth 1 https://github.com/CHOICE-techology/Web.git`.
- Build: copy `source/prototype/*` to a work folder, `mkdir src && cp main.js src/main.js`, `npm install` (three, gsap, esbuild), `npm run build` (esbuild to bundle.js). Create `studio.glb.js` as `window.STUDIO_GLB="<base64 of models/identity_studio_v3_web_v41a.glb>";`.
- Serve with `python3 -m http.server`, started with `setsid nohup ... &` (a plain background process dies between tool calls).
- Capture: Python Playwright using `/usr/bin/google-chrome` with args `--no-sandbox --use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`. Open `index.html#capture-clean<flags>`, wait for `window.studioFrame`, call `window.studioFrame(n)` (frame n is the timeline at n/30 s) and decode the returned PNG data URL. Plain `--screenshot` returns a blank page; use the canvas data URL.
- Compare variants with PIL and numpy pixel differences. A baseline build of the repo's original main.js on a second port gives the "default unchanged" check.
- Cost: cheap (no GPU, no video). One full matrix of 72 frames took a few minutes.

## 8. ChatGPT workflow
Alexander uses a free ChatGPT with daily limits. It cannot open claude.ai artifacts, cannot show previews, and has a small image limit. It CAN read the public repo through raw.githubusercontent.com links (confirmed: README, STATUS, NEXT-STEP, HISTORY, MODELS, source files) and the live site choice-id.work (it reported retrieving current content). It said it could not reliably open every repo image and corrected an earlier claim; treat its visual judgements as opinion from stills, not measurement. Always verify its claims against the repo or code before acting; it is a draft reviewer. In this session ChatGPT's claims that checked out: the dark strips are refraction-only; the 15-mesh UV strip; the idle and off-screen pause; the resize bug in `camK` (real, fixed); that `#bench` skips the intro (true). Not found by Claude: the "51 to 54 fps V4 baseline" figure in the repo markdown.
How to feed it: one task per day, paste the "start of every ChatGPT chat" block plus one task from ROADMAP-AND-GPT-TASKS.md, save its answer as the named file, push, and bring the answer to Claude to verify. Text tasks only. The first ChatGPT chat has been going all day, so the next chat can start with the ROADMAP block again.
ChatGPT's recommendations adopted: keep V4.1a2 opt-in; do not merge into production baseline before real-device numbers; do not remove the strips, delay them; B at 0.72 and combined edges as provisional; no film render before Saturday; Task 01 content inventory next; keep the approved section order untouched; separate visual decisions from website decisions (font and source licence must not delay the animatic).
Its proposals NOT adopted as written: a six-part regrouping of the site (it is a draft only; the approved order stays); using Nike or Ascend as visual sources (techniques only, no blue, orange or dark backgrounds; it only read their catalogue text).

## 9. Task list for ChatGPT (full text lives in ROADMAP-AND-GPT-TASKS.md)
01 content inventory of the live site (most valuable, add the rule: record exact live copy even where it conflicts with the brand book, mark discrepancies for Alexander, never silently correct); 02 content to motion map; 03 written film-zone storyboard; 04 device test checklist (DONE by Claude: DEVICE-TEST-CHECKLIST.md); 05 accessibility and no-WebGL fallback spec; 06 code review of source/ (list risks only); 07 decision register (add: November launch CTA wording is time sensitive; CC BY 3.0 attribution for the head scan, separate from the source licence).
ChatGPT reported live site differences vs the 23 Nov snapshot (UNVERIFIED by Claude): "The short version" now reads "In short"; section 02 shows as "Our promise" with heading NO SCORE; "For you & for hiring" appears in navigation; Tap a dot, Watch and Why we build it are in the content but not in the navigation. It found 11 FAQ entries and 6 team profiles and no blog link on the homepage. The inventory must record the live version exactly and report differences.

## 10. Open decisions for Alexander
1. V4.1a verdict: profile material (B at 0.72 leaning), edge treatment ("both" leaning, restrained), whether the film looks right.
2. Make `#cam-r` and `#strips-late` defaults for the 7 s film (both reviewers lean yes after hardware numbers).
3. Font: brand book says Nunito for body, live site uses Public Sans (Poppins for headings both). Record, do not change anything silently; this must not delay the animatic.
4. Licence for `source/` (undecided). Credits: head scan by Lee Perry-Smith, CC BY 3.0, attribution required (CREDITS.md drafted).
5. Code of the live "Ask a question" box (must keep working unchanged).
6. November launch CTA wording (time sensitive, add to the decision register).
7. Blender source files are not in the repo; fresh Cycles renders need Blender and credits.

## 11. Plan
Now to Friday (no video): Alexander pushes the pending files; Raffaella runs DEVICE-TEST-CHECKLIST.md on a Mac and a phone and pastes results; ChatGPT does Task 01, then 02, 03, 05, 07 one per day; Claude verifies each answer and writes a decision register. Cheap Claude work allowed: reviewing ChatGPT output, small browser-preview fixes, analysis from stills.
Saturday 28 Nov (credits back): get Alexander's verdicts; apply decisions; fresh Cycles comparison if Blender is available; render the 7 s film once (210 exact frames, 30 fps) with all decisions applied; stop for animatic approval. After approval: film zone, then V4.1b, then full site (each its own gate).

## 12. Artifacts (private to Alexander)
V4.1a prototype https://claude.ai/artifact/UhhEJvtBGQs9HVnXVN17hF (no V4.1a2 flags in it yet, local build has them). V4 untouched: 3ZRvg13tRsDjwbBzQT9tsN. V4 review page: Dp69GQkLah59YBeX3wSqDK. v3 look-dev: 2VH2okuHX2AvAFpSb5ofnN. Project docs for this work live in the Claude Project "Website" (HANDOVER and REPORT files under claude/).

## 13. Tool and environment pitfalls
WebFetch on github.com can be rate limited; fetch one page at a time (raw.githubusercontent.com worked). The shell cannot reach choice-id.work. The device bridge had no connected folder this session (device_request_folder_access was not needed). Files for Alexander are delivered with SendUserFile; he saves them into ~/Desktop/Web and pushes.

## 14. First actions for the next chat
1. Read this file, then STATUS.md, NEXT-STEP.md and docs/REPORT-V4.1A.md from a fresh clone, and check which pending files are now on GitHub.
2. Ask only for what is missing: Alexander's verdict, Raffaella's device results, ChatGPT's next answer.
3. Verify anything pasted from ChatGPT against the code or repo before acting. Keep every change opt-in and reversible. Do not render video before Saturday.
