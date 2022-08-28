import { Router } from '../../../types/router-types';
import { renderPage } from '../../router/services/router';
import { renderSprintPage } from './sprint-page';

export const removeModal = (modal: HTMLElement) => {
    const close = document.querySelector('.btn-close');
    const primary = document.querySelector('.new-game') as HTMLButtonElement;
    const secondary = document.querySelector('.to-main-page');
    const closeButtons = [modal, close, primary] as HTMLButtonElement[];
    closeButtons.map((close: HTMLButtonElement) => {
        close.addEventListener('click', () => {
            modal.remove();
            close.removeEventListener('click', () => true);
            renderSprintPage();
        });
    });
    secondary.addEventListener('click', () => {
        modal.remove();
        const mainLink = document.querySelector(`.${Router.MAIN}`) as HTMLButtonElement;
        localStorage.setItem('router', Router.MAIN);
        renderPage(Router.MAIN, mainLink);
    });
    const modalDialog = document.querySelector('.modal-dialog');
    modalDialog.addEventListener('click', (e) => {
        e.stopPropagation();
    });
};

export const messageModal = (message: string) => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.style.backgroundColor = 'rgba(100,100,100,0.3)';
    modal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            ${message}
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-primary new-game">Играть еще</button>
        <button type="button" class="btn btn-secondary to-main-page" data-dismiss="modal">На главную</button>
        </div>
    </div>
  `;
    document.querySelector('.sprint-container').append(modal);
    removeModal(modal);
};
