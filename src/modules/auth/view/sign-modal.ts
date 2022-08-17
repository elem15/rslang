import { createUser } from '../controllers/create-user';
import { logIn } from '../controllers/log-in';

export const renderSign = async (signAction: string): Promise<void> => {
    const oldModal = document.querySelector('.modal') as HTMLFormElement;
    if (oldModal) oldModal.remove();
    const modal = document.createElement('form') as HTMLFormElement;
    modal.className = 'modal';
    modal.innerHTML = `
    <input type="email" name="email" placeholder="email">
    <input type="password" name="password" placeholder="password">
    <button>${signAction}</button>
    `;
    modal.addEventListener(
        'submit',
        async (e): Promise<void> => {
            e.preventDefault();
            const errorMessage = document.querySelector('.error');
            if (errorMessage) errorMessage.remove();
            const response =
                signAction === 'sign up'
                    ? await createUser({ email: modal.email.value, password: modal.password.value })
                    : await logIn({ email: modal.email.value, password: modal.password.value });
            if (response) {
                modal.remove();
                const message = signAction === 'sign up' ? 'New user successfully register' : 'Уou are logged in';
                alert(message);
            }
        }
    );
    document.body.append(modal);
};

export const renderSignOut = () => {
    localStorage.clear();
    console.log(localStorage.getItem('data'));
    alert('You are logged out');
};
