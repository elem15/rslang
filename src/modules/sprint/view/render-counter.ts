import { getWords } from '../controllers/get-words';
import { getRandomWord } from '../services/get-random-word';

const startGameCounter = async (counterWrapper: HTMLElement) => {
    const arr = [1, 2, 3, 'start'];
    for (let i = 0; i < arr.length; i++) {
        setTimeout(() => {
            counterWrapper.innerHTML = '' + arr[i];
        }, 1000 * i);
    }
};
const startGame = async (counterWrapper: HTMLElement) => {
    setTimeout(async () => {
        const { word, wordTranslate, translateEqual } = await getRandomWord()
        counterWrapper.innerHTML = `${word} - ${wordTranslate} - ${translateEqual}`;
    }, 1000 * 5);
};

export const renderCounter = async (): Promise<HTMLElement> => {
    const counterWrapper = document.createElement('div');
    counterWrapper.className = 'counter-wrapper';
    await startGameCounter(counterWrapper);
    await startGame(counterWrapper);
    return counterWrapper;
};
