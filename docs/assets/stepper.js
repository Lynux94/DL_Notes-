// Stepper: a visual you click through with Next / Back.
//
// Markup:
//   <div class="stepper card" id="my-stepper">
//     <div class="stage"><svg>...</svg></div>
//     <ol class="stepper-captions"><li>Step 1 text</li><li>Step 2 text</li>...</ol>
//   </div>
//
// Inside the stage, any element with data-from="n" is shown from step n onward,
// and data-to="m" hides it again after step m (steps are 1-based).
//
// JS:  DL.stepper(document.getElementById("my-stepper"), { onStep(i) { ... } });
// Call it after the stage content exists (elements can be created by JS first).
window.DL = window.DL || {};

DL.stepper = function (root, opts = {}) {
  const captions = [...root.querySelectorAll(".stepper-captions li")];
  const n = captions.length;
  let cur = 1;

  const bar = document.createElement("div");
  bar.className = "stepper-bar";
  bar.innerHTML = `
    <button class="btn" data-a="back">← Back</button>
    <div class="stepper-dots">${captions.map((_, i) => `<button aria-label="Step ${i + 1}" data-i="${i + 1}"></button>`).join("")}</div>
    <span class="stepper-count"></span>
    <button class="btn primary" data-a="next">Next →</button>`;
  root.appendChild(bar);

  const back = bar.querySelector('[data-a="back"]');
  const next = bar.querySelector('[data-a="next"]');
  const dots = [...bar.querySelectorAll(".stepper-dots button")];
  const count = bar.querySelector(".stepper-count");

  function go(i) {
    cur = Math.max(1, Math.min(n, i));
    root.querySelectorAll(".stage [data-from], .stage [data-to]").forEach((el) => {
      const from = +(el.dataset.from || 1), to = +(el.dataset.to || Infinity);
      el.setAttribute("data-step-el", "");
      el.classList.toggle("hidden-step", cur < from || cur > to);
    });
    captions.forEach((c, j) => c.classList.toggle("active", j + 1 === cur));
    dots.forEach((d, j) => { d.classList.toggle("active", j + 1 === cur); d.classList.toggle("done", j + 1 < cur); });
    count.textContent = `Step ${cur} / ${n}`;
    back.disabled = cur === 1;
    next.textContent = cur === n ? "↺ Restart" : "Next →";
    if (opts.onStep) opts.onStep(cur);
  }

  back.addEventListener("click", () => go(cur - 1));
  next.addEventListener("click", () => go(cur === n ? 1 : cur + 1));
  dots.forEach((d) => d.addEventListener("click", () => go(+d.dataset.i)));
  root.tabIndex = 0;
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") go(cur + 1);
    if (e.key === "ArrowLeft") go(cur - 1);
  });

  go(1);
  return { go, get step() { return cur; } };
};
