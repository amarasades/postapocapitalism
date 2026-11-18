# The original orange version (reference)

This is the **first orange "liquid glass" version** of the site, exactly as it shipped (commit `4be8b08`, 2026-11-18). The owner judges the current site against it. **Look at it before touching the sky, sun, glow or headline.**

- `index.html`: the full page, untouched. It's live at `postapocapitalism.org/archive/first-orange/`, or open it locally.
- `desktop.png` (1440×900) and `phone.png` (390×844 @2x): what it looked like.

What the owner loved here, and what must not drift:
- **The sun:** a flat disc (`radial-gradient` on the element) plus one smooth glow `box-shadow: 0 0 120px 60px rgba(255,190,120,.35)`, with `blur(1.5px)` and `opacity .9`. "Smooth sailing colors." A faint rectangle around its glow on phones is part of the original; don't "fix" it by replacing the shadow (that was tried, and it killed the sun).
- **The sky:** gradient `#7a2e14 → #b9592a → #d98a45 → #ecc08a → #f3dcb8`, three drifting smoke blobs, and grain **behind** the content (`z-index: -1`, multiply, opacity .5).
- **The headline:** Inter Tight 700, `clamp(64px, 15vw, 210px)` (24vw on phones), line-height .84, letter-spacing −.055em. **"futures."** in `#fff3e0` with `text-shadow: 0 0 40px rgba(255,230,190,.5)`, sitting over the orange part of the sky. That's where the glow reads.

Things here that were later removed on purpose: the "SUBSCRIBE" ghost text, the straight-line scratches on the glass, and the serif-free but frosted heavy glass (the owner later asked for clearer, real liquid glass).
