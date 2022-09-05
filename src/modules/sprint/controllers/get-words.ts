import * as a from 'axios';
import { Dictionary } from '../../../types/textbook-types';
import { host } from '../../auth/controllers/hosts';
import { getAllHardWords, getUserWords } from '../../words/services/api';
import { wordsState } from '../services/words-state';

const axios = a.default;

export const getWords = async (group = 0, page = Math.floor(Math.random() * 29)): Promise<Dictionary[]> => {
    try {
        const wordsConfig = JSON.parse(localStorage.getItem('currentPageGroup'));
        if (wordsState.fromBook) {
            group = wordsConfig.group;
            page = wordsConfig.page;
            if (group < 6) {
                const data = await getUserWords(page, group);
                return data;
            } else {
                const data = await getAllHardWords('hard');
                return data[0].paginatedResults;
            }
        }
        const response = await axios.get(`${host}/words?group=${group}&page=${page}`);
        const { data } = response;
        return data;
    } catch (error) {
        const message = error instanceof a.AxiosError ? error.message : 'unknown errors';
        console.log('words download with ', message);
    }
};
