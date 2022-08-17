import { host, soundIcon } from '../core/settings';
import { Word } from '../types';

const drawAnswersItem = (card: HTMLElement, word: Word, index: number) => {
    const answerItem = document.createElement('label') as HTMLElement;
    const translatation = document.createElement('span') as HTMLSpanElement;
    const num = document.createElement('span') as HTMLSpanElement;

    answerItem.className = 'answers__item';
    translatation.innerText = word.wordTranslate;
    num.innerText = `${index + 1}.`;
    answerItem.append(num, translatation);

    card.append(answerItem);
};

export const nextWord = async (container: HTMLElement, word: Word, answers: Word[]): Promise<void> => {
    const wordContainer = document.createElement('div') as HTMLElement;
    const image = document.createElement('img') as HTMLImageElement;
    const button = document.createElement('button') as HTMLButtonElement;
    const audio = document.createElement('audio') as HTMLAudioElement;
    const card = document.createElement('div') as HTMLDivElement;
    const imageContainer = document.createElement('div') as HTMLElement;

    audio.src = `${host}${word.audio}`;
    audio.autoplay = true;
    image.src = `${host}${word.image}`;
    image.alt = `${word.word}`;
    button.className = 'word__sound';
    button.innerHTML = soundIcon;
    button.addEventListener('click', async () => await audio.play());

    wordContainer.className = 'word';
    imageContainer.className = 'word__image';
    imageContainer.append(image);
    wordContainer.append(imageContainer, button, audio);
    card.className = 'answers';

    [...answers, word].sort().forEach((word, index) => {
        drawAnswersItem(card, word, index);
    });

    container.append(wordContainer, card);
};
