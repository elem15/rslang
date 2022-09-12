import {
    DictionaryHardWord,
    Difficulty,
    Optional,
    pageLearnedPagesGroup,
    UserWords,
} from '../../../types/textbook-types';
import { audioPlayerListener } from '../services/audio';
import {
    addStyleLearnedPages,
    getAllHardWords,
    getAllUserWords,
    getSettings,
    getUserWords,
    getWords,
} from '../services/api';
import { pagination } from './pagination';
import { addLearnedWords, addWordsForHardWordsPage, deleteWordsFromHardWordsPage } from './workWithHardLearnedWords';
import { host } from '../../auth/controllers/hosts';
import { addAllLearnedMessage } from './messageAllLearned';
import audioImage from '../assets/images/volume.svg';
import { addListenerGameButton } from './drawGamesButton';
import { removePreloader, renderPreloader } from '../../router/services/router';

const groupTextbookColor = ['&#x1f534;', '&#x1f7e0;', '&#x1f7e1;', '&#x1f7e2;', '&#x1f535;', '&#x1f7e3;', '&#x1f7e4;'];
const quantityGroups = 5;
const quantityPages = 29;
const groupHardWordsNumber = 6;

export let pageLearned: pageLearnedPagesGroup[] = [];

function setLocalStoragePageLearned() {
    localStorage.setItem('pageLearned', JSON.stringify(pageLearned));
}

window.addEventListener('beforeunload', setLocalStoragePageLearned);

export const draw = async (page = 0, group = 0, isAuthorization: boolean): Promise<void> => {
    renderPreloader();
    let countHardAndLearnedWords = 0;
    let wordsHardForPage: UserWords[];
    let wordsLearned: UserWords[];
    let wordsForPage: DictionaryHardWord[];

    if (isAuthorization) {
        const pageLearnedResponse = await getSettings();
        let pageLearnedObject: Optional;
        if (pageLearnedResponse) {
            pageLearnedObject = pageLearnedResponse.optional;
            if (pageLearnedObject) {
                const pageLearnedObjectArrayType = pageLearnedObject.pages;
                if (pageLearnedObjectArrayType) {
                    pageLearned = Object.keys(pageLearnedObjectArrayType).map(
                        (key) => pageLearnedObjectArrayType[Number(key)]
                    );
                }
            }
        }

        const wordsUsersForPageResponse = await getAllUserWords();
        wordsHardForPage = wordsUsersForPageResponse.filter((el: UserWords) => {
            return el.difficulty === Difficulty.hard;
        });

        wordsLearned = wordsUsersForPageResponse.filter((el: UserWords) => {
            return el.difficulty === Difficulty.learned;
        });

        wordsForPage = await getUserWords(page, group);
    } else {
        const wordsForPageFromBackend = await getWords(page, group);
        wordsForPage = wordsForPageFromBackend.map(({ id: _id, ...rest }) => ({ _id, ...rest }));
    }

    const fragment = document.createDocumentFragment() as DocumentFragment;
    const itemsTemp = document.querySelector('#items') as HTMLTemplateElement;
    const containerData = document.querySelector('.items-container') as HTMLDivElement;

    wordsForPage.forEach((item: DictionaryHardWord) => {
        const goodsClone = itemsTemp.content.cloneNode(true) as HTMLElement;

        (goodsClone.querySelector('.item') as HTMLHeadingElement).dataset.id = item._id;
        (goodsClone.querySelector('.item__title') as HTMLHeadingElement).textContent = item.word;
        (goodsClone.querySelector('.item__audio-svg') as HTMLSpanElement).innerHTML = audioImage;
        (goodsClone.querySelector('.item') as HTMLDivElement).style.backgroundImage = `url(${host}/${item.image})`;
        (goodsClone.querySelector('.item__audio-word') as HTMLSourceElement).src = `${host}/${item.audio}`;
        (goodsClone.querySelector('.item__audio-meaning') as HTMLSourceElement).src = `${host}/${item.audioMeaning}`;
        (goodsClone.querySelector('.item__audio-example') as HTMLSourceElement).src = `${host}/${item.audioExample}`;
        (goodsClone.querySelector('.item__transcription') as HTMLDivElement).innerHTML = `${item.transcription}`;
        (goodsClone.querySelector('.item__word-translate') as HTMLDivElement).innerHTML = `${item.wordTranslate}`;
        (goodsClone.querySelector('.item__text-meaning') as HTMLDivElement).innerHTML = `${item.textMeaning}`;
        (goodsClone.querySelector('.item__text-example') as HTMLDivElement).innerHTML = `${item.textExample}`;
        (goodsClone.querySelector(
            '.item__text-meaning-translate'
        ) as HTMLDivElement).textContent = `${item.textMeaningTranslate}`;
        (goodsClone.querySelector(
            '.item__text-example-translate'
        ) as HTMLDivElement).textContent = `${item.textExampleTranslate}`;

        if (isAuthorization) {
            let wrongAnswersFromBackend: number;
            let rightAnswersFromBackend: number;
            (goodsClone.querySelector('.item__buttons') as HTMLDivElement).style.display = 'flex';
            if (item.userWord) {
                if (item.userWord.optional) {
                    if (item.userWord.optional.wrongAnswers) {
                        wrongAnswersFromBackend = item.userWord.optional.wrongAnswers;
                    } else {
                        wrongAnswersFromBackend = 0;
                    }
                } else {
                    wrongAnswersFromBackend = 0;
                }
            } else {
                wrongAnswersFromBackend = 0;
            }

            if (item.userWord) {
                if (item.userWord.optional) {
                    if (item.userWord.optional.rightAnswers) {
                        rightAnswersFromBackend = item.userWord.optional.rightAnswers;
                    } else {
                        rightAnswersFromBackend = 0;
                    }
                } else {
                    rightAnswersFromBackend = 0;
                }
            } else {
                rightAnswersFromBackend = 0;
            }

            (goodsClone.querySelector(
                '.item__wrong-answer'
            ) as HTMLDivElement).innerHTML = `Кол-во неправильных ответов - ${wrongAnswersFromBackend}`;
            (goodsClone.querySelector(
                '.item__right-answer'
            ) as HTMLDivElement).innerHTML = `Кол-во правильных ответов - ${rightAnswersFromBackend}`;
        }
        if (isAuthorization && wordsHardForPage.some((el: UserWords) => el.wordId === item._id)) {
            (goodsClone.querySelector('.item__button-hard') as HTMLDivElement).textContent =
                'Добавлено в "Сложные слова"';
            (goodsClone.querySelector('.item__container') as HTMLDivElement).classList.add('red');
            countHardAndLearnedWords++;
        }
        if (isAuthorization && wordsLearned.some((el: UserWords) => el.wordId === item._id)) {
            (goodsClone.querySelector('.item__button-learned') as HTMLDivElement).textContent =
                'Добавлено в "Изученные слова"';
            (goodsClone.querySelector('.item__container') as HTMLDivElement).classList.add('green');
            countHardAndLearnedWords++;
        }

        fragment.append(goodsClone);
    });

    containerData.innerHTML = '';
    containerData.appendChild(fragment);

    audioPlayerListener();
    addAllLearnedMessage(countHardAndLearnedWords, group);

    if (isAuthorization) {
        if (countHardAndLearnedWords < 20) changePageIconDefault(page, group);
        if (countHardAndLearnedWords === 20) {
            changePageIconLearned(page, group);
        }
        addWordsForHardWordsPage();
        addLearnedWords();
    }
    removePreloader();

};

