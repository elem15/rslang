/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getUserWordsByDifficulty, getWords } from '../services/words';
import { Word } from '../../../types';
import { clear, getElementsList, generateWord, generateWords } from '../utils';
import { drawLevels } from '../view/levels';
import { nextWord as card } from '../view/next';
import { progress } from '../view/progress';
import { showResult } from '../view/result';
import { checkIcon, nextDefaultText, nextNextText } from './settings';
import success from '../assets/sounds/success.wav';
import mistake from '../assets/sounds/error.mp3';
import { host } from '../../auth/controllers/hosts';
import { mute } from '../view/switcher';
import { showManual } from '../view/manual';
import { StatisticsType, updateStatistics } from '../services/statistics';
import { getUser } from '../services/auth';
import { toolbar } from '../view/toolbar';
import { Router } from '../../../types/router-types';
import { renderPage } from '../../router/services/router';

export default class Game {
    root: HTMLElement;
    mute: HTMLElement;
    progress: HTMLElement;
    container: HTMLElement;
    next: HTMLButtonElement;
    audio: HTMLAudioElement;
    toolbar: HTMLElement;

    words: Word[] = [];
    group: number;
    page: number;
    current: Word | undefined;
    count: number;
    answers: HTMLElement[] = [];

    selected: string[];
    correct: string[] = [];
    incorrect?: string[] = [];
    canMoveToNext = false;
    isRestartGame = false;
    isFromBook: boolean;
    isMute: boolean;
    inRow = 0;
    maxInRow = 0;

    constructor(root: HTMLElement, fromBook = false, group?: number, page?: number) {
        this.root = root;
        this.mute = mute();
        this.toolbar = toolbar(this.onClose);
        this.container = <HTMLElement>document.createElement('div');
        this.progress = <HTMLElement>document.createElement('div');
        this.next = <HTMLButtonElement>document.createElement('button');
        this.audio = new Audio();
        this.isMute = false;
        this.selected = [];
        this.count = 0;
        this.group = group || 0;
        this.page = page || Math.floor(Math.random() * 30);
        this.isFromBook = fromBook;
    }

    start = async (): Promise<void> => {
        await this.beforeGame();
        await this.render();
        if (!this.isRestartGame && !this.isFromBook) showManual();
    };

    onLevelSelect = async (level: number): Promise<void> => {
        this.toggleListeners();
        this.toolbar.prepend(this.mute);
        this.root.prepend(this.toolbar);
        await clear(this.container);

        this.group = level;
        try {
            const words = this.group > 5 ? await getUserWordsByDifficulty() : await getWords(this.page, this.group);

            if (typeof words !== 'undefined') {
                this.words = words;
                this.current = await generateWord(this.selected, this.words);
                const variants = await generateWords(this.current, this.words);
                this.selected.push(this.current.word);
                this.progress.append(...progress(this.words.length));
                await card(this.container, this.current, variants);
                this.container.append(this.next);
                this.render();
            }
        } catch (Exception) {
            console.error(Exception);
        }
    };

    onClickNext = (e: Event) => {
        this.canMoveToNext ? this.onNextWord() : this.onSelectVariant(e);
    };

    onKeyPress = async (e: Event): Promise<void> => {
        const { key } = e as KeyboardEvent;
        if (localStorage.getItem('router') !== Router.GAME_1) {
            document.removeEventListener('keydown', this.onKeyPress);
            return;
        }
        switch (key) {
            case 'Enter':
                this.canMoveToNext ? this.onNextWord() : this.onSelectVariant(e);
                break;
            case ' ':
                e.preventDefault();
                await this.playAudio(`${host}/${this.current.audio}`);
                break;
            case '1':
                if (!this.canMoveToNext) this.onSelectVariant(e);
                break;
            case '2':
                if (!this.canMoveToNext) this.onSelectVariant(e);
                break;
            case '3':
                if (!this.canMoveToNext) this.onSelectVariant(e);
                break;
            case '4':
                if (!this.canMoveToNext) this.onSelectVariant(e);
                break;
            case '5':
                if (!this.canMoveToNext) this.onSelectVariant(e);
                break;
            default:
                return;
        }
    };

    onNextWord = async (): Promise<void> => {
        this.canMoveToNext = false;
        ++this.count;
        if (this.count !== this.words.length) {
            this.current = await generateWord(this.selected, this.words);
            const translationVariants = await generateWords(this.current, this.words);
            this.selected.push(this.current.word);

            await card(this.container, this.current, translationVariants);
            this.container.append(this.next);
            this.render();
        } else {
            await this.endGame();
        }
    };

