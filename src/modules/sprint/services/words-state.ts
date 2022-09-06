import { DictionaryHardWord } from '../../../types/textbook-types';
import { addResultGame } from '../../statistics/services/api';
import { statistics } from './statistics';

export const wordsState = {
    currentWordId: '' as string,
    prevNewWords: 0 as number,
    newWords: 0 as number,
    rightAnswers: 0 as number,
    wrongAnswers: 0 as number,
    longestSeries: 0 as number,
    usedWordsIds: [] as Array<number>,
    randomList: [] as Array<number>,
    data: null as DictionaryHardWord[],
    translateEqual: true as boolean,
    fromBook: false as boolean,
    group: 0 as number,
    page: 0 as number,
    counter: 0 as number,
    async addStats() {
        if (localStorage.getItem('data')) {
            await addResultGame(
                'sprint',
                this.prevNewWords + this.newWords,
                this.rightAnswers,
                this.wrongAnswers,
                this.longestSeries
            );
        }
        this.prevNewWords = 0;
        this.newWords = 0;
        this.rightAnswers = 0;
        this.wrongAnswers = 0;
    },
    exit() {
        this.data = null;
        this.counter = 0;
        statistics.correct3word = -1;
        this.randomList = [];
    },
};
