export interface Dictionary {
    id?: string;
    _id?: string;
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
    optional?: OptionalDictionary;
}
export interface OptionalDictionary {
    dateWordNew: string | number;
    dateWordLearned: string | number;
    rightAnswers: number;
    wrongAnswers: number;
    rightAnswersSeries: number;
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
    userWord?: { difficulty?: string; optional?: OptionalDictionary };
}

export interface UserWords {
    id?: string;
    difficulty?: string;
    wordId?: string;
    optional?: OptionalDictionary;
}

export interface BodyRequest {
    id?: string;
    wordsPerDay?: number;
    optional?: Optional;
}

export interface Optional {
    pages?: Pages;
    wordStatistics?: WordStatistics;
    gameStatistics?: GameStatistics;
}

export interface Pages {
    [index: number]: pageLearnedPagesGroup;
}

export interface pageLearnedPagesGroup {
    page: number;
    group: number;
}

export interface WordStatistics {
    [index: string]: number;
}

export interface GameStatistics {
    sprint?: Result;
    audiochallenge?: Result;
    [index: string]: Result;
}
export interface Result {
    date: string;
    newWords: number;
    rightAnswers: number;
    wrongAnswers: number;
    longestSeries: number;
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
    neutral = 'neutral',
}
