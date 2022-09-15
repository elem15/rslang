/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dictionary, DictionaryHardWord, Difficulty } from '../../../types/textbook-types';
import { getAllHardWords, getUserWords, getWords } from '../../words/services/api';
import { getRandomNumber } from '../utils';
import { isAuthenticated } from './auth';

export const loadWords = async (
    group: number,
    currentPage: number,
    isVariantsTranslation = false
): Promise<Dictionary[]> => {
    if (!isAuthenticated()) {
        return await getWords(currentPage, group);
    } else {
        if (group < 6) {
            return !isVariantsTranslation
                ? await loadUserWords(currentPage, group)
                : await getWords(currentPage, group);
        }
        return !isVariantsTranslation ? await loadHardWords() : await getWords();
    }
};

const loadUserWords = async (page: number, group: number): Promise<Dictionary[]> => {
    const collection = await getUserWords(page, group);
    const words = collection.filter((w) => w.userWord?.difficulty !== Difficulty.learned);
    if (words.length < 20) {
        while (words.length <= 20 && page !== -1) {
            const previous = (await getUserWords(--page, group)).filter(
                (w) => w.userWord?.difficulty !== Difficulty.learned
            );
            const need = 20 - words.length;
            if (previous.length > need) words.push(...previous.slice(0, need));
            else if (previous.length < need) words.push(...previous);
            else words.push(...previous);
        }
    }
    return convertCollection(words);
};

const loadHardWords = async (): Promise<Dictionary[]> => {
    const { paginatedResults, totalCount } = (await getAllHardWords(Difficulty.hard))[0];
    const total: number = totalCount.length ? totalCount[0].count : 0;
    if (total > 20) {
        const words: DictionaryHardWord[] = [];

        while (words.length !== 20) {
            const num = getRandomNumber(total);
            const next = paginatedResults[num];
            if (!words.includes(next)) words.push(next);
        }
        return convertCollection(words);
    }
    return total ? convertCollection(paginatedResults) : [];
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
