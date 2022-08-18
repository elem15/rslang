import { host } from '../core/settings';
import { Word } from '../types';

export const getWords = async (page = 0, group: number): Promise<Word[] | undefined> => {
    const response = await fetch(`${host}words?page=${page}&group=${group}`);
    if (response.ok) return await response.json();
    throw new Error(response.statusText);
};
