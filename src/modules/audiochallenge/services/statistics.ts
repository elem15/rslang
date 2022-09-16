import { UserData } from '../../../types/user-types';
import { addResultGame } from '../../statistics/services/api';

export type StatisticsType = {
    learnedWords: number;
    rightAnswers: number;
    wrongAnswers: number;
    longestSeries: number;
};

export const updateStatistics = async (user: UserData | null, statistics: StatisticsType): Promise<void> => {
    const { learnedWords, rightAnswers, wrongAnswers, longestSeries } = statistics;
    if (user) {
        await addResultGame('audiochallenge', learnedWords, rightAnswers, wrongAnswers, longestSeries);
    } else {
        localStorage.setItem('statistics', JSON.stringify(statistics));
    }
};
