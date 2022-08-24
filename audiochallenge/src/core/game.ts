import { getWords } from '../services/words';
import { ResultType, Word } from '../types';
import { clear, getElementsList, getRandomWord, getRandomWords } from '../utils';
import { drawLevels } from '../views/levels';
import { nextWord } from '../views/next';
import { progress } from '../views/progress';
import { showResult } from '../views/result';
import { checkIcon, nextDefaultText, nextNextText, wrongIcon } from './settings';

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
    answers: HTMLElement[] = [];

    selected: string[];
    correct?: string[] = [];
    incorrect?: string[] = [];
    canMoveToNext = false;

    constructor(root: HTMLElement, group?: number) {
        this.root = root;
        this.container = <HTMLElement>document.createElement('div');
        this.progress = <HTMLElement>document.createElement('div');
        this.next = <HTMLButtonElement>document.createElement('button');
        this.progress.classList.add('game__progress');
        this.audio = new Audio();
        this.selected = [];
        this.count = 0;
        this.group = group || 0;
        this.container.className = 'game';
        this.next.classList.add('game__next_word');
        this.next.innerText = nextDefaultText;
        this.next.addEventListener('click', this.onClickNext);
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

    onClickNext = (e: Event) => {
        this.canMoveToNext ? this.onNextWord() : this.onSelectVariant(e);
    };

    onKeyPress = async (e: Event): Promise<void> => {
        switch ((e as KeyboardEvent).key) {
            case ' ':
                this.canMoveToNext ? this.onNextWord() : this.onSelectVariant(e);
                break;
            case '1':
                if (this.canMoveToNext) return;
                else this.onSelectVariant(e);
                break;
            case '2':
                if (this.canMoveToNext) return;
                else this.onSelectVariant(e);
                break;
            case '3':
                if (this.canMoveToNext) return;
                else this.onSelectVariant(e);
                break;
            case '4':
                if (this.canMoveToNext) return;
                else this.onSelectVariant(e);
                break;
            default:
                return;
        }
    };

    onNextWord = async (): Promise<void> => {
        this.canMoveToNext = false;
        ++this.count;
        if (this.count !== this.words.length) {
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

    onSelectVariant = async (e: Event): Promise<void> => {
        let path = ResultType.RIGHT;
        let correctAnswer: boolean;

        const target =
            e instanceof KeyboardEvent
                ? (this.container.querySelector(`[data-key="${e.key}"]`) as HTMLElement)
                : (e.target as HTMLElement);

        this.updateCard();
        this.updateProgress();
        this.container.append(this.audio);

        if (target && target.dataset) {
            const { word } = target.dataset;
            correctAnswer = word === this.current?.wordTranslate;

            if (correctAnswer) {
                target.classList.add('correct');
                target.innerHTML = `${checkIcon} ${target.innerText}`;
                if (this.current) this.correct?.push(this.current.id);
            } else {
                target.classList.add('incorrect');
                target.innerHTML = `${wrongIcon} ${target.innerText}`;
                path = ResultType.MISTAKE;
                if (this.current) this.incorrect?.push(this.current.id);
            }
        } else {
            path = ResultType.MISTAKE;
        }

        this.canMoveToNext = true;
        this.next.innerText = nextNextText;
        getElementsList('.answers__item').forEach((item) => {
            item.removeEventListener('click', this.onSelectVariant);
            if (!item.classList.contains('correct')) {
                item.classList.add('incorrect');
                item.innerHTML = `${wrongIcon} ${item.innerText}`;
            }
        });

        this.playAudio(path);
    };

    render = async (): Promise<void> => {
        clear(this.root);
        this.root.append(this.progress, this.container);
        this.next.innerText = nextDefaultText;
        getElementsList('.answers__item').forEach((item) => item.addEventListener('click', this.onSelectVariant));
    };

    updateProgress = () => {
        this.progress.querySelector(`[data-count="${this.count}"]`)?.classList.add('marked');
    };

    updateCard = () => {
        const image = this.container.querySelector('.word__image') as HTMLImageElement;
        const translation = this.container.querySelector('.word__translation') as HTMLElement;
        image.style.display = 'block';
        translation.innerHTML = `<strong>${this.current?.word}</strong>`;
    };

    playAudio = (path: string) => {
        this.audio.pause();
        this.audio.src = path;
        this.audio.addEventListener('canplaythrough', async () => {
            await this.audio.play();
        });
    };

    endGame = async (): Promise<void> => {
        this.next.disabled = true;
        const correct = this.words.filter((item) => this.correct?.includes(item.id));
        const incorrect = this.words.filter((item) => this.incorrect?.includes(item.id));
        clear(this.container);
        showResult(correct, incorrect, this.onRestart);
    };

    onRestart = () => {
        this.start();
    };
}
