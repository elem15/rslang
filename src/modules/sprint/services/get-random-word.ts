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

export const getRandomWord = async (): Promise<sprintWords> => {
    if (!wordsState.data) wordsState.data = await getWords(wordsState.group);
    const { data } = wordsState;
    const filteredData = data.filter((word: DictionaryHardWord) => !(word.userWord?.difficulty === 'learned'));
    const maxLength = filteredData.length;
    const getRandom = () => Math.floor(Math.random() * maxLength);
    let randomNum = getRandom();
    let { id, word, wordTranslate } = filteredData[randomNum];
    id = id ? id : filteredData[randomNum]._id;
    let i = 0;
    while (wordsState.usedWordsIds.includes(id) && i < maxLength * 2) {
        i++;
        randomNum = getRandom();
        id = filteredData[randomNum].id ? filteredData[randomNum].id : filteredData[randomNum]._id;
        word = filteredData[randomNum].word;
        wordTranslate = filteredData[randomNum].wordTranslate;
    }
    wordsState.counter++;
    if (wordsState.counter > maxLength) {
        return { id: '0', word, wordTranslate, wordWrongTranslate: '', translateEqual: true };
    }
    wordsState.usedWordsIds.push(id);
    statistics.word = filteredData[randomNum];
    const random = Math.random();
    if (random > 0.5) {
        return { id, word, wordTranslate, wordWrongTranslate: '', translateEqual: true };
    }
    let newRandomNum = getRandom();
    while (newRandomNum === randomNum) {
        newRandomNum = getRandom();
    }
    const wordWrongTranslate = filteredData[newRandomNum].wordTranslate;
    return { id, word, wordTranslate, wordWrongTranslate, translateEqual: false };
};
