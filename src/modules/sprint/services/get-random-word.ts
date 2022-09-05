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
    if (count === 1) return [0];
    if (count === 2) return [0, 1];
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
    wordsState.counter++;
    if (wordsState.counter > maxLength) {
        return { id: '0', word: 'word', wordTranslate: 'wordTranslate', wordWrongTranslate: '', translateEqual: true };
    }
    const { word, wordTranslate } = filteredData[randomNum];
    const id = filteredData[randomNum].id ? filteredData[randomNum].id : filteredData[randomNum]._id;
    statistics.word = filteredData[randomNum];
    const random = Math.random();
    if (random > 0.5 || maxLength === 1) {
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
