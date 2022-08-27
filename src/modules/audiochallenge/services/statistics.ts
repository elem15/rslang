import { UserData } from '../../../types/user-types';
import { host } from '../../auth/controllers/hosts';

export const upsert = async (): Promise<void> => {
    const user: UserData = JSON.parse(localStorage.getItem('data'));
    const { token, userId } = user;
    const response = await fetch(`${host}/users/${userId}/statistics`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });

    const content = await response.json();

    console.log(content);
};
