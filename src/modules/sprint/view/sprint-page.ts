import { removeFooter } from '../../main/view/main-page';
import { wordsState } from '../services/words-state';
import { getWord, renderCounter } from './render-counter';

const getMark = (translateEqual: boolean) => {
    const sprint = document.querySelector('.sprint-container');
    if (translateEqual) {
        const rightAnswer = document.createElement('div');
        rightAnswer.className = 'text-success equal';
        rightAnswer.innerText = 'ВЕРНО';
        const equal = sprint.querySelector('.equal');
        if (equal) equal.remove();
        sprint.append(rightAnswer);
    } else {
        const wrongAnswer = document.createElement('div');
        wrongAnswer.className = 'text-danger equal';
        wrongAnswer.innerText = 'НЕ ВЕРНО';
        const equal = sprint.querySelector('.equal');
        if (equal) equal.remove();
        sprint.append(wrongAnswer);
    }
};
export const renderSprintPage = async () => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    removeFooter();
    const sprint = document.createElement('section');
    sprint.className = 'sprint-container container';
    sprint.innerHTML = 'Game SPRINT';
    root.append(sprint);
    const counterWrapper = await renderCounter();
    const right = document.createElement('button');
    right.className = 'right btn btn-success';
    right.innerText = 'ПРАВДА >';
    const wrong = document.createElement('button');
    wrong.className = 'wrong btn btn-danger';
    wrong.innerText = '< ЛОЖЬ';
    sprint.append(counterWrapper, wrong, right); 

    right.addEventListener('click', async () => {
        getMark(wordsState.translateEqual);
        const response = await getWord();
        wordsState.translateEqual = response.translateEqual;
        const { words } = response;
        counterWrapper.innerHTML = words;
    });
    wrong.addEventListener('click', async () => {
        getMark(!wordsState.translateEqual);
        const response = await getWord();
        wordsState.translateEqual = response.translateEqual;
        const { words } = response;
        counterWrapper.innerHTML = words;
    });
};
