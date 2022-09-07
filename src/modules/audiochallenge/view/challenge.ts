import Game from '../core/game';
import { removeFooter } from '../../main/view/footer';
import '../assets/styles/main.scss';

export const renderGame1Page = (fromBook = false) => {
    const root = document.getElementById('root');
    while (root?.lastChild) root?.lastChild.remove();
    removeFooter();
    const currentGroupPage = JSON.parse(localStorage.getItem('currentPageGroup'));
    const group = currentGroupPage ? currentGroupPage.group : 0;
    const page = currentGroupPage ? currentGroupPage.page : 0;
    const game1 = document.createElement('section');
    game1.classList.add('game-1', 'audio__challenge');
    root?.append(game1);
    const audioChallenge = new Game(game1, fromBook, group, page);
    audioChallenge.start();
};
