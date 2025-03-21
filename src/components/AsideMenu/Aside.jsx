import { NavLink } from "react-router-dom";
import s from "./Aside.module.css";

const Aside = () => {
  return (
    <aside>
      <ul className={s.asideMenu}>
        <NavLink className={s.link} to="/characters/favourites">
          <li>Personagens Favoritos</li>
        </NavLink>
        <NavLink className={s.link} to="/comics/favourites">
          <li>Quadrinhos Favoritos</li>
        </NavLink>
      </ul>
    </aside>
  );
};

export default Aside;
