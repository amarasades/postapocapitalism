// Screenshot harness with mocked APIs. Run: node dev/preview.js
// Needs Playwright (preinstalled in Claude cloud sessions; elsewhere: npm i -D playwright && npx playwright install chromium).
const { chromium } = require("playwright");
const path = require("path"), fs = require("fs");
const OUT = path.join(__dirname, "out"); fs.mkdirSync(OUT, { recursive: true });
const PAGE = "file://" + path.resolve(__dirname, "..", "index.html");

// fake climate series: base + seasonal swing + trend (°C/yr)
function climate(base, amp, trend) {
  const time = [], tx = []; const d = new Date(Date.UTC(2025, 0, 1));
  while (d.getUTCFullYear() <= 2050) {
    const doy = (d - Date.UTC(d.getUTCFullYear(), 0, 1)) / 864e5, y = d.getUTCFullYear() - 2025;
    time.push(d.toISOString().slice(0, 10)); tx.push(+(base + amp * Math.sin((doy - 110) / 365 * 2 * Math.PI) + trend * y + ((doy * 7919) % 40) / 10 - 2).toFixed(1));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return { daily: { time, temperature_2m_max: tx } };
}
const SCENARIOS = {
  london: { geo: { latitude: "51.5", longitude: "-0.12", city: "London", country_code: "GB" }, t: 9.4, code: 3, aqi: 38, clim: climate(15, 8, .045) },
  phoenix: { geo: { latitude: "33.4", longitude: "-112.0", city: "Phoenix", country_code: "US" }, t: 24, code: 0, aqi: 61, clim: climate(30, 10, .06) },
  lost: null // every request fails: "Signal lost"
};
const IDS = ["t-year", "t-city", "t-sub", "t-temp", "t-cond", "t-aqi", "t-aqi-s", "t-bio", "t-grid", "t-grid-s"];

(async () => {
  const browser = await chromium.launch();
  for (const [name, s] of Object.entries(SCENARIOS)) {
    for (const [vp, width, height, mobile] of [["desk", 1440, 900, false], ["phone", 390, 844, true]]) {
      const ctx = await browser.newContext({ viewport: { width, height }, hasTouch: mobile, isMobile: mobile });
      const page = await ctx.newPage();
      page.on("pageerror", e => console.log("PAGE ERROR", e.message));
      await page.route(/geojs|open-meteo/, r => {
        if (!s) return r.abort();
        const u = r.request().url();
        const body = u.includes("geojs") ? s.geo : u.includes("air-quality") ? { current: { us_aqi: s.aqi } }
          : u.includes("climate-api") ? s.clim : { current: { temperature_2m: s.t, apparent_temperature: s.t - 2, weather_code: s.code, is_day: 1 } };
        r.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify(body) });
      });
      await page.goto(PAGE); await page.waitForTimeout(1800);
      const read = () => page.evaluate(ids => ids.map(i => document.getElementById(i)?.textContent).join(" | "), IDS);
      console.log(`${name} ${vp} 2133: ${await read()}`);
      await page.screenshot({ path: path.join(OUT, `${name}-${vp}.png`) });
      if (mobile) await page.tap("#tele"); else await page.hover("#tele");
      await page.waitForTimeout(500);
      console.log(`${name} ${vp} now : ${await read()}`);
      await page.locator("#tele").screenshot({ path: path.join(OUT, `${name}-${vp}-panel-now.png`) });
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      if (sw > width) console.log(`  ! horizontal scroll: ${sw}px > ${width}px`);
      await ctx.close();
    }
  }
  await browser.close();
  console.log("screenshots in", OUT);
})();
