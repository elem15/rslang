import { addWordToHardLearned, deleteHardWord } from '../services/api';
import { changePageIconDefault, changePageIconLearned, drawPageDifficultWords } from './draw';
import { addAllLearnedMessage } from './messageAllLearned';

export const addWordsForHardWordsPage = () => {
    const btnHardWord = document.querySelectorAll('.item__button-hard');

    const addToHardWordsPage = async (e: Event) => {
        const wordId = ((((e.target as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLDivElement)
            .parentNode as HTMLDivElement).dataset.id as string;
        (e.target as HTMLButtonElement).innerText = 'Сложное';
        ((e.target as HTMLButtonElement).nextElementSibling as HTMLButtonElement).textContent = 'Изученное слово';

        const allButton = document.querySelectorAll('.item__button-hard, .item__button-learned');
        let countHardAndLearnedWords = 0;
        allButton.forEach((el) => {
            // TO DO: поменять el.textContent на классы CSS, когда появятся.
            if (el.textContent === 'Изучено' || el.textContent === 'Сложное') {
                countHardAndLearnedWords++;
            }
        });
        if (countHardAndLearnedWords === 20) {
            const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
            const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
            changePageIconLearned(pageElement.selectedIndex, groupTextbook.selectedIndex);
            addAllLearnedMessage(countHardAndLearnedWords);
        }
        await deleteHardWord(wordId);
        addWordToHardLearned(wordId, { difficulty: 'hard' });
    };

    btnHardWord.forEach((el) => {
        el.addEventListener('click', addToHardWordsPage);
    });
};

export const deleteWordsFromHardWordsPage = () => {
    const btnHardWord = document.querySelectorAll('.item__button-hard, .item__button-learned');

    const deleteHardWordsFromPage = async (e: Event) => {
        const wordId = ((((e.target as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLDivElement)
            .parentNode as HTMLDivElement).dataset.id as string;

        if ((e.target as HTMLButtonElement).classList.contains('item__button-hard')) {
            (e.target as HTMLButtonElement).innerText = 'Сложное';
            await deleteHardWord(wordId);
            drawPageDifficultWords();
        } else {
            (e.target as HTMLButtonElement).innerText = 'Изучено';
            ((e.target as HTMLButtonElement).previousElementSibling as HTMLButtonElement).textContent = 'Сложное слово';
            await deleteHardWord(wordId);
            await addWordToHardLearned(wordId, { difficulty: 'learned' });
            drawPageDifficultWords();
        }
    };

    btnHardWord.forEach((el) => {
        el.addEventListener('click', deleteHardWordsFromPage);
    });
};

export const addLearnedWords = () => {
    const btnLearnedWord = document.querySelectorAll('.item__button-learned');

    const addLearnedWordsToAPI = async (e: Event) => {
        const wordId = ((((e.target as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLDivElement)
            .parentNode as HTMLDivElement).dataset.id as string;

        ((e.target as HTMLButtonElement).previousElementSibling as HTMLButtonElement).textContent = 'Сложное слово';

        if ((e.target as HTMLButtonElement).textContent === 'Изученное слово') {
            await deleteHardWord(wordId);
            addWordToHardLearned(wordId, { difficulty: 'learned' });
            (e.target as HTMLButtonElement).textContent = 'Изучено';

            const allButton = document.querySelectorAll('.item__button-hard, .item__button-learned');
            let countHardAndLearnedWords = 0;
            allButton.forEach((el) => {
                // TO DO: поменять el.textContent на классы CSS, когда появятся.
                if (el.textContent === 'Изучено' || el.textContent === 'Сложное') {
                    countHardAndLearnedWords++;
                }
            });

            if (countHardAndLearnedWords === 20) {
                const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
                const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
                changePageIconLearned(pageElement.selectedIndex, groupTextbook.selectedIndex);
                addAllLearnedMessage(countHardAndLearnedWords);
            }

            return;
        }
        if ((e.target as HTMLButtonElement).textContent === 'Изучено') {
            await deleteHardWord(wordId);
            (e.target as HTMLButtonElement).textContent = 'Изученное слово';

            const allButton = document.querySelectorAll('.item__button-hard, .item__button-learned');
            let countHardAndLearnedWords = 0;
            allButton.forEach((el) => {
                // TO DO: поменять el.textContent на классы CSS, когда появятся.
                if (el.textContent === 'Изучено' || el.textContent === 'Сложное') {
                    countHardAndLearnedWords++;
                }
            });

            if (countHardAndLearnedWords < 20) {
                const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
                const groupTextbook = document.querySelector('.form-select.group') as HTMLSelectElement;
                changePageIconDefault(pageElement.selectedIndex, groupTextbook.selectedIndex);
                addAllLearnedMessage(countHardAndLearnedWords);
            }
        }
    };

    btnLearnedWord.forEach((el) => {
        el.addEventListener('click', addLearnedWordsToAPI);
    });
};
