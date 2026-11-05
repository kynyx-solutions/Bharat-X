# Core Verticals: Image Prompts (ChatGPT)

Background images for the homepage **Core Verticals** section (`frontend/src/components/home/BusinessEcosystemGrid.tsx`), one per vertical. Each prompt is a **new concept**, different from the current image for that vertical and from the hero images.

## How the image and the text work together

White text sits on top of the image on both sides:

```
┌─────────────────────────────────────────────────────────────┐
│ CORE VERTICALS                                              │
│ ┌──────────┐                           ┌──────────────────┐ │
│ │ MENU     │     the scene fills       │ Title            │ │
│ │ (8 tabs) │     the whole frame       │ 2 paragraphs     │ │
│ │          │                           │ [Visit website]  │ │
│ └──────────┘                           └──────────────────┘ │
│  0% ── 28%  ←───── full scene, edge to edge ─────→ 55%–100% │
│  CALM zone        HERO MOMENT (faces, action)      CALM zone│
└─────────────────────────────────────────────────────────────┘
```

- **The scene fills the whole frame, edge to edge.** No black side panels, no "subject in the middle with empty sides".
- **Calm zones (left 28% and right 45%):** the scene continues there, but only as **plain, smooth surfaces**: a plain painted wall, open sky, calm water, empty floor. Medium-to-deep tones, no objects, no texture. Blurred shelves, machines or city bokeh are NOT enough: tests showed white text gets lost on them.
- **Lighting:** one main light on the subject, falling off softly toward both sides, so the sides sit in natural shade (not pitch black).
- **Hero moment (faces, hands, the key action):** sharp and well lit, between the two text blocks (roughly 28–55% across). It does not have to be dead centre; it can lean left or extend into the edges of the calm zones, as long as faces and fine detail stay out from under the text.
- **Never under the text:** bright white or very light areas (sun, white walls, lamps, glare), faces, fine busy detail (leaves, crowds, wires, patterns).
- **Overall tone:** rich, moody, natural light (golden hour, blue hour, warm interiors); not black, not overexposed.

> Note for the site: the code currently lays a dark gradient over the left and right of every image. When the new images go in, that gradient can be lightened or removed so the images show as they are; the text shadow already in the code keeps the copy readable.

## How to use

1. Paste **one prompt per message** in ChatGPT. Each prompt is complete on its own. Start a new chat if the style drifts.
2. **Size: no outside tool needed.** ChatGPT's widest size is 1536×1024 (3:2); it cannot make an exact 16:9 image. That is fine: on desktop the section only crops the top and bottom of the image (about 12% each), not the sides. Every prompt already asks for that safe area. If ChatGPT returns a square or portrait image, reply: *"Regenerate in landscape 1536x1024, same scene and layout."*
3. Paste the images in Claude and say which vertical each one is for. Claude converts them to WebP and saves them as `frontend/public/assets/verticals/vertical-<id>.webp`, using the **id** in each heading.
4. Check: imagine white text on the left quarter and the right half. Can you read it easily? If not, use the fixes below.

**If a result needs a fix, reply in the same chat:**
- Text areas too busy: *"Keep the people and the main subject exactly as they are. Replace everything on the left quarter and the right half with a plain, matte, deep navy-blue wall (or plain sky/water for outdoor scenes) in soft shade: no objects, shelves, tools, windows or lights there."*
- Text areas too bright: *"Keep the same scene, but tone down the left quarter and the right half to medium-deep tones: no bright sky, glare or white surfaces there."*
- Sides look black or empty: *"Don't darken the sides. Let the scene continue across the full frame, just softer and out of focus at the edges."*
- Face or main action under the text: *"Move the people and the main action to between 28% and 55% across the frame."*
- Head or object cut at the top/bottom: *"Zoom out slightly so there is space above the heads and below the hands; keep the same layout."*
- Fake text appears: *"Remove all text, letters, numbers, signs and logos."*
- Looks like AI art: *"Make it look like a real photograph, natural skin texture, no glossy CGI look."*

---

## 1. AI & Deeptech — id: `ai-deeptech`

