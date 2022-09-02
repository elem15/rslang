import { getWords } from '../controllers/get-words';
import { messageModal } from '../view/message-modal-few';
import { exitGame, renderCounter } from '../view/render-counter';
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
    const maxLength = data.length;
    const getRandom = () => Math.floor(Math.random() * maxLength);
    let randomNum = getRandom();
    let { id, word, wordTranslate } = data[randomNum];
    id = id ? id : data[randomNum]._id;
    let i = 0;
    while (wordsState.usedWordsIds.includes(id) && i < maxLength * 2) {
        i++;
        randomNum = getRandom();
        id = data[randomNum].id ? data[randomNum].id : data[randomNum]._id;
        word = data[randomNum].word;
        wordTranslate = data[randomNum].wordTranslate;
    }
    wordsState.counter++;
    if (wordsState.counter > maxLength) {
        return { id: '0', word, wordTranslate, wordWrongTranslate: '', translateEqual: true };
    }
    wordsState.usedWordsIds.push(id);
    statistics.word = data[randomNum];
    const random = Math.random();
    if (random > 0.5) {
        return { id, word, wordTranslate, wordWrongTranslate: '', translateEqual: true };
    }
    let newRandomNum = getRandom();
    while (newRandomNum === randomNum) {
        newRandomNum = getRandom();
    }
    const wordWrongTranslate = data[newRandomNum].wordTranslate;
    return { id, word, wordTranslate, wordWrongTranslate, translateEqual: false };
};
