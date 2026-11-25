# Status, 25 Nov 2026

Gate: look-dev, then 7 s animatic, then film zone, then full site. Now: V4.1a (visual quality) delivered, awaiting approval. V4.1b (certificate and briefcase interactions) has not started.

## What V4.1a found
- Main cause of the gap to Cycles was a V4 bug: the intro overwrote the ribbon and ring scale, so they showed at under half size. Fixed.
- A broken case-edge shader is fixed.
- Camera now matches the Cycles master (35 mm, error under 6 px).
- Ribbon back loops now show through the case (extra render pass).
- Profile material: A (opaque satin), B (satin glass, transmission 0.72 or 0.45), C (satin core plus glass skin). C shows a faint double outline. Leaning B at 0.72, the approved spec. Decision pending.
- Edges: Fresnel only vs edge mask plus live reflection vs both. Leaning both.
- 7 s film re-recorded as 210 separate frames, no blending.

## Not measured yet
- Frame rate on a real Mac and phone (open the prototype with #bench).
- Reduced motion with the real OS setting.
- New Cycles renders (none made this round).

## Images
See `images/2026-11-25-v41a/`: cycles_master_hero, side_by_side_v41a, cmp_materials_profile, cmp_materials_scene, cmp_behind_case, cmp_edges, before_v4_side_by_side.

## Links
Prototype V4.1a (claude.ai artifact, private to Alexander): https://claude.ai/artifact/UhhEJvtBGQs9HVnXVN17hF
To see it, ask Alexander for a screenshot; the artifact itself is not public.

## Reading list for a new reviewer (in order)
README, STATUS, HISTORY, MODELS, then docs/HANDOVER-24NOV-V4-REALTIME.md, docs/REPORT-V4.1A.md, docs/SPEC-LOOKDEV-V2.md, docs/REPORT-V3.md.
