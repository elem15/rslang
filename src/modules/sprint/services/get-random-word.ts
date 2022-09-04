import { DictionaryHardWord } from '../../../types/textbook-types';
import { getWords } from '../controllers/get-words';
import { statistics } from './statistics';
import { wordsState } from './words-state';

interface sprintWords {
    id: string;
    word: string;
    wordTranslate: string;
    wordWrongTranslate: string;
    translateEqual: boolean;
}

const getRandomList = (count: number) => {
    let i = 0;
    const arr = [];
    const diff = count;
    let curr;
    while (i++ < count && diff >= count - 1) {
        do {
            curr = Math.floor(Math.random() * diff);
        } while (arr.indexOf(curr) != -1);
        arr.push(curr);
    }
    return arr;
};
export const getRandomWord = async (): Promise<sprintWords> => {
    if (!wordsState.data) wordsState.data = await getWords(wordsState.group);
    const { data } = wordsState;
    const filteredData = data.filter((word: DictionaryHardWord) => !(word.userWord?.difficulty === 'learned'));
    const maxLength = filteredData.length;
    if (!wordsState.randomList.length) wordsState.randomList = getRandomList(maxLength);
    const randomNum = wordsState.randomList[wordsState.counter];
    console.log(randomNum, wordsState.randomList);
    const { word, wordTranslate } = filteredData[randomNum];
    const id = filteredData[randomNum].id ? filteredData[randomNum].id : filteredData[randomNum]._id;
    statistics.word = filteredData[randomNum];
    wordsState.counter++;
    if (wordsState.counter >= maxLength) {
        return { id: '0', word, wordTranslate, wordWrongTranslate: '', translateEqual: true };
    }
    const random = Math.random();
    if (random > 0.5) {
        return { id, word, wordTranslate, wordWrongTranslate: '', translateEqual: true };
    }
    const getRandom = () => Math.floor(Math.random() * maxLength);
    let newRandomNum = getRandom();
    while (newRandomNum === randomNum) {
        newRandomNum = getRandom();
    }
    const wordWrongTranslate = filteredData[newRandomNum].wordTranslate;
    return { id, word, wordTranslate, wordWrongTranslate, translateEqual: false };
};

// export const getRandomWord = async (): Promise<sprintWords> => {
//     if (!wordsState.data) wordsState.data = await getWords(wordsState.group);
//     const { data } = wordsState;
//     const filteredData = data.filter((word: DictionaryHardWord) => !(word.userWord?.difficulty === 'learned'));
//     const maxLength = filteredData.length;
//     const getRandom = () => Math.floor(Math.random() * maxLength);
//     let randomNum = getRandom();
//     let { id, word, wordTranslate } = filteredData[randomNum];
//     id = id ? id : filteredData[randomNum]._id;
//     let i = 0;
//     while (wordsState.usedWordsIds.includes(randomNum) && wordsState.counter + 1 > maxLength) {
//         i++;
//         // console.log(i)
//         randomNum = getRandom();
//         id = filteredData[randomNum].id ? filteredData[randomNum].id : filteredData[randomNum]._id;
//         word = filteredData[randomNum].word;
//         wordTranslate = filteredData[randomNum].wordTranslate;
//     }
//     wordsState.counter++;
//     if (wordsState.counter > maxLength) {
//         return { id: '0', word, wordTranslate, wordWrongTranslate: '', translateEqual: true };
//     }
//     wordsState.usedWordsIds.push(randomNum);
//     statistics.word = filteredData[randomNum];
//     const random = Math.random();
//     console.log(word, randomNum, wordsState.usedWordsIds)
//     if (random > 0.5) {
//         return { id, word, wordTranslate, wordWrongTranslate: '', translateEqual: true };
//     }
//     let newRandomNum = getRandom();
//     while (newRandomNum === randomNum) {
//         newRandomNum = getRandom();
//     }
//     const wordWrongTranslate = filteredData[newRandomNum].wordTranslate;
//     return { id, word, wordTranslate, wordWrongTranslate, translateEqual: false };
// };
