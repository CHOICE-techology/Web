# V4.1a2b: validation of #cam-r and #strips-late

Date: 25 Nov 2026. Both changes stay opt-in. No video, no model change, no homepage change. Not applied to any production branch.

## What changed since the first V4.1a2 drop
ChatGPT's review found one real issue: the camera factor was computed once at page load, so resizing or rotating a phone during the intro left the wrong factor. Fixed. The factor is now recalculated on every frame from the current window shape, and an intro weight (1, eased to 0 between 5.6 s and 7 s) switches it off, so the hero pose is unchanged.

## Checks (software WebGL stills, same camera, material and lighting everywhere)
Frames: 36, 48, 84, 120, 126, 147, 168, 200 (1.2 to 6.67 s). Landscape 1200x750 and portrait 800x1000.

| Check | Result |
|---|---|
| Default build vs the repo's original V4.1a build, all 8 frames | Identical, 0 differing pixels |
| #cam-r on landscape 1200x750 | Identical to default (factor is exactly 1) |
| #cam-r on portrait, final frame at 7 s | Identical to the original |
| Resize landscape to portrait during the intro | Matches a fresh portrait load exactly |
| Resize back to landscape | Matches a fresh landscape load exactly |
| #strips-late vs default | Differs only from 2.8 s to 4.2 s. From 4.9 s (frame 147) onward it is identical to the original |
| #nostrips (diagnostic) | Still works. Differs from default in every frame from 2.8 s |
| Portrait with #cam-r | Ribbon and tiles stay inside the frame; the original clips them from 1.6 s to 5.6 s |

## Files
- V41A2b-landscape-matrix.jpg: 8 frames x 4 variants (original, strips-late, cam-r + strips-late, nostrips). Camera-only is not shown separately in landscape because it is pixel-identical to the original there.
- V41A2b-portrait-matrix.jpg: original vs cam-r + strips-late.
- main.js and v41a2-opt-in.patch: the changes, off by default.

## Limits
Software rendering in a headless browser, not a real GPU. Colour and speed on a real Mac and phone still need #bench. Orientation change on a real phone is untested, only simulated by resizing. Nothing was rendered as video.

## Recommendation for Saturday (Alexander decides)
Make both defaults for the 7 s film. They change nothing on landscape except the strips timing, and nothing after 4.9 s.
