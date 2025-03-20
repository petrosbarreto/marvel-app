import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Event from "../Event/Event";
import s from "./CharacterEvents.module.css";
import loadingImg from "../../images/loading-img.gif";

const CharacterEvents = () => {
  const events = useSelector((state) => state.characterEvents);

  if (events === "N/A")
    return (
      <div className={s.noCharacters}>
        <h1>Este personagem não tem eventos para mostrar</h1>
        <NavLink className={s.link} to="/">
          <span>←Voltar</span>
        </NavLink>
      </div>
    );
  else if (!events.length)
    return <img className={s.loading_Img} src={loadingImg} alt="Carregando" />;

  return (
    <div className={s.cardsContainer}>
      {events &&
        events.map((event) => {
          return (
            <Event
              key={event.id}
              title={event.title}
              creators={event.creators}
              description={event.description}
              comics={event.comics}
              characters={event.characters}
              poster={`${event.thumbnail.path}.${event.thumbnail.extension}`}
            />
          );
        })}
    </div>
  );
};

export default CharacterEvents;
