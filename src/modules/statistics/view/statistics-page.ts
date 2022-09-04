import { removeFooter } from '../../main/view/main-page';
import { getCountLearnedWords, getResultGame } from '../services/api';
import { drawGraphics } from './drawGraphics';

export const renderStatisticsPage = async () => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    removeFooter();
    const statistics = document.createElement('section');
    statistics.className = 'statistics';
    root.append(statistics);

    let isAuthorization = false;
    const userSymbol = document.querySelector('.user') as HTMLSpanElement;
    if (localStorage.getItem('email') && userSymbol.classList.contains('logged')) {
        isAuthorization = true;
    } else {
        isAuthorization = false;
    }

    if (isAuthorization) {
        const shortStatisticAudio = await getResultGame('audiochallenge');
        const shortStatisticSprint = await getResultGame('sprint');

        const quantityNewWordsAudio = shortStatisticAudio.optional.gameStatistics.audiochallenge.newWords;
        let percentRightAnswersAudio =
            (shortStatisticAudio.optional.gameStatistics.audiochallenge.rightAnswers /
                (shortStatisticAudio.optional.gameStatistics.audiochallenge.rightAnswers +
                    shortStatisticAudio.optional.gameStatistics.audiochallenge.wrongAnswers)) *
            100;
        percentRightAnswersAudio = percentRightAnswersAudio ? Math.round(percentRightAnswersAudio) : 0;
        const longestSeriesAudio = shortStatisticAudio.optional.gameStatistics.audiochallenge.longestSeries;

        const quantityNewWordsSprint = shortStatisticSprint.optional.gameStatistics.sprint.newWords;
        let percentRightAnswersSprint =
            (shortStatisticSprint.optional.gameStatistics.sprint.rightAnswers /
                (shortStatisticSprint.optional.gameStatistics.sprint.rightAnswers +
                    shortStatisticSprint.optional.gameStatistics.sprint.wrongAnswers)) *
            100;
        percentRightAnswersSprint = percentRightAnswersSprint ? Math.round(percentRightAnswersSprint) : 0;
        const longestSeriesSprint = shortStatisticSprint.optional.gameStatistics.sprint.longestSeries;

        let percentRightAnswersPerDay =
            ((shortStatisticAudio.optional.gameStatistics.audiochallenge.rightAnswers +
                shortStatisticSprint.optional.gameStatistics.sprint.rightAnswers) /
                (shortStatisticAudio.optional.gameStatistics.audiochallenge.rightAnswers +
                    shortStatisticAudio.optional.gameStatistics.audiochallenge.wrongAnswers +
                    shortStatisticSprint.optional.gameStatistics.sprint.rightAnswers +
                    shortStatisticSprint.optional.gameStatistics.sprint.wrongAnswers)) *
            100;
        percentRightAnswersPerDay = percentRightAnswersPerDay ? Math.round(percentRightAnswersPerDay) : 0;

        let quantityLearnedWordsPerDay = await getCountLearnedWords();
        quantityLearnedWordsPerDay = quantityLearnedWordsPerDay ? quantityLearnedWordsPerDay : 0;
        statistics.innerHTML = `
            <div class="wrapper-table">
                <table class="table table-games">
                    <thead>
                        <tr>
                            <th scope="col" colspan="3">Краткосрочная статистика по мини-играм</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Тип игры</th>
                            <th>Аудиовызов</th>
                            <th>Спринт</th>
                        </tr>
                        <tr>
                            <th scope="row">Количество новых слов за день, шт.</th>
                            <td>${quantityNewWordsAudio}</td>
                            <td>${quantityNewWordsSprint}</td>
                        </tr>
                        <tr>
                            <th scope="row">Процент правильных ответов, %</th>
                            <td>${percentRightAnswersAudio}</td>
                            <td>${percentRightAnswersSprint}</td>
                        </tr>
                        <tr>
                            <th scope="row">Самая длинная серия правильных ответов, шт.</th>
                            <td>${longestSeriesAudio}</td>
                            <td>${longestSeriesSprint}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table table-words">
                    <thead>
                        <tr>
                            <th scope="col" colspan="2">Краткосрочная статистика по словам</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Параметр</th>
                            <th>Значение</th>
                        </tr>
                        <tr>
                            <th scope="row">Количество новых слов за день, шт.</th>
                            <td>${quantityNewWordsAudio + quantityNewWordsSprint}</td>
                        </tr>
                        <tr>
                            <th scope="row">Количество изученных слов за день, шт.</th>
                            <td>${quantityLearnedWordsPerDay}</td>
                        </tr>
                        <tr>
                            <th scope="row">Процент правильных ответов за день, %</th>
                            <td>${percentRightAnswersPerDay}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="wrapper-statistic">
                <h3 class="wrapper-statistic__header">График, отображающий количество новых слов за каждый день изучения</h3>
                <div id="chart1" class="statistic__short-audio-challenge"></div>
                <h3 class="wrapper-statistic__header">График, отображающий увеличение общего количества изученных слов за весь период обучения по дням</h3>
                <div id="chart2" class="statistic__short-sprint"></div>
            </div>
    
        `;

        drawGraphics();
    } else {
        statistics.innerHTML = 'Статистика доступна только зарегистрированным пользователям';
    }
};
