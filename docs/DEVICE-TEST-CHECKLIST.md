# Device test checklist and results template (V4.1a2b)

For: Raffaella (or anyone with a Mac and a phone). Written by Claude on 25 Nov 2026 at ChatGPT's request. No new renders, no code changes, no defaults changed.
Goal: real numbers from real hardware before the Saturday 28 Nov approval gate. Software-rendered tests already passed; they say nothing about speed or colour on a real GPU.

## 0. What you need
- A Mac with Chrome or Safari, and a phone (iPhone Safari or Android Chrome) on the same Wi-Fi.
- Node.js 18 or newer, git, Python 3.
- About 30 minutes.

## 1. Get and run the prototype locally
The prototype page needs the model wrapped as a script (the artifact host cannot serve .glb). Run these in Terminal:

```
git clone https://github.com/CHOICE-techology/Web.git
cd Web/source/prototype
mkdir -p src && cp main.js src/main.js
node -e "const fs=require('fs');fs.writeFileSync('studio.glb.js','window.STUDIO_GLB=\"'+fs.readFileSync('../../models/identity_studio_v3_web_v41a.glb').toString('base64')+'\";')"
npm install
npm run build
python3 -m http.server 8000
```

Notes:
- The V4.1a2 changes (#cam-r and #strips-late) are in main.js only after Alexander has pushed the updated file. Check that main.js contains the text "fitK". If it does not, the two flags do nothing and you are testing plain V4.1a. Write which one you tested.
- On the Mac open http://localhost:8000/index.html followed by the hash below.
- On the phone open http://YOUR-MAC-IP:8000/index.html followed by the hash. Find the Mac IP with: ipconfig getifaddr en0
- If the Mac IP does not work, use the artifact link only if Alexander has shared it with you (it is private by default): https://claude.ai/artifact/UhhEJvtBGQs9HVnXVN17hF . Hash flags may not pass through an artifact frame, so local is the reliable route.

## 2. How the URL flags work
Add flags after # joined with dashes, for example `#bench-mat-b`. Defaults when nothing is given: profile material A, edges "both", behind-case pass ON on desktop and OFF on phones, camera cycles.
- `#bench`: skips the 7 s intro and runs a fixed 12 s camera sweep, then shows a result box on screen.
- `#mat-a` or `#mat-b`: profile material. IMPORTANT: the default is A, but the candidate Alexander is leaning to is B at 0.72. Test both. `#mat-b` uses 0.72 by default.
- `#proxy-0` or `#proxy-1`: behind-case pass off or on. Use this to compare desktop and phone with the same setting.
- `#cam-r` and `#strips-late`: the two opt-in V4.1a2 changes. `#nostrips`: diagnostic with the dark strips removed.
- No hash at all: plays the normal 7 s intro in real time.

## 3. Test runs (do each, record in the template)
Mac, landscape:
1. `#bench` (material A, default)
2. `#bench-mat-b` (candidate material)
3. `#bench-mat-b-proxy-0` (to see the cost of the behind-case pass)
4. Intro run with no hash (see section 5)
5. Intro run with `#cam-r-strips-late`

Phone, portrait, then landscape:
6. `#bench` (phone defaults: proxy off)
7. `#bench-mat-b`
8. `#bench-mat-b-proxy-1` (only to see if the phone can cope; note any heat or stutter)
9. Intro run with no hash, then with `#cam-r-strips-late`
Portrait is the important phone case. Rotate to landscape and back during the intro once and note any jump (the camera factor now recalculates, so there should be none).

## 4. How to run #bench and read the results
1. Open the URL with #bench. Do not touch the page for 14 seconds. Close other tabs and apps. Plug the laptop into power.
2. A result box appears on screen: median fps, fps at the slowest 5 percent, worst frame, draw calls, scene triangles, viewport and pixel ratio, material, behind-case pass on or off, GPU name. Take a screenshot of it.
3. Run each bench URL twice and record both. The first run includes shader compile time.
4. On the Mac, open the browser console (Chrome: Cmd+Option+J; Safari: enable the Develop menu in Settings, then Cmd+Option+C) and paste these two lines, one at a time. Copy the output into the template:

```
JSON.stringify(window.benchResult)
JSON.stringify(window.studioStats())
```

5. On the phone there is no console. Take a screenshot of the result box. To get the loading numbers (GLB parse time, first frame) either connect the iPhone to the Mac and use Safari Develop menu, Web Inspector, or on Android use chrome://inspect from desktop Chrome. If neither is possible, write "not captured".

What the stats mean: `parseMs` is GLB parsing time, `firstFrameMs` is time from page start to the first drawn frame, `fpsLog` is one fps value per second recorded so far.

## 5. Watching the 7 s intro on its own
`#bench` does not measure the intro. To observe it:
1. Open the URL with no hash (or `#cam-r-strips-late`). The intro plays by itself for 7 seconds.
2. Watch it once without recording numbers. Note any stutter, pop, flash, cut, clipped object, or dark strip visible before the glass case appears (about 4.2 s).
3. About 10 seconds after loading, run in the console: `JSON.stringify(window.studioStats().fpsLog)`. That shows fps once per second during the intro. Then run `JSON.stringify(window.studioStats())` for the load numbers.
4. Press the Replay button and watch again to check the second play looks the same.
5. Optional: record the screen (Mac: Cmd+Shift+5). Do not upload large videos to the repo; keep them for Alexander.

## 6. Reduced motion (use the real operating system setting)
- Mac: System Settings, Accessibility, Display, turn on Reduce motion.
- iPhone: Settings, Accessibility, Motion, turn on Reduce Motion.
- Android: Settings, Accessibility, turn on Remove animations.
Reload the page with no hash. Expected: no 7 s intro, the scene appears already in its final position, the camera does not drift, hover and folder animations are instant. Record what you saw. Turn the setting off again afterwards.

## 7. Visual checks while you are there (one line each)
- Does the glass look greyer or heavier than the Cycles reference image (images/.../cycles_master_hero.jpg)?
- Any shimmering edges, flicker, or banding on the case edges?
- On the phone: does the profile bust look wrong with the behind-case pass off?
- Any browser warnings in the console? Copy them.

## 8. Results template (copy into docs/DEVICE-RESULTS-<date>.md)

Tester: ________  Date: ________  Tested build: plain V4.1a / with V4.1a2 (main.js contains "fitK": yes / no)

| Item | Mac | Phone |
|---|---|---|
| Device and model | | |
| OS and version | | |
| Browser and version | | |
| Screen resolution and pixel ratio | | |
| GPU name (from result box) | | |
| Power mode (plugged in, battery saver) | | |

Bench results (two runs each):

| Run | URL hash | Median fps | Slowest 5% fps | Worst frame ms | Draw calls | Scene triangles | Pixel ratio | Behind-case pass | Notes |
|---|---|---|---|---|---|---|---|---|---|
| Mac 1 | #bench | | | | | | | | |
| Mac 2 | #bench-mat-b | | | | | | | | |
| Mac 3 | #bench-mat-b-proxy-0 | | | | | | | | |
| Phone 1 | #bench | | | | | | | | |
| Phone 2 | #bench-mat-b | | | | | | | | |
| Phone 3 | #bench-mat-b-proxy-1 | | | | | | | | |

Loading (from studioStats):

| Item | Mac | Phone |
|---|---|---|
| parseMs | | |
| firstFrameMs | | |
| modelBytes | | |

Intro observation (no hash, then #cam-r-strips-late):

| Question | Mac | Phone portrait | Phone landscape |
|---|---|---|---|
| fpsLog during intro | | | |
| Stutter or pops (time) | | | |
| Ribbon or tiles clipped by the screen edge | | | |
| Dark strips visible before the case (about 4.2 s) | | | |
| Rotation during intro: any jump | n/a | | |
| Replay looks the same | | | |

Reduced motion (real OS setting):

| Question | Mac | Phone |
|---|---|---|
| No intro, final scene shown at once | | |
| Camera and tiles still | | |
| Anything still moving by itself | | |

Raw output to paste below: the JSON lines from benchResult and studioStats, console warnings, and screenshot file names.

Rule when reporting: record the settings next to every fps number. Desktop and phone use different defaults (behind-case pass, transmission resolution, reflector), so do not compare their fps as if they ran the same rendering.
