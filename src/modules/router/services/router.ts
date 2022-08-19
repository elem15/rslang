import { Router } from '../../../types/router-types';
import { renderGame1Page } from '../../game1/view/game1-page';
import { renderMainPage } from '../../main/view/main-page';
import { renderWordsList } from '../../words/view/words-list';

const removeClassActive = () => {
    const links = document.querySelectorAll('.nav-link') as NodeListOf<HTMLElement>;
    [...links].map((link) => {
        link.classList.remove('active');
    });
};

export const renderPage = (router: string, button: HTMLElement) => {
    router = router ? router : localStorage.getItem('router') ? localStorage.getItem('router') : Router.MAIN;
    button = button ? button : (document.querySelector(`.${router}`) as HTMLElement);
    removeClassActive();
    button.classList.add('active');
    switch (router) {
        case Router.GAME_1:
            renderGame1Page();
            break;
        case Router.MAIN:
            renderMainPage();
            break;
        case Router.DICTIONARY:
            renderWordsList();
            break;
        default:
            renderMainPage();
    }
};
