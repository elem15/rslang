import { Router } from '../../../types/router-types';
import { renderWordsList } from '../view/words-list';

export const getWords = (): void => {
    const getUserWordsButton = document.querySelector(`.${Router.DICTIONARY}`) as HTMLButtonElement;
    getUserWordsButton.addEventListener('click', () => {
        renderWordsList();
    });
};
