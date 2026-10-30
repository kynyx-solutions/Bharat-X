# Core Verticals: Image Prompts (ChatGPT)

Background images for the homepage **Core Verticals** section (`frontend/src/components/home/BusinessEcosystemGrid.tsx`), one per vertical.

## Why these images look the way they do

White text sits on top of these images in two places:

```
┌──────────────────────────────────────────────────────┐
│  DARK, PLAIN          │   SUBJECT    │  DARK, PLAIN   │
│  title + paragraphs   │  (sector)    │  menu (list)   │
│  + button             │              │                │
│     0% ─────── 45%    │  45% ── 75%  │  75% ── 100%   │
└──────────────────────────────────────────────────────┘
```

- **Left 45%:** the title, two paragraphs and a button. It must be dark, with little detail.
- **Right 25%:** the list of 8 verticals. It must also be dark and plain.
- **Middle band (45–75% across):** the subject that shows the sector.
- **Overall:** low-key, darker-than-normal photos. The section background is deep navy (`#070A1F`), so dark navy shadows with warm highlights on the subject make every image blend in.

## How to use

1. Paste **one prompt per message** in ChatGPT. Each prompt is complete on its own.
2. **Expand to 16:9.** ChatGPT outputs 1536×1024 (3:2), but this section fills the whole screen, so the image needs to be wider. Use **Canva Magic Expand** or **Photoshop Generative Expand** to widen it to **1920×1080** (or 2400×1350). Expand mostly on the **left**, because that side needs to be empty and dark anyway.
3. Save as `frontend/public/assets/verticals/vertical-<id>.png`, using the **id** in each heading.
4. Check: put your hand over the middle band. Is the rest dark and plain enough for white text? If not, reply in ChatGPT: *"make the left half darker and emptier, in deep shadow"*.

**If a result needs a fix, reply in the same chat:**
- Too bright: *"darker overall, low-key lighting, deep shadows"*
- Subject in the wrong place: *"move the subject to the centre-right, leave the left half empty"*
- Fake text appears: *"remove all text, letters and numbers"*

---

## 1. AI & Deeptech — id: `ai-deeptech`

```
Generate a wide landscape image (1536x1024).

Documentary photograph: a dim AI server room at night. A long aisle of GPU server racks with small blue and white status lights recedes into darkness. An Indian engineer in his 30s, smart-casual clothes, stands in the aisle looking at an open laptop held in one arm; the laptop screen softly lights his face. He is positioned in the centre-right of the frame (between 45% and 75% across).

Composition: the left half of the frame is in deep shadow with very little detail (dark rack fronts falling into blackness) because white headline and paragraph text will be placed there. The right quarter is also dark and plain because a white text menu will sit there.

Style: photorealistic, documentary, low-key lighting, dark overall exposure, deep navy-blue shadows with warm highlights on the subject, muted colours, 35mm lens. No text, no letters or numbers on screens, no logos, no watermarks, not oversaturated, no neon, no holograms.
```

## 2. Innovation & Research — id: `innovation`

```
Generate a wide landscape image (1536x1024).

Documentary photograph: an Indian research lab late in the evening. A young Indian woman researcher in a lab coat and safety glasses adjusts a small robotic gripper on a workbench, lit by a single warm desk lamp. Beside it, a tray of soil and seed samples and a small circuit board hint at farming science and smart machines. She and the bench are in the centre-right of the frame (between 45% and 75% across).

Composition: the left half of the frame is in deep shadow with very little detail (dark lab background falling into blackness) because white headline and paragraph text will be placed there. The right quarter is also dark and plain because a white text menu will sit there.

Style: photorealistic, documentary, low-key lighting, dark overall exposure, deep navy-blue shadows with warm highlights on the subject, muted colours, 35mm lens. No text, no logos, no watermarks, not oversaturated, no humanoid robots, no holograms.
```

## 3. Agri & Food — id: `agri-food`

```
Generate a wide landscape image (1536x1024).

Documentary photograph: inside a dim agri-commodity warehouse in India in the early morning. Neatly stacked jute sacks of grain fill the space. A single shaft of morning light falls through a high door onto an Indian quality inspector in a simple work shirt, who scans a tag on a sack with a handheld scanner while holding a handful of grain. He is positioned in the centre-right of the frame (between 45% and 75% across), lit by the light shaft, with fine dust visible in the beam.

Composition: the left half of the frame is in deep shadow with very little detail (dark sack stacks fading into blackness) because white headline and paragraph text will be placed there. The right quarter is also dark and plain because a white text menu will sit there.

Style: photorealistic, documentary, low-key lighting, dark overall exposure, deep navy-blue shadows with warm highlights on the subject, muted colours, 35mm lens. No text, no logos, no watermarks, not oversaturated.
```

## 4. Capital & Venture Building — id: `capital`

