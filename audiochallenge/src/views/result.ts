import { host, soundIcon } from '../core/settings';
import { Word } from '../types';

const playAudio = async (e: MouseEvent): Promise<void> => {
    let target = e.target as HTMLElement;
    target = target.closest('.audio') as HTMLElement;
    const path = target.dataset.audio;
    const audio = new Audio(`${host}${path}`);
    await audio.play();
};

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
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        `
    );

    body.innerHTML += `<ul class="game__statistic">
    <li class="game__statistic_item"><div><span class="series__mark"></span><span>In row</span><span>${0}</span></div></li>
    <li class="game__statistic_item"><div><span class="right__mark"></span><span>Right answers</span><span>${
        correct.length
    }</span></div></li>
    <li class="game__statistic_item"><div><span class="mistakes__mark"></span><span>Mistakes</span><span>${
        incorrect.length
    }</span></div></li>
    </ul>`;
    body.innerHTML += `<p class="h6 text-muted">Correct&nbsp;<span class="badge bg-success text-light">${correct.length}</span></p>`;
    body.innerHTML += `<ul class='correct__answers'>
        ${correct
            .map(
                (word) =>
                    `<li class="correct__answers_item"><span class="audio" data-audio="${word.audio}">${soundIcon}</span><span class="word">${word.word}</span><span class="translate">&nbsp;-&nbsp;${word.wordTranslate}</span></li>`
            )
            .join('')}
    </ul>`;
    body.innerHTML += `<p class="h6 text-muted">Mistakes&nbsp;<span class="badge bg-danger text-light">${incorrect.length}</span></p>`;
    body.innerHTML += `<ul class="incorrect__answers">
        ${incorrect
            .map(
                (word) =>
                    `<li class="incorrect__answers_item"><span class="audio" data-audio="${word.audio}">${soundIcon}</span><span class="word">${word.word}</span><span class="translate">&nbsp;-&nbsp;${word.wordTranslate}</span></li>`
            )
            .join('')}
     </ul>`;

    content.append(body);
    dialog.append(content);
    modal.append(dialog);

    body.querySelectorAll('.audio').forEach((el) => {
        (el as HTMLElement).addEventListener('click', playAudio);
    });

    const close = content.querySelector('.close') as HTMLButtonElement;
    setTimeout(() => modal.classList.add('show'), 200);

    close.addEventListener('click', () => {
        closeResult(modal);
    });

    document.body.append(modal);
};