export const drawPageDifficultWords = async (isAuthorization: boolean): Promise<void> => {
    renderPreloader();
    const wordsUsersForPageResponse = await getAllHardWords('hard');
    const wordsUsersForPage = wordsUsersForPageResponse[0].paginatedResults;

    const fragment = document.createDocumentFragment() as DocumentFragment;
    const itemsTemp = document.querySelector('#items') as HTMLTemplateElement;
    const containerData = document.querySelector('.items-container') as HTMLDivElement;

    wordsUsersForPage.forEach((item: DictionaryHardWord) => {
        const goodsClone = itemsTemp.content.cloneNode(true) as HTMLElement;

        (goodsClone.querySelector('.item') as HTMLHeadingElement).dataset.id = item._id;
        (goodsClone.querySelector('.item__title') as HTMLHeadingElement).textContent = item.word;
        (goodsClone.querySelector('.item__audio-svg') as HTMLSpanElement).insertAdjacentHTML('afterbegin', audioImage);
        (goodsClone.querySelector('.item') as HTMLDivElement).style.backgroundImage = `url(${host}/${item.image})`;
        (goodsClone.querySelector('.item__audio-word') as HTMLSourceElement).src = `${host}/${item.audio}`;
        (goodsClone.querySelector('.item__audio-meaning') as HTMLSourceElement).src = `${host}/${item.audioMeaning}`;
        (goodsClone.querySelector('.item__audio-example') as HTMLSourceElement).src = `${host}/${item.audioExample}`;
        (goodsClone.querySelector('.item__transcription') as HTMLDivElement).innerHTML = `${item.transcription}`;
        (goodsClone.querySelector('.item__word-translate') as HTMLDivElement).innerHTML = `${item.wordTranslate}`;
        (goodsClone.querySelector('.item__text-meaning') as HTMLDivElement).innerHTML = `${item.textMeaning}`;
        (goodsClone.querySelector('.item__text-example') as HTMLDivElement).innerHTML = `${item.textExample}`;
        (goodsClone.querySelector(
            '.item__text-meaning-translate'
        ) as HTMLDivElement).textContent = `${item.textMeaningTranslate}`;
        (goodsClone.querySelector(
            '.item__text-example-translate'
        ) as HTMLDivElement).textContent = `${item.textExampleTranslate}`;

        if (isAuthorization) {
            let wrongAnswersFromBackend: number;
            let rightAnswersFromBackend: number;

            (goodsClone.querySelector('.item__buttons') as HTMLDivElement).style.display = 'flex';
            (goodsClone.querySelector('.item__button-hard') as HTMLDivElement).textContent =
                'Удалить из "Сложные слова"';
            (goodsClone.querySelector('.item__container') as HTMLDivElement).classList.add('red');

            if (item.userWord) {
                if (item.userWord.optional) {
                    if (item.userWord.optional.wrongAnswers) {
                        wrongAnswersFromBackend = item.userWord.optional.wrongAnswers;
                    } else {
                        wrongAnswersFromBackend = 0;
                    }
                } else {
                    wrongAnswersFromBackend = 0;
                }
            } else {
                wrongAnswersFromBackend = 0;
            }

            if (item.userWord) {
                if (item.userWord.optional) {
                    if (item.userWord.optional.rightAnswers) {
                        rightAnswersFromBackend = item.userWord.optional.rightAnswers;
                    } else {
                        rightAnswersFromBackend = 0;
                    }
                } else {
                    rightAnswersFromBackend = 0;
                }
            } else {
                rightAnswersFromBackend = 0;
            }

            (goodsClone.querySelector(
                '.item__wrong-answer'
            ) as HTMLDivElement).innerHTML = `Кол-во неправильных ответов - ${wrongAnswersFromBackend}`;
            (goodsClone.querySelector(
                '.item__right-answer'
            ) as HTMLDivElement).innerHTML = `Кол-во правильных ответов - ${rightAnswersFromBackend}`;
        }

        fragment.append(goodsClone);
        removePreloader();
    });

    containerData.innerHTML = '';
    containerData.appendChild(fragment);

    audioPlayerListener();
    addAllLearnedMessage(0, groupHardWordsNumber);

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
    if (Number(groupTextbook.value) !== groupHardWordsNumber)
        draw(pageTextbookFromLocaleStorage, groupTextbookFromLocaleStorage, isAuthorization);
    if (Number(groupTextbook.value) === groupHardWordsNumber) drawPageDifficultWords(isAuthorization);

    addListenerGameButton();
    pagination(isAuthorization, pageTextbookFromLocaleStorage);
};

