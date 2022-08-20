export const shuffle = <T>(collection: T[]): T[] => {
    const arr = collection.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
};

export const clear = async (container: HTMLElement): Promise<void> => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};
