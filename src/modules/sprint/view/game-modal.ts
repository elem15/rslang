import { Router } from '../../../types/router-types';
import { renderPage } from '../../router/services/router';
import { renderSprintPage } from './sprint-page';

export const removeModal = (modal: HTMLElement) => {
    const close = document.querySelector('.btn-close');
    const closeButtons = [modal, close] as HTMLButtonElement[];
    closeButtons.map((close: HTMLButtonElement) => {
        close.addEventListener('click', () => {
            modal.remove();
            close.removeEventListener('click', () => true);
        });
    });
    // secondary.addEventListener('click', () => {
    //     modal.remove();
    //     const mainLink = document.querySelector(`.${Router.MAIN}`) as HTMLButtonElement;
    //     localStorage.setItem('router', Router.MAIN);
    //     renderPage(Router.MAIN, mainLink);
    // });
    const modalDialog = document.querySelector('.modal-dialog');
    modalDialog.addEventListener('click', (e) => {
        e.stopPropagation();
    });
};

export const gameModal = () => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.style.backgroundColor = 'rgba(100,100,100,0.3)';
    modal.innerHTML = `
    <div class="modal-dialog" id="game-modal-dialog">
        <div class="modal-content">
        <div class="modal-header" id="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"></h5>
            <button type="button" class="btn-close sprint-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body"></div>
    </div>
  `;
    document.querySelector('.sprint-container').append(modal);
    // removeModal(modal);
};
