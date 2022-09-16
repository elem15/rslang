export const progress = (): HTMLElement => {
    const container = document.createElement('div');
    const bar = document.createElement('div');

    container.className = 'progress w-100';
    bar.className = 'progress-bar';
    bar.ariaRoleDescription = 'progressbar';
    container.append(bar);

    return container;
};
