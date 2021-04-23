import "../styles/global.scss";
import { Header } from "../components/Header";
import { Player } from "../components/Player";

import styles from "../styles/app.module.scss";
import { PlayerProvider } from "../contexts/PlayerContext";

function MyApp({ Component, pageProps }) {
  //Shor sintaxe -> value={{ episodeList:episodeList, currentEpisodeIndex:currentEpisodeIndex}}
  return (
    <PlayerProvider>
      <div className={styles.appWrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerProvider>
  );
}

export default MyApp;
