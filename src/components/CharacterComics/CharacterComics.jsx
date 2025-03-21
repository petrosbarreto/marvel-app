import { useSelector } from "react-redux";
import Comic from "../Comic/Comic";
import { NavLink } from "react-router-dom";
import s from "./CharacterComics.module.css";
import loadingImg from "../../images/loading-img.gif";

const CharacterComics = () => {
  const characterComics = useSelector((state) => state.characterComics);

  if (characterComics === "N/A")
    return (
      <div className={s.noCharacters}>
        <h1>Este personagem não tem quadrinhos para mostrar</h1>
        <NavLink className={s.link} to="/">
          <span>←Go back</span>
        </NavLink>
      </div>
    );
  else if (!characterComics.length)
    return <img className={s.loading_Img} src={loadingImg} alt="Loading" />;

  return (
    <div className={s.cardsContainer}>
      {characterComics &&
        characterComics.map((comic) => (
          <Comic
            key={comic.id}
            id={comic.id}
            prices={comic.prices}
            poster={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            title={comic.title}
          />
        ))}
    </div>
  );
};

export default CharacterComics;
