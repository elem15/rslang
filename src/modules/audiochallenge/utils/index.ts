/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dictionary } from '../../../types/textbook-types';

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

export const generateWords = async (excludeWord: Dictionary, words: Dictionary[]): Promise<Dictionary[]> => {
    const arr: Dictionary[] = [];
    arr.push(excludeWord);
    const max = words.length < 5 ? words.length : 5;
    while (arr.length < max) {
        const index = getRandomNumber(Math.random() * words.length);
        const next = words[index];
        if (!arr.filter((item) => item.id === next.id).length) arr.push(next);
    }
    return shuffle(arr);
};

export const generateWord = async (selected: string[], words: Dictionary[]): Promise<Dictionary> => {
    const filtered = words.filter((word) => !selected.includes(word.id));
    const index = getRandomNumber(words.length - selected.length);

    return filtered[index];
};

export const getElementsList = (selector: string): NodeListOf<HTMLElement> => {
    return document.querySelectorAll(selector);
};

export const formateDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU');
};
