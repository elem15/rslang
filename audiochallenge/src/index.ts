import 'normalize.css';
import './assets/styles/main.scss';
import Game from './core/game';

const root = <HTMLElement>document.querySelector('.app');
const game = new Game(root);
game.start();
