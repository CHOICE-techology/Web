# Whole-site motion storyboard v0.1 (Task 03)

Date: 26 Nov 2026. Author: Claude, from ChatGPT's deep research and handover of 26 Nov, checked against the repo files. Text only. No code, no render, no new assets, no change to the prototype, copy or /app. NOTHING HERE IS APPROVED. Every ALEXANDER DECISION marker belongs to him.

Labels: VERIFIED = read in a file or the brand book by Claude. USER-SUPPLIED = from Alexander's messages. CHATGPT = from ChatGPT, not independently checked. PROPOSAL = a suggestion, not a decision.

## 1. Sources and corrections
- VERIFIED: brand book p.37 gives the four motion actions TRACE, CONNECT, REVEAL, RELEASE and the rule "if the animation can be removed without losing meaning, simplify it". Palette (white, black, grey #545454, cyan #34FAFB, pink #FF008A for CHOICE DAO only), Poppins and Nunito, 8 px corners, 2 px black focus outline all match ChatGPT's report.
- VERIFIED: docs/BRIEF-CINEMATIC-3D-FOR-OPUS.md (22 Nov) describes a staged film zone: one gesture is one 2 to 3 s eased camera move, input locked during the move, scroll up reverses one stage, six stages ending at "No score".
- VERIFIED: docs/HANDOVER-23NOV-CINEMATIC-SITE.md (23 Nov, later) says the top zone is "pinned and scrubbed (GSAP + ScrollTrigger)" and the film zone runs Hero to How it works.
- CORRECTION: neither document is "the baseline". The two disagree on both movement and endpoint, and the later one favours scrubbing. ChatGPT, and an earlier Claude prompt, called staged the baseline. That was wrong. Both stay as equal alternatives.
- VERIFIED: the 23 Nov amendment 4 says mobile gets its own camera composition, native vertical scroll and no long pin. Any pinned option must respect it.
- CORRECTION: ChatGPT says a folder opening is outside scope until V4.1b. The folder opening the ADD card already exists in the V4 prototype (docs/WHOLE-SITE-EXPERIENCE-ARCHITECTURE-DRAFT.md, section 6). V4.1b is only the certificate and briefcase. The ADD folder may be used at step 1 of How it works; nothing else is added.
- NOT PROVIDED: choice-id-preview-source.zip. The text for DISCOVER, FIND, APPLY, SHARE, the YOU and WORK dots and the second toggle state is UNVERIFIED and stays blank below.

## 2. Three separate experiences
| Layer | What it is | Scroll | Status |
|---|---|---|---|
| A. Intro | The 7 s load film built from the live scene, ending in the live hero pose. Skip button, wheel after 0.6 s, or Enter, Space, Escape, Arrow Down, Page Down. | Plays alone | VERIFIED in REPORT-V4 and the architecture draft. ChatGPT's 0 to 7 s timing table is CHATGPT, not checked |
| B. Film zone | Authored story, see section 4. | Alternatives below | ALEXANDER DECISION |
| C. Reading zone | The rest of the page, scrolls normally. Fixed canvas, a few quiet named poses, no pin, no scroll takeover. | Native | PROPOSAL (DECISION 1 in the architecture draft) |

Rule for A: the first headline and the primary controls never wait for WebGL. If the scene is late, the page reads and works.

## 3. Named states (proposal)
hero, scatter, home, step1 to step5, calm, link, forward, quiet, settled. Each has a desktop camera and a separate mobile camera. One owner sets the state, so two triggers cannot fight. A section with no narrative purpose gets "quiet", never a new move.

## 4. Film zone: four combinations (ALEXANDER DECISION)
Movement and endpoint are independent choices.

| | Ends after How it works | Ends after No score |
|---|---|---|
| Staged, input locked (22 Nov) | A. Five states, shortest. No score opens the reading zone. | B. Six stages as in the 22 Nov brief. Longest time under lock. |
| Pinned and scrubbed (23 Nov) | C. Scroll drives the timeline. No score opens the reading zone. | D. Longest pin. Fast scrolling can skip the ethical boundary. |

Per movement style (CHATGPT, consistent with the briefs):
| Point | Staged | Pinned and scrubbed |
|---|---|---|
| Keyboard | Arrows, Page keys, Space advance one stage. "Skip the film" link. | Normal scrolling and keys. "Skip the film" link. |
| Reverse | Scroll up goes back one stage. Leftover momentum is discarded. | Natural, if the timeline is symmetrical. |
| Anchors | Every nav link must still reach its section from any state. | Same. |
| Mobile | Tap or swipe per stage (22 Nov). Lock must never trap. | Must follow amendment 4: own camera, no long pin. |
| Reduced motion | Stages become plain cross-fades, no camera travel, no timed lock (22 Nov). | No scrubbed camera. Normal scroll, static pose per section. |
| Main failure | Stuck lock, double trigger, user cannot leave. | Pin jump on iOS, fast scroll skips content, long pin. |
| Build effort | Medium to high (input state machine). | Medium to high (pin and viewport testing). |

## 5. Section storyboard (17 sections, approved order)
Objects named are only those in MODELS.md: monolith with profile bust, ribbon, orbit rings, five tiles. Action = one of the four brand terms. All copy, links and CTAs stay as live HTML.

| # | Section | Action | Objects and state (start to end) | HTML that stays | Input: pointer, keyboard, touch | Mobile | Reduced motion | Cost and failure |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero, with "Tap a dot" PROOF / YOU / WORK | REVEAL | All objects. End of the 7 s arc settles in "hero". Dots highlight a part (which part: DECISION 3) | Headline, subline, two CTAs, dots | Dots by tap, click, Tab and Enter. Skip intro always visible | Own camera, no intro cut | Final pose, no intro | Medium. Failure: headline waits for scene |
| 2 | Sound familiar? | TRACE | "scatter": ribbon and tiles drift to different depths, cyan lines thin | Headline, 9 out of 10 and 7 out of 10, NumberBarn source, subheading, paragraphs | None | Short cross-fade | Static scatter pose | Low. Failure: motion competes with the statistics |
| 3 | 00 The short version | CONNECT | "home": pieces return to the monolith, lines draw whole | Problem, answer, how | None | Cross-fade | Static home pose | Low |
| 4 | 01 How it works | CONNECT then REVEAL | "step1" to "step5": five short holds along the ribbon. Step 1 may use the existing folder and ADD panel | Five labels, ADD text. DISCOVER, FIND, APPLY, SHARE text UNVERIFIED | Step by tap or keys. Folder by click, Enter | Five stacked cards, step by tap | Five stacked cards, no camera move | Medium. Failure: five moves read as decoration |
| 5 | 02 Our promise (NO SCORE) | RELEASE | "calm": level, symmetrical, nothing above anything else | Heading, three paragraphs, eight list lines (symbols: DECISION) | None | Static | Same pose | Low. Failure: any podium or ascending order |
| 6 | 03 One link, two sides | CONNECT | "link": ribbon spans two sides. Toggle changes text, optional soft highlight | Toggle, both What you get blocks (second state UNVERIFIED) | Toggle by click, tap, keys | Toggle works without 3D | Toggle only | Low |
| 7 | 03b What you get | REVEAL | "forward": one pose on entry. No tile per card | Six cards | None | Cards read normally | Static | Low. Failure: implies a mapping that does not exist |
| 8 | 03c Your controls | RELEASE | "quiet": ribbon withdraws, nothing implies a working switch | Three promises, GDPR paragraph | None | Static | Static | Low |
| 9 | 04 What counts as proof | REVEAL | "forward" with the five tiles as vocabulary. Certificate and briefcase panels wait for V4.1b | Six cards including "Never" (no object) | None until V4.1b | Cards as normal section | Static | Low. Failure: forcing six cards onto five tiles |
| 10 | 05 Watch | RELEASE | "quiet" | Click to load film, YouTube link | Video unchanged | Unchanged | Unchanged | Low. Failure: autoplay |
| 11 | 06 Team | RELEASE | "quiet" | Six profiles, photos, roles, links | Links unchanged | Static | Static | Low |
| 12 | 06b Why we build it | CONNECT | "settled": ribbon and monolith in one connected pose | Headline, paragraph, Taila image (section ownership UNVERIFIED) | None | Static | Static | Low |
| 13 | 07 Meet Taila | RELEASE | "quiet" | Heading, paragraph, Taila image | Unchanged | Static | Static | Low |
| 14 | 08 Ask a question | RELEASE | "quiet" | Live question box, exactly as today (code NOT PROVIDED) | Form unchanged | Static | Static | Low. Failure: rebuilding the form from the heading |
| 15 | 09 Questions | RELEASE | "quiet", never behind dense text | 11 questions and answers | Accordions unchanged | Static | Static | Low |
| 16 | Closing | CONNECT then RELEASE | "settled": ribbon reconnects to the whole object | Closing lines, two buttons, email link (address NOT CAPTURED) | Buttons unchanged | Static | Static | Low |
| 17 | Footer | RELEASE | "settled", rendering may stop | Foundation text, footer links | Links unchanged | Static | Static | None |

Notes on differences from other drafts:
- Hero is REVEAL here. ChatGPT proposes TRACE. Either fits; ALEXANDER may choose.
- Section 8 is RELEASE here and in ChatGPT's table. The earlier Claude map said TRACE with a held "case" pose. RELEASE is the better fit for "you hold the controls". PROPOSAL.
- Film stages from the 22 Nov brief map to rows 1 to 5: stage 1 hero, stage 2 PROOF push in (row 1 dots), stage 3 Sound familiar, stage 4 In short, stage 5 five stations (row 4), stage 6 No score (row 5).

## 6. Common behaviour
- Mobile: own camera per state, native vertical scroll, optional drag never blocks scrolling, no hover needed, lighter profile (existing phone defaults).
- Reduced motion with the real OS setting: no intro, no camera travel, no parallax, no lock, same content in the same order. Not yet tested on a real device.
- Skip, reverse, exit: every cinematic moment has a visible skip, a way back and a way out. Direct anchors work from any state.
- Text: headings may use a whole-heading or masked line reveal, short only, full sentence always in the DOM. No typewriter, scramble, blur reveal or large parallax. CHATGPT's five options are in docs/DEEP-RESEARCH-GPT.md when saved.
- Performance: every figure is a target until measured. Record device, OS, browser, viewport, scene variant and duration. `#bench` does not measure the 7 s intro; test both.

## 7. ALEXANDER DECISIONS
1. Film movement: staged or scrubbed (section 4).
2. Film endpoint: after How it works or after No score.
3. Tile meaning and what the dots PROOF, YOU, WORK highlight.
4. Profile material (B at 0.72 leaning), edge treatment ("both" leaning), `#cam-r` and `#strips-late` as defaults after the device test.
5. Symbols in 02 Our promise.
6. Font: Nunito (brand book) or Public Sans (live site). ChatGPT's list omitted this.
7. "Neon balloon" meaning and how far glow may go (docs/BRAND-AMENDMENTS-26NOV-DRAFT.md).
8. Quiet 3D poses in the reading zone, yes or no.
9. Opening November wording after November.
10. Reduced motion look (cross-fade or static pose).
11. Test devices: which Mac, iPhone and mid-range Android.
12. Deadline for the new site against the live one.

## 8. Missing inputs
choice-id-preview-source.zip; the Ask a question code; the email target; the Blender source; the Reels as recordings; the exact URL of the animation site Alexander mentioned.

## 9. Ideas that would change the direction (not part of this plan)
- Cards or panels placed in 3D space.
- Any glow beyond a thin cyan signal or a very restrained rim, until Alexander defines "neon balloon".
- A persistent stage beside the reading column instead of a fixed full canvas (layout change).
- Folder, certificate or briefcase interactions beyond ADD (V4.1b).
