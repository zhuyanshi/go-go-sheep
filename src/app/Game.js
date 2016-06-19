import Sheep from './Sheep.js';

export default class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.drawables = [];
    this.drawables.push(new Sheep(ctx, [10, 10]));
  }

  run() {
    //this.init();
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
  // handleEvent(){
  //   if (event.type ==='keydown'&&event.key ===' ' ) {
  //     if(this.drawables[0].canJump()){
  //       this.drawables[0].jump();
  //     }
  //   }
  // };
  // init() {
  //   window.addEventListener('keydown',this,false);
  // };
}
