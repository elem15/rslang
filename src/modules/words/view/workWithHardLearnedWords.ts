import { addWordToHardLearned, deleteHardWord } from '../services/api';
import { changePageIconDefault, changePageIconLearned, drawPageDifficultWords } from './draw';
import { addAllLearnedMessage } from './messageAllLearned';

export const addWordsForHardWordsPage = () => {
    const btnHardWord = document.querySelectorAll('.item__button-hard');

    const addToHardWordsPage = async (e: Event) => {
        const itemContainer = ((e.target as HTMLButtonElement).parentNode as HTMLDivElement)
            .parentNode as HTMLDivElement;
        const item = itemContainer.parentNode as HTMLDivElement;
        const wordId = item.dataset.id as string;
        (e.target as HTMLButtonElement).innerText = 'Добавлено в "Сложные слова"';
        ((e.target as HTMLButtonElement).nextElementSibling as HTMLButtonElement).textContent =
            'Добавить в "Изученные слова"';
        itemContainer.classList.add('red');
        itemContainer.classList.remove('green');

        const allButton = document.querySelectorAll('.item__button-hard, .item__button-learned');
        let countHardAndLearnedWords = 0;
        allButton.forEach((el) => {
            if (
                el.textContent === 'Добавлено в "Изученные слова"' ||
                el.textContent === 'Добавлено в "Сложные слова"'
            ) {
                countHardAndLearnedWords++;
            }
        });
        if (countHardAndLearnedWords === 20) {
            const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
            const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
            changePageIconLearned(pageElement.selectedIndex, groupTextbook.selectedIndex);
            addAllLearnedMessage(countHardAndLearnedWords, groupTextbook.selectedIndex);
        }
        await deleteHardWord(wordId);
        addWordToHardLearned(wordId, { difficulty: 'hard' });
    };

    btnHardWord.forEach((el) => {
        el.addEventListener('click', addToHardWordsPage);
    });
};

export const deleteWordsFromHardWordsPage = (isAuthorization: boolean) => {
    const btnHardWord = document.querySelectorAll('.item__button-hard, .item__button-learned');

    const deleteHardWordsFromPage = async (e: Event) => {
        const itemContainer = ((e.target as HTMLButtonElement).parentNode as HTMLDivElement)
            .parentNode as HTMLDivElement;
        const item = itemContainer.parentNode as HTMLDivElement;
        const wordId = item.dataset.id as string;

        if ((e.target as HTMLButtonElement).classList.contains('item__button-hard')) {
            (e.target as HTMLButtonElement).innerText = 'Добавить в "Сложные слова"';
            await deleteHardWord(wordId);
            drawPageDifficultWords(isAuthorization);
            itemContainer.classList.remove('red');
        } else {
            (e.target as HTMLButtonElement).innerText = 'Добавлено в "Изученные слова"';
            ((e.target as HTMLButtonElement).previousElementSibling as HTMLButtonElement).textContent =
                'Добавить в "Сложные слова"';
            itemContainer.classList.remove('red');
            itemContainer.classList.add('green');
            await deleteHardWord(wordId);
            await addWordToHardLearned(wordId, { difficulty: 'learned' });
            drawPageDifficultWords(isAuthorization);
        }
    };

    btnHardWord.forEach((el) => {
        el.addEventListener('click', deleteHardWordsFromPage);
    });
};

export const addLearnedWords = () => {
    const btnLearnedWord = document.querySelectorAll('.item__button-learned');

    const addLearnedWordsToAPI = async (e: Event) => {
        const itemContainer = ((e.target as HTMLButtonElement).parentNode as HTMLDivElement)
            .parentNode as HTMLDivElement;
        const item = itemContainer.parentNode as HTMLDivElement;
        const wordId = item.dataset.id as string;

        ((e.target as HTMLButtonElement).previousElementSibling as HTMLButtonElement).textContent =
            'Добавить в "Сложные слова"';

        if ((e.target as HTMLButtonElement).textContent === 'Добавить в "Изученные слова"') {
            await deleteHardWord(wordId);
            addWordToHardLearned(wordId, { difficulty: 'learned' });
            (e.target as HTMLButtonElement).textContent = 'Добавлено в "Изученные слова"';
            itemContainer.classList.remove('red');
            itemContainer.classList.add('green');

            const allButton = document.querySelectorAll('.item__button-hard, .item__button-learned');
            let countHardAndLearnedWords = 0;
            allButton.forEach((el) => {
                if (
                    el.textContent === 'Добавлено в "Изученные слова"' ||
                    el.textContent === 'Добавлено в "Сложные слова"'
                ) {
                    countHardAndLearnedWords++;
                }
            });

            if (countHardAndLearnedWords === 20) {
                const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
                const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
                changePageIconLearned(pageElement.selectedIndex, groupTextbook.selectedIndex);
                addAllLearnedMessage(countHardAndLearnedWords, groupTextbook.selectedIndex);
            }

            return;
        }
        if ((e.target as HTMLButtonElement).textContent === 'Добавлено в "Изученные слова"') {
            await deleteHardWord(wordId);
            (e.target as HTMLButtonElement).textContent = 'Добавить в "Изученные слова"';
            itemContainer.classList.remove('red');
            itemContainer.classList.remove('green');

            const allButton = document.querySelectorAll('.item__button-hard, .item__button-learned');
            let countHardAndLearnedWords = 0;
            allButton.forEach((el) => {
                if (
                    el.textContent === 'Добавлено в "Изученные слова"' ||
                    el.textContent === 'Добавлено в "Сложные слова"'
                ) {
                    countHardAndLearnedWords++;
                }
            });

            if (countHardAndLearnedWords < 20) {
                const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
                const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
                changePageIconDefault(pageElement.selectedIndex, groupTextbook.selectedIndex);
                addAllLearnedMessage(countHardAndLearnedWords, groupTextbook.selectedIndex);
            }
        }
    };

    btnLearnedWord.forEach((el) => {
        el.addEventListener('click', addLearnedWordsToAPI);
    });
};
