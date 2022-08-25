import {
    Dictionary,
    DictionaryHardWord,
    OptionalFromResponse,
    pageLearnedPagesGroup,
    UserWords,
} from '../../../types/textbook-types';
import { audioPlayerListener } from '../services/audio';
import { getAllHardWords, getAllUserWords, getSettings, getWords, updateSettings } from '../services/api';
import { pagination } from './pagination';
import { addLearnedWords, addWordsForHardWordsPage, deleteWordsFromHardWordsPage } from './workWithHardLearnedWords';
import { host } from '../../auth/controllers/hosts';
import { addAllLearnedMessage } from './messageAllLearned';

const groupTextbookColor = ['&#x1f535;', '&#x1f534;', '&#x1f7e0;', '&#x1f7e1;', '&#x1f7e2;', '&#x1f7e3;', '&#x1f7e4;'];
const quantityGroups = 5;
const quantityPages = 29;
const groupHardWordsNumber = 6;
//START PLUG
// let isAuthorization = false;
// if (localStorage.getItem('email')) {
//     isAuthorization = true;
// } else {
//     isAuthorization = false;
// }
// END PLUG

export let pageLearned: pageLearnedPagesGroup[] = [];

function setLocalStoragePageLearned() {
    localStorage.setItem('pageLearned', JSON.stringify(pageLearned));
}

window.addEventListener('beforeunload', setLocalStoragePageLearned);

export const draw = async (page = 0, group = 0, isAuthorization: boolean): Promise<void> => {
    let countHardAndLearnedWords = 0;
    let wordsHardForPage: UserWords[];
    let wordsLearned: UserWords[];

    if (isAuthorization) {
        const pageLearnedResponse = await getSettings();
        let pageLearnedObject: OptionalFromResponse;
        if (pageLearnedResponse) {
            pageLearnedObject = pageLearnedResponse.optional;
            if (pageLearnedObject) {
                pageLearned = Object.keys(pageLearnedObject).map((key) => pageLearnedObject[key]);
            }
        }

        const wordsUsersForPageResponse = await getAllUserWords();
        wordsHardForPage = wordsUsersForPageResponse.filter((el: UserWords) => {
            return el.difficulty === 'hard';
        });

        wordsLearned = wordsUsersForPageResponse.filter((el: UserWords) => {
            return el.difficulty === 'learned';
        });
    }

    const wordsForPage = await getWords(page, group);

    const fragment = document.createDocumentFragment() as DocumentFragment;
    const itemsTemp = document.querySelector('#items') as HTMLTemplateElement;
    const containerData = document.querySelector('.items-container') as HTMLDivElement;

    wordsForPage.forEach((item: Dictionary) => {
        const goodsClone = itemsTemp.content.cloneNode(true) as HTMLElement;

        (goodsClone.querySelector('.item') as HTMLHeadingElement).dataset.id = item.id;
        (goodsClone.querySelector('.item__title') as HTMLHeadingElement).textContent = item.word;
        (goodsClone.querySelector('.item__img') as HTMLImageElement).alt = item.word;
        (goodsClone.querySelector('.item__img') as HTMLImageElement).src = `${host}/${item.image}`;
        (goodsClone.querySelector('.item__audio-word') as HTMLSourceElement).src = `${host}/${item.audio}`;
        (goodsClone.querySelector('.item__audio-meaning') as HTMLSourceElement).src = `${host}/${item.audioMeaning}`;
        (goodsClone.querySelector('.item__audio-example') as HTMLSourceElement).src = `${host}/${item.audioExample}`;
        (goodsClone.querySelector('.item__transcription') as HTMLDivElement).innerHTML = `${item.transcription}`;
        (goodsClone.querySelector('.item__word-translate') as HTMLDivElement).innerHTML = `${item.wordTranslate}`;
        (goodsClone.querySelector('.item__text-meaning') as HTMLDivElement).textContent = `${item.textMeaning}`;
        (goodsClone.querySelector('.item__text-example') as HTMLDivElement).textContent = `${item.textExample}`;
        (goodsClone.querySelector(
            '.item__text-meaning-translate'
        ) as HTMLDivElement).textContent = `${item.textMeaningTranslate}`;
        (goodsClone.querySelector(
            '.item__text-example-translate'
        ) as HTMLDivElement).textContent = `${item.textExampleTranslate}`;

        if (isAuthorization) {
            (goodsClone.querySelector('.item__buttons') as HTMLDivElement).style.display = 'block';
        }
        if (isAuthorization && wordsHardForPage.some((el: UserWords) => el.wordId === item.id)) {
            (goodsClone.querySelector('.item__button-hard') as HTMLDivElement).textContent = 'Сложное';
            countHardAndLearnedWords++;
        }
        if (isAuthorization && wordsLearned.some((el: UserWords) => el.wordId === item.id)) {
            (goodsClone.querySelector('.item__button-learned') as HTMLDivElement).textContent = 'Изучено';
            countHardAndLearnedWords++;
        }

        fragment.append(goodsClone);
    });

    containerData.innerHTML = '';
    containerData.appendChild(fragment);

    audioPlayerListener();

    if (isAuthorization) {
        addAllLearnedMessage(countHardAndLearnedWords);
        if (countHardAndLearnedWords < 20) changePageIconDefault(page, group);
        if (countHardAndLearnedWords === 20) {
            changePageIconLearned(page, group);
        }
        addWordsForHardWordsPage();
        addLearnedWords();
    }
};

