import { wordsState } from '../services/words-state';
import { startGame } from './sprint-page';
import { Router } from '../../../types/router-types';
import { renderPage } from '../../router/services/router';

export const removeModal = (modal: HTMLElement) => {
    const close = document.querySelector('.btn-close');
    const closeButtons = [close] as HTMLButtonElement[];
    closeButtons.map((close: HTMLButtonElement) => {
        close.addEventListener('click', () => {
            modal.remove();
            localStorage.setItem('router', Router.MAIN);
            renderPage(Router.MAIN);
        });
    });
    const modalDialog = document.querySelector('.modal-dialog');
    modalDialog.addEventListener('click', (e) => {
        e.stopPropagation();
    });
};

export const levelSelectRender = () => {
    wordsState.exit();
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.style.backgroundColor = 'rgba(100,100,100,0)';
    modal.style.marginTop = '200px';
    modal.innerHTML = `
    <div class="modal-dialog" id="game-modal-dialog">
        <div class="modal-content">
        <div class="modal-header" id="modal-header">
            <h5 class="modal-title" id="example-modal-label">Выберите уровень сложности</h5>
            <button type="button" class="btn-close sprint-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        Для управления игрой используйте клавиши ⬅ -  ➡.
        <br>
        ESC для возврата в главное меню. 
        </div>
        <div class="modal-body">
        <select class="form-select" aria-label="level-select">
            <option value="0" selected>Уровень 1</option>
            <option value="1">Уровень 2</option>
            <option value="2">Уровень 3</option>
            <option value="3">Уровень 4</option>
            <option value="4">Уровень 5</option>
            <option value="5">Уровень 6</option>
        </select>  
        </div>
        <div class="modal-body"> 
        <button type="button" class="btn btn-success new-game" data-action="start">Играть</button>
        </div>
    </div>
  `;
    document.querySelector('.sprint-container').append(modal);
    removeModal(modal);
    const start = document.querySelector('[data-action="start"]');
    wordsState.page = Math.floor(Math.random() * 29);
    start.addEventListener('click', () => {
        wordsState.group = +select.value;
        modal.remove();
        startGame();
    });
    const select = document.querySelector('.form-select') as HTMLSelectElement;
};
