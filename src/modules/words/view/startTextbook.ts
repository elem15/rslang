import '../style/global.css';
import '../style/global.scss';
import { drawTextbook } from './draw';
import { pageLearnedPagesGroup } from '../../../types/textbook-types';

export const startTextbook = (isAuthorization: boolean) => {
    let pageTextbookFromLocaleStorage = 0;
    let groupTextbookFromLocaleStorage = 0;
    let pageLearnedFromLocaleStorage: pageLearnedPagesGroup[] = [];

    function setLocalStorage() {
        const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
        const pageTextbook = document.querySelector('.form-select.page') as HTMLSelectElement;
        const currentPage = pageTextbook.selectedIndex;
        const currentGroup = groupTextbook.selectedIndex;
        localStorage.setItem('currentPageGroup', JSON.stringify({ page: currentPage, group: currentGroup }));
    }

    window.addEventListener('beforeunload', setLocalStorage);

    function getLocalStorage() {
        if (localStorage.getItem('currentPageGroup')) {
            const currentPageGroupJSON = localStorage.getItem('currentPageGroup');
            const currentPageGroup = JSON.parse(currentPageGroupJSON);
            pageTextbookFromLocaleStorage = currentPageGroup.page < 0 ? 0 : currentPageGroup.page;
            groupTextbookFromLocaleStorage = currentPageGroup.group < 0 ? 0 : currentPageGroup.group;
            console.log(currentPageGroup);
        }
        if (localStorage.getItem('pageLearned')) {
            const pageLearnedJSON = localStorage.getItem('pageLearned');
            pageLearnedFromLocaleStorage = JSON.parse(pageLearnedJSON);
            console.log(pageLearnedFromLocaleStorage);
        }
        // return;
        console.log('safasfasfsasfa', Number(groupTextbookFromLocaleStorage));
        drawTextbook(
            pageTextbookFromLocaleStorage,
            groupTextbookFromLocaleStorage,
            pageLearnedFromLocaleStorage,
            isAuthorization
        );
        // btnTextbook.addEventListener('click', getLocalStorage);
    }
    // console.log('1', isAuthorization, pageTextbookFromLocaleStorage);
    window.addEventListener('load', getLocalStorage);

    // const btnTextbook = document.querySelector('.nav-link.dictionary') as HTMLLIElement;
    console.log('safasfasfsasfa', Number(groupTextbookFromLocaleStorage));
    // btnTextbook.removeEventListener('click', getLocalStorage);
    drawTextbook(
        pageTextbookFromLocaleStorage,
        groupTextbookFromLocaleStorage,
        pageLearnedFromLocaleStorage,
        isAuthorization
    );

    // return;
    console.log('2');

    // const btnTextbook = document.querySelector('.nav-link.dictionary') as HTMLLIElement;

    // if (!JSON.parse(sessionStorage.getItem('is_reloaded')))
    //     drawTextbook(
    //         pageTextbookFromLocaleStorage,
    //         groupTextbookFromLocaleStorage,
    //         pageLearnedFromLocaleStorage,
    //         isAuthorization
    //     );
};
