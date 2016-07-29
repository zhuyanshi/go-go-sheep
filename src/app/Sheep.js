export default class Sheep {
  constructor(ctx, position) {
    this.ctx = ctx;
    this.position = position || [0, 0];
    this.dimension = [128, 128];
    this.velocity = [0, 0]; //速度
    this.acceleration = [0, 1]; // 加速度
    this.onTheAir = false;
    this.headRight = false;
    this.jumpV = 14; //跳跃初始速度
    this.initialV = 7; //横向初始速度
    this.jumpA = [1, 0.4]; //默认重力加速度,跳跃按下时重力加速度
    this.myImage = new Image(1024, 256);
    this.myImage.src = require('assets/images/sheep.png');
    this.headTo = 1; //1为向右,-1为向左
    this.sheepStatus = 3; //0为向跳跃,1为左腿,2为右腿,3为直立
    this.frameChange = 2; //0为向跳跃,1为左腿,2为右腿,3为直立
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
      this.headRight = true;
    }
  }

  /**
   * 向左移动
   */
  moveLeft(repeat) {
    if (repeat === false) {
      this.velocity[0] = this.velocity[0] - this.initialV;
      this.headRight = false;
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
    if (this.isOnTheGround()) {
      if (this.velocity[0] === 0) {
        this.sheepStatus = '3';

        this.frameChange = 0;
      } else {
        if (this.frameChange === 0) {
          if (this.sheepStatus === '1') {
            this.sheepStatus = '2';
          } else {
            this.sheepStatus = '1';
          }
          this.frameChange = 15;
        }
        this.frameChange = this.frameChange - 1;
      }
    } else {
      this.sheepStatus = '0';
    }
    this.ctx.drawImage(this.myImage, 0 + 256 * this.sheepStatus*this.headTo, 0, 256, 256, this.position[0], this.position[1], this.dimension[0], this.dimension[1]);
    this.ctx.restore();
  }
}
