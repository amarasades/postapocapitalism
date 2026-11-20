// Re-bakes the "pa" stamp PNG. The stamp used to be an inline <svg> (circle + "pa" text, Inter Tight 800, filter #decay).
// To change it: put that svg back temporarily, run `node dev/bake-stamp.js`, quantise to 16 colours, base64 it into the <img class="stamp">.
// bakes the "pa" stamp (svg + its #decay filter, in the real web font) to a transparent PNG, exactly as Chrome renders it
const { chromium } = require("/opt/node-tools/node_modules/playwright");
(async () => { const b = await chromium.launch(); const p = await (await b.newContext({viewport:{width:520,height:420},deviceScaleFactor:2})).newPage();
  await p.route(/geojs|open-meteo/, r => r.abort());
  await p.goto("file:///home/user/postapocapitalism/index.html?glass=plain"); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  await p.evaluate(() => {
    const svg = document.querySelector(".paper .mark svg"), f = document.getElementById("decay");
    document.body.innerHTML = ""; document.documentElement.style.background = "transparent"; document.body.style.cssText = "margin:0;background:transparent";
    const st = document.createElement("style"); st.textContent = "*,*::before,*::after{background:transparent!important} body::after{display:none!important}"; document.head.appendChild(st);
    const s2 = svg.cloneNode(true); s2.setAttribute("width", 520); s2.setAttribute("height", 420); s2.style.display = "block";
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs"); defs.appendChild(f.cloneNode(true)); s2.prepend(defs);
    document.body.appendChild(s2);
  });
  await p.waitForTimeout(300);
  await p.screenshot({ path: "/tmp/claude-0/-home-user-postapocapitalism/0cf6776d-ea01-51d9-8393-63f9c48da75c/scratchpad/stamp-raw.png", omitBackground: true, clip: { x: 0, y: 0, width: 520, height: 420 } });
  await b.close(); })();
