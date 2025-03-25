import { // importar ações da pasta actions 
  GET_CHARACTERS,
  RESET_CHARACTERS,
  GET_CHARACTER,
  GET_CHARACTER_COMICS,
  GET_CHARACTER_EVENTS,
  RESET_CHARACTER_COMICS,
  RESET_CHARACTER_EVENTS,
  GET_COMICS,
  GET_COMIC,
  GET_EVENTS,
  ADD_CHARACTER_TO_FAVOURITES,
  REMOVE_CHARACTER_FROM_FAVOURITES,
  ADD_COMIC_TO_FAVOURITES,
  REMOVE_COMIC_FROM_FAVOURITES,
  GET_STORIES,
} from "../actions";
import md5 from "js-md5"; //importação da biblioteca md5 para geração de hash

//  chaves da API 
const PUBLIC_KEY = "895f2dd3d5a162aa45ef3e70be4bd69d"; 
const TIME_STAMP = Date.now().toString();
// funcao que gera o hash para autenticar API
const hashGenerator = () => {
  const PRIVATE_KEY = "2ee45e44c5fbae6693edb932e84171aed01f3f22"; 
  const HASH = md5.create();
  HASH.update(TIME_STAMP + PRIVATE_KEY + PUBLIC_KEY);
  return HASH.hex();
};
// Ação para buscar personagens
export const getCharacters = (character) => {
  const hash = hashGenerator(); //gera hash
  const URL = `https://gateway.marvel.com:443/v1/public/characters?ts=${TIME_STAMP}&nameStartsWith=${character}&limit=50&apikey=${PUBLIC_KEY}&hash=${hash}`;
  return (dispatch) => {
    fetch(URL) // faz a requisição à API
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_CHARACTERS, payload: data.data.results });
        console.log(data.data.results);
      })
      .catch((err) => console.error(err));
  };
};
// Ação para resetar a lista de personagens 
export const resetCharacters = () => {
  console.log("reset");
  return {
    type: RESET_CHARACTERS,
  };
};
// Busca um personagem especifico pelo nome
export const getCharacter = (name) => {
  const hash = hashGenerator();
  const URL = `https://gateway.marvel.com:443/v1/public/characters?name=${name}&ts=${TIME_STAMP}&apikey=${PUBLIC_KEY}&hash=${hash}`;
  return (dispatch) => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_CHARACTER, payload: data.data.results[0] });
        console.log(data.data.results[0]);
      })
      .catch((err) => console.error(err));
  };
};
// Busca quadrinhos especificos com o ID
export const getCharacterComics = (id) => {
  const hash = hashGenerator();
  const URL = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=${TIME_STAMP}&limit=50&apikey=${PUBLIC_KEY}&hash=${hash}`;
  return (dispatch) => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.results);
        dispatch({ type: GET_CHARACTER_COMICS, payload: data.data.results });
      })
      .catch((err) => console.error(err));
  };
};
// busca eventos especificos pelo id 
export const getCharacterEvents = (id) => {
  const hash = hashGenerator();
  const URL = `https://gateway.marvel.com:443/v1/public/characters/${id}/events?ts=${TIME_STAMP}&apikey=${PUBLIC_KEY}&hash=${hash}`;
  return (dispatch) => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.results);
        dispatch({ type: GET_CHARACTER_EVENTS, payload: data.data.results });
      })
      .catch((err) => console.error(err));
  };
};
// reseta a lista de quadrinhos de um personagem
export const resetCharacterComics = () => {
  return {
    type: RESET_CHARACTER_COMICS,
  };
};
// reseta a lista de eventos de um personagem 
export const resetCharacterEvents = () => {
  return {
    type: RESET_CHARACTER_EVENTS,
  };
};
// Ação para buscar quadrinhos
export const getComics = (character) => {
  const hash = hashGenerator();
  const URL = `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${character}&ts=${TIME_STAMP}&apikey=${PUBLIC_KEY}&hash=${hash}`;
  return (dispatch) => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_COMICS, payload: data.data.results });
        console.log(data.data.results);
      })
      .catch((err) => console.error(err));
  };
};
// Ação para buscar um quadrinho especifico
export const getComic = (id) => {
  const hash = hashGenerator();
  const URL = `https://gateway.marvel.com:443/v1/public/comics/${id}?ts=${TIME_STAMP}&apikey=${PUBLIC_KEY}&hash=${hash}`;
  return (dispatch) => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_COMIC, payload: data.data.results[0] });
        console.log(data.data.results[0]);
      })
      .catch((err) => console.error(err));
  };
};
// Ação para buscar eventos 
export const getEvents = (eventName) => {
  const hash = hashGenerator();
  const URL = `https://gateway.marvel.com:443/v1/public/events?nameStartsWith=${eventName}&ts=${TIME_STAMP}&limit=10&apikey=${PUBLIC_KEY}&hash=${hash}`;
  return (dispatch) => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_EVENTS, payload: data.data.results });
        console.log(data.data.results);
      })
      .catch((err) => console.error(err));
  };
};
// Ação para adicionar um personagem aos favoritos
export const addCharacterToFavourites = (id) => {
  return {
    type: ADD_CHARACTER_TO_FAVOURITES,
    payload: id,
  };
};
// Remove um personagem dos favoritos
export const removeCharacterFromFavourites = (id) => {
  return {
    type: REMOVE_CHARACTER_FROM_FAVOURITES,
    payload: id,
  };
};
//  adiciona um quadrinho aos favoritos
export const addComicToFavourites = (id) => {
  return {
    type: ADD_COMIC_TO_FAVOURITES,
    payload: id,
  };
};
// remove um quadrinho dos favoritos
export const removeComicFromFavourites = (id) => {
  return {
    type: REMOVE_COMIC_FROM_FAVOURITES,
    payload: id,
  };
};
// Ação para buscar histórias
export const getStories = () => {
  const hash = hashGenerator();
  const URL = `https://gateway.marvel.com:443/v1/public/stories?creators=30&limit=10&ts=${TIME_STAMP}&apikey=${PUBLIC_KEY}&hash=${hash}`;
  return (dispatch) => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_STORIES, payload: data.data.results });
        console.log(data.data.results);
      })
      .catch((err) => console.error(err));
  };
};
