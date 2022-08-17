import './global.css';
import './global.scss';
import { Dictionary } from './types';

const base = 'http://localhost:3500';
const words = `${base}/words`;
const audio = new Audio();

const getWords = async (page = 0, group = 0): Promise<Dictionary[]> => {
    const response = await fetch(`${words}?page=${page}&group=${group}`);
    const wordsPage = await response.json();
    return wordsPage;
};

const draw = async (page = 0, group = 0): Promise<void> => {
    const wordsForPage = await getWords(page, group);
    console.log(wordsForPage);
    const fragment = document.createDocumentFragment() as DocumentFragment;
    const itemsTemp = document.querySelector('#items') as HTMLTemplateElement;
    const containerData = document.querySelector('.wrapper') as HTMLDivElement;

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

const audioPlayerListener = () => {
    const audioElementsArray = document.querySelectorAll('.item__audio');
    console.log(audioElementsArray);
    console.log(audioElementsArray[0].firstChild);
    audioElementsArray.forEach((el) => {
        el.addEventListener('click', playPlaylist);
    });
};

const playPlaylist = (e: Event) => {
    const allAudio = Array.from((e.currentTarget as HTMLDivElement).querySelectorAll('source'));
    console.log(allAudio);
    let track = 0;

    const fetchAudioAndPlay = (track: number) => {
        fetch(`${allAudio[track].src}`)
            .then((response) => response.blob())
            .then((blob) => {
                audio.src = URL.createObjectURL(blob);
                return audio.play();
            })
            .catch(() => {
                audio.removeEventListener('ended', playingTrack);
            });
    };

    const playingTrack = () => {
        if (track < 2) {
            console.log('play');
            track++;
            console.log(track);
            console.log(allAudio[track].src);
            audio.load();
            fetchAudioAndPlay(track);
        } else {
            console.log('delete');
            track = 0;
            audio.removeEventListener('ended', playingTrack);
        }
    };

    audio.addEventListener('ended', playingTrack);
    audio.src = allAudio[0].src;
    audio.play();
};

draw();
