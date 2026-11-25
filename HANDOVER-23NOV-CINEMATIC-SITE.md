# Handover, 23 Nov 2026: choice-id.work cinematic site

Start a new chat from this file. Read it with `BRIEF-CINEMATIC-3D-FOR-OPUS.md` (decisions of 22 Nov).

## Where things stand
- **Current task:** waiting for Alexander to approve the plan doc. No coding until he approves.
- **Plan doc (storyboard, camera, assets, intro film, section map, technical plan, gates):** https://claude.ai/artifact/VPtBT5hYAqY8ZPhmnKTVpa
- **Latest working preview (React + Framer Motion prototype, real live content):** https://claude.ai/artifact/JjxC6fbPasTw6kFQc8uAiE. Alexander liked the direction (glass panels, hotspots on the ribbon, step cards landing on the How it works image, link card, footer) but now wants a true 3D cinematic site, not cropped images and small labels.
- The earlier Three.js motion test (stand-in shapes) was rejected: code-built glass looks cheap.

## Alexander's latest brief (23 Nov, condensed)
- One central 3D environment: glass ribbon (ref A) + identity monolith with profile head (ref B) + orbital rings (ref C), look of the latest render "CHOICE_iD_Glass_Identity_Hero_1" (glass monolith with profile head, ribbon, rings, tiles: cap, briefcase, certificate, folder, globe, mirror floor).
- Real GLB models, real glass (refraction, thickness, bevels), white environment, graphite structure, cyan #34FAFB only as a signal. No purple, rainbow, cyberpunk, excess blur, particles. Logo flat and unchanged.
- 6 to 8 s intro film with moving camera; ribbon travels around the core; elements enter from different depths and connect into one identity.
- Scroll moves the camera through the scene. Top zone pinned and scrubbed (GSAP + ScrollTrigger); the rest scrolls naturally. Hover, drag, click on 3D objects. Separate mobile version.
- Use the live site's content exactly (sections, links, claims, team, film, FAQs). Do not touch /app.
- Reference style: MotionSites Plume and Ascend.

## Plan in short (see the doc)
- Ribbon, monolith, rings, tiles modelled in Blender; head via image-to-3D or a CC0 head base; icons extruded from vectors; glass set in code (MeshPhysicalMaterial).
- Stack proposal: Vite + TypeScript, Three.js r186, GSAP/ScrollTrigger, plain HTML content (no React in production). Fixed canvas behind HTML; a scene director with named states; film zone = Hero to How it works.
- Gates: 1 plan, 2 look-dev still beside refs, 3 timing animatic, 4 film zone, 5 whole page, 6 QA.

## Open questions for Alexander
1. Who runs image-to-3D (this session cannot reach Meshy, Tripo, Rodin)? Recommendation: CC0 head base + Blender.
2. Confirm "mockup 1" = brighter PROOF/YOU/WORK mockup, "mockup 2" = latest render.
3. Brand book file is not in the project; attach it.
4. Access for the real build: repo `CHOICE-techology/SANDBOX` and Mac folder `~/SANDBOX/identity-wip` were both refused earlier. Need folder added in the desktop app or repo access.
5. Code of the live "Ask a question" box (must keep working unchanged).

## Live site facts (pulled from choice-id.work on 23 Nov)
- Colours: cyan #34FAFB, grey #545454, bg #FFFFFF / #F6F7F8, rule #E7E9EB. Fonts: Poppins (headings, buttons), Public Sans (body).
- Logo: iD mark (icon-192.png) with "CHOICE" in #545454; Alexander wants it as "CHOICE" followed by the iD mark (not a second text "iD").
- Buttons (3D): ghost = 1px black border, radius 8, inset white highlight + soft outer shadows; primary = black with inset highlights and deep shadow. Padding 15x24, Poppins 600 15px.
- Section order: Hero, Tap a dot (Proof./You./Work. sentences), Sound familiar (9/10, 7/10, source NumberBarn Sept 2026), 00 The short version, 01 How it works (ADD, DISCOVER, FIND, APPLY, SHARE), 02 No score, 03 One link two sides, 03B What you get, 03C Your controls (GDPR), 04 What counts as proof, 05 Watch (YouTube BS3bzfNWfeI, click to load), 06 Team (6 people with LinkedIn), 06B Why we build it, 07 Meet Taila, 08 Ask a question, 09 Questions (11), closing, footer.
- All exact text is saved in the prototype source `src/content.ts` (zip sent in chat: choice-id-preview-source.zip).
- Team: Alexander Aleksashev-Arno (Founder & CEO), Hemilly Rodrigues (CFO), Raffaella Ciani (Co-Founder & CTO), Leah Dentz (Chief Extended Reality Officer), Christopher Sicurella (Co-Founder & Chief Growth Officer), Yuliia Ovcharyk (Chief Creative Officer).

## Useful technique
- Images from the live site can be captured via the built-in browser: lay them out in an overlay on choice-id.work, take a `zoom` screenshot, which is saved under /tmp/claude-tool-results/ in the workspace, then crop locally. Typing base64 by hand corrupts files.
- The workspace cannot reach choice-id.work or CDNs directly; npm works.

## Rules that still hold
No dashes in copy, no check marks, scores or rankings, no pink/purple/blue, every word and link kept, preview artifacts only, no merge or deploy, do not touch /app.
