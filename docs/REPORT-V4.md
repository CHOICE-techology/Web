# Identity Studio V4: real-time prototype (24 Nov 2026)

- Live prototype: https://claude.ai/artifact/3ZRvg13tRsDjwbBzQT9tsN · Review page: https://claude.ai/artifact/Dp69GQkLah59YBeX3wSqDK
- Built on the v3 GLB (ribbon B, sculpted bust). Stack: Three.js r181, GSAP 3.15, Meshopt.
- Intro: 7 s GSAP timeline (horizon, ribbon grows along its UVs, five tiles enter independently, monolith revealed by a clipping plane from the floor up, traces meet at the core, final arc to hero). Live OrbitControls take over from the exact last frame, with no cut.
- Folder interaction: the real Tile_folder flies to the camera, faces the visitor, and opens HTML with the live site's exact text (01 How it works, ADD). It returns to its orbit; Esc and keyboard work.
- Measured: 51 to 54 fps on Alexander's Mac in Chrome (planar reflection on). Mobile not yet measured.
- Transfer (production): GLB 314 KB brotli + code 163 KB brotli ≈ 0.48 MB + fonts.
- Known gaps against Cycles:
  - The ribbon's back loops are not visible through the case (Three.js transmission limit; fix: a proxy pass).
  - The case edge definition is weaker than in Cycles.
  - The real-time hero framing is slightly wider than the Cycles hero.
- Lessons:
  - Additive layers in three.js blend after sRGB conversion, so stacked additive reflections turn white.
  - scene.background is not tone-mapped while the same background seen through glass is, so glass reads grey; use a tone-mapped cove sphere instead.
  - gltf-transform optimize strips UVs that no texture uses (keep them with --prune-attributes false) and instances identical meshes (turn that off with --instance false).
