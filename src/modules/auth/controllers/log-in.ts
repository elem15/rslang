import * as a from 'axios';
import { User } from './create-user';
import { renderErrorMessage } from '../view/error-message';
import { host } from './hosts';

const axios = a.default;
export const logIn = async (user: User): Promise<a.AxiosResponse> => {
    try {
        const response = await axios.post(`${host}/signin`, user);
        const { data } = response;
        localStorage.setItem('data', JSON.stringify(data));
        return response;
    } catch (error) {
        const e = error as a.AxiosError;
        const status = e.response.status;
        if (status == 404) {
            renderErrorMessage(`user ${user.email} not exist`);
        } else {
            renderErrorMessage('incorrect e-mail or password');
        }
    }
};
