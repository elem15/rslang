/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dictionary, DictionaryHardWord, Difficulty } from '../../../types/textbook-types';
import { getWords, getUserWords, getAllHardWords } from '../../words/services/api';

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
        if (!arr.includes(next)) arr.push(next);
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

export const loadWords = async (fromBook = false, group: number, currentPage: number): Promise<Dictionary[]> => {
    if (fromBook) {
        const words = await getWords(currentPage, group);
        return words;
    } else {
        if (group < 6) {
            const collection = await getUserWords(currentPage, group);
            const words = collection.filter((w) => w.userWord?.difficulty !== Difficulty.learned);
            if (words.length == 20) {
                while (words.length !== 20 && currentPage !== -1) {
                    const previous = (await getUserWords(currentPage--, group)).filter(
                        (w) => w.userWord?.difficulty !== Difficulty.learned
                    );

                    if (previous.length > words.length)
                        words.push(...previous.slice(0, previous.length - words.length - 1));
                    else words.push(...previous);
                }
            }

            return convertCollection(words);
        } else {
            const { paginatedResults, totalCount } = (await getAllHardWords(Difficulty.hard))[0];
            const total = totalCount[0].count;

            if (total > 20) {
                const words: DictionaryHardWord[] = [];

                while (words.length !== 20) {
                    const num = getRandomNumber(total);
                    const next = paginatedResults[num];
                    if (!words.includes(next)) words.push(next);
                }
                return convertCollection(words);
            }
            return convertCollection(paginatedResults);
        }
    }
};

const convertCollection = (words: any[]): any[] => {
    return words.map((word: any) => {
        const w = {
            id: '_id' in word ? word._id : word.id,
            ...word,
        };

        if ('_id' in w) delete w._id;
        return w;
    });
};
