import * as a from 'axios';
import { UserData } from '../../../types/user-types';
import { messageModal } from '../view/message-madal';
import { host } from './hosts';

const axios = a.default;

export const getUserWords = async () => {
    try {
        const store: UserData = JSON.parse(localStorage.getItem('data'));
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
        messageModal('User is not authorized');
    }
};