export const drawPageDifficultWords = async (isAuthorization: boolean): Promise<void> => {
    const wordsUsersForPageResponse = await getAllHardWords('hard');
    const wordsUsersForPage = wordsUsersForPageResponse[0].paginatedResults;

    const fragment = document.createDocumentFragment() as DocumentFragment;
    const itemsTemp = document.querySelector('#items') as HTMLTemplateElement;
    const containerData = document.querySelector('.items-container') as HTMLDivElement;

    wordsUsersForPage.forEach((item: DictionaryHardWord) => {
        const goodsClone = itemsTemp.content.cloneNode(true) as HTMLElement;

        (goodsClone.querySelector('.item') as HTMLHeadingElement).dataset.id = item._id;
        (goodsClone.querySelector('.item__title') as HTMLHeadingElement).textContent = item.word;
        (goodsClone.querySelector('.item__img') as HTMLImageElement).alt = item.word;
        (goodsClone.querySelector('.item__img') as HTMLImageElement).src = `${host}/${item.image}`;
        (goodsClone.querySelector('.item__audio-word') as HTMLSourceElement).src = `${host}/${item.audio}`;
        (goodsClone.querySelector('.item__audio-meaning') as HTMLSourceElement).src = `${host}/${item.audioMeaning}`;
        (goodsClone.querySelector('.item__audio-example') as HTMLSourceElement).src = `${host}/${item.audioExample}`;
        (goodsClone.querySelector('.item__transcription') as HTMLDivElement).innerHTML = `${item.transcription}`;
        (goodsClone.querySelector('.item__word-translate') as HTMLDivElement).innerHTML = `${item.wordTranslate}`;
        (goodsClone.querySelector('.item__text-meaning') as HTMLDivElement).textContent = `${item.textMeaning}`;
        (goodsClone.querySelector('.item__text-example') as HTMLDivElement).textContent = `${item.textExample}`;
        (goodsClone.querySelector(
            '.item__text-meaning-translate'
        ) as HTMLDivElement).textContent = `${item.textMeaningTranslate}`;
        (goodsClone.querySelector(
            '.item__text-example-translate'
        ) as HTMLDivElement).textContent = `${item.textExampleTranslate}`;

        if (isAuthorization) {
            (goodsClone.querySelector('.item__buttons') as HTMLDivElement).style.display = 'block';
            (goodsClone.querySelector('.item__button-hard') as HTMLDivElement).textContent = 'Удалить';
        }

        fragment.append(goodsClone);
    });

    containerData.innerHTML = '';
    containerData.appendChild(fragment);
    if (containerData.innerHTML === '') {
        (document.querySelector('.wrapper') as HTMLDivElement).style.backgroundColor = 'darkcyan';
    } else {
        (document.querySelector('.wrapper') as HTMLDivElement).style.backgroundColor = 'inherit';
    }
    audioPlayerListener();

    if (isAuthorization) {
        deleteWordsFromHardWordsPage(isAuthorization);
    }
};

