import { getRandomWord } from '../services/get-random-word';
import { wordsState } from '../services/words-state';
import { renderCounter } from './render-counter';
import { keyDirect, renderButtonsContainer } from './sprint-page';
import wow from '../audio/Woosh-Mark_DiAngelo-4778593.mp3';
import tick from '../audio/Button-SoundBible.com-1420500901.mp3';
import { gameModal } from './game-modal';
import { getCountNewWords } from '../../statistics/services/api';

export function play(src: string) {
    const audio = new Audio(src);
    const resp = audio.play();
    //https://stackoverflow.com/questions/58846042/getting-play-failed-because-the-user-didnt-interact-with-the-document-first
    if (resp !== undefined) {
        resp.then(() => {
            // autoplay starts!
        }).catch(() => {
            //show error
        });
    }
}

export const getWord = async () => {
    const { id, word, wordTranslate, wordWrongTranslate, translateEqual } = await getRandomWord();
    const words = document.createElement('div');
    words.className = 'words';
    if (translateEqual) words.innerHTML = `<div class="translate-word">${word} - ${wordTranslate}</div>`;
    else words.innerHTML = `<div class="translate-word">${word} - ${wordWrongTranslate}</div>`;
    return {
        words,
        translateEqual,
        id,
    };
};
const startGameCounter = async (counterWrapper: HTMLElement) => {
    if (localStorage.getItem('data')) wordsState.prevNewWords = await getCountNewWords();
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
    const { words, translateEqual } = await getWord();
    wordsState.translateEqual = translateEqual;
    const buttonsContainer = renderButtonsContainer();
    words.append(buttonsContainer);
    const arr = [
        '<div class="pre-timer round-border red">3</div>',
        '<div class="pre-timer round-border yellow">2</div>',
        '<div class="pre-timer round-border green">1</div>',
        '<div class="pre-timer">START</div>',
        words,
    ];
    for (let i = 0; i < arr.length; i++) {
        setTimeout(async () => {
            if (typeof arr[i] === 'string' && i < 3) {
                counterWrapper.innerHTML = arr[i] as string;
                play(tick);
            } else if (typeof arr[i] === 'string' && i === 3) {
                counterWrapper.innerHTML = arr[i] as string;
                play(wow);
            } else {
                counterWrapper.innerHTML = '';
                const gameBody = document.createElement('div');
                gameBody.append(arr[i] as HTMLElement);
                gameModal();
                counterWrapper.prepend(renderCounter());
                document.querySelector('.modal-body').append(gameBody);
                document.addEventListener('keydown', keyDirect);
            }
        }, 1000 * i);
    }
};

export const renderPreCounter = async (): Promise<HTMLElement> => {
    const counterWrapper = document.createElement('div');
    counterWrapper.className = 'counter-wrapper';
    await startGameCounter(counterWrapper);
    return counterWrapper;
};
