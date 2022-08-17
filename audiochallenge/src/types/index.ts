export type GameLevel = {
    group: number;
    color: string;
};

export type Word = {
    id: string;
    group: number;
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
};

export type TSelectHandler = (level: number) => Promise<void>;
