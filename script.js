/* ===== Animated data-viz background (curvy lines, grid, particles) ===== */
(function () {
  const c = document.getElementById("bg");
  if (!c) return;
  const ctx = c.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, dpr, particles = [], waves = [];

  function rand(a, b) { return a + Math.random() * (b - a); }

  function setup() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = c.width = innerWidth * dpr;
    h = c.height = innerHeight * dpr;
    c.style.width = innerWidth + "px";
    c.style.height = innerHeight + "px";
    particles = Array.from({ length: Math.round((innerWidth * innerHeight) / 9000) }, () => ({
      x: rand(0, w * 0.65), y: rand(0, h), r: rand(0.6, 2.6) * dpr,
      a: rand(0.15, 0.8), s: rand(0.05, 0.25) * dpr, p: rand(0, Math.PI * 2)
    }));
    waves = Array.from({ length: 6 }, (_, i) => ({
      amp: rand(30, 90) * dpr, freq: rand(0.002, 0.005) / dpr, y: h * rand(0.25, 0.8),
      speed: rand(0.0003, 0.0008), phase: rand(0, 10), alpha: rand(0.12, 0.3)
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    // grid
    ctx.strokeStyle = "rgba(124,196,255,0.05)";
    ctx.lineWidth = 1;
    const g = 132 * dpr;
    for (let x = 0; x < w; x += g) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += g) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }


    // flowing lines
    waves.forEach(wv => {
      ctx.beginPath();
      for (let x = 0; x <= w * 0.75; x += 8 * dpr) {
        const y = wv.y + Math.sin(x * wv.freq + wv.phase + (reduce ? 0 : t * wv.speed)) * wv.amp
                       + Math.sin(x * wv.freq * 2.3 + wv.phase) * wv.amp * 0.3;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(124,190,255,${wv.alpha})`;
      ctx.lineWidth = 1.2 * dpr; ctx.stroke();
    });

    // particles
    particles.forEach(p => {
      if (!reduce) { p.y -= p.s; if (p.y < -5) { p.y = h + 5; p.x = rand(0, w * 0.65); } }
      const tw = reduce ? 1 : 0.6 + 0.4 * Math.sin(t * 0.002 + p.p);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(170,215,255,${p.a * tw})`; ctx.fill();
    });

    if (!reduce) requestAnimationFrame(draw);
  }

  setup();
  addEventListener("resize", () => { setup(); if (reduce) draw(0); });
  reduce ? draw(0) : requestAnimationFrame(draw);
})();

/* ===== Typing role effect ===== */
(function () {
  const el = document.getElementById("typed-text");
  if (!el) return;
  const roles = ["Data Analyst", "Data Scientist", "AI/Data Engineer", "Problem Solver"];
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = roles[0]; return; }
  let r = 0, i = 0, deleting = false;
  (function tick() {
    const word = roles[r];
    el.textContent = word.slice(0, i);
    if (!deleting && i < word.length) { i++; setTimeout(tick, 90); }
    else if (!deleting) { deleting = true; setTimeout(tick, 1800); }
    else if (i > 0) { i--; setTimeout(tick, 45); }
    else { deleting = false; r = (r + 1) % roles.length; setTimeout(tick, 300); }
  })();
})();

