import { noteIcon } from '../core/settings';

export const displaySwitcher = (muteState: boolean): void => {
    const container = document.querySelector('.audio__challenge') as HTMLElement;
    const switchControl = document.createElement('div') as HTMLElement;

    switchControl.classList.add('game__mute');
    switchControl.innerHTML = `<span>${noteIcon}</span>`;

    switchControl.addEventListener('click', () => {
        muteState = !muteState;
        switchControl.classList.toggle('game__mute_on');
    });

    container.append(switchControl);
};
