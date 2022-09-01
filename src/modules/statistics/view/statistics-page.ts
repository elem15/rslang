// import { Optional, Pages, Result } from '../../../types/textbook-types';
import { removeFooter } from '../../main/view/main-page';
import { addNewWord, addResultGame, getCountNewWords } from '../services/api';

export const renderStatisticsPage = async () => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    removeFooter();
    const statistics = document.createElement('section');
    statistics.className = 'statistics';
    statistics.innerHTML = 'Statistics';
    root.append(statistics);

    workWithShortStatistic();
};

const workWithShortStatistic = async () => {

    await addNewWord('5e9f5ee35eb9e72bc21af4c4', 0, 1, true);

    await addResultGame('audiochallenge', 1, 2, 3, 4);

    console.log(await getCountNewWords());
};
