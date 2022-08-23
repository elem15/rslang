export const renderErrorMessage = (message: string) => {
    const oldErrorMessage = document.querySelector('.text-danger');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'text-danger';
    errorMessage.innerText = message;
    const button = document.querySelector('.sign-action');
    if (button && !oldErrorMessage) button.before(errorMessage);
};
