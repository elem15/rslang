import { Word } from '../../../types';
import { UserData } from '../../../types/user-types';
import { host } from '../../auth/controllers/hosts';

export const getWords = async (page = 0, group: number): Promise<Word[] | undefined> => {
    const response = await fetch(`${host}/words?page=${page}&group=${group}`);
    if (response.ok) return await response.json();
    throw new Error(response.statusText);
};

export const getUserWordsByDifficulty = async (difficulty = 'hard', wordsPerPage = 3600) => {
    const user: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = user;
    try {
        const response = await fetch(
            `${host}/users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=%7B%22%24and%22%3A%5B%7B%22userWord.difficulty%22%3A%22${difficulty}%22%7D%5D%7D`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
        const words = await response.json();
        return words[0].paginatedResults;
    } catch (err) {
        console.log(err);
    }
};
