export const showManual = (): void => {
    const game = document.querySelector('.game') as HTMLElement;
    const container = document.createElement('div');

    container.className = 'game__manual';
    container.innerHTML = `<p>Выберите верный вариант перевода из предложенных слов,
    используя клавишы <b>1</b>, <b>2</b>, <b>3</b>, <b>4</b>, <b>5</b>.<p>
    <p><strong>Space</strong>, чтобы воспроизвести слово, <strong>Enter</strong> для перехода
    к следующему слову, либо просто используйте мышку.</p>`;
    game.prepend(container);
};
