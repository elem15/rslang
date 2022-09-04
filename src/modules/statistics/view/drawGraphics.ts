import '../../../../node_modules/chartist/dist/index.css';
import '../assets/styles/statistic.css';
import '../assets/styles/statistic.scss';
import { Label, LineChart } from 'chartist';
import { getNewLearnedWords } from '../services/api';

export const drawGraphics = async () => {
    const allWordsForLongStatistic = await getNewLearnedWords();
    const arrResLearnedWords = Object.values(allWordsForLongStatistic[1]);

    for (let i = 1; i < arrResLearnedWords.length; i++) {
        if (i > 0) arrResLearnedWords[i] = arrResLearnedWords[i] + arrResLearnedWords[i - 1];
    }

    new LineChart(
        '#chart1',
        {
            labels: allWordsForLongStatistic[2] as Label[],
            series: [Object.values(allWordsForLongStatistic[0])],
        },
        {
            axisY: {
                onlyInteger: true,
            },
        }
    );

    new LineChart(
        '#chart2',
        {
            labels: allWordsForLongStatistic[2] as Label[],
            series: [arrResLearnedWords],
        },
        {
            axisY: {
                onlyInteger: true,
            },
        }
    );
};
