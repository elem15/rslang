import { soundIcon } from '../core/settings';
import { Word } from '../types';

const closeResult = (modal: HTMLElement) => {
    modal.classList.remove('show');
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 200);
};

export const showResult = (correct: Word[], incorrect: Word[]) => {
    const modal = document.createElement('div') as HTMLElement;
    const dialog = document.createElement('div') as HTMLElement;
    const content = document.createElement('div') as HTMLElement;
    const body = document.createElement('div') as HTMLElement;

    modal.classList.add('modal', 'fade');
    modal.style.display = 'block';
    dialog.classList.add('modal-dialog', 'modal-dialog-centered', 'modal-dialog-scrollable');
    content.classList.add('modal-content');
    body.classList.add('modal-body');

    content.insertAdjacentHTML(
        'afterbegin',
        `<div class="modal-header">
        <h5 class="modal-title">Result</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>`
    );

    body.innerHTML += `<ul class='correct__answers'>
        ${correct
            .map(
                (word) =>
                    `<li class="correct__answers_item"><span>${soundIcon}</span><span>${word.word}</span><span>${word.wordTranslate}</span></li>`
            )
            .join('')}
    </ul>`;
    body.innerHTML += `<ul class="incorrect__answers">
        ${incorrect
            .map(
                (word) =>
                    `<li class="incorrect__answers_item"><span>${soundIcon}</span><span>${word.word}</span><span>${word.wordTranslate}</span></li>`
            )
            .join('')}
     </ul>`;

    content.append(body);
    dialog.append(content);
    modal.append(dialog);

    const close = content.querySelector('.btn-close') as HTMLButtonElement;
    setTimeout(() => modal.classList.add('show'), 200);

    close.addEventListener('click', () => {
        closeResult(modal);
    });

    document.body.append(modal);
};
