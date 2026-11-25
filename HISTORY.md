# History of the project

How the Identity Studio came about, in order. Details are in `docs/`.

**22 Nov 2026: The Identity Journey (first attempt).** A Three.js world on the SANDBOX repo (branch `site/identity-journey-wip`) with a glass ID monolith, five evidence pieces and cyan connection lines. Handover: `docs/HANDOVER-22NOV-IDENTITY-JOURNEY.md`. Alexander's verdict: it looks nothing like the references. Cause: glass built in code from simple shapes.

**22 Nov: decisions.** References A (ribbon), B (monolith with person) and C (rings) become one scene. Real models, real glass. GSAP approved. A staged "film" with scroll takeover in the top zone only. Brief: `docs/BRIEF-CINEMATIC-3D-FOR-OPUS.md`.

**23 Nov: brand and plan.** The October 2026 brand book becomes the authority: no pink, cyan only as a signal, Phosphor icons, corners 8 px. Plan approved with seven amendments (`docs/BRAND-CONFIRMATIONS-AND-AMENDMENTS-23NOV.md`). Order of work set: look-dev still, 7 s animatic, film zone, full site. Handover: `docs/HANDOVER-23NOV-CINEMATIC-SITE.md`.

**24 Nov: look-dev v2 and v3.** Blender and Cycles render of the whole scene (`docs/SPEC-LOOKDEV-V2.md`). v3 corrected the bust anatomy, chose Ribbon B, fixed intersections found by a geometry validation (`docs/REPORT-V3.md`). Exported to the web with meshopt.

**24 Nov: V4 real-time prototype.** Three.js with a 7 s GSAP intro, hand-over to OrbitControls, one folder interaction. 51 to 54 fps on a Mac. Report: `docs/REPORT-V4.md`.

**24 to 25 Nov: V4.1a visual quality.** Found and fixed a scale bug and a shader bug, matched the Cycles camera, made the ribbon show through the case, compared three profile materials and three edge treatments, recorded the 7 s film as 210 exact frames. Report: `docs/REPORT-V4.1A.md`. Awaiting approval.

## Working method
Claude does the building and measuring; Alexander approves at each gate; a second reviewer (ChatGPT) gives outside feedback from the images and notes here. Reviewer feedback is checked against the code before anything changes.
