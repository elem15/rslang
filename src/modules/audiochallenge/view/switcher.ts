import { noteIcon } from '../core/settings';

export const mute = (): HTMLElement => {
    const switchControl = document.createElement('div') as HTMLElement;
    const state = JSON.parse(localStorage.getItem('mute'));

    switchControl.classList.add('game__mute');
    switchControl.innerHTML = `<span>${noteIcon}</span>`;

    if (state) switchControl.classList.add('game__mute_on');

    switchControl.addEventListener('click', () => {
        switchControl.classList.toggle('game__mute_on');
        localStorage.setItem('mute', JSON.stringify(switchControl.classList.contains('game__mute_on')));
    });

    return switchControl;
};
