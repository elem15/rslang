import {
    Dictionary,
    BodyRequest,
    pageLearnedPagesGroup,
    GameStatistics,
    DictionaryHardWord,
    UserWords,
    Difficulty,
} from '../../../types/textbook-types';
import { UserData } from '../../../types/user-types';
import { host } from '../../auth/controllers/hosts';

export const getWords = async (page = 0, group = 0): Promise<Dictionary[]> => {
    const response = await fetch(`${host}/words?page=${page}&group=${group}`);
    const wordsPage = await response.json();
    return wordsPage;
};

export const getUserWords = async (page = 0, group = 0, wordsPerPage = 20): Promise<DictionaryHardWord[]> => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    try {
        const response = await fetch(
            `${host}/users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=%7B%22%24and%22%3A%20%5B%7B%20%22page%22%3A%20${page}%20%7D%2C%20%7B%20%22group%22%3A%20${group}%20%7D%5D%7D`,
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
    } catch {
        console.log('Word not exist');
    }
};

export const getWordById = async (wordId: string) => {
    try {
        const response = await fetch(`${host}/words/${wordId}`);
        const word = await response.json();
        return word;
    } catch {
        console.log('Word not exist');
    }
};

export const getAllHardWords = async (difficulty: string, wordsPerPage = 3600) => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
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
        return words;
    } catch {
        console.log('Word not exist');
    }
};

export const addWordToHardLearned = async (wordId: string, body: { difficulty: string }) => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    const wordUserStatus = await getUserWordById(wordId);
    if (wordUserStatus === undefined) {
        (
            await fetch(`${host}/users/${userId}/words/${wordId}`, {
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
    } else {
        (
            await fetch(`${host}/users/${userId}/words/${wordId}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
        ).json();
    }
};

export const getUserWordById = async (wordId: string) => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    try {
        const response = await fetch(`${host}/users/${userId}/words/${wordId}`, {
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

export const getAllUserWords = async () => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    try {
        const response = await fetch(`${host}/users/${userId}/words`, {
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

export const updateSettings = async (body: BodyRequest) => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    await fetch(`${host}/users/${userId}/settings`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};

export const getSettings = async () => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    try {
        const response = await fetch(`${host}/users/${userId}/settings`, {
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

export const addStyleLearnedPages = async (pageLearned: pageLearnedPagesGroup[]) => {
    const resultPreviousGame: BodyRequest = await getSettings();
    if (resultPreviousGame === undefined) {
        const resultPreviousGame = { optional: { pages: Object.assign({}, null) } };
        updateSettings(resultPreviousGame);
    } else if (resultPreviousGame.optional === undefined || resultPreviousGame.optional.pages === undefined) {
        delete resultPreviousGame.id;
        let previousGameStatistic: GameStatistics;

        if (resultPreviousGame.optional) {
            previousGameStatistic = resultPreviousGame.optional.gameStatistics;
        }

        const gameStatisticsAndPages = { gameStatistics: previousGameStatistic, pages: Object.assign({}, pageLearned) };
        resultPreviousGame.optional = gameStatisticsAndPages;
        updateSettings(resultPreviousGame);
    } else if (resultPreviousGame.optional.pages) {
        delete resultPreviousGame.id;
        resultPreviousGame.optional.pages = Object.assign({}, pageLearned);
        updateSettings(resultPreviousGame);
    }
};

export const addLearnedHardNeutralWord = async (wordId: string, difficulty: string) => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    const wordUserStatus: UserWords = await getUserWordById(wordId);
    if (wordUserStatus === undefined) {
        (
            await fetch(`${host}/users/${userId}/words/${wordId}`, {
                method: 'POST',
                body: JSON.stringify({
                    difficulty: difficulty,
                    optional: {
                        dateWordNew: 0,
                        dateWordLearned: difficulty === Difficulty.learned ? new Date().toLocaleDateString('ru-RU') : 0,
                        rightAnswers: 0,
                        wrongAnswers: 0,
                        rightAnswersSeries: 0,
                    },
                }),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
        ).json();
        // return await response.json();
    } else if (wordUserStatus && !('optional' in wordUserStatus)) {
        (
            await fetch(`${host}/users/${userId}/words/${wordId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    difficulty: difficulty,
                    optional: {
                        dateWordNew: 0,
                        dateWordLearned: difficulty === Difficulty.learned ? new Date().toLocaleDateString('ru-RU') : 0,
                        rightAnswers: 0,
                        wrongAnswers: 0,
                        rightAnswersSeries: 0,
                    },
                }),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
        ).json();
    } else if (wordUserStatus && 'optional' in wordUserStatus) {
        let body: UserWords;
        if (difficulty === Difficulty.learned) {
            if (wordUserStatus.difficulty === Difficulty.neutral || wordUserStatus.difficulty === Difficulty.hard) {
                body = {
                    difficulty: difficulty,
                    optional: {
                        dateWordNew: wordUserStatus.optional.dateWordNew,
                        dateWordLearned: wordUserStatus.optional.dateWordLearned
                            ? wordUserStatus.optional.dateWordLearned
                            : new Date().toLocaleDateString('ru-RU'),
                        rightAnswers: wordUserStatus.optional.rightAnswers,
                        wrongAnswers: wordUserStatus.optional.wrongAnswers,
                        rightAnswersSeries: wordUserStatus.optional.rightAnswersSeries,
                    },
                };
            } else if (wordUserStatus.difficulty === Difficulty.learned) {
                body = {
                    optional: {
                        dateWordNew: wordUserStatus.optional.dateWordNew,
                        dateWordLearned: wordUserStatus.optional.dateWordLearned,
                        rightAnswers: wordUserStatus.optional.rightAnswers,
                        wrongAnswers: wordUserStatus.optional.wrongAnswers,
                        rightAnswersSeries: wordUserStatus.optional.rightAnswersSeries,
                    },
                };
            }
        } else if (difficulty === Difficulty.hard || difficulty === Difficulty.neutral) {
            body = {
                difficulty: difficulty,
                optional: {
                    dateWordNew: wordUserStatus.optional.dateWordNew,
                    dateWordLearned: 0,
                    rightAnswers: wordUserStatus.optional.rightAnswers,
                    wrongAnswers: wordUserStatus.optional.wrongAnswers,
                    rightAnswersSeries: wordUserStatus.optional.rightAnswersSeries,
                },
            };
        }

        (
            await fetch(`${host}/users/${userId}/words/${wordId}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
        ).json();
    }
};
