import '../scss/styles.scss';
import img from '../../../images/DSC02301.jpg';

export const renderMainPage = () => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    const main = document.createElement('section');
    main.className = 'main';
    main.innerHTML = '<div class="main-content">Main page</div>';
    root.append(main);
    const background = document.createElement('div');
    background.innerHTML = `
        <img class="background" src=${img}> 
    `;
    main.append(background);
};
