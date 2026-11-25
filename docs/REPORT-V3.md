# Identity Studio v3: asset, validation and export report (24 Nov 2026)

Baseline: v2 spec (SPEC-LOOKDEV-V2.md). Materials, light rig, Cycles settings and colours are unchanged. Every change below is geometric.

## What changed from v2
| Area | v2 | v3 | Reason |
|---|---|---|---|
| Profile bust | Scanned head + lofted body that widened below the shoulders (read as a vase) | Head scan cut at the narrowest point of the neck; new lofted torso: neck, trapezius slope, square shoulders cut at the deltoid, chest tapering down, flat back; subtle sternal notch, clavicle ridges and spine groove; top sections matched to the measured neck outline of the scan (no collar step); voxel-fused to the head | Mandatory anatomy correction |
| Bust alternative | n/a | "Clean base": same proportions, no surface detail, softer | Comparison requested; no image-to-3D credits spent |
| Glass case | 1.50 × 1.30 × 2.90 | 1.50 × 1.45 × 2.90 | Clearance for the corrected shoulder width |
| Ribbon A | One full twist, behind the case | Same geometry; twist phase moved onto the visible flanks; loop tilted 12° towards the camera | "Existing geometry, better placement" |
| Ribbon B | n/a | Two full twists concentrated in the camera-facing arcs, band 0.70 × 0.12, higher sweep, same 12° tilt | "More pronounced twist" |
| Ribbon path | Passed through the case walls (found by the new validation) | Path radius increased (1.50 to 1.76), Y scale 0.82 to 0.95, centre lowered to keep the face clear | Intersection fix |
| Orbit rings | Cut through four tiles (found by validation) | Glass ring R 2.75 to 2.55, graphite ring R 3.0 to 2.85 | Intersection fix |
| Tiles | Radius about 2.7 to 3.2 m | Moved out to about 3.4 m | Clearance from rings |
| Hero lens | 36 mm | 35 mm, camera 0.4 m further back | Keeps all five tiles in frame |
| Full-scene views | Not rendered | Turntable: the sculpture rotates under fixed lights, as in a product shoot | The light rig stays correct for every angle |

## Geometry validation (world-space BVH overlap test, every object pair)
- Ribbon A and B: **0** self-intersections (band split into 12 chunks, every non-neighbouring pair tested).
- Ribbon vs case, rings, tiles, bust: **0** contacts for both variants.
- Rings vs tiles: **0** contacts.
- Remaining contacts are all intended: bust resting on its glass block, block on the case floor, bead threaded on the glass ring, cyan seam set into the plinth.
- Non-manifold edges: 0 on all glass and bust meshes. The graduation-cap icon has 4 open edges inside the Phosphor outline; it is opaque graphite inside glass and invisible, but it will be welded before production.

## Triangle counts (master)
Bust 167k · Ribbon 70k · each orbit ring 16k · case 1.2k · tiles 1k each + icons 1.4k to 5.7k.

## Web export: measured, not assumed
Source GLB written by Blender 5.3. Extensions used: KHR_materials_transmission, KHR_materials_ior, KHR_materials_clearcoat, KHR_materials_emissive_strength.
**KHR_materials_volume is not written** for Blender absorption nodes. Thickness and attenuation (colour and distance) are therefore applied in Three.js from the spec values: optical glass #DDE6E6 at about 2.9 m, satin #7C8790 at about 0.33 m.

| File (variant B) | Bust / ribbon tris | Size | Brotli | Decode (Node, median of 5) |
|---|---|---|---|---|
| Raw | 16.7k / 31.7k | 2,982 KB | 998 KB | 6 ms |
| Draco, full detail | 15.7k / 20.5k | 189 KB | 174 KB | 24 to 31 ms |
| Meshopt, full detail | 15.7k / 20.5k | 360 KB | 232 KB | 5 to 11 ms |
| Draco, light | 6.6k / 5.2k | 93 KB | 82 KB | 11 to 17 ms |
| Meshopt, light | 6.6k / 5.2k | 211 KB | 123 KB | 3 to 8 ms |

Decode ranges come from two runs, one of them alongside a Cycles render, so treat them as relative, not absolute. Variant A is within about 5% of these sizes.

Not in these numbers: the Draco decoder (about 0.3 MB of wasm and js, downloaded on first use), the Meshopt decoder (about 20 KB, bundled), and Three.js itself (165 KB gzip in this test page).

**Recommendation:** use Meshopt full detail. It costs about 58 KB more than Draco over brotli, but it needs no 0.3 MB decoder, decodes several times faster, and keeps the ribbon smooth enough for refraction. The light versions cut the ribbon to 5k triangles, which is likely to show as faceting in refraction (check on the test page); keep them only as a fallback for low-power phones.

**Against the 1.8 MB budget:** models plus engine come to about 0.4 MB over brotli with Meshopt. That is measured here, but not yet on a real device or with the page's own fonts and images. Treat it as a measurement, not a guarantee.

## Real-time test
- Page: https://claude.ai/artifact/FR89ZkvK4UWrnRRbdjiBTW. Switch between A and B and between the four exports; camera presets for hero, left ¾, right ¾, side, rear, ribbon-through-glass and top; turntable; live fps, slowest frame and draw calls; measured load and decode time.
- On this host, models load through a base64 JavaScript wrapper because the host does not serve .glb files. The production site serves the .glb directly, so download times on the test page are higher than they will be in production.
- Not yet verified on a device: the workspace cannot run a browser. Glass-behind-glass (ribbon seen through the case) is the case to judge on the ribbon-through-glass preset.

## Files
- `v3.py`: full reproducible source (Blender 5.3 Python). Modes: hero, scene:<yaw>, ribbonview:<yaw>, bustcmp:<yaw>, macro:<name>, validate, export; options ribbon=A|B, bust=sculpt|clean, rb=<path radius>.
- `identity_studio_v3.blend`: ribbon B, sculpted bust.
- Head scan: Lee Perry-Smith, CC BY 3.0 (credit required if it ships).
