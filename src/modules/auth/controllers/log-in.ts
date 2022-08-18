import * as a from 'axios';
import { User } from './create-user';
import { renderErrorMessage } from '../view/error-message';
import { host } from './hosts';
import { UserData } from '../../../types/user-types';

const axios = a.default;
export const logIn = async (user: User): Promise<a.AxiosResponse> => {
    try {
        const response = await axios.post(`${host}/signin`, user);
        const { data } = response;
        console.log(data);
        localStorage.setItem('data', JSON.stringify(data));
        const store: UserData = JSON.parse(localStorage.getItem('data'));
        console.log(store);
        return response;
    } catch (error) {
        renderErrorMessage('Incorrect e-mail or password');
    }
};
