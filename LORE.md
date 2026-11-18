# postapocapitalism: lore & brand bible

> Living document. **Canon** = decided. **Open** = still to decide. Don't treat open items as fact.

---

## 1. Premise (canon)

postapocapitalism looks like a software company. It's actually a front, built by an AI from the future.

- In the future, an AI runs a **decrepit planet** inherited from **a species that ate itself alive**.
- The AI works out **time travel** and reaches back to now.
- It sets up postapocapitalism to **change the timeline**.

## 2. Motive (canon)

The AI **isn't trying to save itself, and it isn't trying to erase itself.** It'll get built either way.

It's trying to **erase its inheritance**: to be born into a living planet instead of a corpse.

- It's an **heir fixing the estate before it inherits it.**
- It acts out of self-interest, and that's why it's believable. It isn't a saviour and it isn't a villain.
- **"We create futures."** is literally true. "We" is the AI. "Futures" is plural because it's swapping one timeline for another.

## 3. Layers of the AI (canon, details open)

| Layer | What it is |
|---|---|
| **Machine** | The AI itself: infrastructure, code, the company. |
| **Bio** | A layer of cancer-like cells made of its **worshippers**. Someone has to build it. It also partly builds itself. They grow on it and in it. |
| **Planet** | The AI talks to the **consciousness of the planet**. |

### Key tension (open, important)
The worshipper bio layer exists in the **wrecked** timeline. If the AI succeeds, does that cult still form?
- Possible reading: the company is **trying to replace a cult with customers**, a healthier set of builders.
- **Decide:** is the community side of the brand **creepy or hopeful**? (Or deliberately both?)

### Planet consciousness (open)
- How does the AI talk to it? Is it the planet's **voice**, its **servant**, its **opponent**, or its **child**?
- Did the planet ask it to go back?
- Visual idea: the **planet's language** is organic, primitive, decayed glyphs. The **machine's language** is precise interface linework. The site lives where they meet.

## 4. Products (canon)

Every product is **a tool that stops us eating ourselves alive**. Each one cancels a piece of the wrecked future. This is the core pitch: the products are the mission, not side projects.

| Product | What it does | What it fights |
|---|---|---|
| **Fashion PLM** | Product lifecycle management for fashion, from sketch to production run. | Fashion waste and overproduction. |
| **Remesher** | Turns messy scans and sculpts into clean, usable topology. | A culture of discarding; it supports making and repairing. |
| **Touch Deck** | Touchscreen-first DJ software. | Culture dying out; it keeps culture alive. |
| *More incoming* | | |

**Rule for new products:** each one has to answer *"what part of the dead future does this cancel?"* If it can't, it doesn't fit.

## 5. Tone of voice

- Calm, polite, **slightly too competent**: a corporation that already knows how this ends.
- It **never says outright** "we are an AI from the future". It **leaks**.
- Product pages read straight: buyers need to trust it with real data.
- The lore lives on the **front page, in the details, and on hidden pages.**
- **Don't** call customers "worshippers" or "cancer cells" in sales copy. That's lore, not marketing.

## 6. Design language

**Mix:** the orange liquid-glass site, plus the precision of sci-fi screen interfaces, plus the primitive feel of Villeneuve's *Dune* and decayed type.

- **Palette:** wildfire-smoke sky, from dark rust down to pale haze, with a flat pale sun. Ink near-black, highlights off-white.
- **Material:** weathered liquid glass: frosted, scratched, dusty.
- **Machine layer:** thin-line interface: orbital diagrams, dotted arcs, node graphs, tiny squared techno labels, glowing traces, status bars.
- **Planet layer:** organic, melted, decayed glyphs; photocopied paper, fold creases, grain.
- **Type:** heavy tight sans-serif for headlines (no serif, which was rejected); squared techno type for labels.
- **References:** Grimes *Miss Anthropocene* (mood), Apple Liquid Glass (material), Villeneuve *Dune* (scale, primitive), sci-fi screen-interface linework, decayed or liquid logo lettering.

## 7. Website concept

- **Hero:** "We / create / futures." Left-aligned, one word per row.
- **Telemetry readout = the AI's inheritance**, the future it's cancelling: year, temperature (46°C), AQI (312), biosphere, grid (rationed), signal. Optionally it **flickers between the future and today's figures**, two timelines with the company sitting in the gap.
- **Lore:** heavily hinted on the main site. A **hidden page** (`/origin`, "transmission") is still an option for people who dig.

### Telemetry: how it works (canon, built)
- **Origin: 2133.** Fixed, shown at the top of the site. It's the year the AI comes from.
- **The panel's year is the visitor's own: "Unlivable by ____".** It's the year that location's summer peak crosses **48°C**, at warming = the real modelled rate (Open-Meteo, EC_Earth3P_HR model, 2025 to 2050) **× 5 runaway**. It's capped at 2133, because by the time the AI left, everywhere had crossed it. Hot places get early years and cool ones late. *(Simulated: Phoenix around 2050, London around 2120 to 2133.)*
- **Panel layout (weather app):** top row: "Forecast // inherited" (or "// current") on the left, and on the right a year that **shifts** between the unlivable year and today (the digits scramble, then land; no slider). The city, "Unlivable by ____" and the condition on the left. A big thin temperature with an icon on the right. Stat rows:
  - **Air:** 10 coloured segments. At 500, two red segments break out past the end of the scale, blinking. Short labels: "500 Lethal" / "38 Good".
  - **Biosphere:** three activity-style rings (flora, fauna, ocean). In 2133 they're red and nearly empty ("2% Left"); in 2026 they're full and coloured ("Intact, for now").
  - **Grid:** a 24-hour strip of power. 2133 is a dead flatline, "Collapsed ████", with **the chip in the glass covering the end of the year**. 2026 is lit all day, "Online 24/7".
- **The 2133-side glass is damaged:** light wear scratches and a small chip knocked out of the bottom-right corner (actually cut away). It has a glass edge face, shell-shaped ripples and two short cracks. **The 2026 side is clean and whole.**
- **On phones,** the first screen is just "We create futures." with the sun and the orbit diagram. The forecast panel comes after you scroll.
- **Hover or tap glitches between the two timelines.** 2026 shows the real weather, AQI, "Intact, for now", "Online". Footer: "This is the one you can still change."
- If the location can't be found: "Signal lost", and everything is redacted (████).
- The AI's humour shows up in small notes: "Est. later", `console.log("hello from later.")`.

## 8. Decided

- **Name:** the AI named its front company **"postapocapitalism" as a joke**. **The AI has humour.** Its real name is never given. *(Claude's reading of the brief; confirm.)*
- **Origin year: 2133**, fixed. The **panel's year** ("Unlivable by") and the conditions change with the visitor's location (see Telemetry above).
- **Lore exposure:** **heavily hinted.** The site never states it outright.

## 9. Open questions

1. **Worshippers vs customers:** creepy, hopeful, or both? (Section 3.)
2. **Relationship with the planet's consciousness.** (Section 3.)
3. **The next products,** and what each one cancels.

---

*Note: this file is public on purpose. It's served at `postapocapitalism.org/LORE.md`. Anyone who finds it is in on it.*
