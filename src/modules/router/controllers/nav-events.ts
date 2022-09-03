import { Router } from '../../../types/router-types';
import { renderPage } from '../services/router';

export const setNavEvents = (): void => {
    const mainLink = document.querySelector(`.${Router.MAIN}`) as HTMLButtonElement;
    mainLink.addEventListener('click', () => {
        localStorage.setItem('router', Router.MAIN);
        renderPage(Router.MAIN);
    });
    const wordsLink = document.querySelector(`.${Router.DICTIONARY}`) as HTMLButtonElement;
    wordsLink.addEventListener('click', () => {
        localStorage.setItem('router', Router.DICTIONARY);
        renderPage(Router.DICTIONARY);
    });
    const game1Link = document.querySelector(`.${Router.GAME_1}`) as HTMLButtonElement;
    game1Link.addEventListener('click', () => {
        localStorage.setItem('router', Router.GAME_1);
        renderPage(Router.GAME_1);
    });
    const sprintLink = document.querySelector(`.${Router.SPRINT}`) as HTMLButtonElement;
    sprintLink.addEventListener('click', () => {
        localStorage.setItem('router', Router.SPRINT);
        renderPage(Router.SPRINT);
    });
    const statisticsLink = document.querySelector(`.${Router.STATISTICS}`) as HTMLButtonElement;
    statisticsLink.addEventListener('click', () => {
        localStorage.setItem('router', Router.STATISTICS);
        renderPage(Router.STATISTICS);
    });
};
