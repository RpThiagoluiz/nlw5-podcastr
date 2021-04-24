import { createContext, ReactNode, useContext, useState } from "react";

type Episode = {
  //Somente as infos que serao utilizadas
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Array<Episode>; //Episode[]
  currentEpisodeIndex: number; //Apontar em qual posicao esta tocando
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  playList: (list: Episode[], index: number) => void;
  play: (episode: Episode) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  toogleLoop: () => void;
  toggleShuffle: () => void;
  setPlayingState: (state: boolean) => void;
  clearPlayerState: () => void;
};

type PlayerProviderProps = {
  children: ReactNode;
};

//Quando clicado no play vai adicionar um novo valor ao context.
//Chamar uma funcao que atribui um novo valor para a variavel.
//No click do play buttom

const PlayerContext = createContext({} as PlayerContextData); //o valor somente os dados que serao utilizados, nao valor iniciado

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setcurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function playList(list: Episode[], index: number) {
    //passar a lista, e o episodio q ta tocando.
    setEpisodeList(list);
    setcurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setcurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    //setIsPlaying(!isPlaying);
    setIsPlaying((prevState) => !prevState);
  }

  function toogleLoop() {
    setIsLooping((prevState) => !prevState);
  }

  function toggleShuffle() {
    setIsShuffling((prevState) => !prevState);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );
      //Deixar o range no alcance
      //floor aredondar o numero random
      setcurrentEpisodeIndex(nextRandomEpisodeIndex); //ver como passar o prevSate aq, cansando ja.
    } else if (hasNext) {
      setcurrentEpisodeIndex((prevState) => prevState + 1);
    }

    //Tambem da
    // if(nextEpisode< episodeList.length){
    //   setcurrentEpisodeIndex((prevState) => prevState + 1);
    // }

    //setcurrentEpisodeIndex(currentEpisodeIndex + 1)
  }

  function playPrevious() {
    if (hasPrevious) {
      setcurrentEpisodeIndex((prevState) => prevState - 1);
    }
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setcurrentEpisodeIndex(0);
    setIsPlaying(false);
  }

  return (
    //Shor sintaxe -> value={{ episodeList:episodeList, currentEpisodeIndex:currentEpisodeIndex}}
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        hasNext,
        hasPrevious,
        playList,
        play,
        playNext,
        playPrevious,
        togglePlay,
        toogleLoop,
        toggleShuffle,
        setPlayingState,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayerContext = () => {
  // const context = useContext(PlayerContext);
  // return context;
  return useContext(PlayerContext);
};

export { usePlayerContext, PlayerProvider };
