# Handover, 24 Nov 2026: Identity Studio, after V4

Start the new chat from this file. Also read: REPORT-V4.md, REPORT-V3.md, SPEC-LOOKDEV-V2.md, BRAND-CONFIRMATIONS-AND-AMENDMENTS-23NOV.md.

## Approved so far (Alexander)
- v3 geometry and the Cycles master are the visual foundation. **Ribbon B** and the **sculpted bust** are chosen.
- v2 materials and lighting spec are the baseline. Brand book (Oct 2026) is authoritative: no pink (pink is CHOICE DAO), cyan #34FAFB only as a signal.
- Order of gates: look-dev → 7 s animatic → film zone → full site. V4 (real-time + intro + one interaction) is delivered and **awaits his review**.

## Live links
- V4 prototype: https://claude.ai/artifact/3ZRvg13tRsDjwbBzQT9tsN. Test flags in the URL hash: `#f-70` freezes at a time in tenths of a second, `-clean` hides the overlays, `#slow` plays at quarter speed for capture, `-nocase` / `-noedge` are for debugging.
- V4 review page: https://claude.ai/artifact/Dp69GQkLah59YBeX3wSqDK
- v3 look-dev review: https://claude.ai/artifact/2VH2okuHX2AvAFpSb5ofnN · v3 real-time test: https://claude.ai/artifact/FR89ZkvK4UWrnRRbdjiBTW

## Source (workspace of the old session; not persistent, so re-create from the delivered files if needed)
- `v3.py`: Blender 5.3 scene. Modes: hero, scene:<yaw>, ribbonview, bustcmp, macro, validate, export. Options: ribbon=A|B, bust=sculpt|clean, rb=1.76. Ribbon carries UVs (u along the band) for the growth reveal; icons are named Icon_<name>.
- `web4/src/main.js`: Three.js r181 + GSAP 3 + Meshopt scene, intro timeline, folder interaction. Delivered in chat as a file.
- `identity_studio_v3.blend`, `REPORT-V3.md`, and `intro_7s_browser_capture.mp4` were delivered in chat.
- GLB pipeline: `gltf-transform optimize raw.glb studio.glb --compress meshopt --simplify true --simplify-error 0.0002 --join false --flatten false --instance false --prune-attributes false`

## V4 measured
- Desktop (Alexander's Mac, Chrome): 51 to 54 fps, slowest frame 20 to 40 ms, 76 draw calls, 248k triangles.
- Transfer: GLB 314 KB brotli, code 163 KB brotli, about 0.48 MB plus fonts.
- Mobile fps: **not measured yet**. Reduced-motion mode is coded but untested.

## Open items for the next chat
1. Get Alexander's verdict on V4.
2. Fix the ribbon's back loops not showing through the case. This is a three.js transmission limit; the fix is a proxy pass drawing the back half as thin reflective glass first.
3. Strengthen the case edge highlights (a texture baked from Cycles).
4. Match the real-time hero framing to the Cycles hero.
5. Strip unused UVs from all meshes except the ribbon (GLB should go from about 515 KB to about 430 KB).
6. Measure mobile fps on a real phone and test reduced motion.
7. Still waiting on: the font decision (Nunito per the brand book vs Public Sans on the live site), the live "Ask a question" box code, repo/folder access (CHOICE-techology/SANDBOX or ~/SANDBOX/identity-wip), and an image-to-3D bust if wanted. The head is a CC BY 3.0 scan and needs a credit.

## Technical lessons (don't repeat)
- In three.js, additive layers stacked on top of each other turn white, because blending happens after sRGB conversion and AgX lifts dark values.
- `scene.background` is not tone-mapped, but the same background seen through glass is. Use a tone-mapped cove sphere, otherwise glass reads grey.
- gltf-transform optimize strips UVs that no texture uses and instances identical meshes. Turn both off.
- `.glb` files can't be served from artifacts; wrap them as base64 `.js` (report the true sizes separately).
- Artifacts open in the Claude in Chrome extension (signed in); the built-in browser pane is not signed in. JavaScript can't run on claude.ai pages, so read the on-page stats overlay instead.
- Changing only the URL hash doesn't reload an artifact. Navigate to another site first, and version the script URLs (?v=N) to beat the cache.

## Rules that still hold
No dashes in copy, no check marks, scores or rankings, no pink/purple/blue, keep every word and link from the live site, preview artifacts only, no merge or deploy, don't touch /app, no invented product UI. Stop at each gate for approval.
