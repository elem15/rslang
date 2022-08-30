import { removeFooter } from '../../main/view/main-page';
import { wordsState } from '../services/words-state';
import { getWord, renderPreCounter } from './render-pre-counter';
import '../scss/styles.scss';
import img from '../../../images/palm.gif';
import success from '../../audiochallenge/assets/sounds/success.wav';
import mistake from '../../audiochallenge/assets/sounds/error.mp3';

// code from https://stackoverflow.com/questions/9419263/how-to-play-audio
function play(src: string) {
    const audio = new Audio(src);
    audio.play();
}
//==============

const getMark = (translateEqual: boolean) => {
    const modalTitle = document.querySelector('.modal-title');
    if (translateEqual) {
        const rightAnswer = document.createElement('div');
        rightAnswer.className = 'text-success equal';
        rightAnswer.innerText = 'ВЕРНО';
        const equal = modalTitle.querySelector('.equal');
        if (equal) equal.remove();
        modalTitle.append(rightAnswer);
        setTimeout(() => rightAnswer.remove(), 700);
        play(success);
    } else {
        const wrongAnswer = document.createElement('div');
        wrongAnswer.className = 'text-danger equal';
        wrongAnswer.innerText = 'НЕ ВЕРНО';
        const equal = modalTitle.querySelector('.equal');
        if (equal) equal.remove();
        modalTitle.append(wrongAnswer);
        setTimeout(() => wrongAnswer.remove(), 700);
        play(mistake);
    }
};
const getPushResult = async (translateEqual: boolean) => {
    const buttonsContainer = document.querySelector('.buttons-container');
    if (buttonsContainer) {
        getMark(translateEqual);
        const response = await getWord();
        wordsState.translateEqual = response.translateEqual;
        const { words } = response;
        document.querySelector('.translate-word').remove();
        buttonsContainer.prepend(words);
    }
};
export const keyDirect = (e: KeyboardEvent) => {
    switch (e.code) {
        case 'ArrowRight':
            getPushResult(wordsState.translateEqual);
            break;
        case 'ArrowLeft':
            getPushResult(!wordsState.translateEqual);
            break;
        default:
            null;
    }
};
export const renderButtonsContainer = () => {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';
    const right = document.createElement('button');
    right.className = 'right btn btn-success';
    right.innerText = 'ПРАВДА >';
    const wrong = document.createElement('button');
    wrong.className = 'wrong btn btn-danger';
    wrong.innerText = '< ЛОЖЬ';
    buttonsContainer.append(wrong, right);
    right.addEventListener('click', async () => await getPushResult(wordsState.translateEqual));
    wrong.addEventListener('click', async () => await getPushResult(!wordsState.translateEqual));
    return buttonsContainer;
};
export const renderSprintPage = async () => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    removeFooter();
    const sprint = document.createElement('section');
    sprint.className = 'sprint-container container';
    sprint.innerHTML = '<h1 class="text-center">SPRINT</h1>';
    root.append(sprint);
    const header = document.querySelector('header');
    const links = header.querySelectorAll('button');
    links.forEach((link: HTMLButtonElement) => (link.disabled = true));
    const counterWrapper = await renderPreCounter();
    sprint.append(counterWrapper);
    const background = document.createElement('div');
    background.innerHTML = `
        <img class="background-sprint" src=${img}> 
    `;
    root.append(background);
};
