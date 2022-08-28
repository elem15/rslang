import { removeFooter } from '../../main/view/main-page';
import { wordsState } from '../services/words-state';
import { getWord, renderPreCounter } from './render-pre-counter';
import success from '../../audiochallenge/assets/sounds/success.wav';
import mistake from '../../audiochallenge/assets/sounds/error.mp3';

// code from https://stackoverflow.com/questions/9419263/how-to-play-audio
function play(src: string) {
    const audio = new Audio(src);
    audio.play();
}
//==============

const getMark = (translateEqual: boolean) => {
    const sprint = document.querySelector('.sprint-container');
    if (translateEqual) {
        const rightAnswer = document.createElement('div');
        rightAnswer.className = 'text-success equal';
        rightAnswer.innerText = 'ВЕРНО';
        const equal = sprint.querySelector('.equal');
        if (equal) equal.remove();
        sprint.append(rightAnswer);
        setTimeout(() => rightAnswer.remove(), 700);
        play(success);
    } else {
        const wrongAnswer = document.createElement('div');
        wrongAnswer.className = 'text-danger equal';
        wrongAnswer.innerText = 'НЕ ВЕРНО';
        const equal = sprint.querySelector('.equal');
        if (equal) equal.remove();
        sprint.append(wrongAnswer);
        setTimeout(() => wrongAnswer.remove(), 700);
        play(mistake);
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
    right.addEventListener('click', async () => {
        getMark(wordsState.translateEqual);
        const response = await getWord();
        wordsState.translateEqual = response.translateEqual;
        const { words } = response;
        document.querySelector('.translate-word').remove();
        buttonsContainer.prepend(words);
    });
    wrong.addEventListener('click', async () => {
        getMark(!wordsState.translateEqual);
        const response = await getWord();
        wordsState.translateEqual = response.translateEqual;
        const { words } = response;
        document.querySelector('.translate-word').remove();
        buttonsContainer.prepend(words);
    });
    return buttonsContainer;
};
export const renderSprintPage = async () => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    removeFooter();
    const sprint = document.createElement('section');
    sprint.className = 'sprint-container container';
    sprint.innerHTML = '<h2>SPRINT</h2>';
    root.append(sprint);
    const header = document.querySelector('header');
    const links = header.querySelectorAll('button');
    links.forEach((link: HTMLButtonElement) => (link.disabled = true));
    const counterWrapper = await renderPreCounter();
    sprint.append(counterWrapper);
};
