import { useEffect } from "react";

export default function Home(props) {
  //SPA -> Sempre que algo mudar algo acontece, efeito colateral, side effect
  console.log(props.episodes);

  return <h1>Index</h1>;
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
}
