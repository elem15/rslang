import { Router } from '../../../types/router-types';
import { renderPage } from '../../router/services/router';
import { statistics } from '../services/statistics';
import { wordsState } from '../services/words-state';
import { startGame } from './sprint-page';
import { host } from '../../auth/controllers/hosts';
import { play } from './sprint-page';
import '../scss/styles.scss';
import { levelSelectRender } from './level-select';
export const soundIcon = `<svg class="sound" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>`;

export const removeModal = (modal: HTMLElement) => {
    const close = document.querySelector('.close-modal-btn');
    const secondary = document.querySelector('.to-main-page');
    const counterWrapper = document.querySelector('.counter-wrapper');
    const closeButtons = [close, secondary] as HTMLButtonElement[];
    const goToMain = () => {
        const header = document.querySelector('header');
        const links = header.querySelectorAll('button');
        modal.remove();
        const mainLink = document.querySelector(`.${Router.MAIN}`) as HTMLButtonElement;
        localStorage.setItem('router', Router.MAIN);
        renderPage(Router.MAIN);
        links.forEach((link: HTMLButtonElement) => (link.disabled = false));
        wordsState.counter = 0;
        wordsState.data = null;
    };
    closeButtons.map((close: HTMLButtonElement) => {
        close.addEventListener('click', goToMain);
    });
    const primary = document.querySelector('.new-game') as HTMLButtonElement;
    primary.addEventListener('click', () => {
        modal.remove();
        close.removeEventListener('click', goToMain);
        secondary.removeEventListener('click', goToMain);
        counterWrapper.remove();
        wordsState.counter = 0;
        wordsState.data = null;
        if (wordsState.fromBook) startGame();
        else levelSelectRender();
    });
};

export const messageModal = (message: string) => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.style.backgroundColor = 'rgba(100,100,100,0.3)';
    if (statistics.correctWords) {
        modal.innerHTML = `
        <div class="modal-dialog" id="message-modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${message}</h5>
                <button type="button" class="btn-close close-modal-btn" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h6>Результаты:</h6> 
                <br>
                <span class="text-success">${statistics.correct}</span> изученно.
                <br>
                <span class="text-danger">${statistics.incorrect}</span> еще предстоит выучить.
            </div>
            <div class="modal-body" id="answers">
            <p class="text-success">Верные ответы:</p>
            <ul>       
                ${statistics.correctWords
                    .map(
                        ({ word, wordTranslate, audio }) =>
                            `
                                <li><button class="sound-button" data-sound=${host}/${audio}>${soundIcon}</button> ${word} - ${wordTranslate}</li>
                        `
                    )
                    .join('')}</ul> 
                <br>
                <p class="text-danger">Не верные ответы:</p>
                <ul>       
                    ${statistics.incorrectWords
                .map(
                    ({ word, wordTranslate, audio }) =>
                        `
                                      <li><button class="sound-button" data-sound=${host}/${audio}>${soundIcon}</button> ${word} - ${wordTranslate}</li>
                            `
                )
                .join('')}</ul>         
                </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-primary new-game">Играть еще</button>
            <button type="button" class="btn btn-secondary to-main-page" data-dismiss="modal">На главную</button>
            </div>
        </div>
      `;
    }
    document.querySelector('.sprint-container').append(modal);
    const soundButtons = document.querySelectorAll('.sound-button');
    [...soundButtons].map((btn) =>
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget as HTMLButtonElement;
            play(target.getAttribute('data-sound'));
        })
    );
    removeModal(modal);
    return modal;
};
