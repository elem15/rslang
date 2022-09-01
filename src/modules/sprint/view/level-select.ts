import { wordsState } from '../services/words-state';
import { removeModal } from './game-modal';
import { startGame } from './sprint-page';

export const levelSelectRender = () => {
    wordsState.data = null;
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.style.backgroundColor = 'rgba(100,100,100,0.3)';
    modal.innerHTML = `
    <div class="modal-dialog" id="game-modal-dialog">
        <div class="modal-content">
        <div class="modal-header" id="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Выберите уровень сложности</h5>
            <button type="button" class="btn-close sprint-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
