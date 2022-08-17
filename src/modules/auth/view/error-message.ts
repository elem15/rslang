export const renderErrorMessage = (message: string) => {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error';
    errorMessage.innerText = message;
    const modal = document.querySelector('.modal');
    modal.append(errorMessage);
};
