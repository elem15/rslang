import { Dictionary, DictionaryHardWord, UserWords } from '../../types';
import { audioPlayerListener } from '../services/audio';
import { getAllHardWords, getAllUserWords, getWords } from '../services/api';
import * as a from 'axios';
import { pagination } from './pagination';
import { addLearnedWords, addWordsForHardWordsPage, deleteWordsFromHardWordsPage } from './workWithHardLearnedWords';

const base = 'http://localhost:3500';
const chapterTextbookColor = [
    '&#x1f535;',
    '&#x1f534;',
    '&#x1f7e0;',
    '&#x1f7e1;',
    '&#x1f7e2;',
    '&#x1f7e3;',
    '&#x1f7e4;',
];

//START PLUG
const isAuthorization = true;
const axios = a.default;
export interface User {
    email: string;
    password: string;
}

export interface UserData {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
}
// export const createUser = async (user: User) => {
//     try {
//         const response = await axios.post(`${base}/users`, user);
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// };

// createUser({ email: 'apx2@mail.ru', password: '11111111' });

export const logIn = async (user: User) => {
    try {
        const response = await axios.post(`${base}/signin`, user);
        const { data } = response;
        localStorage.setItem('data', JSON.stringify(data));
        const ids: string = response.data.userId;
        const token: string = response.data.token;
        return { ids, token };
    } catch (error) {
        console.log(error);
    }
};

logIn({ email: 'apx2@mail.ru', password: '11111111' });

// END PLUG

const quantityChapters = 5;
const quantityPages = 29;

const chapterTextbook = document.querySelector('.form-select.chapter') as HTMLSelectElement;
const pageTextbook = document.querySelector('.form-select.page') as HTMLSelectElement;

