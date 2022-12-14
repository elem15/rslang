import { removeFooter } from '../../main/view/footer';
import { wordsState } from '../services/words-state';
import { getWord, renderPreCounter } from './render-pre-counter';
import '../scss/styles.scss';
import img from '../../../images/palm.gif';
import parrot from '../../../images/parrot.png';
import success from '../../audiochallenge/assets/sounds/success.wav';
import mistake from '../../audiochallenge/assets/sounds/error.mp3';
import { statistics } from '../services/statistics';
import { levelSelectRender } from './level-select';
import { renderCounter } from './render-counter';
import { messageModalFewWords } from './modal-few-words';
import { addNewWord } from '../controllers/add-to-stat';
import { removePreloader } from '../../router/services/router';

export function play(src: string) {
    const audio = new Audio(src);
    audio.play();
}

const getMark = (translateEqual: boolean) => {
    const parrotsCard = document.querySelector('.parrots-card');
    const modalTitle = document.querySelector('.modal-title');
    const gameChecks = document.querySelectorAll('.game-check') as NodeListOf<HTMLElement>;
    if (translateEqual) {
        wordsState.rightAnswers += 1;
        statistics.correct += 1;
        statistics.correct3word += 1;
        if (localStorage.getItem('data')) {
            addNewWord(wordsState.currentWordId, 1, 0, true);
        }
        if (statistics.correct3word % 4 === 0 && statistics.correct3word > 1) {
            parrotsCard.insertAdjacentHTML('afterbegin', `<span class="parrot-container"><img src=${parrot}></span>`);
        }
        if (statistics.correct3word < 3) [...gameChecks][statistics.correct3word].innerHTML = '✅';
        statistics.correctWords.push(statistics.word);
        statistics.word = null;
        const rightAnswer = document.createElement('div');
        rightAnswer.className = 'text-success equal';
        rightAnswer.innerText = 'ВЕРНО';
        const equal = modalTitle.querySelector('.equal');
        if (equal) equal.remove();
        modalTitle.append(rightAnswer);
        setTimeout(() => rightAnswer.remove(), 700);
        play(success);
    } else {
        if (localStorage.getItem('data')) {
            addNewWord(wordsState.currentWordId, 0, 1, false);
        }
        wordsState.wrongAnswers += 1;
        statistics.incorrect += 1;
        if (wordsState.longestSeries < statistics.correct3word) {
            wordsState.longestSeries = statistics.correct3word + 1;
        }
        statistics.correct3word = -1;
        while (parrotsCard.lastChild) {
            parrotsCard.lastChild.remove();
        }
        [...gameChecks].map((el) => (el.innerHTML = '░░'));
        statistics.incorrectWords.push(statistics.word);
        statistics.word = null;
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
const getGameIterationResult = async (translateEqual: boolean) => {
    const buttonsContainer = document.querySelector('.buttons-container');
    if (buttonsContainer) {
        getMark(translateEqual);
        const response = await getWord();
        wordsState.translateEqual = response.translateEqual;
        const { words } = response;
        const translateWord = document.querySelector('.translate-word');
        if (translateWord) translateWord.remove();
        if (response.id === '0') {
            clearInterval(renderCounter.prototype.interval);
            document.removeEventListener('keydown', keyDirect);
            document.querySelector('.counter').innerHTML = '';
            document.querySelector('.modal').remove();
            document.querySelector('.sprint-container').append(messageModalFewWords('Слова в разделе закончились'));
            return;
        }
        buttonsContainer.prepend(words);
    }
};
export const keyDirect = (e: KeyboardEvent) => {
    switch (e.code) {
        case 'ArrowRight':
            getGameIterationResult(wordsState.translateEqual);
            break;
        case 'ArrowLeft':
            getGameIterationResult(!wordsState.translateEqual);
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
    right.addEventListener('click', async () => await getGameIterationResult(wordsState.translateEqual));
    wrong.addEventListener('click', async () => await getGameIterationResult(!wordsState.translateEqual));
    return buttonsContainer;
};
export const startGame = async () => {
    const sprint = document.querySelector('.sprint-container');
    const counterWrapper = await renderPreCounter();
    sprint.append(counterWrapper);
};

export const renderSprintPage = async (fromBook: boolean) => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    removeFooter();
    if (!document.querySelector('.section')) {
        const sprint = document.createElement('section');
        sprint.className = 'sprint-container container';
        sprint.innerHTML = '<h1 class="text-center">SPRINT</h1>';
        root.append(sprint);
        const background = document.createElement('div');
        background.innerHTML = `
        <img class="background-sprint" src=${img}> 
        `;
        root.append(background);
    }
    wordsState.fromBook = fromBook;
    if (fromBook) startGame();
    else levelSelectRender();
    removePreloader();
};
