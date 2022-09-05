import { DictionaryHardWord } from '../../../types/textbook-types';
import { statistics } from './statistics';

export const wordsState = {
    usedWordsIds: [] as Array<number>,
    randomList: [] as Array<number>,
    data: null as DictionaryHardWord[],
    translateEqual: true as boolean,
    fromBook: false as boolean,
    group: 0 as number,
    page: 0 as number,
    counter: 0 as number,
    exit() {
        this.data = null;
        this.counter = 0;
        statistics.correct3word = -1;
        this.randomList = [];
    },
};
