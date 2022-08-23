import { renderSign, renderSignOut } from '../view/sign-modal';

export const signUser = (): void => {
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
