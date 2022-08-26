import Game from '../core/game';
import { removeFooter } from '../../main/view/main-page';
import '../assets/styles/main.scss';

export const renderGame1Page = () => {
    const root = document.getElementById('root');
    while (root?.lastChild) root?.lastChild.remove();
    removeFooter();
    const game1 = document.createElement('section');
    game1.classList.add('game-1', 'audio__challenge');
    root?.append(game1);
    const audioChallenge = new Game(game1);
    audioChallenge.start();
};
