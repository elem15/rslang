import * as a from 'axios';
import { host } from './hosts';

const axios = a.default;

export const getWordById = async (wordId: string): Promise<string> => {
    try {
        const response = await axios.get(`${host}/words/${wordId}`);
        return response.data.word;
    } catch {
        alert('Word not exist');
    }
};
