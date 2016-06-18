export default function canvas(w, h) {
  let canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  return canvas;
}
