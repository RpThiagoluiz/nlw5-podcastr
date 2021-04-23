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
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
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

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setcurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        play,
        togglePlay,
        setPlayingState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  return context;
};

export { usePlayerContext, PlayerProvider };
