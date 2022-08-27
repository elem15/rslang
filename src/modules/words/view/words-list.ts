import { renderFooter } from '../../main/view/main-page';
import { startTextbook } from './startTextbook';

export const renderWordsList = async (): Promise<void> => {
    const audio = document.querySelectorAll('audio');
    audio.forEach((el) => el.remove());

    let isReload = false;
    document.querySelector('section') === null ? (isReload = true) : (isReload = false);

    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    renderFooter();
    const words = document.createElement('section');
    words.className = 'dictionary';
    root.append(words);
    words.innerHTML = `
        <div class="wrapper">
            <div class="textbook-navigation">
                <select class="form-select group"></select>
                <nav class="navigation" aria-label="navigation">
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
                <div class="game__button">
                    <button class="button game__button-audio">Аудиовызов</button>
                    <button class="button game__button-sprint">Спринт</button> 
                </div>
            </div>
            <div class="items-container"></div>
        </div>
        
        <template id="items">
        <div class="item">
            <div class="item__container">
                <h4 class="item__title"></h4>
                <div class="item__audio">
                    <button class="button item__play-audio"><span class="item__audio-svg"></span></button>
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
                <div class="item__text-meaning-translate"></div>
                <div class="item__text-example"></div>
                <div class="item__text-example-translate"></div>
                <div class="item__buttons">
                    <button class="button item__button-hard">Добавить в "Сложные слова"</button>
                    <button class="button item__button-learned">Добавить в "Изученные слова"</button>
                </div>
                <img class="item__img">
            </div>
        </div>
        </template>`;
    let isAuthorization = false;
    const userSymbol = document.querySelector('.user') as HTMLSpanElement;
    if (localStorage.getItem('email') && userSymbol.classList.contains('logged')) {
        isAuthorization = true;
    } else {
        isAuthorization = false;
    }

    startTextbook(isAuthorization, isReload);
};
