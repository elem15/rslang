import { getRandomWord } from '../services/get-random-word';
import { wordsState } from '../services/words-state';

export const getWord = async () => {
    const { id, word, wordTranslate, translateEqual } = await getRandomWord();
    return {
        words: `${word} - ${wordTranslate}`,
        translateEqual,
        id,
    };
};
const startGameCounter = async (counterWrapper: HTMLElement) => {
    const { id, words, translateEqual } = await getWord();
    wordsState.translateEqual = translateEqual;
    const arr = [1, 2, 3, 'start', words];
    for (let i = 0; i < arr.length; i++) {
        setTimeout(async () => {
            counterWrapper.innerHTML = '' + arr[i];
        }, 100 * i);
    }
};

export const renderCounter = async (): Promise<HTMLElement> => {
    const counterWrapper = document.createElement('div');
    counterWrapper.className = 'counter-wrapper';
    await startGameCounter(counterWrapper);
    return counterWrapper;
};
