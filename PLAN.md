# DL Notes — Learning Plan

A personal, visual, step-by-step learning site for AI / Deep Learning topics and research papers, published with **GitHub Pages** at:

> https://lynux94.github.io/DL_Notes-/

---

## 1. Goals

1. **Learn one topic at a time** — each topic or paper becomes one lesson page.
2. **Simple first, then deeper** — intuition → picture → small math → code → recap.
3. **Visual and step-by-step** — every lesson has interactive visuals you click through with *Next / Back* buttons, so ideas are built up piece by piece instead of shown all at once.
4. **Browsable website** — a home page lists all lessons by track; every lesson links to the previous and next one.

---

## 2. How we work together

| Step | You | Claude |
|------|-----|--------|
| 1 | Give a topic (e.g. "backpropagation") or a paper (PDF / arXiv link) | — |
| 2 | — | Writes a short outline: prerequisites, key ideas, planned visuals |
| 3 | Approve or adjust the outline | — |
| 4 | — | Builds the lesson page + visualisations, adds it to the home page |
| 5 | Read it, ask questions | Answers, and folds good questions back into the lesson ("Common questions" section) |
| 6 | Commit & push | Site updates automatically |

Paper PDFs you share go in `papers/` (kept out of the site if they are copyrighted; only the lesson is published).

---

## 3. Lesson template

Every lesson page follows the same shape so they are easy to review later:

1. **One-line idea** — the topic in one sentence.
2. **Why it matters** — what problem it solves.
3. **Prerequisites** — links to earlier lessons.
4. **Intuition** — plain-language explanation with an analogy.
5. **Step-by-step visual** — the core of the lesson: an interactive diagram with *Next / Back* steps, each step adding one idea, with a short caption.
6. **The math (light)** — only the key equations, each term explained, rendered with KaTeX.
7. **Tiny code** — a minimal NumPy / PyTorch snippet that shows the idea working.
8. **Common mistakes & questions**.
9. **Recap** — 3–5 bullet summary.
10. **Self-check quiz** — 3–5 click-to-reveal questions.

**Paper lessons** add:
- Paper card: title, authors, year, link.
- *The problem before this paper* → *the key idea* → *how it works (visual)* → *results* → *limitations* → *what came after*.

---

## 4. Site technology

Keep it **simple, no build step**, so anything pushed to GitHub just works.

- **Plain HTML + CSS + JavaScript** pages served from the `docs/` folder (GitHub Pages → "Deploy from branch: `main` / `docs`").
- **Visualisations:** inline SVG + small vanilla JS for step-through diagrams; **D3.js** (CDN) for data-driven plots; **Canvas** for animations (e.g. gradient descent on a loss surface).
- **Math:** KaTeX (CDN).
- **Code highlighting:** highlight.js or Prism (CDN).
- **Shared assets:** one stylesheet and one small `stepper.js` helper so every lesson's *Next / Back* visual works the same way.
- **Light & dark mode** support, readable on phone and laptop.

Why not Jupyter Book / MkDocs? They are good for text, but interactive step-through visuals are easier and more flexible in plain HTML, and there is nothing to install or build.

---

## 5. Repository structure

```
DL_Notes-/
├── README.md              # Short intro + link to the site
├── PLAN.md                # This file
├── papers/                # Your PDFs / notes on papers (not published)
└── docs/                  # Everything GitHub Pages serves
    ├── index.html         # Home page: lesson list grouped by track
    ├── assets/
    │   ├── style.css      # Shared look & feel
    │   ├── stepper.js     # Shared Next/Back step-through helper
    │   ├── plot.js        # Small SVG plotting helper
    │   ├── lessons.js     # Lesson registry (home page + prev/next read it)
    │   └── lesson.js      # Shared nav (prev/next), progress, theme
    ├── lessons/
    │   ├── 01-<topic>/index.html
    │   ├── 02-<topic>/index.html
    │   └── ...
    └── papers/
        ├── <paper-short-name>/index.html
        └── ...
```

Lessons are numbered in the order we study them; the home page is updated each time one is added.

---

## 6. Suggested roadmap (flexible — your topics take priority)

**Track A — Foundations**
1. What is learning? (data, model, loss)
2. Linear regression & gradient descent
3. Logistic regression & classification
4. The perceptron and the neuron
5. Multi-layer perceptrons & activation functions
6. Backpropagation (computational graphs)
7. Optimisers: SGD, Momentum, Adam
8. Overfitting, regularisation, dropout, batch norm

**Track B — Architectures**
9. Convolutional Neural Networks
10. Recurrent Networks, LSTM, GRU
11. Attention mechanism
12. Transformers
13. Embeddings & tokenisation

**Track C — Generative & Modern AI**
14. Autoencoders & VAEs
15. GANs
16. Diffusion models
17. Large Language Models (pre-training, fine-tuning, RLHF)
18. Retrieval-augmented generation & agents

**Track D — Papers** (added as you share them), e.g. *Attention Is All You Need*, *ResNet*, *Adam*, *DDPM*.

---

## 7. Milestones

- [x] **M1 — Site skeleton:** `docs/` folder, home page, shared CSS/JS, one sample lesson; enable GitHub Pages.
- [x] **M2 — First real lesson:** Linear Regression & Gradient Descent.
- [ ] **M3 — First paper lesson** on the first paper you give.
- [ ] **M4 — Ongoing:** one lesson per topic/paper; keep home page and prev/next links updated.
- [ ] **Later (optional):** search box, progress tracker (mark lessons as done), glossary page.

---

## 8. Enabling GitHub Pages (one-time)

1. Push the repository with the `docs/` folder.
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Branch: `main`, folder: `/docs` → **Save**.
4. After about a minute the site is live at `https://lynux94.github.io/DL_Notes-/`.
