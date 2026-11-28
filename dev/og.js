// Renders the social-card images in og/ (1200×630, what Google, LinkedIn, X and iMessage show for a shared link).
// Run: node dev/og.js   (needs Playwright, like dev/preview.js; fonts come from Google Fonts, so it needs the network)
// Edit CARDS below and run again to change a card.
const { chromium } = require("playwright");
const path = require("path"), fs = require("fs");
const OUT = path.join(__dirname, "..", "og"); fs.mkdirSync(OUT, { recursive: true });

const CARDS = [
  { file: "home", kind: "Signal live // Origin 2133", title: 'We create <span class="l">futures.</span>', size: 150,
    line: "Sc3ne · R3mesher · Cad3t" },
  { file: "sc3ne", kind: "MOD.01 // Fashion PLM // 3D visual merchandising", title: 'Sc<span class="l">3</span>ne', size: 230,
    line: "Track a garment from first sketch to production run, without a six-figure enterprise contract." },
  { file: "r3mesher", kind: "MOD.02 // Remesher // for 3D garments", title: 'R<span class="l">3</span>mesher', size: 190,
    line: "Turn mess into mesh, so things get made and repaired instead of binned." },
  { file: "cad3t", kind: "MOD.03 // CAD // NURBS modelling", title: 'Cad<span class="l">3</span>t', size: 230,
    line: "Full CAD, from the cabinet to the circuit board inside it, straight to the CNC." },
];

const html = c => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500&family=Inter+Tight:wght@600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; position: relative; color: #1a120d; font-family: "Inter Tight", sans-serif;
    background: linear-gradient(180deg, #7a2e14 0%, #b9592a 28%, #d98a45 55%, #ecc08a 78%, #f3dcb8 100%); }
  body::after { content: ""; position: absolute; inset: 0; mix-blend-mode: multiply; background: rgb(246, 242, 239); }
  .sun { position: absolute; width: 300px; height: 300px; border-radius: 50%; right: 110px; top: 70px; opacity: .9; filter: blur(1.5px);
    background: radial-gradient(circle, #fff1d6 0 58%, rgba(255,226,180,.55) 64%, transparent 72%); box-shadow: 0 0 120px 60px rgba(255,190,120,.35); }
  .in { position: absolute; left: 72px; right: 72px; top: 64px; bottom: 60px; display: flex; flex-direction: column; z-index: 1; }
  .hud { font: 500 18px "Chakra Petch", monospace; letter-spacing: .14em; text-transform: uppercase; color: rgba(26,18,13,.6); }
  .dot { display: inline-block; width: 9px; height: 9px; border-radius: 50%; background: #fff3e0; box-shadow: 0 0 10px #fff3e0; margin-right: 12px; position: relative; top: -2px; }
  h1 { margin-top: auto; font-weight: 700; line-height: .84; letter-spacing: -.055em; }
  .l { color: #fff3e0; text-shadow: 0 0 40px rgba(255,230,190,.55); }
  p { margin-top: 30px; font-weight: 600; font-size: 32px; line-height: 1.2; letter-spacing: -.02em; max-width: 900px; }
  .foot { margin-top: 30px; display: flex; justify-content: space-between; }
</style></head><body><div class="sun"></div><div class="in">
  <div class="hud"><i class="dot"></i>${c.kind}</div>
  <h1 style="font-size:${c.size}px">${c.title}</h1>
  <p>${c.line}</p>
  <div class="foot hud"><span>postapocapitalism.org</span><span>Est. later</span></div>
</div></body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  for (const c of CARDS) {
    await page.setContent(html(c), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, c.file + ".png") });
    console.log("og/" + c.file + ".png");
  }
  await browser.close();
})();
