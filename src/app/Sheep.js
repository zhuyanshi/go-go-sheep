export default class Sheep {
  constructor(ctx, position) {
    this.ctx = ctx;
    this.position = position || [0, 0];
    this.dimension = [36, 36];
    this.g = 0.2; // NOTE: Gravity.
    this.v = [0, 0]; // NOTE: Velocity.
    this.jumpV = 7;
    this.jumpA = [0.2,0.1];
    window.addEventListener('keydown',this,false);
    window.addEventListener('keyup',this,false);
  }
  handleEvent(){
    if (event.type ==='keydown'&&event.key ===' ' ) {
        this.jump();
    }
    if (event.type ==='keyup'&&event.key ===' ' ) {
        this.endJump();
    }
  };
  update() {
    this.fall();
  }

  /**
   * Simple collision check.
   * @return {boolean} whether can the sheep fall.
   */
  canFall() {
    return this.position[1] + this.dimension[1] + 1 < this.ctx.canvas.height;
  }
  /**
   * Simple collision check.
   * @return {boolean}  Can the sheep jump.
   */
  canJump() {
    return (this.position[1] + this.dimension[1] + 1 >= this.ctx.canvas.height)&&(this.position[1] - 1 > 0);
  }
  /**
   * Simple collision check.
   * @return {boolean}  IS the sheep on the ground.
   */
  isOnTheGround(){
    return this.position[1] + this.dimension[1] + 1 >= this.ctx.canvas.height;
  }
  /**
   * Sheep fall.
   */
  fall() {
    this.position[1] = this.position[1] + this.v[1] + this.g/2;
    if(this.isOnTheGround()){
      this.position[1] = this.ctx.canvas.height - this.dimension[1] - 1;
      this.v[1] = 0;
    } else {
      this.v[1] += this.g;
    }
  }
  // TODO: When calling this method, the sheep will `jump`.
  jump() {
    if(this.isOnTheGround()) {
      this.v[1] -= this.jumpV;
    }
    this.g =this.jumpA[1];
  }
  // TODO: When calling this method, the sheep will `endjump`.
  endJump() {
    this.g =this.jumpA[0];
  }
  draw() {
    this.ctx.save();
    this.ctx.strokeStyle = 'red';
    this.ctx.strokeRect(this.position[0], this.position[1], this.dimension[0], this.dimension[1]);
    this.ctx.restore();
  }
}
