# Identity Studio V4.1a: visual quality pass (24 Nov 2026)

Prototype: https://claude.ai/artifact/UhhEJvtBGQs9HVnXVN17hF (V4 left untouched at 3ZRvg13tRsDjwbBzQT9tsN). No homepage, /app or V4.1b work.

## Findings in the V4 code
- **Scale bug:** the intro set ribbon and orbit ring scale to 1, overwriting the GLB's own scale (2.2 to 2.9). In V4 the ribbon and rings showed at less than half their size. Fixed; this is the largest single gap to Cycles.
- **Broken edge shader:** the Fresnel overlay used a variable the clipping chunk did not expect, so on clipped meshes (the case) it failed to compile. Fixed.
- **Camera:** solved from the Cycles master (35 mm, tile centres and case top edge, error under 6 px). Cycles hero: camera (-0.936, 1.478, 10.643), target (0, 1.774, 0). V4 had the camera 0.5 m higher.
- **Triangle counts:** V4's counter reset inside nested passes (floor reflection), so readings varied (173k vs 248k). Now: static scene triangles (131k, same everywhere) plus draw calls per whole frame.

## Changes
- Profile modes A / B / C via URL hash (#mat-a, #mat-b with #btrans-0.72 or 0.45, #mat-c).
- Behind-case pass (#proxy-1, default on desktop): scene rendered without the case, case refracts that image. The ribbon's back loops and a transmissive profile now show through the case. Costs one extra scene render.
- Refraction-only dark strips from the Cycles rig, drawn only into refraction buffers.
- Ribbon: front faces refract at the real 0.12 m band thickness; back faces as a thin reflective skin (#ribbon-v4 for the old method).
- Case edges: geometric edge mask gating live environment reflection, compared with Fresnel (#edge-fresnel, -mask, -both). Reflections stay view-dependent; no Cycles reflection baked in.
- GLB: UVs removed from 15 meshes, kept on the ribbon. 527 to 476 KB raw, 321 to 306 KB brotli (estimate of 430 KB was optimistic).
- Rendering pauses after 8 s idle, when off-screen or when the tab is hidden; wakes on pointer, key, resize.
- Skip intro also on Enter, Space, Escape, arrow down and scroll.
- #frame-N renders the timeline at exactly N/30 s. 210 frames captured, no blending.
- #bench: fixed 12 s camera sweep; reports median fps, slowest 5 percent, worst frame, draw calls, triangles, GPU.

## Not done here
- Desktop and phone fps: needs #bench on real hardware (Chrome was not reachable).
- New Cycles renders: no Blender in this workspace; comparisons use the existing Cycles hero.
- Reduced motion tested only in code paths, not with the OS setting on a device.
- The intro camera was tuned for the undersized V4 ribbon; with the true size, early shots are tighter. Review at the animatic gate.