export const drawTextbook = (
    pageTextbookFromLocaleStorage = 0,
    groupTextbookFromLocaleStorage = 0,
    pageLearnedFromLocaleStorage: pageLearnedPagesGroup[] = [],
    isAuthorization: boolean
) => {
    const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
    const pageTextbook = document.querySelector('.form-select.page') as HTMLSelectElement;
    groupTextbook.innerHTML = '';
    pageTextbook.innerHTML = '';
    for (let i = 0; i <= quantityGroups; i++) {
        const groupElement = document.createElement('option');
        groupElement.innerHTML = `${groupTextbookColor[i]} &nbsp; Раздел ${i + 1}`;
        groupElement.value = String(i);
        groupTextbook.appendChild(groupElement);
    }
    if (isAuthorization) {
        const groupElement = document.createElement('option');
        groupElement.innerHTML = `${groupTextbookColor[`${quantityGroups + 1}`]} &nbsp; Сложные слова`;
        groupElement.value = `${quantityGroups + 1}`;
        groupTextbook.appendChild(groupElement);
    }

    groupTextbook.options[groupTextbookFromLocaleStorage].selected = true;
    drawPageNav(
        pageTextbookFromLocaleStorage,
        groupTextbookFromLocaleStorage,
        pageLearnedFromLocaleStorage,
        isAuthorization
    );
    console.log('safasfasfsasfa', Number(groupTextbookFromLocaleStorage));
    if (Number(groupTextbook.value) !== groupHardWordsNumber)
        draw(pageTextbookFromLocaleStorage, groupTextbookFromLocaleStorage, isAuthorization);
    if (Number(groupTextbook.value) === groupHardWordsNumber) drawPageDifficultWords(isAuthorization);

    pagination(isAuthorization);
};

export const drawPageNav = (
    page: number,
    group: number,
    pageLearnedDraw: pageLearnedPagesGroup[] = [],
    isAuthorization: boolean
) => {
    if (!isAuthorization) {
        pageLearnedDraw = [];
    }
    const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
    console.log('safasfasfsasfa', Number(groupTextbook.value));
    const pageTextbook = document.querySelector('.form-select.page') as HTMLSelectElement;
    const pagination = document.querySelector('.pagination') as HTMLSelectElement;
    if (Number(groupTextbook.value) === groupHardWordsNumber) pagination.style.display = 'none';
    if (Number(groupTextbook.value) !== groupHardWordsNumber) {
        pageTextbook.innerHTML = '';
        console.log('safasfasfsasfa', Number(groupTextbook.value));
        for (let i = 0; i <= quantityPages; i++) {
            const pageElement = document.createElement('option');
            const itemFind = pageLearnedDraw.find((el) => {
                return el.page === i && el.group === group;
            });
            if (itemFind) pageElement.innerHTML = `&#9989; &nbsp; Страница ${i + 1}`;
            if (!itemFind) pageElement.innerHTML = `&#x1F56E &nbsp; Страница ${i + 1}`;
            pageElement.value = String(i);
            pageTextbook.appendChild(pageElement);
        }
        pageTextbook.options[page].selected = true;
        pageLearned = pageLearnedDraw;
    }
};

export const changePageIconLearned = async (page: number, group: number) => {
    const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
    pageElement[page].innerHTML = `&#9989; &nbsp; Страница ${page + 1}`;
    pageLearned = pageLearned.filter((el) => {
        return el.page !== page || el.group !== group;
    });
    pageLearned.push({ page: page, group: group });

    await updateSettings({
        wordsPerDay: 1,
        optional: Object.assign({}, pageLearned),
    });
};

export const changePageIconDefault = async (page: number, group: number) => {
    const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
    if (Number(groupTextbook.value) !== groupHardWordsNumber) {
        const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
        pageElement[page].innerHTML = `&#x1F56E &nbsp; Страница ${page + 1}`;
        pageLearned = pageLearned.filter((el) => {
            return el.page !== page || el.group !== group;
        });
        await updateSettings({
            wordsPerDay: 1,
            optional: Object.assign({}, pageLearned),
        });
    }
};