    onSelectVariant = async (e: Event): Promise<void> => {
        const elementCorrect = this.container.querySelector(
            `[data-word="${this.current?.wordTranslate}"]`
        ) as HTMLElement;

        const target =
            e instanceof KeyboardEvent
                ? (this.container.querySelector(`[data-key="${e.key}"]`) as HTMLElement)
                : (e.target as HTMLElement);

        let path = success;
        let correctAnswer: boolean;

        this.updateCard();
        this.updateProgress();
        this.container.append(this.audio);

        if (target && target.dataset) {
            const { word } = target.dataset;
            correctAnswer = word === this.current?.wordTranslate;

            if (correctAnswer) {
                this.inRow++;
                target.classList.add('selected-correct');
                target.innerHTML = `${checkIcon} ${target.innerText}`;
                if (this.current) this.correct?.push(this.current.word);
            } else {
                this.updateMaxInRow();
                this.inRow = 0;
                target.classList.add('selected-mistake');
                elementCorrect.classList.add('unselected-correct');
                path = mistake;
                if (this.current) this.incorrect?.push(this.current.word);
            }
        } else {
            elementCorrect.classList.add('unselected-correct');
            this.incorrect?.push(this.current.word);
            path = mistake;
        }

        this.canMoveToNext = true;
        this.next.innerText = nextNextText;
        getElementsList('.answers__item').forEach((item) => {
            item.removeEventListener('click', this.onSelectVariant);
            if (!item.classList.contains('selected-correct') && !item.classList.contains('unselected-correct')) {
                item.classList.add('unselected');
            }
        });

        if (!this.isMuteOn()) this.playAudio(path);
    };

    render = async (): Promise<void> => {
        this.root.append(this.progress, this.container);
        this.next.innerText = nextDefaultText;
        getElementsList('.answers__item').forEach((item) => item.addEventListener('click', this.onSelectVariant));
    };

    updateProgress = () => {
        this.progress.querySelector(`[data-count="${this.count}"]`)?.classList.add('marked');
    };

    updateMaxInRow = (): void => {
        this.maxInRow = this.inRow > this.maxInRow ? this.inRow : this.maxInRow;
    };

    updateCard = () => {
        const image = this.container.querySelector('.word__image') as HTMLImageElement;
        const translation = this.container.querySelector('.word__translation') as HTMLElement;
        image.style.display = 'block';
        translation.innerHTML = `<strong>${this.current?.word}</strong>`;
    };

    playAudio = async (path: string) => {
        this.audio.pause();
        this.audio.src = path;
        this.audio.addEventListener('canplaythrough', async () => {
            await this.audio.play();
        });
    };

    endGame = async (): Promise<void> => {
        const correct = this.words.filter((item) => this.correct?.includes(item.word));
        const incorrect = this.words.filter((item) => this.incorrect?.includes(item.word));

        this.next.disabled = true;
        this.updateMaxInRow();
        clear(this.container);
        showResult(correct, incorrect, this.maxInRow, this.words.length, this.onRestart, this.onClose);
        if (this.isFromBook) updateStatistics(getUser(), this.prepareStatistics());
        this.toggleListeners(false);
    };

    resetGame = (): void => {
        this.progress.querySelectorAll('.game__progress_item').forEach((item) => item.classList.remove('marked'));
        this.next.disabled = false;
        this.selected.length = 0;
        this.words.length = 0;
        this.correct!.length = 0;
        this.incorrect!.length = 0;
        this.current = undefined;
        this.isRestartGame = true;
        this.count = this.maxInRow = this.inRow = 0;
    };

    isMuteOn = (): boolean => {
        return JSON.parse(localStorage.getItem('mute')) === true;
    };

    beforeGame = async (): Promise<void> => {
        if (this.group === 0 && !this.isRestartGame) await this.showLevels();
        else await this.onLevelSelect(this.group);

        this.progress.classList.add('game__progress');
        this.container.className = 'game';
        this.next.classList.add('game__next_word');
        this.next.innerText = nextDefaultText;
    };

    showLevels = async (): Promise<void> => {
        await drawLevels(this.container, this.onLevelSelect);
    };

    onRestart = () => {
        this.resetGame();
        this.start();
        this.toggleListeners(true);
    };

    onClose = () => {
        this.resetGame();
        this.toggleListeners(false);
        const route = document.querySelector(`.${Router.MAIN}`) as HTMLButtonElement;
        localStorage.setItem('router', Router.MAIN);
        document.location.hash = `#${Router.MAIN}`;
        renderPage(Router.MAIN, route);
    };

    toggleListeners = (needToAdd = true): void => {
        if (needToAdd) {
            this.next.addEventListener('click', this.onClickNext);
            document.addEventListener('keydown', this.onKeyPress);
        } else {
            this.next.removeEventListener('click', this.onClickNext);
            document.removeEventListener('keydown', this.onKeyPress);
        }
    };

    formateDate = (date: Date): string => {
        return date.toLocaleDateString('ru-RU');
    };

    prepareStatistics = (): StatisticsType => {
        const learnedWords = this.words
            .map((w) => {
                if (this.correct.includes(w.word)) return w.word;
            })
            .filter((w) => w)
            .join(',');

        return {
            date: this.formateDate(new Date()),
            learnedWords: learnedWords.split(',').length,
            rightAnswers: this.correct.length,
            wrongAnswers: this.incorrect.length,
            longestSeries: this.maxInRow,
        };
    };
}
