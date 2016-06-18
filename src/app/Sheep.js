export default class Sheep {
  constructor(ctx, position) {
    this.ctx = ctx;
    this.position = position || [0, 0];
    this.dimension = [36, 36];
    this.direction = [1, 0];
  }

  update() {
    let newX = this.position[0] + this.dimension[0] + this.direction[0];
    if (newX > this.ctx.canvas.width || this.position[0] < 1) {
      this.direction[0] = -this.direction[0];
    }
    this.position[0] = this.position[0] + this.direction[0];
  }

  draw() {
    this.ctx.save();
    this.ctx.strokeStyle = 'red';
    this.ctx.strokeRect(this.position[0], this.position[1], this.dimension[0], this.dimension[1]);
    this.ctx.restore();
  }
}
