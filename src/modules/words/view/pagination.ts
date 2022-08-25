import { draw, drawPageDifficultWords, drawPageNav, pageLearned } from './draw';
const quantityPages = 29;
const groupHardWordsNumber = 6;

export const pagination = (isAuthorization: boolean) => {
    const btnLeft = document.querySelector('.page-item__previous') as HTMLLIElement;
    const btnRight = document.querySelector('.page-item__next') as HTMLLIElement;
    const pagination = document.querySelector('.pagination') as HTMLUListElement;
    const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
    const pageTextbook = document.querySelector('.form-select.page') as HTMLSelectElement;

    groupTextbook.addEventListener('change', () => {
        if (Number(groupTextbook.value) < groupHardWordsNumber) {
            draw(Number(pageTextbook.value), Number(groupTextbook.value), isAuthorization);
            drawPageNav(Number(pageTextbook.value), Number(groupTextbook.value), pageLearned, isAuthorization);
            pagination.style.display = 'flex';
        }
        if (Number(groupTextbook.value) === groupHardWordsNumber) {
            drawPageDifficultWords(isAuthorization);
            pagination.style.display = 'none';
        }
    });

    if (Number(groupTextbook.value) !== groupHardWordsNumber) {
        pageTextbook.addEventListener('change', () => {
            const currentPage = pageTextbook.selectedIndex;
            const currentGroup = groupTextbook.selectedIndex;
            draw(Number(pageTextbook.value), currentGroup, isAuthorization);
            if (currentPage === quantityPages) {
                btnRight.classList.add('disabled');
            }
            if (currentPage !== quantityPages) {
                btnRight.classList.remove('disabled');
            }
            if (currentPage === 0) {
                btnLeft.classList.add('disabled');
            }
            if (currentPage !== 0) {
                btnLeft.classList.remove('disabled');
            }
        });
    }

    const moveLeft = () => {
        let currentPage = pageTextbook.selectedIndex;
        const currentGroup = groupTextbook.selectedIndex;
        if (currentPage !== 0) {
            currentPage--;
            pageTextbook.options[currentPage].selected = true;
            draw(currentPage, currentGroup, isAuthorization);
        }
        if (currentPage === 0) {
            btnLeft.classList.add('disabled');
        }
        if (currentPage === quantityPages - 1) {
            btnRight.classList.remove('disabled');
        }
        const root = document.querySelectorAll('audio');
        root.forEach((el) => el.remove());
    };

    if (Number(groupTextbook.value) !== groupHardWordsNumber) btnLeft.addEventListener('click', () => moveLeft());

    const moveRight = () => {
        let currentPage = pageTextbook.selectedIndex;
        const currentGroup = groupTextbook.selectedIndex;
        currentPage++;
        pageTextbook.options[currentPage].selected = true;
        draw(currentPage, currentGroup, isAuthorization);
        if (currentPage === quantityPages) {
            btnRight.classList.add('disabled');
        }
        if (currentPage === 1) {
            btnLeft.classList.remove('disabled');
        }
        const root = document.querySelectorAll('audio');
        root.forEach((el) => el.remove());
    };

    if (Number(groupTextbook.value) !== groupHardWordsNumber) btnRight.addEventListener('click', () => moveRight());
};
