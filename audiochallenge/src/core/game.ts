/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { wordsList } from '../services/words';
import { Word } from '../types';
import { drawlevels } from '../views/levels';
import { nextWord } from '../views/next';

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
    correct?: string[];
    incorrect?: string[];

    constructor(root: HTMLElement, group?: number) {
        this.root = root;
        this.container = <HTMLElement>document.createElement('div');
        this.progress = <HTMLElement>document.createElement('div');
        this.selected = [];
        this.count = 0;
        this.group = group ?? 0;
        this.container.className = 'game';
        this.next = <HTMLButtonElement>document.createElement('button');
        this.next.classList.add('game__next_word');
        this.next.innerText = `не знаю`;
        this.next.onclick = async () => this.onNext();
    }

    start = async (): Promise<void> => {
        if (!this.group) await this.showLevels();
        await this.render();
    };

    showLevels = async (): Promise<void> => {
        await this.clear(this.container);
        await drawlevels(this.container, this.onLevelSelect);
    };

    onLevelSelect = async (level: number): Promise<void> => {
        await this.clear(this.container);
        this.group = level;
        try {
            const words = await wordsList(0, this.group);
            if (typeof words !== 'undefined') {
                this.words = words;
                this.current = await this.getRandomWord();
                console.log(this.current);
                this.selected?.push(this.current.id);
                const variants = this.words.slice(this.count + 1, this.count + 5);
                await nextWord(this.container, this.current, variants);
                this.container.append(this.next);
                this.render();
            }
        } catch (Exception) {
            console.log(Exception);
        }
    };

    onNext = async (): Promise<void> => {
        this.count += 1;
        this.current = await this.getRandomWord();
        console.log(this.current);
        this.selected.push(this.current.id);

        const variants = this.words.slice(this.count + 1, this.count + 5);
        await this.clear(this.container);
        await nextWord(this.container, this.current, variants);
        this.container.append(this.next);
        this.render();
    };

    clear = async (container: HTMLElement): Promise<void> => {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    };

    render = async (): Promise<void> => {
        this.clear(this.root);
        this.root.append(this.progress, this.container);
    };

    getRandomWord = async (): Promise<Word> => {
        const filtered = this.words.filter((word) => !this.selected.includes(word.id));
        const index = Math.floor(Math.random() * (this.words.length - this.selected.length));

        return filtered[index];
    };

    getRandomWords = async (exclude: Word): Promise<Word[]> => {
        const arr: Word[] = [];
        arr.push(exclude);

        return arr;
    };
}
