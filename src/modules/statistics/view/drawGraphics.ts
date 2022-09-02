import '../../../../node_modules/chartist/dist/index.css';
import '../assets/styles/statistic.css';
import '../assets/styles/statistic.scss';
import { LineChart, Series, SeriesPrimitiveValue } from 'chartist';
import { getAllUserWords, getNewLearnedWords } from '../services/api';

export const drawGraphics = async () => {
    const allWordsForLongStatistic = await getNewLearnedWords();
    console.log(allWordsForLongStatistic[0]);


    // new LineChart(
    //     '#chart1',
    //     {
    //       labels: [],
    //       series: allWordsForLongStatistic[0],
    //     },
    //     {
    //       reverseData: true,
    //       axisY: {
    //         onlyInteger: true,
    //       }
    //     }
    //   );

    // //   new LineChart(
    // //     '#chart2',
    // //     {
    // //       labels: [],
    // //       series: [allWordsForLongStatistic[1]],
    // //     },
    // //     {
    // //         reverseData: true,
    // //         axisY: {
    // //             onlyInteger: true,
    // //         }
    // //     }
    // //   );
}