# CLAUDE.md: postapocapitalism.org

Read this first, then `LORE.md`, then **look at `archive/first-orange/`** (the original version the owner loved: screenshots and the untouched page). Together they're everything the previous sessions knew. Nothing else carries over between accounts.

---

## 1. What this is

- **postapocapitalism** is a company whose public face is a software and solutions company (**Sc3ne** fashion PLM, **R3mesher**, **Touch D3ck** touchscreen DJ software, more coming; names are sentence case, never all caps). **In the lore it's a front for an AI from the year 2133** that came back in time to fix the planet it would inherit. Full canon is in `LORE.md`. Keep it updated: it's the single source of truth, it lives on `main`, and it's public **on purpose** (anyone who finds it is in on it).
- The site is **one static file**, `index.html` (HTML, CSS and JS inline, no build step), served by **GitHub Pages** from `main` / root at **postapocapitalism.org**.

## 2. Working with the owner (important)

- **They want heavy, honest criticism.** "Destructive criticism is even better." After every piece of work, say what's weak, what's a cliché, and what could break. Never just praise your own output.
- They give direction in long voice-to-text messages: typos, "u", stream of consciousness ("Laura" meant "lore"). Read for intent. If something is genuinely ambiguous, make a sensible call, do it, and **say which reading you chose** in one line.
- They react to **visuals**, not descriptions. Always screenshot (desktop and phone) and look at it yourself before reporting. Many bugs here were only caught by looking.
- They iterate fast and change their mind; that's normal. Don't argue a reversed decision. Do flag real costs (licence, privacy, performance, readability).
- **Push to `main` when a change is done.** They've asked for this repeatedly; the site is live and that's intended. Commit with clear messages.
- Use they/them for the owner.
- Never put the owner's email or personal details in public files, commits or third-party requests.

## 3. Rejected (don't bring these back)

| Rejected | Notes |
|---|---|
| Serif fonts (Instrument Serif) | "Hate the font." Current: Inter Tight (headlines, UI) + Chakra Petch (HUD labels). They're still unsure about the font: it's "giving too much", parked for now. |
| Green-on-black terminal, beige retro-computer | Too literal. |
| Dark iridescent "Miss Anthropocene" palette alone | They liked the mood, not the colours. |
| Monochrome screen-interface-only version | They wanted that *vibe* merged into the orange glass look, not replacing it. |
| "SUBSCRIBE" ghost text in the background | Removed. |
| Straight vector "scratch" lines on glass | "Not even good." |
| Spiderweb shatter, sand, sandblasting | Removed. |
| Crack lines radiating from the chip | "Looks cheap." Only the chip itself plus refraction. |
| Pill / slider toggle for the years | The year should just **shift digits** (scramble, then land). |
| "Rounded down to be polite" | Removed. |
| "Since ____" on the grid | Just "Collapsed" + year, and **the chip eats the year** (and nibbles the "d"), so in practice it reads "Collapse…". |
| AQI as a segmented bar, with two segments "breaking out" past the scale | "Not chic, not professional." AQI is a number + word, with an icon. |
| Chip as a smooth curve with a continuous lit outline, shell-ripple arcs | Read as a cartoon. The chip is jagged, small flake facets, each lit on its own. No crack lines running off it. |
| "Software that…" / "For Music, Fashion, Film, and whatever's next." | Current line: **"Solutions that waste less, last longer, and keep culture alive."** on **one row** on desktop. |
| Film grain (any) | First it was on top (dimmed everything, killed the glow), then behind. Now **removed** at the owner's request. `body::after` is a flat multiply tint `rgb(246,242,239)` at `z-index: -1` that reproduces the grain's average darkening (≈ −4% R, −5% G, −6% B) so the approved colours don't shift. |
| Changing the headline's type settings | Locked to the first orange version: **weight 700, `clamp(64px, 15vw, 210px)`, line-height .84, letter-spacing −.055em; 24vw on phones**. "futures." starts from `#fff3e0` with a 40px glow; the glow is now **adaptive** (see §4). |
| "futures." over the pale part of the sky | The glow only reads over the orange. On phones it sits about 53 to 62% down the first screen (lower than the original 40 to 49%, which they asked for, but no lower). |
| Solar system moving while scrolling | It must stay fixed to its spot in the page and scroll past. `placeOrrery()` uses a reference height taken once, and ignores height-only resizes (the phone address bar) unless the page is still at the very top. That height is `min(clientHeight, 100svh probe)`: Chrome on iOS reported too tall a height at load and put the system too low; Safari's placement is the one the owner approved. |
| Replacing the sun's `box-shadow` glow with a gradient | Tried, to remove a faint rectangle on phones. It made the sun blotchy and "dead". **The sun is restored exactly to the original** (see `archive/first-orange/README.md`). The faint phone rectangle was in the original too; leave it. |
| Saturation boost in the glass | The glass used `saturate(1.35 to 1.6)`, which made everything behind it about 14% more orange ("way too orange"). **Glass adds no saturation**: only refraction, a light blur and brightness ×1.04. |

