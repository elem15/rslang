import { renderFooter } from '../../main/view/main-page';
import { startTextbook } from './startTextbook';
// import { getUserWords } from '../controllers/get-user-words';
// import { getWordById } from '../controllers/get-word-by-id';

// interface Element {
//     wordId: string;
// }
// const renderListItem = async (id: string, list: HTMLUListElement) => {
//     const li = document.createElement('li');
//     li.innerText = await getWordById(id);
//     list.append(li);
// };
export const renderWordsList = async (): Promise<void> => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    renderFooter();
    const words = document.createElement('section');
    words.className = 'dictionary';
    root.append(words);
    root.innerHTML = `
        <div class="wrapper">
            <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item page-item__previous">
                        <a class="page-link">Previous</a>
                    </li>
                    <li>
                    <select class="form-select page">
                    </select>
                    </li>
                    <li class="page-item">
                        <a class="page-link page-item__next">Next</a>
                    </li>
                </ul>
            </nav>
            <select class="form-select group"></select>
            <div class="items-container"></div>
        </div>
        
        <template id="items">
        <div class="item">
            <div class="item__container">
                <h4 class="item__title"></h4>
                <div class="item__audio">
                    <button class="item__play-audio"></button>
                    <audio>
                        <source class="item__audio-word" type="audio/mp3">
                    </audio>
                    <audio>
                        <source class="item__audio-meaning" type="audio/mp3">
                    </audio>
                    <audio>
                        <source class="item__audio-example" type="audio/mp3">
                    </audio>
                </div>
                <div class="item__word-translate"></div>
                <div class="item__transcription"></div>
                <div class="item__text-meaning"></div>
                <div class="item__text-example"></div>
                <div class="item__text-meaning-translate"></div>
                <div class="item__text-example-translate"></div>
                <div class="item__buttons">
                    <button class="batton item__button-hard">Сложное слово</button>
                    <button class="batton item__button-learned">Изученное слово</button>
                </div>
            </div>
            <img class="item__img">
        </div>
        </template>`;

    startTextbook();
    // const response = await getUserWords();
    // if (response) {
    //     const ids = response.data.map(({ wordId }: Element) => wordId);
    //     const list = document.createElement('ul');
    //     words.append(list);
    //     const wordsPromises = ids.map(async (id: string) => {
    //         new Promise((resolve) => resolve(renderListItem(id, list)));
    //     });
    //     Promise.allSettled(wordsPromises);
    // }
};