```
Generate a wide landscape image (1536x1024).

Documentary photograph: an evening meeting in a small glass-walled boardroom in an Indian city. A young Indian founder leans forward and explains something, while two experienced Indian investors (a woman in her 40s and a man in his 50s) listen closely across a wooden table with notebooks and a laptop. A warm pendant lamp lights the table; the city at dusk is softly blurred through the glass. The group is in the centre-right of the frame (between 45% and 75% across).

Composition: the left half of the frame is in deep shadow with very little detail (dark wall or blurred dark glass) because white headline and paragraph text will be placed there. The right quarter is also dark and plain because a white text menu will sit there.

Style: photorealistic, documentary, candid, low-key lighting, dark overall exposure, deep navy-blue shadows with warm highlights on the subjects, muted colours, 50mm lens. No text, no logos, no watermarks, not oversaturated, no handshake pose.
```

## 5. Infratech & Heavy Engineering — id: `infratech`

```
Generate a wide landscape image (1536x1024).

Documentary photograph: night work on an elevated flyover deck under construction in India. Floodlights light a concrete pour; a concrete pump boom arcs overhead, and two Indian engineers in hard hats and hi-vis vests check the work, their vests catching the light. The lit work area is in the centre-right of the frame (between 45% and 75% across), with the deep blue night sky above.

Composition: the left half of the frame is dark (night sky and the unlit, shadowed flyover structure) with very little detail because white headline and paragraph text will be placed there. The right quarter is also dark and plain because a white text menu will sit there.

Style: photorealistic, documentary, night photography, low-key lighting, dark overall exposure, deep navy-blue shadows with warm floodlight highlights, muted colours, 35mm lens. No text, no logos, no watermarks, not oversaturated, no lens flare.
```

## 6. Industrial Manufacturing — id: `manufacturing`

```
Generate a wide landscape image (1536x1024).

Documentary photograph: a dim quality-control bay in an Indian factory. Under a single overhead work light, an Indian technician in a work uniform and safety glasses tests a heavy-duty industrial caster wheel mounted on a load-testing rig. Finished caster wheels (polyurethane treads, steel brackets) are lined up on the bench beside him. He and the rig are in the centre-right of the frame (between 45% and 75% across).

Composition: the left half of the frame is in deep shadow with very little detail (dark factory floor fading into blackness) because white headline and paragraph text will be placed there. The right quarter is also dark and plain because a white text menu will sit there.

Style: photorealistic, documentary, low-key lighting, dark overall exposure, deep navy-blue shadows with warm highlights on the subject, muted colours, 35mm lens. No text, no logos, no watermarks, not oversaturated, no sparks.
```

## 7. Packaging & Materials — id: `packaging`

```
Generate a wide landscape image (1536x1024).

Documentary photograph: a packaging warehouse loading dock at dusk in India. Inside the dim warehouse, a forklift carries a pallet of brown corrugated boxes wrapped in clear stretch film toward an open dock door; beyond the door is a truck and a deep blue dusk sky. Warm interior lights catch the cardboard and the film. The forklift and pallet are in the centre-right of the frame (between 45% and 75% across).

Composition: the left half of the frame is in deep shadow with very little detail (dark racking and stacked materials fading into blackness) because white headline and paragraph text will be placed there. The right quarter is also dark and plain because a white text menu will sit there.

Style: photorealistic, documentary, low-key lighting, dark overall exposure, deep navy-blue shadows with warm highlights on the subject, muted colours, 35mm lens. No text or printing on boxes, no logos, no watermarks, not oversaturated.
```

## 8. Education & Social — id: `education-social`

```
Generate a wide landscape image (1536x1024).

Documentary photograph: an evening skills-training class at a community centre in a small Indian town. An Indian woman instructor shows a group of four young trainees (two women, two men, late teens to early 20s) how to wire an electrical panel mounted on the wall. Warm tube-light and lamp light fall on the group; the rest of the room is dark. The group is in the centre-right of the frame (between 45% and 75% across), focused and engaged.

Composition: the left half of the frame is in deep shadow with very little detail (dark classroom wall and empty desks fading into blackness) because white headline and paragraph text will be placed there. The right quarter is also dark and plain because a white text menu will sit there.

Style: photorealistic, documentary, candid, low-key lighting, dark overall exposure, deep navy-blue shadows with warm highlights on the subjects, muted colours, 35mm lens. No text, no logos, no watermarks, not oversaturated, not posed.
```

---

## Checklist
- [ ] All 8 images look like one set: dark, navy shadows, warm light on the subject.
- [ ] Left 45% and right 25% are dark and plain enough for white text.
- [ ] Each sector is recognisable from the middle band alone.
- [ ] No fake text on screens, boxes or walls; no warped hands or faces.
- [ ] Expanded to 16:9 (1920×1080 or larger).
