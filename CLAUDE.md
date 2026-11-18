# CLAUDE.md: postapocapitalism.org

Read this first, then `LORE.md`. Together they're everything the previous sessions knew. Nothing else carries over between accounts.

---

## 1. What this is

- **postapocapitalism** is a company whose public face is a software and solutions company (fashion PLM, a remesher, touchscreen DJ software, more coming). **In the lore it's a front for an AI from the year 2133** that came back in time to fix the planet it would inherit. Full canon is in `LORE.md`. Keep it updated: it's the single source of truth, it lives on `main`, and it's public **on purpose** (anyone who finds it is in on it).
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
| "Since ____" on the grid | Just "Collapsed" + year, with the chip covering the year's end. |
| "Software that…" / "For Music, Fashion, Film, and whatever's next." | Current line: **"Solutions that waste less, last longer, and keep culture alive."** on **one row** on desktop. |
| Sun glow as a CSS `box-shadow` | Clipped into a visible rectangle on phones. Now a gradient `::before` *behind* an `::after` disc. **Keep the disc on top**, or the sun goes "dead" (they noticed immediately). |

**Loved, protect these:**
- The **glow on "futures."**
- The **glitch between timelines**.
- **"This is the one you can still change"** with **"Live"** in the 2026 footer.
- The **location-based forecast** concept.
- The **liquid glass** direction.
- The vibrant **orange smoke sky + pale sun**.

## 4. Page anatomy (`index.html`)

Top to bottom:
1. **Sky (fixed layers):** gradient sky, `.sun` (disc `::after`, glow `::before`), drifting `.smoke`, and film grain (`body::after`).
2. **`.nav`:** a sticky glass bar. It **tucks away when scrolling down and returns when scrolling up** (`.tucked`, small scroll script near the end).
3. **Hero (`header.hero`):**
   - **Info row:** ● Signal live · Timeline inherited · Origin 2133 · UTC (live) · Sun–Earth km (live).
   - **`h1`:** "We / create / futures." (left-aligned; "futures." is light and glowing).
   - **`#tele`:** the forecast panel.
   - **One-line copy.**
   - **`.orbit`:** a live solar system. It **rises from the bottom-right corner of the first screen** (`placeOrrery()`), so only part of it shows on load.
   - **Phones:** the first screen is just the headline, sun and solar system. The forecast comes after scrolling.
4. **`#modules`:** product cards. Each has a header bar, an animated mini-diagram, and a struck-through "Cancels: ___" line (lore hook).
5. **`#transmission`:** a paper section with a procedurally melted "pa" stamp. It's weak; it needs a hand-drawn SVG.
6. **`#log`:** data-log rows.
7. **Footer:** status bar and credits (GeoJS and Open-Meteo attribution is required).

### The forecast panel (`#tele`): the centrepiece
- **The year is per visitor: "Unlivable by ____".** It's the year that location's summer peak crosses **48°C**, at warming = the real modelled rate from the Open-Meteo climate API (EC_Earth3P_HR model, 2025 to 2050) **× 5**, capped at 2133.
- The temperature, condition, air, biosphere and grid figures are derived from that, plus a hash of the city.
- **Two views:** `future` (inherited) and `now` (2026, real weather and AQI). Hover (desktop), tap (touch) or keyboard focus switches between them with a **glitch**, and the signal **slips** to 2026 by itself every 9 to 16 seconds.
- **Stat rows:**
  - **Air:** 10 segments, plus 2 that break out past the scale at 500 ("Lethal").
  - **Biosphere:** three activity-style rings (flora, fauna, ocean).
  - **Grid:** a 24-hour power strip (flatline in 2133).
- **Damage (2133 only):** light wear scratches on a canvas, plus **a chip cut out of the bottom-right corner** with `clip-path: path()`. It's positioned from the measured position of the grid's year text so it eats the end of the year. It's re-cut on resize and when fonts load.
- **Code flow:**
  - `resolve()` fetches the data.
  - `build()` computes both views.
  - `render()` paints the panel.
  - `setMode()` does the glitch.
  - `damage()` draws the canvas and builds the clip.
  - `applyClip()` switches the clip and the glass filter.

### Liquid glass (`LG` module)
- **Real refraction, in Chromium only** (`backdrop-filter: url(#svgFilter)` isn't supported in Safari or Firefox, which includes every iPhone browser). The `html.lg` class is set when it's active.
- **How it works:** a per-element displacement map is generated on a `<canvas>` from the rounded-rect signed distance field (plus the chip outline for `#tele`). It feeds an `feDisplacementMap` with an **RGB split** (dispersion), a light blur and saturation.
- Filters are rebuilt on resize. New ones are created *before* the old ones are removed, to avoid a flash.
- **Fallback:** clear glass with `blur(5px) saturate(160%)`.
- **Specular rim:** `.glass::before` (masked gradient border).

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
4. **Liquid glass doesn't render on Safari / iOS.** The only full fix is WebGL.
5. **Performance:** ~8 refracting glass panels, including the sticky nav. Unmeasured on real phones.
6. **The "Scroll" hint collides with the planet labels** in the bottom-right on desktop since the solar system moved there.
7. Cool cities often clamp to 2133 (the same as the origin). Consider a 45°C threshold if most visitors see 2133.
8. Biosphere rings at 1 to 5% read as dots; their tracks need more contrast.
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
