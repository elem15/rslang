import { Dictionary } from '../../../types/textbook-types';

export const wordsState = {
    usedWordsIds: [] as string[],
    data: null as Dictionary[],
    translateEqual: true as boolean,
    group: 0 as number,
    page: 0 as number,
    counter: 0 as number,
    fromBook: false as boolean,
};