export const drawPageNav = async (
    page: number,
    group: number,
    pageLearnedDraw: pageLearnedPagesGroup[] = [],
    isAuthorization: boolean
) => {
    if (!isAuthorization) {
        pageLearnedDraw = [];
    }

    if (isAuthorization) {
        const pageLearnedResponse = await getSettings();
        let pageLearnedObject: Optional;
        if (pageLearnedResponse) {
            pageLearnedObject = pageLearnedResponse.optional;
            if (pageLearnedObject) {
                const pageLearnedObjectArrayType = pageLearnedObject.pages;
                if (pageLearnedObjectArrayType) {
                    pageLearned = Object.keys(pageLearnedObjectArrayType).map(
                        (key) => pageLearnedObjectArrayType[Number(key)]
                    );
                }
            }
        }
        pageLearnedDraw = pageLearned;
    }

    const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
    const pageTextbook = document.querySelector('.form-select.page') as HTMLSelectElement;
    const pagination = document.querySelector('.navigation') as HTMLSelectElement;
    if (Number(groupTextbook.value) === groupHardWordsNumber) pagination.style.display = 'none';
    if (Number(groupTextbook.value) !== groupHardWordsNumber) {
        pageTextbook.innerHTML = '';
        for (let i = 0; i <= quantityPages; i++) {
            const pageElement = document.createElement('option');
            const itemFind = pageLearnedDraw.find((el) => {
                return el.page === i && el.group === Number(group);
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
    pageElement[page].innerHTML = `&#9989; &nbsp; Страница ${Number(page) + 1}`;
    pageLearned = pageLearned.filter((el) => {
        return el.page !== page || el.group !== group;
    });
    pageLearned.push({ page: page, group: group });

    await addStyleLearnedPages(pageLearned);
};

export const changePageIconDefault = async (page: number, group: number) => {
    const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
    if (Number(groupTextbook.value) !== groupHardWordsNumber) {
        const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
        pageElement[page].innerHTML = `&#x1F56E &nbsp; Страница ${Number(page) + 1}`;
        pageLearned = pageLearned.filter((el) => {
            return el.page !== page || el.group !== group;
        });
        await addStyleLearnedPages(pageLearned);
    }
};
