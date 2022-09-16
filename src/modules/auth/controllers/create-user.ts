import * as a from 'axios';
import { AxiosError } from 'axios';
import { renderErrorMessage } from '../view/error-message';

const axios = a.default;

import { host } from './hosts';

export interface User {
    email: string;
    password: string;
}

export const createUser = async (user: User): Promise<a.AxiosResponse> => {
    try {
        const response = await axios.post(`${host}/users`, user);
        return response;
    } catch (error) {
        const e = error as AxiosError;
        const message = e.response.data as string;
        renderErrorMessage(message);
    }
};