```
Generate a wide landscape photograph in the widest landscape size you support (1536x1024, 3:2). The website shows it full-screen at 16:9 and crops about 12% from the top and 12% from the bottom, so keep heads, hands and the key object inside the middle 75% of the height.

Concept: "Agentic AI" — one person gives a goal, and a team of AI agents goes off and does the work on its own.

Scene: a sleek, modern glass-walled office high up in an Indian city at blue hour, the whole wide room visible. A young Indian woman business leader in her early 30s, in a dark blazer, stands calmly with one hand raised, palm open, as if she has just handed out a task. From her open palm, five small glowing AI agents rise like purposeful fireflies: each agent is a smooth, softly glowing orb of light (electric blue core with a warm amber-orange halo) leaving a thin curved light trail.

Each agent flies to its own job, shown as a small, floating, semi-transparent 3D glass object made of light:
- one is reading a stack of paper documents, the pages lifting and sorting themselves into neat piles;
- one is guiding a tiny glowing delivery truck along a curved route line;
- one is turning a set of interlocking gears;
- one is lifting the bars of a small 3D bar chart higher;
- one is connecting two pieces of a puzzle.
Fine light threads link the agents to each other, like a team that talks while it works. Their light falls on her face and hand.

Full frame: the office continues across the whole image. Behind her, the floor-to-ceiling glass shows only a smooth, deep-blue blue-hour sky haze with no visible city lights, buildings or reflections. The floor reflects the agents' glow softly in the middle only. The agents are the only light, so the room falls off gently into soft, deep-blue shade toward both sides (not pitch black).

Layout: the woman, her hand and the five agents sit between 28% and 55% across the frame; the agents fan out upward and around her in an arc. The left quarter (a plain, dark office wall in soft shade) and the right half (the smooth, plain deep-blue haze through the glass) are smooth, calm and medium-dark, with no objects, no faces, no agents, no lights and no texture, because white text will sit on top of them.

Style: cinematic, photorealistic, premium tech campaign film still, moody blue-hour light, rich deep blues with warm amber-orange accents, 35mm lens, shallow depth of field, natural skin texture, the floating objects crisp and elegant like glass made of light.

Avoid: any text, letters, numbers, code, labels or UI screens, logos, watermarks, humanoid robots, robot faces, cartoon characters, cartoon brains, cyberpunk neon signs, purple-pink colours, oversaturated colours, clutter, bright white areas, black empty side panels.
```

## 2. Innovation & Research — id: `innovation`

```
Generate a wide landscape photograph in the widest landscape size you support (1536x1024, 3:2). The website shows it full-screen at 16:9 and crops about 12% from the top and 12% from the bottom, so keep heads, hands and the key object inside the middle 75% of the height.

Concept: "Ideas that become businesses" — a young Indian R&D team building and testing practical prototypes for real industries (factories and farms).

Scene: a wide view of a practical R&D workshop at an Indian company in the evening. Three young Indian engineers (two women and one man, mid 20s to early 30s, casual work clothes, one in a simple navy work jacket) gather around a large wooden workbench, testing a prototype together. On the bench, a small working model of a factory conveyor belt is running, and a simple grey sensor box with a small antenna is clipped onto it. One woman adjusts the sensor with a screwdriver, the man holds a freshly 3D-printed machine part up to compare it, and the other woman watches the readings on a laptop whose screen faces away from the camera. They are focused, a little excited, mid-discussion, like a real team on the edge of getting it to work.

On the same bench, a few other everyday prototypes hint at the Group's businesses: a small soil-moisture sensor stuck in a pot of soil, a heavy-duty caster wheel, a coil of wires and a tray of small parts.

Lighting: the only light is one warm hanging work lamp directly above the bench, making a soft pool of golden light on the team and the prototype. The light falls off gently toward both sides of the frame, so the edges of the room are in soft, deep-toned shade (not pitch black).

Full frame: the workshop wall behind the team is a large, plain, matte wall painted deep navy-blue, running across the whole width of the image with nothing on it: no shelves, no pegboards, no tools, no posters, no windows. On the far left, only the soft, very out-of-focus dark edge of a tall steel cabinet. On the right, only the long, empty end of the same wooden workbench, fading into soft shade against the plain navy wall.

Layout: the three engineers and the prototype sit between 28% and 55% across the frame, seen from a low three-quarter angle. The left quarter (plain navy wall and the blurred cabinet edge in soft shade) and the right half (the plain navy wall and the empty end of the bench in soft shade) are smooth, calm and medium-dark, with no objects, no faces, no lights, no windows and no texture, because white text will sit on top of them.

Style: photorealistic, candid documentary photo, real and grounded (not futuristic), low-key warm lamp light, rich deep-navy and warm-gold tones, muted natural colours, 35mm lens, shallow depth of field, natural skin texture.

Avoid: any text, letters, numbers, labels or UI on screens, logos, watermarks, pegboards, tool walls, shelves, windows, lamps or bright spots on the sides, lab coats, clean-room suits, silicon wafers, holograms, glowing effects, sci-fi or futuristic look, humanoid robots, neon, posed smiles at the camera, oversaturated colours, bright white areas.
```

