// Tiny SVG plotting helper used by lesson visuals.
//   const P = DL.plot(svgEl, { xmin, xmax, ymin, ymax, xticks: [...], yticks: [...], xlabel, ylabel });
//   P.sx(x), P.sy(y)       -> data to pixel coordinates
//   P.layer("cls")         -> new <g> clipped to the plot area
//   DL.svg(tag, attrs, parent) -> create an SVG element
window.DL = window.DL || {};

DL.svg = function (tag, attrs = {}, parent) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
};

let clipCount = 0;
DL.plot = function (svg, o) {
  const el = DL.svg;
  const W = o.width || 600, H = o.height || 360;
  const p = Object.assign({ l: 54, r: 18, t: 18, b: 46 }, o.pad || {});
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.classList.add("plot");
  const sx = (x) => p.l + ((x - o.xmin) / (o.xmax - o.xmin)) * (W - p.l - p.r);
  const sy = (y) => H - p.b - ((y - o.ymin) / (o.ymax - o.ymin)) * (H - p.t - p.b);

  const clipId = "dlclip" + ++clipCount;
  const defs = el("defs", {}, svg);
  el("rect", { x: p.l, y: p.t, width: W - p.l - p.r, height: H - p.t - p.b }, el("clipPath", { id: clipId }, defs));

  const axes = el("g", { class: "axes" }, svg);
  (o.xticks || []).forEach((t) => {
    el("line", { class: "grid", x1: sx(t), x2: sx(t), y1: sy(o.ymin), y2: sy(o.ymax) }, axes);
    el("text", { class: "tick", x: sx(t), y: sy(o.ymin) + 17, "text-anchor": "middle" }, axes).textContent = t;
  });
  (o.yticks || []).forEach((t) => {
    el("line", { class: "grid", x1: sx(o.xmin), x2: sx(o.xmax), y1: sy(t), y2: sy(t) }, axes);
    el("text", { class: "tick", x: sx(o.xmin) - 8, y: sy(t) + 4, "text-anchor": "end" }, axes).textContent = t;
  });
  el("line", { class: "axis", x1: sx(o.xmin), x2: sx(o.xmax), y1: sy(o.ymin), y2: sy(o.ymin) }, axes);
  el("line", { class: "axis", x1: sx(o.xmin), x2: sx(o.xmin), y1: sy(o.ymin), y2: sy(o.ymax) }, axes);
  if (o.xlabel) el("text", { class: "label", x: (sx(o.xmin) + sx(o.xmax)) / 2, y: H - 8, "text-anchor": "middle" }, axes).textContent = o.xlabel;
  if (o.ylabel) el("text", { class: "label", x: 14, y: (sy(o.ymin) + sy(o.ymax)) / 2, "text-anchor": "middle", transform: `rotate(-90 14 ${(sy(o.ymin) + sy(o.ymax)) / 2})` }, axes).textContent = o.ylabel;

  const layer = (cls, attrs = {}) => el("g", Object.assign({ class: cls || "", "clip-path": `url(#${clipId})` }, attrs), svg);
  return { sx, sy, W, H, pad: p, layer, svg };
};
