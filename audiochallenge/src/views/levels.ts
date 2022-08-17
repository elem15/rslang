import { GameLevel, TSelectHandler } from '../types';
import { levels } from '../core/settings';

const drawLevelItem = async (level: GameLevel, list: HTMLElement, handler: TSelectHandler): Promise<void> => {
    const { group, color } = level;

    const button = document.createElement('button') as HTMLButtonElement;
    const span = document.createElement('span') as HTMLSpanElement;

    button.classList.add('words__level');
    button.dataset.group = `${group}`;
    button.style.backgroundColor = color;
    span.classList.add('words__level_item');
    span.innerText = `${level.group + 1}`;
    button.addEventListener('click', () => handler(group));
    button.append(span);

    list.append(button);
};

export const drawlevels = async (container: HTMLElement, hadler: TSelectHandler): Promise<void> => {
    const heading = document.createElement('h3') as HTMLElement;
    const list = document.createElement('div');

    heading.innerText = 'Select the level';
    heading.className = 'game__heading';
    list.className = 'game__levels';
    levels.forEach((level) => {
        drawLevelItem(level, list, hadler);
    });

    container.append(heading, list);
};
