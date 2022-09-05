import { Router } from '../../../types/router-types';
import { renderPage } from '../../router/services/router';

const closeDialog = (dialog: HTMLElement): void => {
    dialog.classList.remove('show');
    setTimeout(() => {
        document.body.removeChild(dialog);
        localStorage.setItem('router', Router.MAIN);
        renderPage(Router.MAIN);
    }, 200);
};

export const endOfGame = (): void => {
    const dialog = document.createElement('div');
    dialog.classList.add('game__dialog_continue');
    dialog.innerHTML = `<div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center">Игра окончена</h5>
        </div>
        <div class="modal-body text-center">
        <h6 class="p-4">На предыдущих страницах отсутствуют слова для изучения!</h6>
          <button class="btn btn-danger btn-close-game">Завершить</button>
        </div>
      </div>
    </div>`;

    const closeBtn = dialog.querySelector('.btn-close-game') as HTMLElement;
    closeBtn.addEventListener('click', () => {
        closeDialog(dialog);
    });

    dialog.classList.add('modal', 'fade');
    dialog.style.display = 'block';

    setTimeout(() => {
        dialog.classList.add('show');
    }, 200);

    document.body.append(dialog);
};
