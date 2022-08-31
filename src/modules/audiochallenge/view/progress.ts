export const progress = (length = 20): HTMLElement[] => {
    return Array(length)
        .fill('')
        .map((_, index) => {
            const span = document.createElement('span');
            span.classList.add('game__progress_item');
            span.dataset.count = `${index}`;
            return span;
        });
};
