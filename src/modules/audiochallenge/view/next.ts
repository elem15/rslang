import { soundIcon } from '../core/settings';
import { clear } from '../utils';
import { host } from '../../auth/controllers/hosts';
import { Dictionary } from '../../../types/textbook-types';

const drawAnswersItem = (card: HTMLElement, word: Dictionary, index: number) => {
    const answerItem = document.createElement('label') as HTMLElement;
    answerItem.className = 'answers__item';
    answerItem.innerText = `${index + 1}. ${word.wordTranslate}`;
    answerItem.dataset.key = `${index + 1}`;
    answerItem.dataset.word = `${word.wordTranslate}`;
    card.append(answerItem);
};

export const nextWord = async (container: HTMLElement, word: Dictionary, answers: Dictionary[]): Promise<void> => {
    await clear(container);
    const wordContainer = document.createElement('div') as HTMLElement;
    const wrapper = document.createElement('div') as HTMLElement;
    const image = document.createElement('img') as HTMLImageElement;
    const button = document.createElement('button') as HTMLButtonElement;
    const translation = document.createElement('p') as HTMLElement;
    const audio = document.createElement('audio') as HTMLAudioElement;
    const card = document.createElement('div') as HTMLDivElement;
    const imageContainer = document.createElement('div') as HTMLElement;

    audio.src = `${host}/${word.audio}`;
    audio.autoplay = true;
    image.src = `${host}/${word.image}`;
    image.alt = `${word.word}`;
    button.className = 'word__sound';
    button.innerHTML = soundIcon;
    button.addEventListener('click', async () => await audio.play());
    translation.className = 'word__translation';

    wordContainer.className = 'word';
    wrapper.className = 'word__wrapper';
    imageContainer.className = 'word__image';
    imageContainer.append(image);
    wrapper.append(imageContainer, button);
    wordContainer.append(wrapper, translation, audio);
    card.className = 'answers';

    [...answers].sort().forEach((word, index) => {
        drawAnswersItem(card, word, index);
    });

    container.append(wordContainer, card);
};
