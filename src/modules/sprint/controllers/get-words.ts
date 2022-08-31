import * as a from 'axios';
import { Dictionary } from '../../../types/textbook-types';
import { host } from '../../auth/controllers/hosts';

const axios = a.default;

export const getWords = async (): Promise<Dictionary[]> => {
    try {
        const response = await axios.get(`${host}/words`);
        const { data } = response;
        return data;
    } catch (error) {
        const message = error instanceof a.AxiosError ? error.message : 'unknown errors';
        console.log('words download with ', message);
    }
};
