import { Difficulty, UserWords } from '../../../types/textbook-types';
import { UserData } from '../../../types/user-types';
import { host } from '../../auth/controllers/hosts';
import { wordsState } from '../services/words-state';
import { getUserWordById } from './get-user-words';

export const addNewWord = async (
    wordId: string,
    rightAnswers: number,
    wrongAnswers: number,
    isRightAnswer: boolean
) => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    const userWordsIds = wordsState.userWords.map((word) => word.wordId);
    if (!userWordsIds.includes(wordId)) {
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
    } else {
        const wordUserStatus: UserWords = await getUserWordById(wordId);
        if (wordUserStatus && !('optional' in wordUserStatus)) {
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
                    difficulty:
                        wordUserStatus.difficulty === Difficulty.learned 
                            ? Difficulty.neutral
                            : wordUserStatus.difficulty,
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
                if (
                    wordUserStatus.difficulty === Difficulty.neutral &&
                    wordUserStatus.optional.rightAnswersSeries >= 2
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
                            rightAnswersSeries: 3,
                        },
                    };
                } else if (
                    wordUserStatus.difficulty === Difficulty.hard &&
                    wordUserStatus.optional.rightAnswersSeries >= 4
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
                                    : ++wordUserStatus.optional.rightAnswersSeries,
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
    }
};
