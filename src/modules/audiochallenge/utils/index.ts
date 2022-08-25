import { Word } from '../../../types';

export const shuffle = <T>(collection: T[]): T[] => {
    const arr = collection.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
};

export const clear = async (container: HTMLElement): Promise<void> => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

export const getRandomNumber = (max: number): number => Math.floor(Math.random() * max);

export const getRandomWords = async (excludeWord: Word, words: Word[]): Promise<Word[]> => {
    const arr: Word[] = [];
    arr.push(excludeWord);
    while (arr.length < 4) {
        const index = getRandomNumber(Math.random() * words.length);
        const next = words[index];
        if (!arr.includes(next)) arr.push(next);
    }
    return shuffle(arr);
};

export const getRandomWord = async (selected: string[], words: Word[]): Promise<Word> => {
    const filtered = words.filter((word) => !selected.includes(word.id));
    const index = getRandomNumber(words.length - selected.length);

    return filtered[index];
};

export const getElementsList = (selector: string): NodeListOf<HTMLElement> => {
    return document.querySelectorAll(selector);
};
