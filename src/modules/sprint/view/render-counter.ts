import { Router } from '../../../types/router-types';
import { renderPage } from '../../router/services/router';
import { messageModal } from './message-modal';

export function renderCounter() {
    const counter = document.createElement('div');
    counter.className = 'counter';
    counter.innerHTML = '0';
    let i = 0;
    const header = document.querySelector('header');
    const links = header.querySelectorAll('button');
    const interval = setInterval(() => {
        i++;
        counter.innerHTML = '' + i;
        if (i >= 15) {
            clearInterval(interval);
            messageModal('Игра закончена');
            links.forEach((link: HTMLButtonElement) => (link.disabled = false));
        }
    }, 1000);
    document
        .querySelector('.sprint-container')
        .insertAdjacentHTML(
            'afterbegin',
            `<button type="button" class="btn-close sprint-close" data-bs-dismiss="modal" aria-label="Close"></button>`
        );
    document.querySelector('.sprint-close').addEventListener('click', () => {
        clearInterval(interval);
        const mainLink = document.querySelector(`.${Router.MAIN}`) as HTMLButtonElement;
        localStorage.setItem('router', Router.MAIN);
        renderPage(Router.MAIN, mainLink);
        links.forEach((link: HTMLButtonElement) => (link.disabled = false));
    });
    return counter;
}
// export class Counter {
//     counter: HTMLElement;
//     i: number;
//     interval: NodeJS.Timer;
//     constructor() {
//         this.counter = document.createElement('div');
//         this.counter.classList.add('counter');
//         this.counter.innerHTML = '0';
//         this.i = 0;
//         this.interval = setInterval(() => {
//             this.i++;
//             this.counter.innerHTML = '' + this.i;
//             if (this.i >= 5) {
//                 clearInterval(this.interval);
//                 messageModal('Игра закончена');
//             }
//         }, 1000);
//     }
// }
