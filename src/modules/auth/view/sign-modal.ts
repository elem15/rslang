import { renderPage } from '../../router/services/router';
import { createUser } from '../controllers/create-user';
import { logIn } from '../controllers/log-in';
import { messageModal, removeModal } from './message-modal';

export const addUserSymbol = (email: string) => {
    const userSymbol = document.querySelector('.user') as HTMLSpanElement;
    userSymbol.classList.add('logged');
    userSymbol.innerText = email[0].toUpperCase();
    localStorage.setItem('email', email);
};
export const removeUserSymbol = () => {
    const userSymbol = document.querySelector('.user') as HTMLSpanElement;
    userSymbol.classList.remove('logged');
    userSymbol.innerText = '_';
};
export const renderSign = async (signAction: string): Promise<void> => {
    const modal = document.createElement('div') as HTMLElement;
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.style.backgroundColor = 'rgba(100,100,100,0.3)';
    modal.innerHTML = `
    <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <form>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" name="email" autocomplete="current-email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" name="password" minlength="8" class="form-control" id="exampleInputPassword1" autocomplete="current-password" >
        </div>
        <button type="submit" class="btn btn-primary sign-action">${signAction}</button>
    </form>  
    </div>
    </div>
    </div>
    `;
    document.body.append(modal);
    const form = document.querySelector('form');
    form.addEventListener(
        'submit',
        async (e): Promise<void> => {
            e.preventDefault();
            const errorMessage = document.querySelector('.error');
            if (errorMessage) errorMessage.remove();
            const email = form.email.value;
            const password = form.password.value;
            const response =
                signAction === 'sign up' ? await createUser({ email, password }) : await logIn({ email, password });
            if (response) {
                modal.remove();
                const message = signAction === 'sign up' ? 'New user successfully register' : 'Уou are logged in';
                if (signAction === 'sign up') {
                    removeUserSymbol();
                    localStorage.clear();
                    messageModal(message);
                }
                if (signAction === 'sign in') addUserSymbol(email);
            }
            renderPage(null, null);
        }
    );
    removeModal(modal);
};

export const renderSignOut = () => {
    localStorage.clear();
    messageModal('You are logged out');
    removeUserSymbol();
    renderPage(null, null);
};
