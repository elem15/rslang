export const renderErrorMessage = (message: string) => {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'text-danger';
    errorMessage.innerText = message;
    const modal = document.querySelector('.sign-action');
    if (modal) modal.before(errorMessage);
};
