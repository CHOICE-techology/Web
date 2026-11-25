# Identity Studio look-dev v2: material, lighting and pipeline spec (24 Nov 2026)

Engine: Blender 5.3, Cycles (CPU path tracing), AgX view transform, "Punchy" look, exposure +0.55.
Render: adaptive sampling (threshold 0.015), OIDN denoise, max bounces 24, transmission 20, glossy 10, caustics off, indirect clamp 8.
Scene source: `v2.py` (fully procedural and reproducible); `identity_studio_v2.blend`.

## Models (metres; Blender Z-up)
| Asset | Construction | Size | Notes |
|---|---|---|---|
| Glass case | Cube, Solidify 0.085 inward (real double wall), Bevel 0.03 x 6 segments, harden normals | 1.50 x 1.30 x 2.90 | Hollow vitrine; the bust sits inside with clearance on all sides |
| Graphite plinth | Bevelled block + 4 mm cyan seam on front | 1.62 x 1.42 x 0.12 | The core's single cyan signal |
| Profile bust | Scanned head (Lee Perry-Smith, CC BY 3.0; must be credited) + lofted shoulders/chest, voxel-fused (0.0065) and smoothed | head 0.74 tall | Faces screen-left; watertight; rests on a clear glass block |
| Glass block | Bevelled block under the bust | 0.62 x 0.86 | Clear optical glass |
| Ribbon | Custom sweep: two-winding loop, superellipse cross-section (flat faces, rounded edges), one full twist, closed | 0.62 wide x 0.12 thick | Real solid; broad face presented to camera in front, twist at sides and back |
| Orbit rings | Glass torus R 2.75, tube 0.04 + graphite hairline R 3.0 | | Glass bead (r 0.12) on the outer ring |
| Floor halo | Glass torus R 1.75 + cyan hairline R 2.1 | | Cyan = connection line only |
| Evidence tiles x5 | Bevelled glass block (0.085 x 8 segments) with solid graphite Phosphor icon (cap, briefcase, certificate, folder, globe), 45 mm extruded, mid-depth | 0.66 x 0.26 x 0.66 | Icons from Phosphor, per brand book |

## Materials
| Material | Settings |
|---|---|
| Optical glass | Principled: base white, roughness 0.0, transmission 1.0, IOR 1.50; volume absorption #DDE6E6, density 0.35 (thickness reads as faint neutral edge tone, no blue) |
| Satin glass (profile) | Base #E3E7EA, roughness 0.24, transmission 0.72, IOR 1.45, clear coat 1.0 / 0.02; absorption #7C8790, density 3.0 (soft graphite body, glossy skin) |
| Graphite | #2A2D30, roughness 0.28, coat 0.6 |
| Grey | #545454, roughness 0.35 |
| Cyan signal | #34FAFB, emission 2.2 (hairlines only) |
| Floor | #FAFBFC, roughness 0.20, coat 0.6 / 0.08 (restrained reflection) |
| Cove wall | White, slight self-illumination 0.55 to stay pure white |

## Lighting rig (product-photography)
- Overhead softbox 7 x 4 m, emission 9.
- Side softboxes 3.6 x 3.6 m at 4.2 m height, both sides at 55 degrees.
- Vertical strip lights 0.35 x 4.6 m (emission 22) at the sides for edge highlights; rear rim strips 0.4 x 3.6 m.
- Dark flags (#141618) left and right; large dark card (#1E2124, 14 x 4 m) behind the camera, seen only in the glass's front faces.
- Refraction-only dark strips behind the sculpture: never seen directly, they draw the distorted lines inside the glass.
- One 5 m area light from above for soft contact shadows.
- All softboxes, strips and cards are invisible to camera and cast no shadows: the site stays white.

## From Blender to Three.js
1. Export: glTF 2.0 binary, Y-up, modifiers applied. Transmission, IOR and volume map to KHR_materials_transmission, KHR_materials_ior and KHR_materials_volume.
2. Optimise: decimate the bust to about 10k triangles (normal map baked from the high-res bust), ribbon to about 12k; then meshopt + Draco compression; textures KTX2. Current uncompressed preview GLB: 2.9 MB. Target after optimisation: within the 1.8 MB budget, to be verified, not assumed.
3. Environment: the Blender rig is rebuilt as a PMREM studio environment in Three.js (same softboxes, strips and cards), so reflections match.
4. Glass in the browser: MeshPhysicalMaterial transmission with thickness and attenuation. Transmission renders in a second pass, so draw order and glass-behind-glass need checking. Glass seen through glass is the weakest point in real time.
5. Shadows: baked contact-shadow texture on the floor plus one soft shadow light.
6. Fallback: on low-power devices, a pre-rendered Cycles still or video of the same camera replaces the live glass.
7. Two outputs kept for every stage: the Cycles master (quality target) and the real-time GLB preview (feasibility). Real-time limits never lower the master.