export const draw = async (page = 0, group = 0): Promise<void> => {
    let countHardAndLearnedWords = 0;
    // PLUG
    const { ids, token }: { ids: string; token: string } = (await logIn({
        email: 'apx2@mail.ru',
        password: '11111111',
    })) as { ids: string; token: string };
    console.log(ids, token);
    //
    const wordsUsersForPageResponse = await getAllUserWords(ids, token);
    const wordsHardForPage = wordsUsersForPageResponse.filter((el: UserWords) => {
        return el.difficulty === 'hard';
    });
    console.log(wordsHardForPage);

    const wordsLearnedResponse = await getAllUserWords(ids, token);
    const wordsLearned = wordsLearnedResponse.filter((el: UserWords) => {
        return el.difficulty === 'learned';
    });
    console.log(wordsLearned);

    const wordsForPage = await getWords(page, group);
    console.log(wordsForPage);
    const fragment = document.createDocumentFragment() as DocumentFragment;
    const itemsTemp = document.querySelector('#items') as HTMLTemplateElement;
    const containerData = document.querySelector('.items-container') as HTMLDivElement;

    wordsForPage.forEach((item: Dictionary) => {
        const goodsClone = itemsTemp.content.cloneNode(true) as HTMLElement;

        (goodsClone.querySelector('.item') as HTMLHeadingElement).dataset.id = item.id;
        (goodsClone.querySelector('.item__title') as HTMLHeadingElement).textContent = item.word;
        (goodsClone.querySelector('.item__img') as HTMLImageElement).alt = item.word;
        (goodsClone.querySelector('.item__img') as HTMLImageElement).src = `${base}/${item.image}`;
        (goodsClone.querySelector('.item__audio-word') as HTMLSourceElement).src = `${base}/${item.audio}`;
        (goodsClone.querySelector('.item__audio-meaning') as HTMLSourceElement).src = `${base}/${item.audioMeaning}`;
        (goodsClone.querySelector('.item__audio-example') as HTMLSourceElement).src = `${base}/${item.audioExample}`;
        (goodsClone.querySelector('.item__transcription') as HTMLDivElement).innerHTML = `${item.transcription}`;
        (goodsClone.querySelector('.item__word-translate') as HTMLDivElement).innerHTML = `${item.wordTranslate}`;
        (goodsClone.querySelector('.item__text-meaning') as HTMLDivElement).textContent = `${item.textMeaning}`;
        (goodsClone.querySelector('.item__text-example') as HTMLDivElement).textContent = `${item.textExample}`;
        (
            goodsClone.querySelector('.item__text-meaning-translate') as HTMLDivElement
        ).textContent = `${item.textMeaningTranslate}`;
        (
            goodsClone.querySelector('.item__text-example-translate') as HTMLDivElement
        ).textContent = `${item.textExampleTranslate}`;

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
    addAllLearnedMessage(countHardAndLearnedWords);
    if (countHardAndLearnedWords < 20) changePageIconDefault(page);
    if (countHardAndLearnedWords === 20) changePageIconLearned(page);

    if (isAuthorization) {
        addWordsForHardWordsPage();
        addLearnedWords();
    }
};

export const changePageIconLearned = (page: number) => {
    const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
    pageElement[page].innerHTML = `&#9989; &nbsp; Страница ${page + 1}`;
};

export const changePageIconDefault = (page: number) => {
    const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
    pageElement[page].innerHTML = `&#x1F56E &nbsp; Страница ${page + 1}`;
};

export const addAllLearnedMessage = (countHardAndLearnedWords: number) => {
    if (countHardAndLearnedWords === 20) {
        (document.querySelector('.wrapper') as HTMLDivElement).style.backgroundColor = 'darkcyan';
    } else {
        (document.querySelector('.wrapper') as HTMLDivElement).style.backgroundColor = 'inherit';
    }
};

export const drawPageDifficultWords = async (): Promise<void> => {
    // PLUG
    const { ids, token }: { ids: string; token: string } = (await logIn({
        email: 'apx2@mail.ru',
        password: '11111111',
    })) as { ids: string; token: string };
    console.log(ids, token);
    //

    const wordsUsersForPageResponse = await getAllHardWords(ids, token, 'hard');
    console.log(wordsUsersForPageResponse);
    const wordsUsersForPage = wordsUsersForPageResponse[0].paginatedResults;
    console.log(wordsUsersForPage);

    const fragment = document.createDocumentFragment() as DocumentFragment;
    const itemsTemp = document.querySelector('#items') as HTMLTemplateElement;
    const containerData = document.querySelector('.items-container') as HTMLDivElement;

    wordsUsersForPage.forEach((item: DictionaryHardWord) => {
        const goodsClone = itemsTemp.content.cloneNode(true) as HTMLElement;

        (goodsClone.querySelector('.item') as HTMLHeadingElement).dataset.id = item._id;
        (goodsClone.querySelector('.item__title') as HTMLHeadingElement).textContent = item.word;
        (goodsClone.querySelector('.item__img') as HTMLImageElement).alt = item.word;
        (goodsClone.querySelector('.item__img') as HTMLImageElement).src = `${base}/${item.image}`;
        (goodsClone.querySelector('.item__audio-word') as HTMLSourceElement).src = `${base}/${item.audio}`;
        (goodsClone.querySelector('.item__audio-meaning') as HTMLSourceElement).src = `${base}/${item.audioMeaning}`;
        (goodsClone.querySelector('.item__audio-example') as HTMLSourceElement).src = `${base}/${item.audioExample}`;
        (goodsClone.querySelector('.item__transcription') as HTMLDivElement).innerHTML = `${item.transcription}`;
        (goodsClone.querySelector('.item__word-translate') as HTMLDivElement).innerHTML = `${item.wordTranslate}`;
        (goodsClone.querySelector('.item__text-meaning') as HTMLDivElement).textContent = `${item.textMeaning}`;
        (goodsClone.querySelector('.item__text-example') as HTMLDivElement).textContent = `${item.textExample}`;
        (
            goodsClone.querySelector('.item__text-meaning-translate') as HTMLDivElement
        ).textContent = `${item.textMeaningTranslate}`;
        (
            goodsClone.querySelector('.item__text-example-translate') as HTMLDivElement
        ).textContent = `${item.textExampleTranslate}`;

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
        deleteWordsFromHardWordsPage();
    }
};

export const drawTextbook = (pageTextbookFromLocaleStorage = 0, chapterTextbookFromLocaleStorage = 0) => {
    for (let i = 0; i <= quantityChapters; i++) {
        const chapterElement = document.createElement('option');
        chapterElement.innerHTML = `${chapterTextbookColor[i]} &nbsp; Раздел ${i + 1}`;
        chapterElement.value = String(i);
        chapterTextbook.appendChild(chapterElement);
    }
    if (isAuthorization) {
        const chapterElement = document.createElement('option');
        chapterElement.innerHTML = `${chapterTextbookColor[`${quantityChapters + 1}`]} &nbsp; Сложные слова`;
        chapterElement.value = `${quantityChapters + 1}`;
        chapterTextbook.appendChild(chapterElement);
    }
    for (let i = 0; i <= quantityPages; i++) {
        const pageElement = document.createElement('option');
        pageElement.innerHTML = `&#x1F56E &nbsp; Страница ${i + 1}`;
        pageElement.value = String(i);
        pageTextbook.appendChild(pageElement);
    }
    chapterTextbook.options[chapterTextbookFromLocaleStorage].selected = true;
    pageTextbook.options[pageTextbookFromLocaleStorage].selected = true;
    draw(pageTextbookFromLocaleStorage, chapterTextbookFromLocaleStorage);

    pagination();
};
