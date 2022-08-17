import * as a from 'axios';
import { host } from './hosts';

const axios = a.default;

export const getUserWords = async () => {
    try {
        const store = JSON.parse(localStorage.getItem('data'));
        const { userId, token } = store;
        const response = await axios.get(`${host}/users/${userId}/words`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        return response;
    } catch {
        alert('User is not authorized');
    }
};
