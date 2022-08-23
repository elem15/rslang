export const addAllLearnedMessage = (countHardAndLearnedWords: number) => {
    if (countHardAndLearnedWords === 20) {
        (document.querySelector('.wrapper') as HTMLDivElement).style.backgroundColor = 'darkcyan';
    } else {
        (document.querySelector('.wrapper') as HTMLDivElement).style.backgroundColor = 'inherit';
    }
};
