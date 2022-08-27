import '../assets/style/textbook.css';
import '../assets/style/textbook.scss';
import { drawTextbook } from './draw';
import { pageLearnedPagesGroup } from '../../../types/textbook-types';

export const startTextbook = (isAuthorization: boolean, isReload: boolean) => {
    let pageTextbookFromLocaleStorage = 0;
    let groupTextbookFromLocaleStorage = 0;
    let pageLearnedFromLocaleStorage: pageLearnedPagesGroup[] = [];
    if (!isReload) {
        drawTextbook(
            pageTextbookFromLocaleStorage,
            groupTextbookFromLocaleStorage,
            pageLearnedFromLocaleStorage,
            isAuthorization
        );
    }

    if ((window.performance.getEntries()[0] as PerformanceNavigationTiming).type === 'reload') {
        const setLocalStorage = function setLocalStorage() {
            const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
            const pageTextbook = document.querySelector('.form-select.page') as HTMLSelectElement;
            const currentPage = pageTextbook.selectedIndex;
            const currentGroup = groupTextbook.selectedIndex;
            localStorage.setItem('currentPageGroup', JSON.stringify({ page: currentPage, group: currentGroup }));
        };
        window.addEventListener('beforeunload', () => setLocalStorage());

        const getLocalStorage = function () {
            if (localStorage.getItem('currentPageGroup')) {
                const currentPageGroupJSON = localStorage.getItem('currentPageGroup');
                const currentPageGroup = JSON.parse(currentPageGroupJSON);
                pageTextbookFromLocaleStorage = currentPageGroup.page < 0 ? 0 : currentPageGroup.page;
                groupTextbookFromLocaleStorage = currentPageGroup.group < 0 ? 0 : currentPageGroup.group;
            }
            if (localStorage.getItem('pageLearned')) {
                const pageLearnedJSON = localStorage.getItem('pageLearned');
                pageLearnedFromLocaleStorage = JSON.parse(pageLearnedJSON);
            }
            drawTextbook(
                pageTextbookFromLocaleStorage,
                groupTextbookFromLocaleStorage,
                pageLearnedFromLocaleStorage,
                isAuthorization
            );
        };
        window.addEventListener('load', getLocalStorage);
    } else if (isReload) {
        drawTextbook(
            pageTextbookFromLocaleStorage,
            groupTextbookFromLocaleStorage,
            pageLearnedFromLocaleStorage,
            isAuthorization
        );
    }
};
