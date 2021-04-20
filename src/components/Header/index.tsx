import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

import styles from "./styles.module.scss";

export const Header = () => {
  //yarn add date-fns
  //lidar com datas no react
  //const currentDate = new Date().toLocaleDateString();

  const currentDate = format(new Date(), "EEEEEE, d MMMM", { locale: ptBR });

  return (
    <header className={styles.headerContainer}>
      <img src="./logo.svg" alt="" />
      <p>O melhor para voce ouvir, sempre</p>
      <span>{currentDate}</span>
    </header>
  );
};
