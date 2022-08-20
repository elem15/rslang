import { draw, drawPageDifficultWords } from './draw';
const quantityPages = 29;

export const pagination = () => {
    const btnLeft = document.querySelector('.page-item__previous') as HTMLLIElement;
    const btnRight = document.querySelector('.page-item__next') as HTMLLIElement;
    const pagination = document.querySelector('.pagination') as HTMLUListElement;
    const chapterTextbook = document.querySelector('.form-select.chapter') as HTMLSelectElement;
    const pageTextbook = document.querySelector('.form-select.page') as HTMLSelectElement;

    chapterTextbook.addEventListener('change', () => {
        if (Number(chapterTextbook.value) < 6) {
            draw(Number(pageTextbook.value), Number(chapterTextbook.value));
            pagination.style.display = 'flex';
        }
        if (Number(chapterTextbook.value) === 6) {
            drawPageDifficultWords();
            pagination.style.display = 'none';
        }
    });

    pageTextbook.addEventListener('change', () => {
        const currentPage = pageTextbook.selectedIndex;
        const currentChapter = chapterTextbook.selectedIndex;
        draw(Number(pageTextbook.value), currentChapter);
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
        const currentChapter = chapterTextbook.selectedIndex;
        if (currentPage !== 0) {
            console.log(currentPage);
            currentPage--;
            pageTextbook.options[currentPage].selected = true;
            draw(currentPage, currentChapter);
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
        const currentChapter = chapterTextbook.selectedIndex;
        console.log(currentPage);
        currentPage++;
        pageTextbook.options[currentPage].selected = true;
        draw(currentPage, currentChapter);
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
