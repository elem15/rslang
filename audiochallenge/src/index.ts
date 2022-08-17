import 'normalize.css';
import './assets/styles/main.scss';
import Game from './core/game';

(async () => {
    const root = <HTMLElement>document.querySelector('.app');
    const game = new Game(root);
    await game.start();
})();
