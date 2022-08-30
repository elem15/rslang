import { UserData } from '../../../types/user-types';
import { host } from '../../auth/controllers/hosts';

export type StatisticsType = {
    date: string;
    learnedWords: number;
    rightAnswers: number;
    wrongAnswers: number;
    longestSeries: number;
};

export const updateStatistics = async (user: UserData | null, statistics: StatisticsType): Promise<void> => {
    const data = {
        learnedWords: statistics.learnedWords,
        optional: statistics,
    };

    if (user) {
        const { token, userId } = user;
        const response = await fetch(`${host}/users/${userId}/statistics`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const content = await response.json();
        console.log(content);
    } else {
        localStorage.setItem('statistic', JSON.stringify(statistics));
    }
};
