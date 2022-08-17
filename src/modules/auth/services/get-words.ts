import { renderWordsList } from '../view/words-list';

export const getWords = (): void => {
    const getUserWordsButton = document.querySelector('.get-user-words') as HTMLButtonElement;
    getUserWordsButton.addEventListener('click', () => {
        renderWordsList();
    });
};