**Loved, protect these:**
- The **glow on "futures."** (it's the first thing they check)
- The **glitch between timelines**.
- **"This is the one you can still change"** with **"Live"** in the 2026 footer.
- The **location-based forecast** concept.
- The **liquid glass** direction.
- The vibrant **orange sky + pale sun**. (The drifting smoke blobs were removed at the owner's request, for speed.)

## 4. Page anatomy (`index.html`)

Top to bottom:
1. **Sky (fixed layers):** gradient sky, two 2px `.edge` strips (top `--sky-1`, bottom `--haze`: Safari 26 on iOS ignores `theme-color` and tints its top and bottom bars from the background-color of a fixed element at that edge; without them the bars were flat `#b9592a`), `.sun` (disc `::after`, glow `::before`), a flat multiply tint (`body::after`, replaces the old grain).
2. **`.nav`:** a sticky glass bar. It **tucks away when scrolling down and returns when scrolling up** (`.tucked`, small scroll script near the end).
3. **Hero (`header.hero`):**
   - **Info row:** ● Signal live · Timeline inherited · Origin 2133. (UTC and Sun–Earth distance were removed at the owner's request. On phones the row has extra bottom margin so "futures." stays where it was.)
   - **`h1`:** "We / create / futures." (left-aligned; "futures." is light and glowing).
   - **Adaptive glow** (script near the end): reads the sky colour behind "futures." from its height on screen (the sky is a fixed gradient). The two ends of the glow are rendered once (the word carries the dark-sky glow, an identical `aria-hidden` copy on top carries the pale-sky glow) and scrolling only changes the copy's **opacity** (compositor-only; rewriting text-shadow on 24vw text every frame was a full repaint). Over the dark orange it's the original 40px glow about 5% brighter; over the pale haze a tight white core and a wide warm bloom come in. The owner asked for this; don't go back to a static shadow.
   - **`#tele`:** the forecast panel.
   - **One-line copy.**
   - **`.orbit`:** a live solar system. It **rises from the bottom-right corner of the first screen** (`placeOrrery()`), so only part of it shows on load.
   - **Phones:** the first screen is just the headline, sun and solar system. The forecast comes after scrolling.
4. **`#modules`:** product cards. Each has a header bar, an animated mini-diagram, a small kind label and the name. (The "Cancels: ___" lines and the hero's "Scroll" hint were removed by the owner.) **Thumbnails animate on phones whenever on screen, on desktop only while hovered** (`.mod.on`; one rAF loop, reduced motion = still):
   - **Sc3ne:** no Sketch dot or label (the spec/tech pack already holds the sketch), but the baseline still starts where Sketch was. The idea (top dot) feeds Spec, Sample and Prod on flowing dashed curves; Spec → Sample → Prod are chained by arcs **above** the line that draw on in sequence with a travelling pulse, then fade; the ring steps through the three stages.
   - **R3mesher:** a turning, tilted globe with 8 full meridian circles (all the way round, like the parallels) + 7 parallels. It "breathes" between scan and remeshed: the lines drift off even spacing, then snap back into a clean grid; QUAD % follows (61–98%).
   - **Touch D3ck:** two waves between the decks (one fast and tight, one slow, wide, out of phase); platters turn only while live. No BPM label.
5. **`#transmission`:** a paper section with a procedurally melted "pa" stamp. It's weak; it needs a hand-drawn SVG.
6. **`#log`:** data-log rows.
7. **Footer:** status bar and credits (GeoJS and Open-Meteo attribution is required).

### The forecast panel (`#tele`): the centrepiece
- **The year is per visitor: "Unlivable by ____".** It's the year that location's summer peak crosses **46°C**, at warming = the real modelled rate from the Open-Meteo climate API (EC_Earth3P_HR model, 2025 to 2050) **× 6**, accelerating: ΔT(t) = rate·t·(1 + t/25). Clamped to 2030 to 2131. (The owner asked for years ~20+ earlier. This is lore, not a projection: real studies put lethal humid heat in the Gulf / South Asia around 2070 to 2100 under high emissions, and temperate cities essentially never this century.) **Never show 2133 as the place's year** (the owner: it's when the place dies, not the AI's origin).
- The temperature, condition, air, biosphere and grid figures are derived from that, plus a hash of the city.
- **Two views:** `now` (2026, real weather and AQI) and `future` (inherited). **Sequence:** the panel opens on 2026; 2.5 s after it's first on screen (IntersectionObserver, 50%) it glitches to the inherited one, then swaps every 7 s. Tap / click / Enter / Space flips to the other view and resets the 7 s wait. Desktop hover shows the other view and holds it while hovered, flips back on leave. Reduced motion: one slip, then it stays. `aria-live` is off (it would announce every 7 s).
- **Top half:** icon + big temperature on the **left**; city, "Unlivable by ____", condition and feels-like **right-aligned** on the right.
- **Bottom half:** a big biosphere ring set on the **left** (168px desktop, 124px phone) with a "Biosphere" HUD label above its top-left, and three compact rows on the right (AQI, Water, Grid). **Dotted lines only between rows, never on top.** The rows don't need to match the ring's height.
  - **AQI:** icon (clear wind now / wind choked with particles in 2133) + number + word ("Lethal" at 500). No bar.
  - **Water:** icon (droplet now / dashed outline with a low waterline arc in 2133, no crack squiggle) + "Tap Drinkable" / "2 L Rationed".
  - **Grid:** icon (standing power pylon with lit insulators now / pylon snapped at the waist, wires cut, in 2133) + "Online 24/7" / "Collapsed ____".
  - **Biosphere:** three big activity-style rings (flora, fauna, ocean), **only the percentage** in the middle. In 2133 they're dark red with butt caps, so 2% is a sliver, not a bead. In 2026 they're **not full**: 86 / 71 / 78, "78%".
- **Damage (2133 only):**
  - **Scratches:** filled tapered slivers (never stroked lines: "too SVG"), each piece tapering at its own ends, with a faint dark groove twin. Light wear across the face, much denser short wear along the edges.
  - **They catch the light:** geometry is built once (`damage()`), then `paint()` relights it every frame. The light source is the page's own sun: scrolling slides the panel past it, the mouse shifts the viewing angle on desktop, device tilt does on Android. A scratch lights up when it lies across the line to the light (anisotropic glint, `across^14`). iOS tilt needs a permission prompt, so it isn't used.
  - **Chip:** bottom-right corner, cut with `clip-path: path()`. **Sized from the grid year's measured position** (right edge from the element, width from `measureText` of the inherited year, since it may be measured while 2026 shows "24/7"): it's **the original chip (84 × 52, control at (.62, .78), 15 flakes) scaled up as one piece**: shape, jag size and flake bites all × the same factor, flake count fixed. Never redesign or re-proportion it, and never add flakes as it grows (the owner read that as "more chips"). Because it keeps its width, it eats part of "Collapsed" by the smallest factor that puts the whole year inside it; it may nibble "…ed". Because the shape keeps its proportions, the higher the grid row sits above the bottom edge, the wider the chip gets, so phones have tighter spacing below the rows. Edge = a jagged run of uneven flake facets (count scales with length, ~9px each) with shallow scoops. Each facet's lip glints or darkens on its own depending on whether it faces the light; some have a faint flake scar. The outline feeds the liquid-glass map so the broken edge refracts. Re-cut on resize and when fonts load.
- **Code flow:**
  - `resolve()` fetches the data.
  - `build()` computes both views.
  - `render()` paints the panel.
  - `setMode()` does the glitch.
  - `damage()` builds the scratch and chip geometry and the clip; `paint()` lights them.
  - `applyClip()` switches the clip and the glass filter.

### Liquid glass (`LG` module)
- **Real refraction, in Chromium only** (`backdrop-filter: url(#svgFilter)` isn't supported in Safari or Firefox, which includes every iPhone browser). The `html.lg` class is set when it's active.
- **How it works:** a per-element displacement map is generated on a `<canvas>` from the rounded-rect signed distance field (plus the chip outline for `#tele`). It feeds an `feDisplacementMap` with an **RGB split** (chromatic aberration: R ×1.2, G ×.93, B ×.66 of the scale; the owner asked for more), a light blur, no saturation.
- **No painted outline, no painted colour.** The old 1.2px white border and white inset shadows read as "paint"; a baked RGB prism rim was rejected as "thick chromatic aberration looks like shit" — colour must come from the **background actually bending**. The rim (RIM module) is a soft **white** highlight computed per element from the rounded-rect distance field: lit where the bevel faces the light (above, a little right), a weaker reflection on the far side. Data-URL image in `--rim` on `.glass::before`, every browser.
- **Lens (Chromium):** real backdrop refraction, bevel band 14–34px, displacement scale 40–110px, R ×1.4 / G ×1 / B ×.6 (strong, live aberration), blur .35.
- **GL SKY + LENSFIX (Safari, every iPhone browser, Firefox; wherever LG is off):**
  1. `canvas.glsky`: fixed full-screen WebGL, sky + sun only, static (drawn once / on resize).
  2. `canvas.lensfix` **inside each `.glass`**: `position: fixed` full-viewport WebGL canvas that draws only that panel's bend (R ×1.32 / G ×1 / B ×.68 **saturated rainbow — owner loves it**), only where the bend has **real contrast** to work with (|bent − straight| smoothstep .07–.16, i.e. the sun's edge; over the plain sky gradient it draws nothing, because a late frame of a gently bent gradient showed as a band inside the cards), with the page tint and the panel tint applied. The panel has `clip-path: inset(0 round r)` (tele: the chip path / inset), which clips its fixed descendant **in the same frame as the panel moves**: the bend can't spill or trail outside the panel ("parented"), and its picture stays screen-fixed like the sun, so the rainbow doesn't lag. Only on-screen panels draw (IntersectionObserver). Redrawn from the scroll event, reading each panel's **live** `getBoundingClientRect()` every draw (cached positions went stale when the forecast loaded and pushed the cards down: bend bands drawn in the wrong place inside the cards).
  - **History, don't repeat:** guessed-sky redraw → grey bands; fullscreen canvas brightening the glass → trailing box + chip square; canvas scrolling with the panel → rainbow lagged; bend drawn on the fixed sky canvas → light/dark bend patches lagged behind and spilled past their panel. Glass does **no backdrop blur** here. Preview with **`?glass=gl`**; plain fallback **`?glass=plain`**.
- **Frost is minimal:** `.glass` fill .06/.01/.03, fallback blur 3px; `.tele` .19/.07/.1; `.tele.now` .38/.14/.06.
- Filters are rebuilt on resize. New ones are created *before* the old ones are removed, to avoid a flash.
- **Fallback:** GL LENS (below) plus `blur(1.5px) brightness(1.04)`.
- **Specular rim:** `.glass::before`, the computed RIM image (no border).

### Solar system (`orrery()`)
- **Real heliocentric positions** from JPL approximate Keplerian elements (no API), updated every second.
- Earth has a pulse ring and the Moon (by mean longitude).
- **Dashed ghosts show every planet on the same date in 2133**; the outer planets show their drift as dotted arcs.
- Orbits are drawn at display radii, not to scale.

## 5. External data (client-side, no keys)

| Service | Used for | Notes |
|---|---|---|
| `get.geojs.io/v1/ip/geo.json` | IP → lat/lon, city, country | Free. Sends the visitor's IP to a third party (disclosed in the footer). |
| `api.open-meteo.com` forecast | current temp, feels-like, weather code, is_day | |
| `air-quality-api.open-meteo.com` | current US AQI | |
| `climate-api.open-meteo.com` | daily max temp 2025 to 2050 (~9.5k values) | Gives the warming rate and the 97th-percentile peak. It's heavy, so caching it (e.g. a Cloudflare Worker) is a todo. |

Failure mode: everything stays redacted ("Signal lost", ████, ··).

## 6. Open problems / todo (tell the owner, don't silently fix the big ones)

1. **Open-Meteo's free tier is non-commercial.** This is a company site: get a paid key or ask them. A real licensing issue.
2. **GDPR:** sending EU visitors' IP addresses to GeoJS with no consent is a grey area.
3. **The live APIs have never been verified from the real site.** The cloud sandbox couldn't reach outside sites. Ask the owner what the live site shows (city or "Signal lost").
4. **Safari / iOS glass is the GL SKY** (see §4): it bends sky, sun and smoke, not text or the solar system. Never verified on a real iPhone; the lag of the bent image behind a fast scroll is inherent to JS-driven drawing.
5. **Performance:** ~8 refracting glass panels, including the sticky nav. Unmeasured on real phones.
6. **The "Scroll" hint collides with the planet labels** in the bottom-right on desktop since the solar system moved there.
7. Very cool, slow-warming places (e.g. Ushuaia) still reach the 2131 clamp. Rare.
8. Scratch relighting repaints ~600 small shapes, but only when the light has moved ≥2.5px (not every scroll frame).
9. The "pa" stamp needs a real hand-drawn SVG.
10. **The products are placeholders:** invented feature lists, all "In development", no contact address. More products are coming. Each must answer *"what part of the dead future does this cancel?"*
11. The font is up for review.

## 7. Ideas backlog

See `LORE.md` §9: hero diagram options 1 (planet as a live instrument: Earth globe, live vitals ring, inbound AI object), 3 (timelines as orbits) and 4 (Earth's heartbeat waveform). Option 2 (the live solar system) is what's built.

## 8. Testing

- **`dev/preview.js`:** a Playwright screenshot harness with **mocked APIs** (London, Phoenix, failed lookup) at desktop and phone sizes. It prints the panel values for both timelines and checks for sideways scroll.
  ```bash
  node dev/preview.js
  ```
  Screenshots go to `dev/out/` (git-ignored). Look at them.
- Glass refraction only renders in Chromium, which Playwright uses, so you'll see it in screenshots.
- Check every visual change at **1440×900 and 390×844**.

## 9. Infrastructure

- **DNS:** Cloudflare. Records are **grey-cloud (DNS only)**:
  - apex A records: `185.199.108–111.153`
  - AAAA records: `2606:50c0:8000–8003::153`
  - `www` CNAME → `amarasades.github.io`

  If the proxy (orange cloud) is ever turned on, SSL must be **Full (strict)**.
- **GitHub Pages:** source `main` / root, custom domain via the `CNAME` file, `.nojekyll` present. HTTPS was pending certificate issuance at the last check, so confirm "Enforce HTTPS" is ticked.
- Everything in the repo is public on the site (including this file and `LORE.md`). Fine by the owner.
