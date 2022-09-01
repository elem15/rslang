import * as a from 'axios';
import { Dictionary } from '../../../types/textbook-types';
import { host } from '../../auth/controllers/hosts';

const axios = a.default;

export const getWords = async (group = 0, page = Math.floor(Math.random() * 29)): Promise<Dictionary[]> => {
    try {
        const response = await axios.get(`${host}/words?group=${group}&page=${page}`);
        const { data } = response;
        return data;
    } catch (error) {
        const message = error instanceof a.AxiosError ? error.message : 'unknown errors';
        console.log('words download with ', message);
    }
};
