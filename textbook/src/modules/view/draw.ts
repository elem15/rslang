import { Dictionary } from '../../types';
import { audioPlayerListener } from '../services/audio';
import { getWords } from '../services/getWords';

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
const isAuthorization = true;
const quantityChapters = 5;
const quantityPages = 29;

const chapterTextbook = document.querySelector('.form-select.chapter') as HTMLSelectElement;
const pageTextbook = document.querySelector('.form-select.page') as HTMLSelectElement;

const btnLeft = document.querySelector('.page-item__previous') as HTMLLIElement;
const btnRight = document.querySelector('.page-item__next') as HTMLLIElement;

chapterTextbook.addEventListener('change', () => {
    draw(Number(pageTextbook.value), Number(chapterTextbook.value));
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
};

btnRight.addEventListener('click', () => moveRight());

export const draw = async (page = 0, group = 0): Promise<void> => {
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

        fragment.append(goodsClone);
    });

    containerData.innerHTML = '';
    containerData.appendChild(fragment);

    audioPlayerListener();
};

export const drawTextbookNav = (pageTextbookFromLocaleStorage = 0, chapterTextbookFromLocaleStorage = 0) => {
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
};
