import { Router } from '../../../types/router-types';
import { addUserSymbol } from '../../auth/view/sign-modal';
import { renderGame1Page } from '../../audiochallenge/view/challenge';
import { renderMainPage } from '../../main/view/main-page';
import { renderSprintPage } from '../../sprint/view/sprint-page';
import { renderStatisticsPage } from '../../statistics/view/statistics-page';
import { renderWordsList } from '../../words/view/words-list';

const removeClassActive = () => {
    const links = document.querySelectorAll('.nav-link') as NodeListOf<HTMLElement>;
    [...links].map((link) => {
        link.classList.remove('active');
    });
};

export const renderPage = (router: string, fromBook = false) => {
    router = router ? router : localStorage.getItem('router') ? localStorage.getItem('router') : Router.MAIN;
    const button = document.querySelector(`.${router}`) as HTMLElement;
    const email = localStorage.getItem('email');
    if (email) addUserSymbol(email);
    removeClassActive();
    button.classList.add('active');
    switch (router) {
        case Router.MAIN:
            renderMainPage();
            break;
        case Router.DICTIONARY:
            renderWordsList();
            break;
        case Router.GAME_1:
            renderGame1Page(fromBook);
            break;
        case Router.SPRINT:
            renderSprintPage(fromBook);
            break;
        case Router.STATISTICS:
            renderStatisticsPage();
            break;
        default:
            renderMainPage();
    }
};
