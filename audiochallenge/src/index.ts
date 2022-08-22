import 'normalize.css';
import './assets/styles/main.scss';
import Game from './core/game';

const group = Math.floor(Math.random() * 6);

(async (group?: number) => {
    const root = <HTMLElement>document.querySelector('.app');
    const game = new Game(root, group);
    await game.start();
})(group);
