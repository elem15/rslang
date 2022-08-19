export const renderMainPage = () => {
    const root = document.querySelector('.root');
    while (root.lastChild) root.lastChild.remove();
    const main = document.createElement('section');
    main.className = 'main';
    main.innerHTML = 'Main page';
    root.append(main);
};
