export interface Dictionary {
    id: string;
    group: 0;
    page: 0;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
}

export interface DictionaryHardWord {
    _id: string;
    group: 0;
    page: 0;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
    userWord: { difficulty: string };
}

export interface UserWords {
    id: string;
    difficulty: string;
    wordId: string;
}



export interface BodyRequest {
    wordsPerDay?: number;
    optional?: Optional;
}

export interface Optional {
    pages: Pages;
}

export interface Pages {
    [index: number]: pageLearnedPagesGroup;
}
export interface pageLearnedPagesGroup {
    page: number;
    group: number;
}

// export interface OptionalFromResponse {
//     pages: PagesFromResponse;
// }

// export interface PagesFromResponse {
//     [index: string]: pageLearnedPagesGroup;
// }

export enum Difficulty {
    hard = 'hard',
    learned = 'learned',
}
