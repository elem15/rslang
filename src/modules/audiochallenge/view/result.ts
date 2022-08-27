import { soundIcon } from '../core/settings';
import { Word } from '../../../types';
import { host } from '../../auth/controllers/hosts';
import result from '../assets/images/result.svg';

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

const makeListOfWords = (collection: Word[], type: string): HTMLElement[] => {
    return collection.map((word) => {
        const li = document.createElement('li') as HTMLLIElement;
        li.classList.add(`${type}__answers_item`);
        li.innerHTML = `<span class="audio" data-audio="${word.audio}">${soundIcon}</span><span class="word">${word.word}</span><span class="translate">&nbsp;-&nbsp;${word.wordTranslate}</span>`;
        return li;
    });
};

const getBody = (correct: Word[], incorrect: Word[], inRow: number): HTMLElement => {
    const body = document.createElement('div') as HTMLElement;
    const statistic = document.createElement('ul') as HTMLUListElement;
    const right = document.createElement('ul') as HTMLUListElement;
    const wrong = document.createElement('ul') as HTMLUListElement;
    const rightParagraph = document.createElement('p') as HTMLElement;
    const wrongParagraph = document.createElement('p') as HTMLElement;
    const statisticSection = document.createElement('div');

    const rightQty = correct.length;
    const wrongQty = incorrect.length;

    body.classList.add('modal-body');
    statisticSection.classList.add('statistics__section');
    statistic.classList.add('game__statistic');
    right.classList.add('correct__answers');
    wrong.classList.add('incorrect__answers');
    rightParagraph.classList.add('h6', 'text-muted');
    wrongParagraph.classList.add('h6', 'text-muted');

    statistic.innerHTML = `
        <li class="game__statistic__item">In row<span class="badge bg-warning">${inRow}</span></li>
        <li class="game__statistic__item">Correct<span class="badge bg-success">${rightQty}</span></li>
        <li class="game__statistic__item">Wrong<span class="badge bg-danger">${wrongQty}</span></li>
    `;

    rightParagraph.innerHTML = `Correct&nbsp;<span class="badge bg-success text-light">${rightQty}</span>`;
    wrongParagraph.innerHTML = `Mistakes&nbsp;<span class="badge bg-danger text-light">${wrongQty}</span>`;

    right.append(...makeListOfWords(correct, 'correct'));
    wrong.append(...makeListOfWords(incorrect, 'incorrect'));
    const percentage = Math.ceil((correct.length / 20) * 100);

    statisticSection.innerHTML = result;
    (statisticSection.querySelector('.percentage') as SVGTextElement).textContent = `${percentage}%`;
    statisticSection.querySelector('.circle-bg')?.setAttribute('stroke-dasharray', `${percentage} ,100`);
    statisticSection.querySelector('.circle')?.setAttribute('stroke-dasharray', `${percentage} ,100`);
    statisticSection.appendChild(statistic);

    body.append(statisticSection, rightParagraph, right, wrongParagraph, wrong);

    return body;
};

export const showResult = (correct: Word[], incorrect: Word[], inRow: number, handler: CallableFunction) => {
    const modal = document.createElement('div') as HTMLElement;
    const dialog = document.createElement('div') as HTMLElement;
    const content = document.createElement('div') as HTMLElement;
    const footer = document.createElement('div') as HTMLElement;
    const playAgain = document.createElement('button') as HTMLButtonElement;
    const body = getBody(correct, incorrect, inRow);

    playAgain.addEventListener('click', () => {
        closeResult(modal);
        setTimeout(() => handler(), 200);
    });

    modal.classList.add('modal', 'fade');
    modal.style.display = 'block';

    dialog.classList.add('modal-dialog', 'modal-dialog-centered', 'modal-dialog-scrollable');

    content.classList.add('modal-content');

    playAgain.innerText = 'Restart';
    playAgain.classList.add('btn', 'btn-primary', 'btn-restart');
    footer.classList.add('modal-footer');

    content.insertAdjacentHTML(
        'afterbegin',
        `<div class="modal-header">
        <h5 class="modal-title">Result</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
        </button>
        </div>`
    );

    footer.appendChild(playAgain);
    content.append(body, footer);
    dialog.appendChild(content);
    modal.append(dialog);

    body.querySelectorAll('.audio').forEach((el) => {
        (el as HTMLElement).addEventListener('click', playAudio);
    });

    const close = content.querySelector('.btn-close') as HTMLButtonElement;
    setTimeout(() => {
        modal.classList.add('show');
    }, 200);

    close.addEventListener('click', () => {
        closeResult(modal);
    });

    document.body.append(modal);
};
