import { removeFooter } from '../../main/view/main-page';

export const renderSprintPage = () => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    removeFooter();
    const sprint = document.createElement('section');
    sprint.className = 'sprint';
    sprint.innerHTML = 'Game SPRINT';
    root.append(sprint);
};
