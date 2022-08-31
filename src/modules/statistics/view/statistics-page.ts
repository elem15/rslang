import { removeFooter } from '../../main/view/main-page';

export const renderStatisticsPage = async () => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    removeFooter();
    const statistics = document.createElement('section');
    statistics.className = 'statistics';
    statistics.innerHTML = 'Statistics';
    root.append(statistics);
};
