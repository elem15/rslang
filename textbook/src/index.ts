import './global.css';
import './global.scss';
import { Dictionary } from './types';

const base = 'http://localhost:1000';
const words = `${base}/words`;
//let isPlay = false;

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

draw();
const audio = new Audio();

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
            .then((_) => {
                // Video playback started ;)
                console.log('track');
            })
            .catch((e) => {
                console.log(e);
                // Video playback failed ;(
            });
    };

    const playingTrack = () => {
        if (track < 2) {
            console.log('play');
            // allAudio[track].removeEventListener('ended', playingTrack, false);
            track++;
            console.log(track);
            console.log(allAudio[track].src);
            // audio.src = allAudio[track].src;
            audio.load();
            // audio.play();
            fetchAudioAndPlay(track);
        } else {
            audio.removeEventListener('ended', playingTrack, false);
        }
    };

    audio.addEventListener('ended', playingTrack);
    audio.src = allAudio[0].src;
    audio.play();
};

// const audioPlayerListener = () => {
//     const audioElementsArray = document.querySelectorAll('.item__audio');
//     console.log(audioElementsArray);
//     console.log(audioElementsArray[0].firstChild);
//     audioElementsArray.forEach((el) => {
//         el.addEventListener('click', playPlaylist);
//     });
// };

// const playPlaylist = (e: Event) => {
//     const allAudio = Array.from((e.currentTarget as HTMLDivElement).querySelectorAll('audio'));
//     let track = 0;
//     const playingTrack = () => {
//         if (track === allAudio.length - 1) {
//             allAudio[track].pause();
//             console.log('stop');
//             allAudio[track].removeEventListener('ended', playingTrack);
//             isPlay = false;
//         } else {
//             console.log('play');
//             allAudio[track].removeEventListener('ended', playingTrack);
//             track++;
//             allAudio[track].play();
//             isPlay = true;
//         }
//     };

//     if (!isPlay) {
//         console.log('enter');
//         isPlay = true;
//         console.log(e.currentTarget);
//         console.log(allAudio);
//         allAudio[0].play();

//         allAudio.forEach((item) => {
//             item.addEventListener('ended', playingTrack);
//         });
//     } else {
//         console.log('break');
//         allAudio[0].removeEventListener('ended', playingTrack);
//         allAudio[1].removeEventListener('ended', playingTrack);
//         allAudio[2].removeEventListener('ended', playingTrack);
//         allAudio.forEach((item) => {
//             item.pause();
//             item.currentTime = 0;
//         });

//         allAudio.forEach((item) => {
//             item.removeEventListener('ended', playingTrack, false);
//         });
//         isPlay = false;
//     }
// };
