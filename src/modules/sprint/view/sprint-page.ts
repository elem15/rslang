import { removeFooter } from '../../main/view/main-page';
import { renderCounter } from './render-counter';

export const renderSprintPage = async () => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    removeFooter();
    const sprint = document.createElement('section');
    sprint.className = 'sprint container';
    sprint.innerHTML = 'Game SPRINT';
    root.append(sprint);
    sprint.insertAdjacentElement('beforeend', await renderCounter());
};
