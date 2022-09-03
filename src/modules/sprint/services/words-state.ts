import { Dictionary, DictionaryHardWord } from '../../../types/textbook-types';

export const wordsState = {
    usedWordsIds: new Set() as Set<string>,
    data: null as DictionaryHardWord[],
    translateEqual: true as boolean,
    group: 0 as number,
    page: 0 as number,
    counter: 0 as number,
    fromBook: false as boolean,
};
