import Game from '../core/game';
import { removeFooter } from '../../main/view/main-page';
import '../assets/styles/main.scss';

export const renderGame1Page = (fromBook = false) => {
    const root = document.getElementById('root');
    while (root?.lastChild) root?.lastChild.remove();
    removeFooter();
    const currentGroupPage = JSON.parse(localStorage.getItem('currentPageGroup'));
    const game1 = document.createElement('section');
    game1.classList.add('game-1', 'audio__challenge');
    root?.append(game1);
    if (currentGroupPage && fromBook) {
        const { page, group } = currentGroupPage;
        const audioChallenge = new Game(game1, fromBook, group, page);
        audioChallenge.start();
    } else {
        const audioChallenge = new Game(game1);
        audioChallenge.start();
    }
};
