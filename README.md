# DL Notes — Visual Deep Learning

Learn AI / deep-learning topics and research papers step by step, with interactive visuals.

**Website:** https://lynux94.github.io/DL_Notes-/

## Lessons
| # | Topic | Track |
|---|-------|-------|
| 1 | [Linear Regression & Gradient Descent](https://lynux94.github.io/DL_Notes-/lessons/01-gradient-descent/) | Foundations |

See [PLAN.md](PLAN.md) for the full plan and roadmap.

## Run locally
```bash
cd docs && python3 -m http.server 8000
# open http://localhost:8000
```

## Structure
- `docs/` — the website (served by GitHub Pages)
  - `assets/` — shared CSS, step-through helper (`stepper.js`), plotting helper (`plot.js`), lesson registry (`lessons.js`)
  - `lessons/NN-topic/` — one folder per lesson
- `papers/` — paper PDFs and notes (not published)
