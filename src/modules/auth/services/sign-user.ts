import { getUserWords } from '../controllers/get-user-words';
import { removeUserSymbol, renderSign, renderSignOut } from '../view/sign-modal';

const isUserAuth = async () => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
        const words = await getUserWords(data.userId, data.token);
        if (words) return true;
    }
    return false;
};
const setUserStatus = async () => {
    if (await isUserAuth()) return;
    localStorage.clear();
    removeUserSymbol();
};
export const signUser = async () => {
    await setUserStatus();
    const signUpButton = document.querySelector('.sign-up') as HTMLButtonElement;
    signUpButton.addEventListener('click', () => {
        renderSign('sign up');
    });
    const signInButton = document.querySelector('.sign-in') as HTMLButtonElement;
    signInButton.addEventListener('click', () => {
        renderSign('sign in');
    });
    const signOutButton = document.querySelector('.sign-out') as HTMLButtonElement;
    signOutButton.addEventListener('click', () => {
        renderSignOut();
    });
};
