import { addWordToHardLearned, deleteHardWord } from '../services/api';
import {
    addAllLearnedMessage,
    changePageIconDefault,
    changePageIconLearned,
    drawPageDifficultWords,
    logIn,
} from './draw';

export const addWordsForHardWordsPage = () => {
    const btnHardWord = document.querySelectorAll('.item__button-hard');
    // console.log(btnHardWord);

    const addToHardWordsPage = async (e: Event) => {
        const wordId = (
            (((e.target as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLDivElement)
                .parentNode as HTMLDivElement
        ).dataset.id as string;
        (e.target as HTMLButtonElement).innerText = 'Сложное';
        ((e.target as HTMLButtonElement).nextElementSibling as HTMLButtonElement).textContent = 'Изученное слово';
        // PLUG
        const { ids, token }: { ids: string; token: string } = (await logIn({
            email: 'apx2@mail.ru',
            password: '11111111',
        })) as { ids: string; token: string };
        //
        const allButton = document.querySelectorAll('.item__button-hard, .item__button-learned');
        let countHardAndLearnedWords = 0;
        allButton.forEach((el) => {
            if (el.textContent === 'Изучено' || el.textContent === 'Сложное') {
                countHardAndLearnedWords++;
            }
        });
        console.log(countHardAndLearnedWords);
        if (countHardAndLearnedWords === 20) {
            const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
            const chapterTextbook = document.querySelector('.form-select.chapter') as HTMLSelectElement;
            changePageIconLearned(pageElement.selectedIndex, chapterTextbook.selectedIndex, ids, token);
            addAllLearnedMessage(countHardAndLearnedWords);
        }
        await deleteHardWord(ids, token, wordId);
        addWordToHardLearned(ids, token, wordId, { difficulty: 'hard' });
    };

    btnHardWord.forEach((el) => {
        el.addEventListener('click', addToHardWordsPage);
    });
};

export const deleteWordsFromHardWordsPage = () => {
    const btnHardWord = document.querySelectorAll('.item__button-hard, .item__button-learned');
    // console.log(btnHardWord);

    const deleteHardWordsFromPage = async (e: Event) => {
        console.log(e.target);
        const wordId = (
            (((e.target as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLDivElement)
                .parentNode as HTMLDivElement
        ).dataset.id as string;
        // PLUG
        const { ids, token }: { ids: string; token: string } = (await logIn({
            email: 'apx2@mail.ru',
            password: '11111111',
        })) as { ids: string; token: string };
        //
        if ((e.target as HTMLButtonElement).classList.contains('item__button-hard')) {
            (e.target as HTMLButtonElement).innerText = 'Сложное';
            await deleteHardWord(ids, token, wordId);
            drawPageDifficultWords();
            console.log(btnHardWord);
        } else {
            (e.target as HTMLButtonElement).innerText = 'Изучено';
            ((e.target as HTMLButtonElement).previousElementSibling as HTMLButtonElement).textContent = 'Сложное слово';
            await deleteHardWord(ids, token, wordId);
            await addWordToHardLearned(ids, token, wordId, { difficulty: 'learned' });
            drawPageDifficultWords();
        }
    };

    btnHardWord.forEach((el) => {
        el.addEventListener('click', deleteHardWordsFromPage);
    });
};

export const addLearnedWords = () => {
    const btnLearnedWord = document.querySelectorAll('.item__button-learned');
    // console.log(btnLearnedWord);

    const addLearnedWordsToAPI = async (e: Event) => {
        const wordId = (
            (((e.target as HTMLButtonElement).parentNode as HTMLDivElement).parentNode as HTMLDivElement)
                .parentNode as HTMLDivElement
        ).dataset.id as string;

        ((e.target as HTMLButtonElement).previousElementSibling as HTMLButtonElement).textContent = 'Сложное слово';
        // PLUG
        const { ids, token }: { ids: string; token: string } = (await logIn({
            email: 'apx2@mail.ru',
            password: '11111111',
        })) as { ids: string; token: string };
        //
        if ((e.target as HTMLButtonElement).textContent === 'Изученное слово') {
            await deleteHardWord(ids, token, wordId);
            addWordToHardLearned(ids, token, wordId, { difficulty: 'learned' });
            (e.target as HTMLButtonElement).textContent = 'Изучено';

            const allButton = document.querySelectorAll('.item__button-hard, .item__button-learned');
            let countHardAndLearnedWords = 0;
            allButton.forEach((el) => {
                if (el.textContent === 'Изучено' || el.textContent === 'Сложное') {
                    countHardAndLearnedWords++;
                }
            });
            console.log(countHardAndLearnedWords);
            if (countHardAndLearnedWords === 20) {
                const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
                const chapterTextbook = document.querySelector('.form-select.chapter') as HTMLSelectElement;
                changePageIconLearned(pageElement.selectedIndex, chapterTextbook.selectedIndex, ids, token);
                addAllLearnedMessage(countHardAndLearnedWords);
            }

            return;
        }
        if ((e.target as HTMLButtonElement).textContent === 'Изучено') {
            await deleteHardWord(ids, token, wordId);
            (e.target as HTMLButtonElement).textContent = 'Изученное слово';

            const allButton = document.querySelectorAll('.item__button-hard, .item__button-learned');
            let countHardAndLearnedWords = 0;
            allButton.forEach((el) => {
                if (el.textContent === 'Изучено' || el.textContent === 'Сложное') {
                    countHardAndLearnedWords++;
                }
            });
            console.log(countHardAndLearnedWords);
            if (countHardAndLearnedWords < 20) {
                const pageElement = document.querySelector('.form-select.page') as HTMLSelectElement;
                const chapterTextbook = document.querySelector('.form-select.chapter') as HTMLSelectElement;
                changePageIconDefault(pageElement.selectedIndex, chapterTextbook.selectedIndex, ids, token);
                addAllLearnedMessage(countHardAndLearnedWords);
            }
        }
    };

    btnLearnedWord.forEach((el) => {
        el.addEventListener('click', addLearnedWordsToAPI);
    });
};

// export const addAllLearnedMessage = (countHardAndLearnedWords: number) => {
//     if (countHardAndLearnedWords === 20) {
//         (document.querySelector('.wrapper') as HTMLDivElement).style.backgroundColor = 'darkcyan';
//     } else {
//         (document.querySelector('.wrapper') as HTMLDivElement).style.backgroundColor = 'inherit';
//     }
// };
