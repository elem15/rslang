/* eslint-disable @typescript-eslint/no-explicit-any */
import { Word } from '../../../types';
import { UserWords } from '../../../types/textbook-types';
import { UserData } from '../../../types/user-types';
import { host } from '../../auth/controllers/hosts';
import { formateDate } from '../utils';

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

export const getUserWords = async (): Promise<UserWords[]> => {
    const user: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = user;
    try {
        const response = await fetch(`${host}/users/${userId}/words`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });

        return await response.json();
    } catch (Exception) {
        console.error(Exception);
    }
};

export const getUserWord = async (wordID: string): Promise<any> => {
    const user: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = user;

    try {
        const response = await fetch(`${host}/users/${userId}/words/${wordID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });
        if (response.status === 200) return await response.json();
        return undefined;
    } catch (Exception) {
        console.error(Exception);
    }
};

export const upsertWord = async (wordID: string): Promise<any> => {
    const user: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = user;
    const word = await getUserWord(wordID);

    if (!word) {
        const body = JSON.stringify({
            difficulty: 'neutral',
            optional: {
                date: formateDate(new Date()),
                isWordNew: true,
            },
        });
        const response = await fetch(`${host}/users/${userId}/words/${wordID}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: body,
        });

        return await response.json();
    } else {
        if (!('optional' in word) || !('isNewWord' in word.optional)) {
            const body = JSON.stringify({
                optional: {
                    date: formateDate(new Date()),
                    isWordNew: true,
                },
            });

            const response = await fetch(`${host}/users/${userId}/words/${wordID}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: body,
            });

            return await response.json();
        }
    }
};
