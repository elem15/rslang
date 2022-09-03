import { Series, SeriesPrimitiveValue } from 'chartist';
import { BodyRequest, Difficulty, Pages, Result, UserWords } from '../../../types/textbook-types';
import { UserData } from '../../../types/user-types';
import { host } from '../../auth/controllers/hosts';

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

export const addNewWord = async (
    wordId: string,
    rightAnswers: number,
    wrongAnswers: number,
    isRightAnswer: boolean
) => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    const wordUserStatus: UserWords = await getUserWordById(wordId);
    if (wordUserStatus === undefined) {
        (
            await fetch(`${host}/users/${userId}/words/${wordId}`, {
                method: 'POST',
                body: JSON.stringify({
                    difficulty: 'neutral',
                    optional: {
                        dateWordNew: new Date().toLocaleDateString('ru-RU'),
                        dateWordLearned: 0,
                        rightAnswers: rightAnswers,
                        wrongAnswers: wrongAnswers,
                        rightAnswersSeries: isRightAnswer ? 1 : 0,
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
    } else if (wordUserStatus && !('optional' in wordUserStatus)) {
        (
            await fetch(`${host}/users/${userId}/words/${wordId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    optional: {
                        dateWordNew: new Date().toLocaleDateString('ru-RU'),
                        dateWordLearned: 0,
                        rightAnswers: rightAnswers,
                        wrongAnswers: wrongAnswers,
                        rightAnswersSeries: isRightAnswer ? 1 : 0,
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
        if (!isRightAnswer) {
            body = {
                difficulty: Difficulty.learned ? Difficulty.neutral : wordUserStatus.difficulty,
                optional: {
                    dateWordNew: wordUserStatus.optional.dateWordNew
                        ? wordUserStatus.optional.dateWordNew
                        : new Date().toLocaleDateString('ru-RU'),
                    dateWordLearned: 0,
                    rightAnswers: wordUserStatus.optional.rightAnswers + rightAnswers,
                    wrongAnswers: wordUserStatus.optional.wrongAnswers + wrongAnswers,
                    rightAnswersSeries: 0,
                },
            };
        }
        if (isRightAnswer) {
            if (wordUserStatus.difficulty === Difficulty.neutral && wordUserStatus.optional.rightAnswersSeries > 2) {
                body = {
                    difficulty: Difficulty.learned,
                    optional: {
                        dateWordNew: wordUserStatus.optional.dateWordNew
                            ? wordUserStatus.optional.dateWordNew
                            : new Date().toLocaleDateString('ru-RU'),
                        dateWordLearned: new Date().toLocaleDateString('ru-RU'),
                        rightAnswers: wordUserStatus.optional.rightAnswers + rightAnswers,
                        wrongAnswers: wordUserStatus.optional.wrongAnswers + wrongAnswers,
                        rightAnswersSeries: 3,
                    },
                };
            } else if (
                wordUserStatus.difficulty === Difficulty.hard &&
                wordUserStatus.optional.rightAnswersSeries > 4
            ) {
                body = {
                    difficulty: Difficulty.learned,
                    optional: {
                        dateWordNew: wordUserStatus.optional.dateWordNew
                            ? wordUserStatus.optional.dateWordNew
                            : new Date().toLocaleDateString('ru-RU'),
                        dateWordLearned: new Date().toLocaleDateString('ru-RU'),
                        rightAnswers: wordUserStatus.optional.rightAnswers + rightAnswers,
                        wrongAnswers: wordUserStatus.optional.wrongAnswers + wrongAnswers,
                        rightAnswersSeries: 5,
                    },
                };
            } else {
                body = {
                    optional: {
                        dateWordNew: wordUserStatus.optional.dateWordNew
                            ? wordUserStatus.optional.dateWordNew
                            : new Date().toLocaleDateString('ru-RU'),
                        dateWordLearned: wordUserStatus.optional.dateWordLearned,
                        rightAnswers: wordUserStatus.optional.rightAnswers + rightAnswers,
                        wrongAnswers: wordUserStatus.optional.wrongAnswers + wrongAnswers,
                        rightAnswersSeries:
                            wordUserStatus.difficulty === Difficulty.learned
                                ? wordUserStatus.optional.rightAnswersSeries
                                : wordUserStatus.optional.rightAnswersSeries + rightAnswers,
                    },
                };
            }
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

export const getCountLearnedWords = async () => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    const currentDate = new Date().toLocaleDateString('ru-RU');
    try {
        const response = await fetch(
            `${host}/users/${userId}/aggregatedWords?wordsPerPage=3600&filter=%7B%22%24and%22%3A%5B%7B%22userWord.optional.dateWordLearned%22%3A%22${currentDate}%22%7D%5D%7D`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
        const words = await response.json();
        return words[0].totalCount[0].count;
    } catch {
        console.log('Word not exist');
    }
};

export const getCountNewWords = async () => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    const currentDate = new Date().toLocaleDateString('ru-RU');
    try {
        const response = await fetch(
            `${host}/users/${userId}/aggregatedWords?wordsPerPage=3600&filter=%7B%22%24and%22%3A%5B%7B%22userWord.optional.dateWordNew%22%3A%22${currentDate}%22%7D%5D%7D`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
        const words = await response.json();
        return words[0].totalCount[0].count;
    } catch {
        console.log('Word not exist');
    }
};

export const addResultGame = async (
    typeOfGame: string,
    newWords: number,
    rightAnswers: number,
    wrongAnswers: number,
    longestSeries: number
) => {
    const resultPreviousGame: BodyRequest = await getSettings();
    if (resultPreviousGame === undefined) {
        const resultPreviousGame = { optional: { pages: Object.assign({}, null) } };
        let previousPages: Pages;
        if (resultPreviousGame.optional) {
            previousPages = resultPreviousGame.optional.pages;
        }

        const resultGame: Result = {
            date: new Date().toLocaleDateString('ru-RU'),
            newWords: newWords,
            rightAnswers: rightAnswers,
            wrongAnswers: wrongAnswers,
            longestSeries: longestSeries,
        };
        const gameStatistics = { [typeOfGame]: resultGame };
        const gameStatisticsAndPages = { gameStatistics, pages: previousPages };
        resultPreviousGame.optional = gameStatisticsAndPages;
        updateSettings(resultPreviousGame);
    } else if (resultPreviousGame.optional === undefined || resultPreviousGame.optional.gameStatistics === undefined) {
        delete resultPreviousGame.id;
        let previousPages: Pages;
        if (resultPreviousGame.optional) {
            previousPages = resultPreviousGame.optional.pages;
        }

        const resultGame: Result = {
            date: new Date().toLocaleDateString('ru-RU'),
            newWords: newWords,
            rightAnswers: rightAnswers,
            wrongAnswers: wrongAnswers,
            longestSeries: longestSeries,
        };
        const gameStatistics = { [typeOfGame]: resultGame };
        const gameStatisticsAndPages = { gameStatistics, pages: previousPages };
        resultPreviousGame.optional = gameStatisticsAndPages;

        updateSettings(resultPreviousGame);
    } else if (
        resultPreviousGame.optional.gameStatistics[typeOfGame] === undefined ||
        resultPreviousGame.optional.gameStatistics[typeOfGame].date !== new Date().toLocaleDateString('ru-RU')
    ) {
        delete resultPreviousGame.id;

        const resultGame: Result = {
            date: new Date().toLocaleDateString('ru-RU'),
            newWords: newWords,
            rightAnswers: rightAnswers,
            wrongAnswers: wrongAnswers,
            longestSeries: longestSeries,
        };
        resultPreviousGame.optional.gameStatistics[typeOfGame] = resultGame;
        updateSettings(resultPreviousGame);
    } else if (resultPreviousGame.optional.gameStatistics[typeOfGame].date === new Date().toLocaleDateString('ru-RU')) {
        delete resultPreviousGame.id;
        console.log(resultPreviousGame.optional.gameStatistics[typeOfGame].wrongAnswers);
        resultPreviousGame.optional.gameStatistics[typeOfGame].newWords =
            resultPreviousGame.optional.gameStatistics[typeOfGame].newWords + newWords;
        resultPreviousGame.optional.gameStatistics[typeOfGame].rightAnswers =
            resultPreviousGame.optional.gameStatistics[typeOfGame].rightAnswers + rightAnswers;
        resultPreviousGame.optional.gameStatistics[typeOfGame].wrongAnswers =
            resultPreviousGame.optional.gameStatistics[typeOfGame].wrongAnswers + wrongAnswers;
        resultPreviousGame.optional.gameStatistics[typeOfGame].longestSeries =
            resultPreviousGame.optional.gameStatistics[typeOfGame].longestSeries < longestSeries
                ? longestSeries
                : resultPreviousGame.optional.gameStatistics[typeOfGame].longestSeries;
        console.log(resultPreviousGame.optional.gameStatistics[typeOfGame].wrongAnswers);
        updateSettings(resultPreviousGame);
    }
};

export const getResultGame = async (typeOfGame: string) => {
    let resultPreviousGame: BodyRequest = await getSettings();
    if (
        resultPreviousGame === undefined ||
        resultPreviousGame.optional === undefined ||
        resultPreviousGame.optional.gameStatistics === undefined
    ) {
        let previousPages: Pages;
        resultPreviousGame = { optional: { pages: Object.assign({}, null) } };
        if (resultPreviousGame.optional) {
            previousPages = resultPreviousGame.optional.pages;
        }

        const resultGame: Result = {
            date: new Date().toLocaleDateString('ru-RU'),
            newWords: 0,
            rightAnswers: 0,
            wrongAnswers: 0,
            longestSeries: 0,
        };
        const gameStatistics = { [typeOfGame]: resultGame };
        const gameStatisticsAndPages = { gameStatistics, pages: previousPages };
        resultPreviousGame.optional = gameStatisticsAndPages;

        return resultPreviousGame;
    } else if (
        resultPreviousGame.optional.gameStatistics[typeOfGame] === undefined ||
        resultPreviousGame.optional.gameStatistics[typeOfGame].date !== new Date().toLocaleDateString('ru-RU')
    ) {
        const resultGame: Result = {
            date: new Date().toLocaleDateString('ru-RU'),
            newWords: 0,
            rightAnswers: 0,
            wrongAnswers: 0,
            longestSeries: 0,
        };
        resultPreviousGame.optional.gameStatistics[typeOfGame] = resultGame;
        return resultPreviousGame;
    } else if (resultPreviousGame.optional.gameStatistics[typeOfGame].date === new Date().toLocaleDateString('ru-RU')) {
        return resultPreviousGame;
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

// export const getNewLearnedWords = async (): Promise<[Series<SeriesPrimitiveValue>, Series<SeriesPrimitiveValue>]> => {
//     const allUserWords = await getAllUserWords();
//     console.log(allUserWords);
//     if (allUserWords === undefined) {
//         return [[{ [new Date().toLocaleDateString('ru-RU')]: 0 }], [{ [new Date().toLocaleDateString('ru-RU')]: 0 }]];
//     } else {
//         console.log(allUserWords);
//         let allDateWordNew = allUserWords.map((el: UserWords) => el.optional.dateWordNew);
//         let allDateWordLearned = allUserWords.map((el: UserWords) => el.optional.dateWordLearned);
//         if (allDateWordNew === undefined || allDateWordLearned === undefined) {
//             return [{ [new Date().toLocaleDateString('ru-RU')]: 0 }, { [new Date().toLocaleDateString('ru-RU')]: 0 }];
//         } else {
//             allDateWordNew = allDateWordNew.filter((el: number) => el !== 0);
//             allDateWordLearned = allDateWordLearned.filter((el: number) => el !== 0);
//             let allDateWordNewObj;
//             allDateWordNew.forEach((el: string) => { allDateWordNewObj[el] = (allDateWordNewObj[el] || 0) + 1; });
//             let allDateWordLearnedObj;
//             allDateWordLearned.forEach((el: string) => { allDateWordLearnedObj[el] = (allDateWordLearnedObj[el] || 0) + 1; });
//             const allDateWordNewRes = Object
//                 .entries(allDateWordNewObj)
//                 .map(el => ({[el[0]]: el[1]}));
//             const allDateWordLearnedRes = Object
//                 .entries(allDateWordLearnedObj)
//                 .map(el => ({[el[0]]: el[1]}));
//             return [[allDateWordNewRes], [allDateWordLearnedRes]];
//         }
//     }
// };
