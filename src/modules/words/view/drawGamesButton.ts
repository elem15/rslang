import { Router } from "../../../types/router-types";
import { renderPage } from "../../router/services/router";

export const addListenerGameButton = () => {
    const buttonGameAudio = document.querySelector('.game__button-audio');
    const buttonGameSprint = document.querySelector('.game__button-sprint');
    const game1Link = document.querySelector(`.${Router.GAME_1}`) as HTMLButtonElement;
    const sprintLink = document.querySelector(`.${Router.SPRINT}`) as HTMLButtonElement;

    const root = document.querySelectorAll('audio');
    root.forEach((el) => {
        el.src = '';
        el.srcObject = null;
        el.remove(); 
    });
    
    buttonGameAudio.addEventListener('click', () => {
        localStorage.setItem('router', Router.GAME_1);
        renderPage(Router.GAME_1, game1Link);
    });
    
    buttonGameSprint.addEventListener('click', () => {
        localStorage.setItem('router', Router.SPRINT);
        renderPage(Router.SPRINT, sprintLink);
    });
}
