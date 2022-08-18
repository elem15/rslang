/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { getWords } from '../services/words';
import { Word } from '../types';
import { clear, shuffle } from '../utils';
import { drawlevels } from '../views/levels';
import { nextWord } from '../views/next';
import { showResult } from '../views/result';
import { nextDefaultText, nextNextText } from './settings';

export default class Game {
    root: HTMLElement;
    progress: HTMLElement;
    container: HTMLElement;
    next: HTMLButtonElement;

    words: Word[] = [];
    group: number;
    current: Word | undefined;
    count: number;

    selected: string[];
    correct?: string[] = [];
    incorrect?: string[] = [];

    constructor(root: HTMLElement, group?: number) {
        this.root = root;
        this.container = <HTMLElement>document.createElement('div');
        this.progress = <HTMLElement>document.createElement('div');
        this.selected = [];
        this.count = 1;
        this.group = group ?? 0;
        this.container.className = 'game';
        this.next = <HTMLButtonElement>document.createElement('button');
        this.next.classList.add('game__next_word');
        this.next.innerText = nextDefaultText;
        this.next.onclick = async () => this.onNext();
    }

    start = async (): Promise<void> => {
        if (!this.group) await this.showLevels();
        await this.render();
    };

    showLevels = async (): Promise<void> => {
        await clear(this.container);
        await drawlevels(this.container, this.onLevelSelect);
    };

    onLevelSelect = async (level: number): Promise<void> => {
        await clear(this.container);
        this.group = level;
        try {
            const words = await getWords(0, this.group);
            if (typeof words !== 'undefined') {
                this.words = words;
                this.current = await this.getRandomWord();
                const variants = await this.getRandomWords(this.current);
                this.selected?.push(this.current.id);

                await nextWord(this.container, this.current, variants);
                this.container.append(this.next);
                this.render();
            }
        } catch (Exception) {
            console.log(Exception);
        }
    };

    onNext = async (): Promise<void> => {
        if (this.count === 20) {
            this.next.disabled = true;
            await this.onEndGame();
        } else this.count !== this.words.length;
        {
            this.count += 1;
            this.current = await this.getRandomWord();
            this.selected.push(this.current.id);
            const variants = await this.getRandomWords(this.current);

            await clear(this.container);
            await nextWord(this.container, this.current, variants);
            this.container.append(this.next);
            this.render();
        }
    };

    render = async (): Promise<void> => {
        clear(this.root);
        this.root.append(this.progress, this.container);
        this.next.innerText = nextDefaultText;
        const answers = Array.from(this.container.querySelectorAll('.answers__item')) as HTMLElement[];
        answers.forEach((item) => item.addEventListener('click', this.onClickVariant));
    };

    onClickVariant = async (e: MouseEvent): Promise<void> => {
        const target = e.target as HTMLElement;
        this.wordCardUpdate();

        if (target.closest('.answers__item') && target.innerText === this.current?.wordTranslate) {
            const label = target.parentElement;
            label?.classList.add('correct');
            this.correct?.push(this.current.id);
        } else {
            const label = target.parentElement;
            label?.classList.add('incorrect');
            const answers = Array.from(this.container.querySelectorAll('.answers__item')) as HTMLElement[];
            answers.forEach((item) => item.removeEventListener('click', this.onClickVariant));
            if (this.current) this.incorrect?.push(this.current.id);
        }
    };

    onEndGame = async (): Promise<void> => {
        this.next.disabled = true;
        const correct = this.words.filter((item) => this.correct?.includes(item.id));
        const incorrect = this.words.filter((item) => this.incorrect?.includes(item.id));
        showResult(correct, incorrect);
    };

    getRandomWord = async (): Promise<Word> => {
        const filtered = this.words.filter((word) => !this.selected.includes(word.id));
        const index = Math.floor(Math.random() * (this.words.length - this.selected.length));

        return filtered[index];
    };

    getRandomWords = async (current: Word): Promise<Word[]> => {
        const arr: Word[] = [];
        arr.push(current);
        while (arr.length < 4) {
            const index = Math.floor(Math.random() * this.words.length);
            const next = this.words[index];
            if (!arr.includes(next)) arr.push(next);
        }
        return shuffle(arr);
    };

    wordCardUpdate = () => {
        const image = this.container.querySelector('.word__image img') as HTMLImageElement;
        this.next.innerText = nextNextText;
        image.style.display = 'block';
    };
}
