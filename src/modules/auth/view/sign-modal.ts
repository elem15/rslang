import { createUser } from '../controllers/create-user';
import { logIn } from '../controllers/log-in';
import { messageModal, removeModal } from './message-madal';
export const renderSign = async (signAction: string): Promise<void> => {
    const oldModal = document.querySelector('.modal') as HTMLFormElement;
    if (oldModal) oldModal.remove();
    const modal = document.createElement('form') as HTMLFormElement;
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
            <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" name="password" minlength="8" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
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
            const response =
                signAction === 'sign up'
                    ? await createUser({ email: form.email.value, password: form.password.value })
                    : await logIn({ email: form.email.value, password: form.password.value });
            if (response) {
                modal.remove();
                const message = signAction === 'sign up' ? 'New user successfully register' : 'Уou are logged in';
                messageModal(message);
            }
        }
    );
    removeModal(modal);
};

export const renderSignOut = () => {
    localStorage.clear();
    console.log(localStorage.getItem('data'));
    messageModal('You are logged out');
};