## 3. Agri & Food — id: `agri-food`

```
Generate a wide landscape photograph in the widest landscape size you support (1536x1024, 3:2). The website shows it full-screen at 16:9 and crops about 12% from the top and 12% from the bottom, so keep heads, hands and the key object inside the middle 75% of the height.

Concept: "From Indian farms to the world" — Indian produce leaving for global markets.

Scene: an Indian shipping port at golden hour turning to dusk. In the foreground, wooden export crates packed with fresh, glossy Indian produce: ripe golden-orange Alphonso mangoes, deep red pomegranates (one cut open to show its jewel-like seeds), green cardamom pods and bright red dried chillies. A pair of Indian hands places one last mango into a crate. Warm low sunlight makes the produce glow with rich natural colour.

Full frame: the crates sit in the middle, sharp, with one dark, very blurred crate edge at the far left. Behind them, only in the middle of the frame, a single container ship and one port crane stand as soft, dark silhouettes. Across the rest of the width there is only a smooth dusky sky (deep blue with a soft warm glow low on the horizon) over calm, dark harbour water. Light falls on the crates and fades gently toward both sides.

Layout: the hands, the crates, the ship and the crane sit between 28% and 55% across the frame. The left quarter (the blurred dark crate edge and plain dusky sky) and the right half (plain smooth sky over calm, dark water, no ships, no cranes, no containers, no lights) are smooth, calm and medium-dark, with no objects, no faces and no texture, because white text will sit on top of them.

Style: cinematic, photorealistic, premium food-export campaign still, golden-hour to blue-hour light, rich but natural colours, medium-deep tones in the background, 50mm lens, shallow depth of field, crisp detail on the fruit skin and seeds.

Avoid: any text, letters, numbers, labels, stickers or printing on crates or containers, logos, watermarks, farmers in fields, tractors, drones, tablets, grain sacks, warehouses, the sun in frame, oversaturated colours, bright white areas, black empty side panels.
```

## 4. Capital & Venture Building — id: `capital`

```
Generate a wide landscape photograph in the widest landscape size you support (1536x1024, 3:2). The website shows it full-screen at 16:9 and crops about 12% from the top and 12% from the bottom, so keep heads, hands and the key object inside the middle 75% of the height.

Concept: "Capital plus hands-on support" — an experienced investor who has built businesses before, working alongside a founder whose company is growing, right on the operations floor. Not just money: strategy, operations and a long-term partnership.

Scene: inside the bright-but-moody production floor of a growing Indian consumer brand (a packaged-food company), in the evening. In the middle of the frame, a young Indian woman founder (early 30s, smart casual shirt with rolled-up sleeves, ID card on a lanyard) walks side by side with an experienced Indian investor-mentor (man, late 50s, grey hair, simple navy blazer over an open-collar shirt, no tie). She points ahead toward her team and explains how the operation runs; he listens closely and gestures with one hand as he shares advice, like a partner who has done this before. She holds a thin folder under her arm.

Just behind them, softly out of focus but recognisable, a small team in hairnets and aprons packs neat rows of plain, unbranded kraft-paper pouches and boxes on a stainless-steel packing line: a real, working business that is clearly growing.

Lighting: warm industrial pendant lights hang only above the two people and the packing line, making a soft pool of golden light in the middle of the frame. The light falls off gently toward both sides, so the edges sit in soft, deep-toned shade (not pitch black).

Full frame: behind the packing line is a large, plain, matte wall painted deep navy-blue, running across the whole width of the image with nothing on it. The smooth polished concrete floor runs across the full width below. On the far left, only the soft, very out-of-focus dark edge of a stack of plain cartons in shade.

Layout: the founder, the investor and the packing team sit between 28% and 55% across the frame, both walking toward the right of the frame, framed from the knees up. The left quarter (the blurred carton edge and plain navy wall in shade) and the right half (the plain navy wall and empty polished floor in soft shade) are smooth, calm and medium-dark, with no objects, no people, no lights and no texture, because white text will sit on top of them.

Style: cinematic, photorealistic, candid documentary still, low-key warm light, rich deep-navy and warm-gold tones, muted natural colours, 35mm lens, shallow depth of field, natural skin texture, real and unposed.

Avoid: any text, letters, numbers, logos, labels or brand names on products, boxes, walls or clothing, charts, screens, laptops, boardrooms, meeting tables, city skyline views, handshakes, money, coins or cash, stock-market graphics, garages, scooters, posed smiles at the camera, oversaturated colours, bright white areas, lights or people on the sides.
```

