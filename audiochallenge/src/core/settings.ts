import { GameLevel } from '../types';

export const host = `http://localhost:3001/`;
export const soundIcon = `<svg class="sound" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>`;

export const levels: GameLevel[] = [
    {
        group: 0,
        color: 'rgb(242, 105, 92)',
    },
    {
        group: 1,
        color: 'rgb(242, 166, 99)',
    },
    {
        group: 2,
        color: 'rgb(250, 170, 186)',
    },
    {
        group: 3,
        color: 'rgb(136, 191, 176)',
    },
    {
        group: 4,
        color: 'rgb(96, 164, 191)',
    },
    {
        group: 5,
        color: 'rgb(89, 72, 77)',
    },
];
