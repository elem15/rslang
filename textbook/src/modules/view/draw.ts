import { Dictionary, DictionaryHardWord } from '../../types';
import { audioPlayerListener } from '../services/audio';
import { addWordToHard, deleteHardWord, getAllHardWords, getWords } from '../services/getWords';
import * as a from 'axios';
import { pagination } from './pagination';

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

// const getUserWords = async (userId: string, token: string) => {
//     try {
//         const response = await axios.get(`${base}/users/${userId}/words`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: 'application/json',
//                 'Access-Control-Allow-Origin': '*',
//             },
//         });
//         console.log(response.data);
//         return response.data;
//     } catch {
//         console.log('error');
//     }
// };

// END PLUG

const quantityChapters = 5;
const quantityPages = 29;

const chapterTextbook = document.querySelector('.form-select.chapter') as HTMLSelectElement;
const pageTextbook = document.querySelector('.form-select.page') as HTMLSelectElement;

export const draw = async (page = 0, group = 0): Promise<void> => {
    // PLUG
    const { ids, token }: { ids: string; token: string } = (await logIn({
        email: 'apx2@mail.ru',
        password: '11111111',
    })) as { ids: string; token: string };
    console.log(ids, token);
    //
    const wordsUsersForPageResponse = await getAllHardWords(ids, token, 'hard');
    console.log(wordsUsersForPageResponse[0].paginatedResults);
    const wordsHardForPage = wordsUsersForPageResponse[0].paginatedResults;

    const wordsLearnedResponse = await getAllHardWords(ids, token, 'learned');
    console.log(wordsLearnedResponse[0].paginatedResults);
    const wordsLearned = wordsLearnedResponse[0].paginatedResults;

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
        if (isAuthorization && wordsHardForPage.some((el: DictionaryHardWord) => el._id === item.id)) {
            (goodsClone.querySelector('.item__button-hard') as HTMLDivElement).textContent = 'Сложное';
        }
        if (isAuthorization && wordsLearned.some((el: DictionaryHardWord) => el._id === item.id)) {
            (goodsClone.querySelector('.item__button-learned') as HTMLDivElement).textContent = 'Изучено';
        }

        fragment.append(goodsClone);
    });

    containerData.innerHTML = '';
    containerData.appendChild(fragment);

    audioPlayerListener();

    if (isAuthorization) {
        addWordsForHardWordsPage();
        addLearnedWords();
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
    console.log(wordsUsersForPageResponse[0].paginatedResults);
    const wordsUsersForPage = wordsUsersForPageResponse[0].paginatedResults;
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
        const chapterElement = document.createElement('option');
        chapterElement.innerHTML = `&#x1F56E &nbsp; Страница ${i + 1}`;
        chapterElement.value = String(i);
        pageTextbook.appendChild(chapterElement);
    }
    chapterTextbook.options[chapterTextbookFromLocaleStorage].selected = true;
    pageTextbook.options[pageTextbookFromLocaleStorage].selected = true;
    draw(pageTextbookFromLocaleStorage, chapterTextbookFromLocaleStorage);

    pagination();
};

