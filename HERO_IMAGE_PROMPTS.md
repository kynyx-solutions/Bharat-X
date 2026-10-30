# Homepage Hero — Image Prompts (ChatGPT)

Prompts for the 8 existing slides of the homepage hero, plus new slides for BharatX Agro (#9) and the group's deeptech/AI-first vision (#10), (`frontend/src/components/home/HomeHeroSection.tsx`).

## How to use

1. Open ChatGPT. Paste **one prompt per message**, exactly as written, because each one is complete on its own.
2. If a result isn't right, reply with a short fix in the same chat, e.g. "less saturated", "move the people further right", "remove the text on the screen".
3. Download each image and save it as `frontend/public/assets/hero/hero-<id>.png`, using the **id** shown in each heading.
4. Claude will then crop them to 2:1, convert them to WebP and update the slide list.

**Layout rule for every image:** the headline, buttons and stats sit in the **lower-left**, and the slide control sits in the **bottom-right**. Keep the main subject in the **right half / upper-middle**, and keep the lower-left plain.

---

## 1. Infrastructure — id: `infra`
Tagline: *Building Arteries Of Bharat*

```
Generate a wide landscape image (1536x1024).

Documentary photograph, wide shot: a newly built six-lane expressway interchange in India under construction, concrete flyover segments, a tall gantry crane, and Indian civil engineers in hard hats and hi-vis vests reviewing drawings in the mid-ground on the right side of the frame. Overcast morning light with slight atmospheric haze.

Keep the lower-left third of the frame calm and uncluttered (open sky or plain road surface) because headline text will be placed there. Keep the main subject in the right half.

Style: photorealistic, natural light, muted realistic color grading, full-frame camera, 35mm lens. No text, no logos, no watermarks, not oversaturated, no HDR look, no dramatic sunset.
```

## 2. Technology & AI — id: `tech-ai`
Tagline: *Intelligence Engineered For Bharat*

```
Generate a wide landscape image (1536x1024).

Documentary photograph, wide shot: a modern AI engineering office in Bengaluru, India. A small team of young Indian engineers working at large monitors showing abstract data dashboards, and one woman presenting at a glass wall covered with sticky notes. The people are positioned in the right half of the frame. Soft daylight from large windows, natural skin tones, shallow depth of field.

Keep the lower-left third of the frame calm and softly out of focus because headline text will be placed there.

Style: photorealistic, natural light, muted realistic color grading, 35mm lens. No readable text on screens, no logos, no watermarks, not oversaturated, no sci-fi holograms.
```

## 3. BharatX Labs (sustainable materials) — id: `labs`
Tagline: *Ideas. People. Possibilities.*

```
Generate a wide landscape image (1536x1024).

Documentary photograph, wide shot: an Indian materials-science lab developing sustainable packaging. A female Indian researcher in a lab coat and safety glasses examines a molded-fibre packaging prototype. Shelves of natural fibre samples, bagasse and paper-pulp trays, and testing equipment around her. She is positioned on the right side of the frame. Clean, soft daylight, shallow depth of field.

Keep the lower-left third of the frame calm and uncluttered because headline text will be placed there.

Style: photorealistic, natural light, muted realistic color grading, 35mm lens. No text, no logos, no watermarks, not oversaturated.
```

## 4. Precision Manufacturing — id: `manufacturing`
Tagline: *Precision Engineering At Scale*

```
Generate a wide landscape image (1536x1024).

Documentary photograph, wide shot: inside an Indian precision manufacturing plant that makes industrial caster wheels. A CNC machining line, racks of finished polyurethane and steel caster wheels, and an Indian machinist in work uniform and safety glasses inspecting a wheel with a caliper on the right side of the frame. Natural light from skylights mixed with practical factory lights.

Keep the lower-left third of the frame calm and uncluttered because headline text will be placed there.

Style: photorealistic, natural light, muted realistic color grading, 35mm lens. No text, no logos, no watermarks, not oversaturated, no sparks.
```

## 5. Heavy Civil & Transport Corridors — id: `civil`
Tagline: *Connecting India's Corridors*

```
Generate a wide landscape image (1536x1024).

Documentary aerial drone photograph from medium altitude: an elevated rail and highway transport corridor under construction, crossing a river plain in north India. Precast concrete piers, a launching girder gantry, trucks on a haul road, and farmland on both sides. The construction runs diagonally through the upper-right part of the frame. Early morning natural light with light haze.

Keep the lower-left third of the frame calm (open farmland or water) because headline text will be placed there.

Style: photorealistic, natural light, muted realistic color grading. No text, no logos, no watermarks, not oversaturated, no dramatic sunset.
```

## 6. Sustainability & Circular Economy — id: `sustainability`
Tagline: *Pioneering Sustainable Horizons*

```
Generate a wide landscape image (1536x1024).

Documentary photograph, wide shot: a clean, organised Indian material-recovery and recycling facility. Neatly stacked bales of sorted plastic and cardboard, a conveyor sorting line, and Indian workers in uniforms, gloves and masks working on the right side of the frame. Natural daylight from a high, open shed roof. Dignified and professional.

Keep the lower-left third of the frame calm and uncluttered because headline text will be placed there.

Style: photorealistic, natural light, muted realistic color grading, 35mm lens. No text, no logos, no watermarks, not oversaturated, no garbage-dump imagery.
```

## 7. Clean Energy — id: `clean-energy`
Tagline: *Powering Sovereign Clean Energy*

```
Generate a wide landscape image (1536x1024).

Documentary photograph, wide shot: a utility-scale solar farm in Rajasthan, India. Long rows of solar panels receding toward the horizon, dry desert scrubland, and two Indian technicians in hi-vis vests and hard hats inspecting a panel row on the right side of the frame. Clear late-morning natural light.

Keep the lower-left third of the frame calm (plain sky or ground) because headline text will be placed there.

Style: photorealistic, natural light, muted realistic color grading, 35mm lens. No text, no logos, no watermarks, not oversaturated, no lens flare, no wind turbines.
```

## 8. BharatX Group (connected ecosystem) — id: `ecosystem`
Tagline: *Building Businesses. Enabling Bharat.*

```
Generate a wide landscape image (1536x1024).

Documentary photograph: six Indian professionals of different ages and roles (an engineer in a hard hat, a farmer-entrepreneur, a woman executive, a young technologist, a factory supervisor, a senior leader) walking together and talking on the open rooftop terrace of a modern office building in New Delhi. The city is softly visible behind them. The group is positioned in the right half of the frame. Candid, not posed. Late-afternoon natural daylight, shallow depth of field.

Keep the lower-left third of the frame calm and softly out of focus because headline text will be placed there.

Style: photorealistic, natural light, muted realistic color grading, 50mm lens. No text, no logos, no watermarks, not oversaturated, no collage.
```

## 9. BharatX Agro (agriculture & food systems) — id: `agro`
Tagline: *From Bharat's Fields To The World* (suggested — new slide, not in the current hero)

```
Generate a wide landscape image (1536x1024).

Documentary photograph, wide shot: an Indian agri-commodity sourcing and processing site at the edge of farmland. Jute and woven sacks of harvested grain and pulses stacked neatly under an open shed, a small sorting and cleaning line, and an Indian farmer in everyday work clothes talking with a young quality inspector who holds a tablet and a handful of grain. The two people are positioned on the right side of the frame, with green fields and a few trees visible in the background. Warm but natural mid-morning light.

Keep the lower-left third of the frame calm and uncluttered (open field or plain ground) because headline text will be placed there.

Style: photorealistic, natural light, muted realistic color grading, 35mm lens. No text, no logos, no watermarks, not oversaturated, no golden-hour sunset, no tractors in the foreground.
```

## 10. BharatX Group — Deeptech & AI-first — id: `ai-first`
Tagline: *AI-First. Built For Bharat.* (suggested)

The group-level vision image. Use it as the **first slide**, or to **replace #8** as the "BharatX Group" slide.
The idea: AI is the operating layer across every BharatX business, not a separate tech showcase. So the image shows real Indian engineers and real hardware, not glowing brains or holograms.

### Option A — Group AI operations centre (recommended)

```
Generate a wide landscape image (1536x1024).

Documentary photograph, wide shot: a calm, modern AI operations centre at an Indian technology campus. A curved wall of large displays on the right half of the frame shows live feeds and abstract data visualisations from the group's businesses: an aerial view of a solar farm, a precision-manufacturing line, a farm field seen from a drone, and a highway construction site, each overlaid with clean abstract charts and detection boxes. In front of the wall, three Indian engineers (two men, one woman, late 20s to 40s, smart-casual clothes) stand and discuss one feed; one points at the screen and another holds a laptop. The room has warm wood and concrete finishes, with daylight from a side window mixing with the cool light from the screens.

Keep the lower-left third of the frame calm, darker and softly out of focus (floor or empty desk) because headline text will be placed there.

Style: photorealistic, documentary, natural light, muted realistic color grading, 35mm lens, shallow depth of field. No readable text or numbers on screens, no logos, no watermarks, not oversaturated, no sci-fi holograms, no glowing brains, no robots with human faces, no neon blue.
```

### Option B — Generative & agentic AI studio

Shows AI agents and multilingual generative AI at work: a team reviewing an agent's workflow, a Hindi voice-agent test, and the GPU servers that power it.

```
Generate a wide landscape image (1536x1024).

Documentary photograph, wide shot: an applied generative-AI studio at an Indian technology company, where a team builds AI agents that automate real business work. On the right half of the frame, a large wall display shows an AI agent's workflow as a clean flowchart: rounded boxes connected by arrows, branching into steps, with small thumbnail icons of a scanned document, an invoice, a map and a chat bubble, and some steps highlighted as completed. In front of it, two Indian engineers (a woman in her 30s and a man in his 40s, smart-casual clothes) discuss the flow; she gestures at one branch of the diagram. At a desk in the mid-ground, a younger Indian engineer wearing a headset speaks into a desk microphone, testing a voice assistant; his monitor shows a simple audio waveform and a chat-style layout of message bubbles. Through a glass wall in the background, a row of GPU server racks with small status lights is softly visible. Modern but lived-in office: whiteboard sketches of boxes and arrows, coffee cups, plants, daylight from large windows.

Keep the lower-left third of the frame calm, darker and softly out of focus (empty desk or floor) because headline text will be placed there.

Style: photorealistic, documentary, natural light, muted realistic color grading, 35mm lens, shallow depth of field. All screen and whiteboard content must be shapes, icons, waveforms and blank message bubbles only — no readable text, letters or numbers. No logos, no watermarks, not oversaturated, no sci-fi holograms, no glowing brains, no humanoid robots, no neon blue, no floating code.
```

**If you want it more "Bharat":** add this line before the Style paragraph:
`Through the window, an Indian city street is softly visible, and one engineer wears a kurta with a lanyard.`

**Tips for this one in ChatGPT:**
- If the screens come out with fake text, reply: "replace all screen content with abstract charts and imagery only, no letters or numbers".
- If it looks too sci-fi, reply: "make it look like a real working office photographed by a journalist, less glossy".

---

## Checklist before handing over
- [ ] All images look like one set: similar light, colour and realism.
- [ ] Lower-left of each image is plain enough for white headline text.
- [ ] No warped hands or faces, no fake text or signage, no logos.
- [ ] Saved as `frontend/public/assets/hero/hero-<id>.png`.
