import * as a from 'axios';
import { Dictionary, DictionaryHardWord } from '../../../types/textbook-types';
import { host } from '../../auth/controllers/hosts';
import { getAllHardWords, getUserWords } from '../../words/services/api';
import { wordsState } from '../services/words-state';

const axios = a.default;

const recursiveGetUserWords = async (page = 0, group = 0): Promise<DictionaryHardWord[]> => {
    console.log(page)
    const inner = async (page: number, data: DictionaryHardWord[]): Promise<DictionaryHardWord[]> => {
        if (data.length >= 20) {
            while (data.length > 20) {
                data.length--;
            }
            return data;
        }
        if (page > 0) {
            page--;
            const words = await getUserWords(page, group);
            const filteredWords = words.filter(
                (word: DictionaryHardWord) => !(word.userWord?.difficulty === 'learned')
            );
            return await inner(page, [...data, ...filteredWords]);
        }
        return data;
    };
    const data = await getUserWords(page, group);
    const filteredData = data.filter((word: DictionaryHardWord) => !(word.userWord?.difficulty === 'learned'));
    return await inner(page, filteredData);
};
export const getWords = async (group = 0, page = Math.floor(Math.random() * 29)): Promise<Dictionary[]> => {
    try {
        const wordsConfig = JSON.parse(localStorage.getItem('currentPageGroup'));
        if (wordsState.fromBook) {
            if (wordsConfig) {
                group = wordsConfig.group;
                page = wordsConfig.page;
            } else {
                group = 0;
                page = 0;
            }
            if (group < 6) {
                const data = await recursiveGetUserWords(page, group);
                return data;
            } else {
                const data = await getAllHardWords('hard');
                return data[0].paginatedResults.filter(
                    (word: DictionaryHardWord) => !(word.userWord?.difficulty === 'learned')
                );
            }
        }
        const response = await axios.get(`${host}/words?group=${group}&page=${page}`);
        const { data } = response;
        return data;
    } catch (error) {
        try {
            const response = await axios.get(`${host}/words?group=${group}&page=0`);
            const { data } = response;
            return data;
        } catch (error) {
            const message = error instanceof a.AxiosError ? error.message : 'unknown errors';
            console.log('words download with ', message);
        }
    }
};
