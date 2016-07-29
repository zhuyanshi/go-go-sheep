import Game from './Game.js';
import canvas from './canvas.js';

import 'assets/styles/index.scss';

let container = document.getElementById('game-container');
let myCanvas = canvas(1024, 512);
container.appendChild(myCanvas);

let game = new Game(myCanvas.getContext('2d'));
game.run();
