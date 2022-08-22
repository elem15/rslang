import { getWords } from '../services/words';
import { ResultType, Word } from '../types';
import { clear, getRandomWord, getRandomWords } from '../utils';
import { drawLevels } from '../views/levels';
import { nextWord } from '../views/next';
import { progress } from '../views/progress';
import { showResult } from '../views/result';
import { nextDefaultText, nextNextText } from './settings';

export default class Game {
    root: HTMLElement;
    progress: HTMLElement;
    container: HTMLElement;
    next: HTMLButtonElement;
    audio: HTMLAudioElement;

    words: Word[] = [];
    group: number;
    current: Word | undefined;
    count: number;

    selected: string[];
    correct?: string[] = [];
    incorrect?: string[] = [];
    canMoveToNext = false;

    constructor(root: HTMLElement, group?: number) {
        this.root = root;
        this.container = <HTMLElement>document.createElement('div');
        this.progress = <HTMLElement>document.createElement('div');
        this.progress.classList.add('game__progress');
        this.audio = new Audio();
        this.selected = [];
        this.count = 0;
        this.group = group || 0;
        this.container.className = 'game';
        this.next = <HTMLButtonElement>document.createElement('button');
        this.next.classList.add('game__next_word');
        this.next.innerText = nextDefaultText;
        this.next.addEventListener('click', this.nextWord);
        document.addEventListener('keydown', this.onKeyPress);
    }

    start = async (): Promise<void> => {
        this.group === 0 ? await this.showLevels() : await this.onLevelSelect(this.group);
        await this.render();
    };

    showLevels = async (): Promise<void> => {
        await drawLevels(this.container, this.onLevelSelect);
    };

    onLevelSelect = async (level: number): Promise<void> => {
        await clear(this.container);
        this.progress.append(...progress());
        this.group = level;
        try {
            const words = await getWords(Math.floor(Math.random() * 31), this.group);
            if (typeof words !== 'undefined') {
                this.words = words;
                this.current = await getRandomWord(this.selected, this.words);
                const variants = await getRandomWords(this.current, this.words);
                this.selected?.push(this.current.id);

                await nextWord(this.container, this.current, variants);
                this.container.append(this.next);
                this.render();
            }
        } catch (Exception) {
            console.log(Exception);
        }
    };

    onKeyPress = async (e: Event): Promise<void> => {
        switch ((e as KeyboardEvent).key) {
            case ' ':
                if (this.count !== this.words.length) {
                    if (!this.canMoveToNext) {
                        this.playAudio(ResultType.MISTAKE);
                        this.canMoveToNext = !this.canMoveToNext;
                        this.next.innerText = nextNextText;
                    } else {
                        this.canMoveToNext = !this.canMoveToNext;
                        this.updateProgress();
                        this.nextWord();
                    }
                } else {
                    document.removeEventListener('keydown', this.onKeyPress);
                    this.endGame();
                }
                break;
            case '1':
                this.selectVariant(e);
                break;
            case '2':
                this.selectVariant(e);
                break;
            case '3':
                this.selectVariant(e);
                break;
            case '4':
                this.selectVariant(e);
                break;
            default:
                return;
        }
    };

    nextWord = async (): Promise<void> => {
        if (this.count !== this.words.length - 1) {
            this.count++;
            this.current = await getRandomWord(this.selected, this.words);
            const translationVariants = await getRandomWords(this.current, this.words);
            this.selected.push(this.current.id);

            await nextWord(this.container, this.current, translationVariants);
            this.container.append(this.next);
            this.render();
        } else {
            await this.endGame();
        }
    };

    selectVariant = async (e: Event): Promise<void> => {
        let path = ResultType.RIGHT;
        const target =
            e instanceof KeyboardEvent
                ? (this.container.querySelector(`[data-key="${e.key}"]`) as HTMLElement)
                : (e.target as HTMLElement);

        this.updateCard();
        this.updateProgress();
        this.container.append(this.audio);
        const { word } = target.dataset;

        if (word === this.current?.wordTranslate) {
            target.classList.add('correct');
            if (this.current) this.correct?.push(this.current.id);
        } else {
            target.classList.add('incorrect');
            path = ResultType.MISTAKE;
            if (this.current) this.incorrect?.push(this.current.id);
        }

        this.canMoveToNext = true;
        this.next.innerText = nextNextText;
        const answers = Array.from(this.container.querySelectorAll('.answers__item')) as HTMLElement[];
        answers.forEach((item) => item.removeEventListener('click', this.selectVariant));

        this.playAudio(path);
    };

    render = async (): Promise<void> => {
        clear(this.root);
        this.root.append(this.progress, this.container);
        this.next.innerText = nextDefaultText;
        const answers = Array.from(this.container.querySelectorAll('.answers__item')) as HTMLElement[];
        answers.forEach((item) => item.addEventListener('click', this.selectVariant));
    };

    updateProgress = () => {
        this.progress.querySelector(`[data-count="${this.count}"]`)?.classList.add('marked');
    };

    updateCard = () => {
        const image = this.container.querySelector('.word__image img') as HTMLImageElement;
        this.next.innerText = nextNextText;
        image.style.display = 'block';
    };

    playAudio = (path: string) => {
        this.audio.src = path;
        this.audio.addEventListener('canplaythrough', async () => {
            await this.audio.play();
        });
    };

    endGame = async (): Promise<void> => {
        this.next.disabled = true;
        const correct = this.words.filter((item) => this.correct?.includes(item.id));
        const incorrect = this.words.filter((item) => this.incorrect?.includes(item.id));
        showResult(correct, incorrect);
    };
}
