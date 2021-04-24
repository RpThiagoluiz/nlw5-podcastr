import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useRef, useState } from "react";
import { usePlayerContext } from "../../contexts/PlayerContext";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import styles from "./styles.module.scss";

export const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  //boa pratica inicar ela em null.
  //dentro do type script vmo tipar o elemento q ta la dentro
  const [progress, setProgress] = useState(0); //armazenar quanto tempo em segundos ja percorreu

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    hasNext,
    hasPrevious,
    isLooping,
    isShuffling,
    togglePlay,
    toogleLoop,
    toggleShuffle,
    playNext,
    playPrevious,
    setPlayingState,
    clearPlayerState,
  } = usePlayerContext();

  const episode = episodeList[currentEpisodeIndex];

  //Toda vez q o isPlay mude o valor quero que algo acontece.
  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  //?. verificar se ter valor e envia {episode?.title}

  function setupProgressListener() {
    audioRef.current.currentTime = 0;
    //Sempre que mudar o play, voltar para zero
    audioRef.current.addEventListener("timeupdate", () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando Agora" />
        <strong>Tocando agora </strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode && styles.empty}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
          {/* Se o episode.duration existir manda ele, se nao vc vai mandar o 0 
              Se tiver vazio vai o 0
          */}
        </div>

        {episode && (
          <audio
            src={episode.url}
            autoPlay
            loop={isLooping}
            ref={audioRef}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
            onEnded={handleEpisodeEnded}
          />
        )}

        <div className={styles.buttons}>
          <button
            type="button"
            disabled={!episode || episodeList.length === 1}
            className={isShuffling && styles.active}
            onClick={toggleShuffle}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button
            type="button"
            disabled={!episode || !hasPrevious}
            onClick={playPrevious}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            {/* Se nao recebe parametro a func passada no onClick nao precisa estar em uma arrowFunction */}
            {isPlaying ? (
              <img src="/pause.svg" alt="Tocar" />
            ) : (
              <img src="/play.svg" alt="Pausar" />
            )}
          </button>
          <button
            type="button"
            disabled={!episode || !hasNext}
            onClick={playNext}
          >
            <img src="/play-next.svg" alt="Tocar proxima" />
          </button>
          <button
            type="button"
            disabled={!episode}
            onClick={toogleLoop}
            className={isLooping && styles.active}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
};
