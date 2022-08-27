import { Dictionary } from '../../../types/textbook-types';
import { getWords } from '../controllers/get-words'

interface sprintWords {
    word: string;
    wordTranslate: string;
    translateEqual: boolean;
}
const getRandom = () => Math.ceil(Math.random() * 20)
export const getRandomWord = async (): Promise<sprintWords> => {
    const data = await getWords();
    const randomNum = getRandom();
    const { word, wordTranslate } = data[randomNum];
    const random = Math.random();
    if (random > 0.5) return { word, wordTranslate, translateEqual: true };
    let newRandomNum = getRandom();
    while (newRandomNum === randomNum) {
        newRandomNum = getRandom();
    }
    const wordWrongTranslate = data[newRandomNum].wordTranslate;
    return { word, wordTranslate: wordWrongTranslate, translateEqual: false };
};
