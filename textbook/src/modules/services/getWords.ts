import { Dictionary } from '../../types';

const base = 'http://localhost:3500';
const words = `${base}/words`;

export const getWords = async (page = 0, group = 0): Promise<Dictionary[]> => {
    const response = await fetch(`${words}?page=${page}&group=${group}`);
    const wordsPage = await response.json();
    return wordsPage;
};
