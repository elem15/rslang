export const renderGame1Page = () => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    const game1 = document.createElement('section');
    game1.className = 'game-1';
    game1.innerHTML = 'Game N1 page';
    root.append(game1);
};
