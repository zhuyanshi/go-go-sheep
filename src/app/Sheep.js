export default class Sheep {
  constructor(ctx, position) {
    this.ctx = ctx;
    this.position = position || [0, 0];
    this.dimension = [36, 36];
    this.g = 1; // NOTE: Gravity.
    this.v = [0, 0]; // NOTE: Velocity.
  }

  update() {
    if (this.canFall()) {
      this.fall();
    }
  }

  /**
   * Simple collision check.
   * @return {boolean} whether can the sheep fall.
   */
  canFall() {
    return this.position[1] + this.dimension[1] + 1 < this.ctx.canvas.height;
  }

  /**
   * Fall down.
   */
  fall() {
    let _position = this.position[1] + this.v[1] + this.g/2;
    let horizon = this.ctx.canvas.height - this.dimension[1] - 1;
    if (_position >= horizon) {
      _position = horizon;
      this.v[1] = 0;
    } else {
      this.v[1] += this.g;
    }
    this.position[1] = _position;
  }

  // TODO: When calling this method, the sheep will `jump`.
  jump() {

  }

  draw() {
    this.ctx.save();
    this.ctx.strokeStyle = 'red';
    this.ctx.strokeRect(this.position[0], this.position[1], this.dimension[0], this.dimension[1]);
    this.ctx.restore();
  }
}
