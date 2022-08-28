import { getRandomWord } from '../services/get-random-word';
import { wordsState } from '../services/words-state';
import { renderCounter } from './render-counter';
import { renderButtonsContainer } from './sprint-page';

export const getWord = async () => {
    const { id, word, wordTranslate, translateEqual } = await getRandomWord();
    const words = document.createElement('div');
    words.className = 'words';
    words.innerHTML = `<div class="translate-word">${word} - ${wordTranslate}</div>`;
    return {
        words,
        translateEqual,
        id,
    };
};
const startGameCounter = async (counterWrapper: HTMLElement) => {
    const { id, words, translateEqual } = await getWord();
    wordsState.translateEqual = translateEqual;
    const buttonsContainer = renderButtonsContainer();
    words.append(buttonsContainer);
    const arr = [1, 2, 3, 'start', words];
    for (let i = 0; i < arr.length; i++) {
        setTimeout(async () => {
            if (typeof arr[i] === 'string' || typeof arr[i] === 'number') {
                counterWrapper.innerHTML = '' + arr[i];
            } else {
                counterWrapper.innerHTML = '';
                counterWrapper.append(arr[i] as HTMLElement);
                counterWrapper.prepend(renderCounter());
            }
        }, 500 * i);
    }
};

export const renderPreCounter = async (): Promise<HTMLElement> => {
    const counterWrapper = document.createElement('div');
    counterWrapper.className = 'counter-wrapper';
    await startGameCounter(counterWrapper);
    return counterWrapper;
};