const addWordsForHardWordsPage = () => {
    const btnHardWord = document.querySelectorAll('.item__button-hard');
    console.log(btnHardWord);

    const addToHardWordsPage = async (e: Event) => {
        const wordId = (
            (((e.currentTarget as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLDivElement)
                .parentNode as HTMLDivElement
        ).dataset.id as string;
        (e.currentTarget as HTMLButtonElement).innerText = 'Сложное';
        ((e.currentTarget as HTMLButtonElement).nextElementSibling as HTMLButtonElement).textContent =
            'Изученное слово';
        // PLUG
        const { ids, token }: { ids: string; token: string } = (await logIn({
            email: 'apx2@mail.ru',
            password: '11111111',
        })) as { ids: string; token: string };
        //

        await deleteHardWord(ids, token, wordId);
        addWordToHard(ids, token, wordId, { difficulty: 'hard' });
    };

    btnHardWord.forEach((el) => {
        el.addEventListener('click', addToHardWordsPage);
    });
};

const deleteWordsFromHardWordsPage = () => {
    const btnHardWord = document.querySelectorAll('.item__button-hard, .item__button-learned');
    console.log(btnHardWord);

    const deleteHardWordsFromPage = async (e: Event) => {
        console.log(e.currentTarget);
        const wordId = (
            (((e.currentTarget as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLDivElement)
                .parentNode as HTMLDivElement
        ).dataset.id as string;
        // PLUG
        const { ids, token }: { ids: string; token: string } = (await logIn({
            email: 'apx2@mail.ru',
            password: '11111111',
        })) as { ids: string; token: string };
        //
        if ((e.target as HTMLButtonElement).classList.contains('item__button-hard')) {
            // (e.currentTarget as HTMLButtonElement).innerText = 'Сложное';
            deleteHardWord(ids, token, wordId);
            drawPageDifficultWords();
        } else {
            // (e.currentTarget as HTMLButtonElement).innerText = 'Изучено';
            await deleteHardWord(ids, token, wordId);
            await addWordToHard(ids, token, wordId, { difficulty: 'learned' });
            drawPageDifficultWords();
        }
        // if ((e.currentTarget as HTMLButtonElement).classList.contains('item__button-learned')) {

        // }
    };

    btnHardWord.forEach((el) => {
        el.addEventListener('click', deleteHardWordsFromPage);
    });
};

const addLearnedWords = () => {
    const btnLearnedWord = document.querySelectorAll('.item__button-learned');
    console.log(btnLearnedWord);

    const addLearnedWordsToAPI = async (e: Event) => {
        const wordId = (
            (((e.currentTarget as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLDivElement)
                .parentNode as HTMLDivElement
        ).dataset.id as string;
        (e.currentTarget as HTMLButtonElement).innerText = 'Изучено';
        ((e.currentTarget as HTMLButtonElement).previousElementSibling as HTMLButtonElement).textContent =
            'Сложное слово';
        // PLUG
        const { ids, token }: { ids: string; token: string } = (await logIn({
            email: 'apx2@mail.ru',
            password: '11111111',
        })) as { ids: string; token: string };
        //
        deleteHardWord(ids, token, wordId);
        addWordToHard(ids, token, wordId, { difficulty: 'learned' });
    };

    btnLearnedWord.forEach((el) => {
        el.addEventListener('click', addLearnedWordsToAPI);
    });
};

//PAGINATION

// const btnLeft = document.querySelector('.page-item__previous') as HTMLLIElement;
// const btnRight = document.querySelector('.page-item__next') as HTMLLIElement;
// const pagination = document.querySelector('.pagination') as HTMLUListElement;

// chapterTextbook.addEventListener('change', () => {
//     if (Number(chapterTextbook.value) < 6) {
//         draw(Number(pageTextbook.value), Number(chapterTextbook.value));
//         pagination.style.display = 'flex';
//     }
//     if (Number(chapterTextbook.value) === 6) {
//         drawPageDifficultWords();
//         pagination.style.display = 'none';
//     }
// });

// pageTextbook.addEventListener('change', () => {
//     const currentPage = pageTextbook.selectedIndex;
//     const currentChapter = chapterTextbook.selectedIndex;
//     draw(Number(pageTextbook.value), currentChapter);
//     if (currentPage === quantityPages) {
//         btnRight.classList.add('disabled');
//     }
//     if (currentPage !== quantityPages) {
//         btnRight.classList.remove('disabled');
//     }
//     if (currentPage === 0) {
//         btnLeft.classList.add('disabled');
//     }
//     if (currentPage !== 0) {
//         btnLeft.classList.remove('disabled');
//     }
// });

// const moveLeft = () => {
//     let currentPage = pageTextbook.selectedIndex;
//     const currentChapter = chapterTextbook.selectedIndex;
//     if (currentPage !== 0) {
//         console.log(currentPage);
//         currentPage--;
//         pageTextbook.options[currentPage].selected = true;
//         draw(currentPage, currentChapter);
//     }
//     if (currentPage === 0) {
//         btnLeft.classList.add('disabled');
//     }
//     if (currentPage === quantityPages - 1) {
//         btnRight.classList.remove('disabled');
//     }
//     const root = document.querySelectorAll('audio');
//     root.forEach((el) => el.remove());
// };

// btnLeft.addEventListener('click', () => moveLeft());

// const moveRight = () => {
//     let currentPage = pageTextbook.selectedIndex;
//     const currentChapter = chapterTextbook.selectedIndex;
//     console.log(currentPage);
//     currentPage++;
//     pageTextbook.options[currentPage].selected = true;
//     draw(currentPage, currentChapter);
//     if (currentPage === quantityPages) {
//         btnRight.classList.add('disabled');
//     }
//     if (currentPage === 1) {
//         btnLeft.classList.remove('disabled');
//     }
//     const root = document.querySelectorAll('audio');
//     root.forEach((el) => el.remove());
// };

// btnRight.addEventListener('click', () => moveRight());
