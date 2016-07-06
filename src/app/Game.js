import Sheep from './Sheep.js';

export default class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.drawables = [];
    this.drawables.push(new Sheep(ctx, [10, 10]));
  }

  run() {
    this.keyBinding();
    requestAnimationFrame(function step() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.save();
      this.ctx.fillStyle = '#F8F8F8';
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.restore();

      this.drawables.forEach(drawable => {
        drawable.update();
        drawable.draw();
      });
      requestAnimationFrame(step.bind(this));
    }.bind(this));
  }

  keyBinding() {
    window.addEventListener('keydown', e => {
      this.drawables[0].action(e);
    });
    window.addEventListener('keyup', e => {
      this.drawables[0].action(e);
    });
  }
}
