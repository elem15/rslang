import { getWords } from '../controllers/get-words';
import { wordsState } from './words-state';

interface sprintWords {
    id: string;
    word: string;
    wordTranslate: string;
    translateEqual: boolean;
}
const getRandom = () => Math.ceil(Math.random() * 19);

export const getRandomWord = async (): Promise<sprintWords> => {
    if (!wordsState.data) wordsState.data = await getWords();
    const { data } = wordsState;
    let randomNum = getRandom();
    let { id, word, wordTranslate } = data[randomNum];
    while (wordsState.usedWordsIds.includes(id)) {
        console.log(randomNum, '!!!');
        randomNum = getRandom();
        id = data[randomNum].id;
        word = data[randomNum].word;
        wordTranslate = data[randomNum].wordTranslate;
    }
    wordsState.usedWordsIds.push(id);
    console.log(wordsState.usedWordsIds);
    const random = Math.random();
    if (random > 0.5) return { id, word, wordTranslate, translateEqual: true };
    let newRandomNum = getRandom();
    while (newRandomNum === randomNum) {
        newRandomNum = getRandom();
    }
    const wordWrongTranslate = data[newRandomNum].wordTranslate;
    return { id, word, wordTranslate: wordWrongTranslate, translateEqual: false };
};
