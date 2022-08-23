import { draw, drawPageDifficultWords, drawPageNav, pageLearned } from './draw';
const quantityPages = 29;

export const pagination = () => {
    const btnLeft = document.querySelector('.page-item__previous') as HTMLLIElement;
    const btnRight = document.querySelector('.page-item__next') as HTMLLIElement;
    const pagination = document.querySelector('.pagination') as HTMLUListElement;
    const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
    const pageTextbook = document.querySelector('.form-select.page') as HTMLSelectElement;

    groupTextbook.addEventListener('change', () => {
        if (Number(groupTextbook.value) < 6) {
            draw(Number(pageTextbook.value), Number(groupTextbook.value));
            drawPageNav(Number(pageTextbook.value), Number(groupTextbook.value), pageLearned);
            pagination.style.display = 'flex';
        }
        if (Number(groupTextbook.value) === 6) {
            drawPageDifficultWords();
            pagination.style.display = 'none';
        }
    });

    pageTextbook.addEventListener('change', () => {
        const currentPage = pageTextbook.selectedIndex;
        const currentGroup = groupTextbook.selectedIndex;
        draw(Number(pageTextbook.value), currentGroup);
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

    const moveLeft = () => {
        let currentPage = pageTextbook.selectedIndex;
        const currentGroup = groupTextbook.selectedIndex;
        if (currentPage !== 0) {
            currentPage--;
            pageTextbook.options[currentPage].selected = true;
            draw(currentPage, currentGroup);
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

    btnLeft.addEventListener('click', () => moveLeft());

    const moveRight = () => {
        let currentPage = pageTextbook.selectedIndex;
        const currentGroup = groupTextbook.selectedIndex;
        currentPage++;
        pageTextbook.options[currentPage].selected = true;
        draw(currentPage, currentGroup);
        if (currentPage === quantityPages) {
            btnRight.classList.add('disabled');
        }
        if (currentPage === 1) {
            btnLeft.classList.remove('disabled');
        }
        const root = document.querySelectorAll('audio');
        root.forEach((el) => el.remove());
    };

    btnRight.addEventListener('click', () => moveRight());
};