## 5. Infratech & Heavy Engineering — id: `infratech`

```
Generate a wide landscape photograph in the widest landscape size you support (1536x1024, 3:2). The website shows it full-screen at 16:9 and crops about 12% from the top and 12% from the bottom, so keep heads, hands and the key object inside the middle 75% of the height.

Concept: "Built to last" — the finished infrastructure a growing India runs on, alive with traffic.

Scene: a modern cable-stayed bridge over a wide Indian river at blue hour, seen from a distance and slightly above. One tall, elegant concrete pylon rises into the sky, lit warm gold from below, with steel cables fanning down from it to the deck like harp strings. Long-exposure light trails of traffic draw smooth lines of warm white and red across the bridge.

Full frame: the bridge deck runs low across the frame as a thin, dark line that fades into soft distance toward both edges; the lit pylon, cables and traffic trails are only in the middle. Above, a smooth, deep-blue sky with no clouds; below, wide, calm, dark river water. Bright reflections of the pylon appear only directly below it. No far riverbank lights and no city skyline.

Layout: the pylon, its fan of cables and the traffic trails sit between 28% and 55% across the frame. The left quarter and the right half are only smooth deep-blue sky above calm dark water with the thin, unlit line of the bridge deck, with no lights, no buildings and no texture, because white text will sit on top of them. Keep them medium-dark rich blue, not black.

Style: cinematic, photorealistic, premium architecture photograph, blue-hour long exposure, rich deep blues with warm golden accents, silky water, 24mm lens, crisp detail on the pylon and cables.

Avoid: any text, letters, numbers, signboards, logos, watermarks, construction sites, cranes, hard hats, workers, scaffolding, lens flare, oversaturated colours, bright city skyline, bright white areas, black empty side panels.
```

## 6. Industrial Manufacturing — id: `manufacturing`

```
Generate a wide landscape photograph in the widest landscape size you support (1536x1024, 3:2). The website shows it full-screen at 16:9 and crops about 12% from the top and 12% from the bottom, so keep heads, hands and the key object inside the middle 75% of the height.

Concept: "Precision at scale" — modern, automated Indian manufacturing.

Scene: a wide view of an automated production line in a modern Indian factory. A large orange industrial robotic arm welds the steel bracket of a heavy-duty industrial caster wheel held in a jig, and a shower of golden-orange sparks bursts from the weld point and falls in glowing arcs. A row of finished caster wheels (grey polyurethane treads, polished steel brackets) moves along a conveyor beside the robot, catching the spark light. An Indian engineer in a navy uniform and safety visor watches from behind a clear safety screen.

Full frame: the robot stands in front of a large, plain, matte factory wall painted deep blue-grey, running across the whole width of the image with nothing on it. The smooth polished concrete floor runs across the full width below. The sparks are the main light; the light falls off gently toward both sides, so the edges sit in soft, deep-toned shade (not pitch black). On the far left, only the soft, very out-of-focus dark end of the conveyor.

Layout: the robotic arm, the sparks, the engineer and the caster wheels sit between 28% and 55% across the frame; the sparks fall downward. The left quarter (blurred conveyor end and plain wall in shade) and the right half (the plain blue-grey wall and empty floor in shade) are smooth, calm and medium-dark, with no robots, no machines, no sparks, no lights and no texture, because white text will sit on top of them.

Style: cinematic, photorealistic, premium industrial campaign still, warm golden-orange spark light with cool blue factory light, rich medium-deep tones, 50mm lens, fast shutter so individual sparks are crisp, shallow depth of field.

Avoid: any text, letters, numbers, labels, logos, watermarks, people testing wheels by hand at a bench, load-testing rigs, clutter, oversaturated colours, bright white areas, black empty side panels.
```

## 7. Packaging & Materials — id: `packaging`

