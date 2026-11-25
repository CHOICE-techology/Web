# V4.1a2: two opt-in previews (no video, no model changes)

Date: 25 Nov 2026. Default behaviour is unchanged. Both changes are off unless the URL hash asks for them.

## #cam-r (intro camera on narrow windows)
- Measured the ribbon's screen extent across the 7 s intro. Landscape 1200x750: ribbon stays inside about 70 percent of the half-width, so no change is needed there.
- Portrait 800x1000: ribbon reached 1.05 of the half-width (past the edge) from 1.6 s to 4.4 s, and tiles were clipped.
- Fix: the intro camera radius is multiplied by 1 + 0.5 x max(0, 1.45 - aspect), eased back to 1 between 5.6 s and 7 s. Hero pose and live camera are untouched. Landscape 16:10 and wider: factor is exactly 1.

## #strips-late (dark strips before the case)
- Report text says the strips are refraction-only elements from the Cycles rig. Frames confirm they showed through the bare ribbon from 1.2 s.
- New: strips are hidden until the monolith starts, then fade in with it (colour blend to the background). At 6.7 s the result matches the current build.
- #nostrips (already in the prototype) is the full off comparison. Without strips the final glass looks plainer, so Alexander decides whether to keep the strips at all.

## How to try
Add to the URL: #cam-r, #strips-late, or #cam-r-strips-late. Frame stills: #frame-84, #frame-132, #frame-200 (combine with #capture-clean).

## Limits
Stills were rendered with software WebGL in a headless browser, not a real GPU. Colour and speed on a real Mac and phone still need the #bench check. No film was rendered.
