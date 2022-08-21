import { Dictionary } from '../../types';

const base = 'http://localhost:3500';
const words = `${base}/words`;

export const getWords = async (page = 0, group = 0): Promise<Dictionary[]> => {
    const response = await fetch(`${words}?page=${page}&group=${group}`);
    const wordsPage = await response.json();
    return wordsPage;
};

export const getWordById = async (wordId: string) => {
    try {
        const response = await fetch(`${base}/words/${wordId}`);
        const word = await response.json();
        return word;
    } catch {
        console.log('Word not exist');
    }
};

export const getAllHardWords = async (userId: string, token: string, difficulty: string, wordsPerPage = 3600) => {
    try {
        const response = await fetch(
            `${base}/users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=%7B%22%24and%22%3A%5B%7B%22userWord.difficulty%22%3A%22${difficulty}%22%7D%5D%7D`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
        const words = await response.json();
        return words;
    } catch {
        console.log('Word not exist');
    }
};

export const addWordToHardLearned = async (
    userId: string,
    token: string,
    wordId: string,
    body: { difficulty: string }
) =>
    (
        await fetch(`${base}/users/${userId}/words/${wordId}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
    ).json();

export const deleteHardWord = async (userId: string, token: string, wordId: string) =>
    await fetch(`${base}/users/${userId}/words/${wordId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
        },
    });

export const getAllUserWords = async (userId: string, token: string) => {
    try {
        const response = await fetch(`${base}/users/${userId}/words`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });
        const words = await response.json();
        return words;
    } catch {
        console.log('Word not exist');
    }
};
