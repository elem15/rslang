import { Router } from '../../../types/router-types';
import { renderPage } from '../../router/services/router';
import { messageModal } from './message-modal';
import tick from '../audio/Button-SoundBible.com-1420500901.mp3';
import { play } from './render-pre-counter';
import bird from '../audio/Baby Chicks-SoundBible.com-2811441.mp3';
import { keyDirect } from './sprint-page';
import { statistics } from '../services/statistics';
import { wordsState } from '../services/words-state';

const GAME_TIME = 30;

export const exitGame = (interval: NodeJS.Timer) => {
    const header = document.querySelector('header');
    const links = header.querySelectorAll('button');
    wordsState.group = 0;
    clearInterval(interval);
    localStorage.setItem('router', Router.MAIN);
    document.removeEventListener('keydown', keyDirect);
    renderPage(Router.MAIN);
    links.forEach((link: HTMLButtonElement) => (link.disabled = false));
    wordsState.exit();
};

export function renderCounter() {
    statistics.correct = 0;
    statistics.incorrect = 0;
    statistics.correctWords = [];
    statistics.incorrectWords = [];
    const counter = document.createElement('div');
    counter.className = 'counter';
    counter.innerHTML = '' + GAME_TIME;
    const header = document.querySelector('header');
    const links = header.querySelectorAll('button');
    let i = GAME_TIME;
    renderCounter.prototype.interval = setInterval(() => {
        i--;
        counter.innerHTML = '' + i;
        if (i < 6) {
            play(tick);
        }
        if (i === 0) {
            clearInterval(renderCounter.prototype.interval);
            play(bird);
            const modal = document.querySelector('.modal');
            if (modal) modal.remove();
            document.removeEventListener('keydown', keyDirect);
            messageModal('Игра закончена');
            links.forEach((link: HTMLButtonElement) => (link.disabled = false));
            counter.innerHTML = '';
            document.removeEventListener('keydown', exitGameKbd);
        }
    }, 1000);
    function exitGameKbd(e: KeyboardEvent) {
        if (e.code === 'Escape') {
            clearInterval(renderCounter.prototype.interval);
            exitGame(renderCounter.prototype.interval);
            document.removeEventListener('keydown', exitGameKbd);
        }
    }
    document.querySelector('.sprint-close').addEventListener('click', () => {
        exitGame(renderCounter.prototype.interval);
        document.removeEventListener('keydown', exitGameKbd);
    });
    document.addEventListener('keydown', exitGameKbd);

    return counter;
}