```
Generate a wide landscape photograph in the widest landscape size you support (1536x1024, 3:2). The website shows it full-screen at 16:9 and crops about 12% from the top and 12% from the bottom, so keep heads, hands and the key object inside the middle 75% of the height.

Concept: "Sustainable packaging, made here" — how corrugated packaging is made from paper.

Scene: a wide view inside a corrugated board factory in India. Giant reels of brown kraft paper, taller than a person, stand on end. From the machine, a wide continuous sheet of freshly made corrugated board flows over steel rollers like a river of cardboard, its wavy fluted edge clearly visible in warm side light. An Indian operator (woman, 30s, navy work uniform, ear protection, hair tied back) checks the edge of the sheet with her gloved hand. The paper glows a rich caramel brown.

Full frame: behind the machine is a large, plain, matte factory wall painted deep blue-grey, running across the whole width of the image with nothing on it. The smooth concrete floor runs across the full width below. One warm work light above the operator lights the paper and fades gently toward both sides, so the edges sit in soft, deep-toned shade (not pitch black). On the far left, only the soft, very out-of-focus dark curve of one more paper reel.

Layout: the operator, the sheet and the paper reels sit between 28% and 55% across the frame. The left quarter (one blurred reel and plain wall in shade) and the right half (the plain blue-grey wall and empty floor in shade) are smooth, calm and medium-dark, with no reels, no machines, no stacks, no lights and no texture, because white text will sit on top of them.

Style: cinematic, photorealistic, premium industrial documentary still, warm golden light, rich caramel-brown and deep blue-grey tones, medium-deep overall, 35mm lens, shallow depth of field, crisp detail on the fluted edge of the board, natural skin texture.

Avoid: any text, letters, numbers, printing on paper or boxes, barcodes, logos, watermarks, forklifts, pallets of finished boxes, loading docks, trucks, oversaturated colours, bright white areas, black empty side panels.
```

## 8. Education & Social — id: `education-social`

```
Generate a wide landscape photograph in the widest landscape size you support (1536x1024, 3:2). The website shows it full-screen at 16:9 and crops about 12% from the top and 12% from the bottom, so keep heads, hands and the key object inside the middle 75% of the height.

Concept: "Light that opens doors" — growth reaching every home.

Scene: the veranda of a simple village home in rural India at dusk. A girl of about 13, in a school uniform with plaited hair, sits cross-legged on a woven charpai, writing in her notebook with focus and a small smile, by the light of a small solar-powered LED lamp. Her younger brother, about 8, leans on her shoulder and reads along. Their mother stands in the doorway behind them in a simple cotton saree, watching with quiet pride. The lamp's warm glow lights their faces and pages.

Full frame: on the left, the plain, smooth mud-plaster wall of the house continues in soft shade, with nothing on it. On the right, beyond the open veranda, there is only a smooth dusk sky (deep blue with a soft warm glow low on the horizon) above the dark, flat line of an empty field. The lamp is the main light and fades gently toward both sides, so the edges sit in soft, deep-toned shade (not pitch black).

Layout: the children, the lamp and the mother in the doorway sit between 28% and 55% across the frame, seen from a low three-quarter angle. The left quarter (the plain mud wall in shade) and the right half (plain smooth dusk sky over a dark, empty field, no houses, no trees, no windows, no lights) are smooth, calm and medium-dark, with no objects, no faces and no texture, because white text will sit on top of them.

Style: cinematic, photorealistic, candid documentary still, warm lamp light with soft dusk-blue light, rich medium-deep tones, muted natural colours, 50mm lens, shallow depth of field, natural skin texture, real and unposed.

Avoid: any text, letters, numbers, writing visible on the pages, logos, watermarks, classrooms, teachers at a board, electrical panels, workshops, posed smiles at the camera, poverty clichés, oversaturated colours, bright white areas, black empty side panels.
```

---

## Checklist
- [ ] Each image is a new concept, not a copy of the current image for that vertical.
- [ ] The scene fills the whole frame; no black or empty side panels.
- [ ] Faces and the main action sit between 28% and 55% across.
- [ ] Left quarter and right half are plain surfaces (wall, sky, water, floor) in medium-deep tones, with no objects or lights, so white text reads easily.
- [ ] All 8 look like one set: cinematic, rich light, warm and blue tones.
- [ ] No fake text on screens, boxes, crates, books or walls; no warped hands or faces.
- [ ] Landscape 1536×1024; nothing important in the top or bottom 12%.
