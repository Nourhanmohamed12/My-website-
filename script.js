const texts = ["Data Scientist ", "Python Developer ", "Data Engineer "];
let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
  const element = document.getElementById("typed-text");

  if (index >= texts.length) index = 0;

  currentText = texts[index];

  if (isDeleting) {
    element.textContent = currentText.substring(0, charIndex--);
  } else {
    element.textContent = currentText.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index++;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();
const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

hiddenElements.forEach((el) => observer.observe(el));
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function (e) {
    let circle = document.createElement("span");
    circle.classList.add("ripple");

    const rect = button.getBoundingClientRect();
    circle.style.left = `${e.clientX - rect.left}px`;
    circle.style.top = `${e.clientY - rect.top}px`;

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
});

/* Highlight the current section in the navbar while scrolling */
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach((s) => spy.observe(s));


/* Animated background: drifting glows + connected data nodes */
(function () {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, pts = [];

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    const n = Math.min(90, Math.floor((w * h) / 16000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.8
    }));
  }

  function glow(x, y, r, color) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(15,23,42,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const t = Date.now() / 6000;
    glow(w * (0.25 + 0.1 * Math.sin(t)), h * (0.3 + 0.1 * Math.cos(t)), 460, "rgba(56,189,248,0.10)");
    glow(w * (0.75 + 0.1 * Math.cos(t * 1.3)), h * (0.7 + 0.1 * Math.sin(t * 1.1)), 460, "rgba(59,130,246,0.10)");

    for (const p of pts) {
      if (!still) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56,189,248,0.7)";
      ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) {
      for (let k = i + 1; k < pts.length; k++) {
        const dx = pts[i].x - pts[k].x, dy = pts[i].y - pts[k].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.strokeStyle = "rgba(56,189,248," + ((1 - d / 130) * 0.3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[k].x, pts[k].y);
          ctx.stroke();
        }
      }
    }
    if (!still) requestAnimationFrame(draw);
  }

  addEventListener("resize", () => { resize(); if (still) draw(); });
  resize();
  draw();
})();
