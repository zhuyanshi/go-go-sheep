export default class Sheep {
  constructor(ctx, position) {
    this.ctx = ctx;
    this.position = position || [0, 0];
    this.dimension = [36, 36];
    this.velocity = [0, 0]; //速度
    this.acceleration = [0, 1]; // 加速度

    this.jumpV = 14; //跳跃初始速度
    this.initialV = 7; //横向初始速度
    this.jumpA = [1, 0.3]; //默认重力加速度,跳跃按下时重力加速度
  }

  update() {
    this.move();
  }

  /*
   *越界检测,并且强制处理
   */
  borderDetect() {
    if (this.position[0] < 0) {
      this.position[0] = 1;
    } else if (this.position[0] > this.ctx.canvas.width - this.dimension[1]) {
      this.position[0] = this.ctx.canvas.width - this.dimension[1] - 1;
    }

    if (this.position[1] > this.ctx.canvas.height - this.dimension[1]) {
      this.position[1] = this.ctx.canvas.height - this.dimension[1] - 1;
    }
  }

  /*
   *判断是否在地面
   */
  isOnTheGround() {
    return this.position[1] + this.dimension[1] + 1 >= this.ctx.canvas.height;
  }

  /**
   * 水平移动计算
   */
  horizontalMove() {
    this.position[0] = this.position[0] + this.velocity[0] + this.acceleration[0] / 2;
    this.velocity[0] = this.velocity[0] + this.acceleration[0];
    return this.position[0];
  }

  /**
   * 垂直移动计算
   */
  VerticalMove() {
    this.position[1] = this.position[1] + this.velocity[1] + this.acceleration[1] / 2;
    this.velocity[1] = this.velocity[1] + this.acceleration[1];
    return this.position[1];
  }

  /**
   * 计算位移,修改坐标
   */
  move() {
    this.horizontalMove();
    this.VerticalMove();
    this.borderDetect();
  }
  //
  //
  // /*
  //  *行动
  //  */
  // action(e) {
  //   console.log(e.type);
  //   console.log(e.code);
  //   console.log(e.key);
  //   console.log(e.repeat);
  //   if (e.type == "keydown") {
  //     switch (e.code) {
  //       case "Space":
  //         this.jump()
  //         break;
  //       case 'KeyD':
  //         this.moveRight(e.repeat);
  //         break;
  //       case 'KeyA':
  //         this.moveLeft(e.repeat);
  //         break;
  //       default:
  //     }
  //   } else if (e.type == 'keyup') {
  //     switch (e.code) {
  //       case "Space":
  //         this.endJump()
  //         break;
  //       case 'KeyD':
  //         this.endMoveRight();
  //         break;
  //       case 'KeyA':
  //         this.endMoveLeft();
  //         break;
  //       default:
  //     }
  //   }
  // }

  /**
   * 跳跃
   */
  jump() {
    if (this.isOnTheGround()) {
      this.velocity[1] = -this.jumpV;
    }
    this.acceleration[1] = this.jumpA[1];
  }

  /**
   * 跳跃状态结束
   */
  endJump() {
    this.acceleration[1] = this.jumpA[0];
  }

  /**
   * 向右移动
   */
  moveRight(repeat) {
    if (repeat === false) {
      this.velocity[0] = this.velocity[0] + this.initialV;
    }
  }

  /**
   * 向左移动
   */
  moveLeft(repeat) {
    if (repeat === false) {
      this.velocity[0] = this.velocity[0] - this.initialV;
    }
  }

  /**
   * 停止向右移动
   */
  endMoveRight() {
    this.velocity[0] = this.velocity[0] - this.initialV;
  }

  /**
   * 停止向左移动
   */
  endMoveLeft() {
    this.velocity[0] = this.velocity[0] + this.initialV;
  }


  draw() {
    this.ctx.save();
    this.ctx.strokeStyle = 'red';
    this.ctx.strokeRect(this.position[0], this.position[1], this.dimension[0], this.dimension[1]);
    this.ctx.restore();
  }
}
