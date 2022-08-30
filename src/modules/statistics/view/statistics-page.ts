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
    // let pageLearnedObjectArrayType: Pages;
    // let pageLearnedObject: Optional;
    // let isAuthorization = true;
//     if (isAuthorization) {

//         const pageLearnedResponse = await getSettings();
//         if (pageLearnedResponse) {
//             pageLearnedObject = pageLearnedResponse.optional;
//             if (pageLearnedObject) {
//                 pageLearnedObjectArrayType = pageLearnedObject.pages
//         }
//     }
// }
//     console.log(pageLearnedObjectArrayType);

    // let resultGame: Result = {
    //     date: new Date().toLocaleDateString('ru-RU'),
    //     newWords: 0,
    //     rightAnswers: 0,
    //     wrongAnswers: 0,
    //     longestSeries: 0
    // }

    // let shortStatistic = {
    //     optional: {
    //         pages: pageLearnedObjectArrayType,
    //         gameStatistics: {
    //             sprint: resultGame,
    //             audiochallenge: resultGame
    //         }
    //     }
    // }

    // await updateSettings(shortStatistic);

    // if (isAuthorization) {

    //     const pageLearnedResponse = await getSettings();
    //     let pageLearnedObject: Optional;
    //     if (pageLearnedResponse) {
    //         pageLearnedObject = pageLearnedResponse.optional;
    //     }
    //     console.log(pageLearnedResponse);
    // }

    await addNewWord('5e9f5ee35eb9e72bc21af967', 0, 1);

    await addResultGame('audiochallenge', 1, 2, 3, 4);

    console.log(await getCountNewWords());
}

