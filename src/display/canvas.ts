/**
 * Settings for the canvas element the game runs in.
 */
export default (canvas: HTMLCanvasElement) => {
  canvas.width = 960;
  canvas.height = 720;
  canvas.style.width = '960px';
  canvas.style.height = '720px';
  canvas.getContext('2d').scale(2, 2);
};
