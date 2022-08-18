export const removeModal = (modal: HTMLElement) => {
    const close = document.querySelector('.btn-close');
    close.addEventListener('click', () => {
        modal.remove();
        close.removeEventListener('click', () => true);
    });
    modal.addEventListener('click', () => {
        modal.remove();
        modal.removeEventListener('click', () => true);
    });
    const modalDialog = document.querySelector('.modal-dialog');
    modalDialog.addEventListener('click', (e) => {
        e.stopPropagation();
    });
};

export const messageModal = (message: string) => {
    const modal = document.createElement('div');
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
            ${message}
        </div>
        </div>
    </div>
  `;
    document.body.append(modal);
    removeModal(modal);
};
