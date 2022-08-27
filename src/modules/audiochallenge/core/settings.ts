import { GameLevel } from '../../../types';

export const host = `https://lexi-rs-school.herokuapp.com/`;

export const soundIcon = `<svg class="sound" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>`;
export const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
</svg>`;
export const wrongIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`;
export const statisticCircleGraph = `<svg viewBox="0 0 36 36">
<path
  d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
  fill="none"
  stroke="#444";
  stroke-width="1";
/>
</svg>`;

export const nextDefaultText = 'не знаю';
export const nextNextText = 'следующее';
export const successPath = 'assets/sounds/success.wav';
export const errorPath = 'assets/sounds/error.mp3';
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
