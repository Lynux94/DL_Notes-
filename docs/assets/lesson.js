// Shared page behaviour: theme toggle, progress ("mark as done"), prev/next lesson links.
window.DL = window.DL || {};

DL.store = {
  get(k, d) { try { const v = localStorage.getItem("dl:" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("dl:" + k, JSON.stringify(v)); } catch (e) {} },
};

// Apply saved theme as early as possible.
(function () {
  const t = DL.store.get("theme", null);
  if (t) document.documentElement.setAttribute("data-theme", t);
})();

DL.isDone = (id) => !!DL.store.get("done", {})[id];
DL.setDone = (id, v) => { const d = DL.store.get("done", {}); d[id] = v; DL.store.set("done", d); };

document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle
  const btn = document.querySelector("[data-theme-toggle]");
  if (btn) {
    const isDark = () => {
      const t = document.documentElement.getAttribute("data-theme");
      return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    };
    const label = () => { btn.textContent = isDark() ? "☀ Light" : "☾ Dark"; };
    label();
    btn.addEventListener("click", () => {
      const next = isDark() ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      DL.store.set("theme", next);
      label();
    });
  }

  // Lesson page: prev/next + done toggle
  const id = document.body.dataset.lesson;
  const root = document.body.dataset.root || "./";
  if (!id || !DL.LESSONS) return;

  const ready = DL.LESSONS.filter((l) => l.status === "ready");
  const i = ready.findIndex((l) => l.id === id);
  const nav = document.querySelector(".lesson-nav");
  if (nav && i >= 0) {
    const link = (l, cls, dir) =>
      `<a class="${cls}" href="${root}${l.path}"><div class="dir">${dir}</div>${l.title}</a>`;
    const upcoming = DL.LESSONS.find((l, j) => j > DL.LESSONS.findIndex((x) => x.id === id) && l.status === "planned");
    nav.innerHTML =
      (ready[i - 1] ? link(ready[i - 1], "prev", "← Previous") : `<a class="prev" href="${root}"><div class="dir">← Back</div>All lessons</a>`) +
      (ready[i + 1]
        ? link(ready[i + 1], "next", "Next →")
        : upcoming ? `<a class="next" href="${root}"><div class="dir">Coming next</div>${upcoming.title}</a>` : "");
  }

  const box = document.querySelector("[data-done-toggle]");
  if (box) {
    box.checked = DL.isDone(id);
    box.addEventListener("change", () => DL.setDone(id, box.checked));
  }
});
