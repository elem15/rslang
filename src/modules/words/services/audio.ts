const audio = new Audio();

export const audioPlayerListener = () => {
    const audioElementsArray = document.querySelectorAll('.item__audio');
    audioElementsArray.forEach((el) => {
        el.addEventListener('click', playPlaylist);
    });
};

const playPlaylist = (e: Event) => {
    const allAudio = Array.from((e.currentTarget as HTMLDivElement).querySelectorAll('source'));
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
            track++;
            audio.load();
            fetchAudioAndPlay(track);
        } else {
            track = 0;
            audio.removeEventListener('ended', playingTrack);
        }
    };

    audio.addEventListener('ended', playingTrack);
    audio.src = allAudio[0].src;
    audio.play();
};