/* ===== Placeholder project art (shown until you add real images) ===== */
function drawTerrain(cv) {
  const ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
  ctx.fillStyle = "#0b0a14"; ctx.fillRect(0, 0, W, H);
  const rows = 46, cols = 70;
  for (let r = 0; r < rows; r++) {
    const depth = r / rows;
    ctx.beginPath();
    for (let cI = 0; cI <= cols; cI++) {
      const x = (cI / cols) * W;
      const n = Math.sin(cI * 0.18 + r * 0.25) * 0.5 + Math.sin(cI * 0.07 - r * 0.12) * 0.9 + Math.cos(cI * 0.31 + r * 0.05) * 0.25;
      const y = H * 0.22 + depth * H * 0.85 - n * 70 * (1 - depth * 0.4) - Math.exp(-((cI - 40) ** 2) / 60) * 120 * (1 - depth);
      cI === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(${170 + depth * 60},${150 + depth * 70},${230},${0.15 + depth * 0.45})`;
    ctx.lineWidth = 1; ctx.stroke();
  }
}
function drawNetwork(cv) {
  const ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
  const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7);
  bg.addColorStop(0, "#1c2a33"); bg.addColorStop(1, "#0a1116");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const nodes = Array.from({ length: 60 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 4 + 1 }));
  const cx = W / 2, cy = H / 2;
  nodes.forEach(n => {
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.quadraticCurveTo((cx + n.x) / 2 + (Math.random() - .5) * 120, (cy + n.y) / 2 + (Math.random() - .5) * 120, n.x, n.y);
    ctx.strokeStyle = "rgba(170,220,225,0.22)"; ctx.lineWidth = 1; ctx.stroke();
  });
  nodes.forEach((a, i) => nodes.slice(i + 1).forEach(b => {
    if (Math.hypot(a.x - b.x, a.y - b.y) < 140) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = "rgba(170,220,225,0.12)"; ctx.stroke(); }
  }));
  nodes.concat([{ x: cx, y: cy, r: 12 }]).forEach(n => {
    const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
    g.addColorStop(0, "rgba(220,250,250,0.9)"); g.addColorStop(1, "rgba(220,250,250,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2); ctx.fill();
  });
}
function drawBars(cv) {
  const ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
  ctx.fillStyle = "#120d0a"; ctx.fillRect(0, 0, W, H);
  const n = 34, bw = W / n;
  for (let i = 0; i < n; i++) {
    const v = 0.25 + 0.6 * Math.abs(Math.sin(i * 0.35)) * (0.6 + Math.random() * 0.4);
    const g = ctx.createLinearGradient(0, H - v * H, 0, H);
    g.addColorStop(0, "rgba(240,170,90,0.85)"); g.addColorStop(1, "rgba(240,170,90,0.05)");
    ctx.fillStyle = g; ctx.fillRect(i * bw + 3, H - v * H * 0.8, bw - 6, v * H * 0.8);
  }
  ctx.strokeStyle = "rgba(255,210,150,.7)"; ctx.lineWidth = 2; ctx.beginPath();
  for (let i = 0; i <= n; i++) { const y = H * 0.45 + Math.sin(i * 0.4) * 60; i ? ctx.lineTo(i * bw, y) : ctx.moveTo(0, y); }
  ctx.stroke();
}
function drawOrbit(cv) {
  const ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
  ctx.fillStyle = "#0d0c18"; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 18; i++) {
    ctx.beginPath(); ctx.ellipse(W / 2, H / 2, 40 + i * 26, 18 + i * 12, -0.35, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(150,160,255,${0.35 - i * 0.015})`; ctx.lineWidth = 1; ctx.stroke();
  }
  for (let i = 0; i < 140; i++) {
    const a = Math.random() * Math.PI * 2, rr = 40 + Math.random() * 460;
    const x = W / 2 + Math.cos(a) * rr, y = H / 2 + Math.sin(a) * rr * 0.45;
    ctx.fillStyle = `rgba(200,205,255,${Math.random() * 0.8})`; ctx.fillRect(x, y, 2, 2);
  }
}
document.querySelectorAll("canvas[data-art]").forEach(cv => {
  cv.width = 1000; cv.height = 625;
  ({ terrain: drawTerrain, network: drawNetwork, bars: drawBars, orbit: drawOrbit })[cv.dataset.art]?.(cv);
});

/* Hide real-image slots that don't have a file yet, so the placeholder shows */
document.querySelectorAll("img[data-optional]").forEach(img => {
  const hide = () => { img.style.display = "none"; };
  const loaded = () => {
    const tag = img.parentElement.querySelector(".tag-r, .ph");
    if (tag) tag.style.display = "none";
  };
  // Cached images can finish loading before this script runs, so check both ways
  if (img.complete) { img.naturalWidth > 0 ? loaded() : hide(); }
  img.addEventListener("error", hide);
  img.addEventListener("load", loaded);
});

/* Footer year */
document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

/* Screenshot viewer: click a project image to open it, then browse the rest */
(() => {
  const cards = document.querySelectorAll(".card-art[data-shots]");
  if (!cards.length) return;
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.innerHTML = `
    <button class="lb-btn lb-close" aria-label="Close">&times;</button>
    <button class="lb-btn lb-prev" aria-label="Previous screenshot">&lsaquo;</button>
    <button class="lb-btn lb-next" aria-label="Next screenshot">&rsaquo;</button>
    <p class="lb-title"><span class="lb-name"></span><span class="lb-count"></span></p>
    <div class="lb-stage"><img alt=""></div>
    <div class="lb-thumbs"></div>`;
  document.body.appendChild(lb);
  const img = lb.querySelector(".lb-stage img");
  const name = lb.querySelector(".lb-name");
  const count = lb.querySelector(".lb-count");
  const thumbs = lb.querySelector(".lb-thumbs");
  let shots = [], i = 0, title = "", opener = null;

  const show = (n) => {
    i = (n + shots.length) % shots.length;
    img.src = shots[i];
    img.alt = `${title} screenshot ${i + 1}`;
    count.textContent = `${i + 1} / ${shots.length}`;
    thumbs.querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-current", k === i));
  };
  const open = (card) => {
    opener = card;
    shots = card.dataset.shots.split(",");
    title = card.dataset.title;
    name.textContent = title;
    thumbs.innerHTML = shots.map((src, k) =>
      `<button aria-label="Screenshot ${k + 1}"><img src="${src}" alt=""></button>`).join("");
    thumbs.querySelectorAll("button").forEach((b, k) => b.addEventListener("click", () => show(k)));
    show(0);
    lb.classList.add("open");
    document.body.classList.add("lb-open");
    lb.querySelector(".lb-close").focus();
  };
  const close = () => {
    lb.classList.remove("open");
    document.body.classList.remove("lb-open");
    if (opener) opener.focus();
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => open(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(card); }
    });
  });
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", () => show(i - 1));
  lb.querySelector(".lb-next").addEventListener("click", () => show(i + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb-stage")) close(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(i - 1);
    else if (e.key === "ArrowRight") show(i + 1);
  });
})();

/* Projects / Resume tabs: only the content under the tabs changes */
(() => {
  const tabs = [...document.querySelectorAll(".tabs [role=tab]")];
  if (!tabs.length) return;
  const section = document.getElementById("work");
  const select = (tab, scroll) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on);
      document.getElementById(t.dataset.panel).hidden = !on;
    });
    history.replaceState(null, "", tab.getAttribute("href"));
    if (scroll) section.scrollIntoView({ behavior: "smooth" });
  };
  tabs.forEach((t) => t.addEventListener("click", (e) => { e.preventDefault(); select(t, false); }));
  document.querySelectorAll("[data-open-tab]").forEach((a) =>
    a.addEventListener("click", (e) => { e.preventDefault(); select(document.getElementById(a.dataset.openTab), true); }));
  const fromHash = () => {
    if (location.hash === "#resume") select(tabs[1], true);
    else if (location.hash === "#work") select(tabs[0], false);
  };
  fromHash();
  addEventListener("hashchange", fromHash);
})();
