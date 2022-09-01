// import { Optional, Pages, Result } from '../../../types/textbook-types';
import { removeFooter } from '../../main/view/main-page';
import { addNewWord, addResultGame, getCountNewWords, getResultGame } from '../services/api';
import { drawGraphics } from './drawGraphics';

export const renderStatisticsPage = async () => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    removeFooter();
    const statistics = document.createElement('section');
    statistics.className = 'statistics';
    root.append(statistics);

    // const shortStatisticAudio = await getResultGame('audiochallenge');
    // const shortStatisticSprint = await getResultGame('sprint');
    // console.log('audiochallenge',shortStatisticAudio,'sprint',shortStatisticSprint)

    // statistics.innerHTML = `
    //     <table class="table">
    //         <thead>
    //             <tr>
    //                 <th scope="col">Краткосрочная статистика по мини-играм</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             <tr>
    //                 <th scope="row">Тип игры</th>
    //                 <th>Аудиовызов</th>
    //                 <th>Спринт</th>
    //             </tr>
    //             <tr>
    //                 <th scope="row">Количество новых слов за день</th>
    //                 <td>Mark</td>
    //                 <td>Otto</td>
    //             </tr>
    //             <tr>
    //                 <th scope="row">Процент правильных ответов</th>
    //                 <td>Jacob</td>
    //                 <td>Thornton</td>
    //             </tr>
    //             <tr>
    //                 <th scope="row">Самая длинная серия правильных ответов</th>
    //                 <td>Larry the Bird</td>
    //                 <td>Larry the Bird</td>
    //             </tr>
    //         </tbody>
    //     </table>
    //     <div class="wrapper-statistic">
    //         <div id="chart1" class="statistic__short-audio-challenge"></div>
    //         <div id="chart2" class="statistic__short-sprint"></div>
    //     </div>
    // `;

    workWithShortStatistic();
    // drawGraphics();
};

const workWithShortStatistic = async () => {

    await addNewWord('5e9f5ee35eb9e72bc21af4c4', 0, 1, true);

    await addResultGame('audiochallenge', 1, 1, 1, 1);
    console.log(await getCountNewWords());
};
