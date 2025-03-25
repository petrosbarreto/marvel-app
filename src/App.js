//  importação vindo da pasta componentes
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import Characters from "./components/Characters/Characters.jsx";
import CharacterComics from "./components/CharacterComics/CharacterComics.jsx";
import Comics from "./components/Comics/Comics";
import Events from "./components/Events/Events.jsx";
import Stories from "./components/Stories/Stories.jsx";
import "./App.css";
import CharacterEvents from "./components/CharacterEvents/CharacterEvents.jsx";
import Aside from "./components/AsideMenu/Aside.jsx";
import FavouriteCharacters from "./components/FavouriteCharacters/FavouriteCharacters.jsx";
import FavouriteComics from "./components/FavouriteComics/FavouriteComics.jsx";

function App() {
  return (
    <div className="App">
      <Nav />
      <Aside /> 
      <Routes> 
        <Route path="/" element={<Characters />} /> //rota personagens
        <Route path="/comics" element={<Comics />} /> //rota para quadrinhos
        <Route path="/events" element={<Events />} />      //rota para eventos
                <Route
          path="/characters/favourites"
          element={<FavouriteCharacters />} //rota para personagens favoritos
        />
        <Route path="/comics/favourites" element={<FavouriteComics />} /> //quadrinhos favoritos 
        <Route path="/character/:name/comics" element={<CharacterComics />} /> /quadrinho especifico usando nome/
        <Route path="/character/:name/events" element={<CharacterEvents />} /> //personagem especifico, usando nome 
      </Routes>
    </div>
  );
}

export default App;
