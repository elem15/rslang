import * as a from 'axios';
import { AxiosError } from 'axios';

const axios = a.default;

import { host } from './hosts';

export const getUserWords = async (userId: string, token: string): Promise<boolean> => {
    try {
        const response = await axios.get(`${host}/users/${userId}/words`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });
        if (response) return true;
    } catch (error) {
        const e = error as AxiosError;
        const message = e.response.data as string;
        const code = e.response.status as number;
        console.log(message, code);
        return false;
    }
};
