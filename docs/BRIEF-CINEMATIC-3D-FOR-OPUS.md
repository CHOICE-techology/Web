# Brief for Opus: choice-id.work as a cinematic, animated 3D site (22 Nov 2026)

Status: DECISIONS MADE (22 Nov, 17:32). Next: a small, low-cost motion preview to try together, then real models. Written after Alexander's feedback that the first live-code attempt (branch `site/identity-journey-wip`, commit `8e50024`) looks nothing like his references.

## 0. Alexander's decisions (22 Nov 2026)
1. Hero and references: references A, B and C are united into ONE scene (not three separate objects for separate sections). The glass ribbon (A) wraps the ID monolith with the person inside (B), with spiral rings and icon tiles (C) around it.
2. Models: AI image-to-3D. The reference elements are flat images; the tool must give them volume so they can rotate. Then cleanup, material set in code.
3. Scroll: OK to take over scrolling in the film zone, like the jet example. Every stage is one scroll and the story moves on.
4. GSAP: approved for the film timeline. Aim for the best result.
5. Process: start with a small preview that does not use much capacity, try it together, then go further.
6. Earlier change (17:27): if the video route is picked, Opus builds the film around Alexander's video instead of the model steps (see section 4).

## 1. What Alexander actually wants (in his words, condensed)
- A cinematic, animated 3D website that feels like a movie, like the Aero-Noir private jet example (a hero where each scroll gesture triggers a full, smooth camera move).
- "The story starts to move": the camera jumps, sweeps left and right, rises, pushes in. It is not a page that only scrolls down.
- Use the glossy reference images as the real look (clear polished glass, ribbons, glass tiles with icons, a bright studio with a mirror floor). "We don't need to build a Web3 model", "we already have the reference".
- A modern, quieter layout, with the menu at the top instead of the left sidebar.
- Keep: all words, brand colours (white, grey, black, neon cyan #34FAFB; gradients of white and grey), logo, fonts.
- Quality bar (his exact words): "Ultra-high perceived fidelity: crisp glass edges, real refraction, controlled dispersion, high-quality studio reflections, clean geometry, no blur, no noise, no cheap glow."

## 2. Why attempt 1 failed (so it is not repeated)
- The glass objects were built in code from basic extruded shapes. Real glass quality comes from a well-modelled asset and good lighting, not from code geometry.
- The camera moved continuously with scroll distance. The film feel needs staged moves: one gesture = one complete, eased camera move that finishes by itself and then holds.
- The page layout (left sidebar, flat text cards) was left as it was, so the 3D looked pasted behind a different design.

## 3. References
- A. Glass ribbon knot with floating glass tiles and PROOF / YOU / WORK labels.
- B. Glass ID monolith with a soft person inside, thin cyan lines to five evidence pieces (coin, curled sheet, scroll, chip, plaque).
- C. Glass sphere with spiral rings and icon tiles.
DECIDED: A, B and C united into one scene (section 0). The same scene carries all six stages; camera and object states change, not the object set.
Do not copy the checkmarks or the bar-chart tile from the references: no "verified" visuals and nothing that reads as a score.

## 4. The asset pipeline
Real look = real model. DECIDED route: AI image-to-3D.
1. Produce clean 3D models (GLB, glass shapes only, no materials baked in):
   - ribbon; ID monolith (with inner figure as a separate mesh); spiral rings; 5 evidence pieces; 3 icon tiles.
   - AI image-to-3D from the reference crops (one element per crop, on a plain background), then cleanup in Blender. AI tools usually get shape right and glass material wrong, so material is always set in code.
   - Need: clean topology, bevelled edges, under about 1.5 MB per GLB after Draco compression, real thickness (solid volumes, not single planes).
2. In Three.js: MeshPhysicalMaterial (transmission, thickness, ior 1.5, small controlled dispersion, clearcoat) on the hero and key pieces only, lit by a studio environment with softboxes so edges catch light. No bloom, no noise, no glow sprites.
3. Look-dev gate: a single still render of the live scene next to the references, approved by Alexander before page work.
Video route (alternative): AI-generated cinematic video from the reference images (e.g. via Higgsfield), scroll-scrubbed. If picked, Opus builds the film around Alexander's video instead of the model steps: no GLB models, no Three.js glass; the six stages become segments of the video, each gesture plays one segment to its end and holds on its last frame, words stay as HTML over the video. The look-dev gate becomes one still frame from the video next to the references.

## 5. The experience: a short "film" plus a normal page
Hero and story zone ("film"): full-screen stage with one scene, 6 stages. One scroll, swipe or key press runs one full camera move (about 2 to 3 s, eased, curved path), then holds. Input is locked during a move; leftover trackpad momentum is discarded; scrolling up reverses one stage. A small progress indicator shows 1 to 6.
Stages (existing words only, shown as normal HTML over the canvas):
1. Hero: wide arrival, settles close on the united object. "Work with love, or income? Why not both?" PROOF / YOU / WORK tiles attached to the object.
2. Push in and sweep right: PROOF (evidence pieces drift near).
3. Pull back and arc: "Sound familiar?" Pieces scatter at different depths; lines thin and broken.
4. Dive in: "In short" Pieces fly home to the ID monolith, lines draw whole and bright.
5. Rise, then five stations along one path: How it works ADD, DISCOVER, FIND, APPLY, SHARE (can be 5 short holds).
6. Calm, level, symmetrical rest: "No score". Same objects, no hierarchy.
After the film: the rest of the page (For you & for hiring, What you get, Your controls, What counts as proof, Team, Taila, FAQ) scrolls normally. Do not take over scrolling on long reading sections.
Accessibility and fallbacks: keyboard (arrows, Page keys, Space), visible focus, "Skip the film" link, reduced motion = stages change as plain cross-fades with no camera travel, no WebGL = the full page with a poster, phones = lighter model, lower DPR, tap or swipe for stages.

## 6. Layout changes allowed
- Top navigation bar replaces the left sidebar. Same items, same words and anchors, same CTAs.
- Large, assured headline, big object on the right, generous white and grey space, cyan only as a signal (lines, one underline, one word).
- No black sections, no pink, no purple, no blue.

## 7. Hard rules that still apply
- Public site only (`choice-id-work/`). Do not touch /app, root package.json, lockfile, src/, api/, worker/.
- Every word, link and CTA stays. Logo and fonts unchanged. No dashes in copy. No check marks, no scores, no rankings.
- Three.js r186. GSAP approved (22 Nov) for the film timeline only. Still no React, R3F or Lenis.
- Do not merge PR #279. Do not deploy. Private preview artifact only.

## 8. Work order
1. Small motion preview (stand-in glass shapes, united scene, six stages, GSAP, scroll takeover). Try it with Alexander. STOP.
2. Audit repo and baseline screenshots.
3. Image-to-3D models from reference crops, cleanup, look-dev still next to the references. STOP for approval.
4. Swap the models into the preview, add top nav and fallbacks in the real site. Preview. STOP.
5. QA: 1440x900, 1280x800, 1024x768, 768x1024, 390x844, 360x800, reduced motion, no-WebGL, console clean, real-GPU frame timing (not software GL).
6. Report: files changed, what was not changed, open questions.
