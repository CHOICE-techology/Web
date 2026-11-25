# The 3D models: what they are and where they are

All models live in one file: `models/identity_studio_v3_web_v41a.glb` (476 KB raw, about 306 KB brotli). Built in Blender 5.3 from `v3.py` (not included here; the Blender scene source is on the team's machine, see "Not in this repository"). Exported as glTF binary, meshopt compressed. Units are metres.

| Object (GLB node) | What it is | Size and detail |
|---|---|---|
| GlassCase | Hollow glass vitrine that holds the bust. Real double wall. | 1.50 x 1.45 x 2.90, wall 0.085, bevel 0.03 |
| Plinth + CyanSeam | Graphite base with a thin cyan seam. The only cyan in the core. | 1.62 x 1.42 x 0.12, seam 4 mm |
| ProfileBust | Sculpted head and shoulders in profile, facing screen-left. Satin glass. | head 0.74 tall, about 16.7k triangles |
| GlassBlock | Clear glass block the bust rests on. | 0.62 x 0.86 |
| Ribbon (variant B) | Glass ribbon that loops around the case with two full twists on the camera-facing arcs. Carries UVs (u along the band) so it can grow on screen. | band 0.70 x 0.12, about 31.7k triangles |
| Orbit0 / Orbit1 | Two thin orbit rings, glass and graphite hairline. | glass ring R 2.55, graphite R 2.85 |
| GlassBead | Small glass bead threaded on the outer ring. | r 0.12 |
| FloorHalo + CyanOrbitLine | Glass ring and cyan hairline on the floor around the plinth. Cyan = connection only. | R 1.75 and 2.1 |
| Tile_graduation-cap, Tile_briefcase, Tile_certificate, Tile_folder, Tile_globe | Five evidence tiles: glass block with a solid graphite Phosphor icon inside. About 3.4 m from the centre. | 0.66 x 0.26 x 0.66 |

Other files:
- `models/identity_studio_v3_web_v4_original.glb`: the V4 export before UVs were removed from non-ribbon meshes (527 KB).
- Renders of these models: `images/` (Cycles master and browser comparisons).

## Materials in code (Three.js)
Optical glass: IOR 1.5, attenuation #DDE6E6 at 2.9 m. Satin glass (profile): approved Blender values IOR 1.45, roughness 0.24, clear coat 1, absorption #7C8790. Graphite #2A2D30. Cyan #34FAFB, signal only. Full numbers: `docs/SPEC-LOOKDEV-V2.md`.

## Credit
The head is based on a scan by Lee Perry-Smith, CC BY 3.0. Credit is required wherever it ships. Icons: Phosphor Icons.

## Not in this repository
The Blender source (`v3.py`, `identity_studio_v3.blend`) and the original Cycles render files live with the team, not here. The images of the Cycles master are included for comparison.
