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

export const exitGame = async (interval: NodeJS.Timer) => {
    wordsState.group = 0;
    wordsState.preTimer = false;
    if (interval) clearInterval(interval);
    localStorage.setItem('router', Router.MAIN);
    document.removeEventListener('keydown', keyDirect);
    renderPage(Router.MAIN);
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
    const close = document.querySelector('.sprint-close');
    if (close) {
        close.addEventListener('click', () => {
            exitGame(renderCounter.prototype.interval);
            document.removeEventListener('keydown', exitGameKbd);
        });
    }
    const modalDialog = document.querySelector('.modal-dialog');
    modalDialog.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    document.addEventListener('keydown', exitGameKbd);

    return counter;
}
