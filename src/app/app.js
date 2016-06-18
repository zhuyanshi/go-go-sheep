import Game from './Game.js';
import canvas from './canvas.js';

import 'assets/styles/index.scss';

let container = document.getElementById('game-container');
let myCanvas = canvas(640, 360);
container.appendChild(myCanvas);

let game = new Game(myCanvas.getContext('2d'));
game.run();
