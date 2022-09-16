import { UserData } from '../../../types/user-types';

export const isAuthenticated = (): boolean => {
    if (localStorage.getItem('email')) return true;
    return false;
};

export const getUser = (): UserData | undefined => {
    if (isAuthenticated) return JSON.parse(localStorage.getItem('data')) as UserData;
    return undefined;
};
