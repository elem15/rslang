import './global.css';
import './global.scss';
import { drawTextbook, pageLearnedPagesChapter } from './modules/view/draw';

let pageTextbookFromLocaleStorage = 0;
let chapterTextbookFromLocaleStorage = 0;
let pageLearnedFromLocaleStorage: pageLearnedPagesChapter[] = [];

function setLocalStorage() {
    const chapterTextbook = document.querySelector('.form-select.chapter') as HTMLSelectElement;
    const pageTextbook = document.querySelector('.form-select.page') as HTMLSelectElement;
    const currentPage = pageTextbook.selectedIndex;
    const currentChapter = chapterTextbook.selectedIndex;
    localStorage.setItem('currentPageChapter', JSON.stringify({ page: currentPage, chapter: currentChapter }));
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('currentPageChapter')) {
        const currentPageChapterJSON = localStorage.getItem('currentPageChapter');
        const currentPageChapter = JSON.parse(currentPageChapterJSON as string);
        pageTextbookFromLocaleStorage = currentPageChapter.page;
        chapterTextbookFromLocaleStorage = currentPageChapter.chapter;
        console.log(currentPageChapter);
    }
    if (localStorage.getItem('pageLearned')) {
        const pageLearnedJSON = localStorage.getItem('pageLearned');
        pageLearnedFromLocaleStorage = JSON.parse(pageLearnedJSON as string);
        console.log(pageLearnedFromLocaleStorage);
    }
    drawTextbook(pageTextbookFromLocaleStorage, chapterTextbookFromLocaleStorage, pageLearnedFromLocaleStorage);
}

window.addEventListener('load', getLocalStorage);
