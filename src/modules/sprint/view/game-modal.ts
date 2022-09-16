export const gameModal = () => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.style.backgroundColor = 'rgba(100,100,100,0)';
    modal.style.marginTop = '17vh';
    modal.innerHTML = `
    <div class="modal-dialog" id="game-modal-dialog">
    <div class="parrots-card"></div>
        <div class="modal-content">
        <div class="modal-header" id="modal-header">
        <h5 class="modal-title" id="example-modal-label"></h5>            
        <button type="button" class="btn-close sprint-close" data-bs-dismiss="modal" aria-label="Close"></button>        
        </div>
            <div class="game-checks">
                <div class="check-1 game-check">░░</div>
                <div class="check-2 game-check">░░</div>
                <div class="check-3 game-check">░░</div>
            </div>
        <div class="modal-body"></div>
    </div>
  `;
    const container = document.querySelector('.sprint-container');
    if (container) container.append(modal);
};
