import { Router } from '../../../types/router-types';
import { renderPage } from '../../router/services/router';

export const addListenerGameButton = () => {
    const buttonGameAudio = document.querySelector('.game__button-audio');
    const buttonGameSprint = document.querySelector('.game__button-sprint');

    const root = document.querySelectorAll('audio');
    root.forEach((el) => {
        el.src = '';
        el.srcObject = null;
        el.remove();
    });
    buttonGameAudio.addEventListener('click', () => {
        localStorage.setItem('router', Router.GAME_1);
        renderPage(Router.GAME_1, true);
    });
    buttonGameSprint.addEventListener('click', () => {
        localStorage.setItem('router', Router.SPRINT);
        renderPage(Router.SPRINT, true);
    });
};
