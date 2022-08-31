export const toolbar = (
    closeHandler: CallableFunction,
    controls?: HTMLElement[],
    parent?: HTMLElement
): HTMLElement => {
    const container = document.createElement('div') as HTMLElement;
    const close = document.createElement('button');
    close.addEventListener('click', () => {
        showDialog(closeHandler);
    });

    close.classList.add('btn-close', 'game__close', 'bg-info');
    container.classList.add('game__toolbar', 'container');

    if (controls) container.append(...controls);
    if (parent) parent.append(container);
    container.append(close);

    return container;
};

const closeDialog = (dialog: HTMLElement, close = false, closeHandler?: CallableFunction): void => {
    dialog.classList.remove('show');
    setTimeout(
        (close: boolean) => {
            document.body.removeChild(dialog);
            if (close) closeHandler();
        },
        200,
        close
    );
};

const showDialog = (closeHandler: CallableFunction) => {
    const dialog = document.createElement('div');
    dialog.classList.add('game__dialog_continue');
    dialog.innerHTML = `<div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center">Завершить игру</h5>
        </div>
        <div class="modal-body">
          <button class="btn btn-primary btn-continue-game">Продолжить</button>
          <button class="btn btn-danger btn-close-game">Завершить</button>
        </div>
      </div>
    </div>`;

    const closeBtn = dialog.querySelector('.btn-close-game') as HTMLElement;
    const continueBtn = dialog.querySelector('.btn-continue-game') as HTMLElement;

    closeBtn.addEventListener('click', () => {
        closeDialog(dialog, true, closeHandler);
    });
    continueBtn.addEventListener('click', () => {
        closeDialog(dialog);
    });

    dialog.classList.add('modal', 'fade');
    dialog.style.display = 'block';

    setTimeout(() => {
        dialog.classList.add('show');
    }, 200);

    document.body.append(dialog);
};
