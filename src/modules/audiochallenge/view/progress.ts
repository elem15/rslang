export const progress = (): HTMLElement[] => {
    return Array(20)
        .fill('')
        .map((_, index) => {
            const span = document.createElement('span');
            span.classList.add('game__progress_item');
            span.dataset.count = `${index}`;
            return span;
        });
};
