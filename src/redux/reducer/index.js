import { //importa ações
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
// estado inicial 
const initialState = { 
  characters: [], 
  character: {},
  characterComics: [],
  characterEvents: [],
  favouriteCharacters: [],
  favouriteComics: [],
  comics: [],
  comic: {},
  events: [],
  stories: [], 
};
// Redutor principal da aplicação
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS: //filtrar personagens com imagens válidas 
      const chars = action.payload.filter( 
        (character) =>
          character.thumbnail.path.split("/").pop() !== "image_not_available" &&
          character.thumbnail.extension !== "gif"
      );
      return {
        ...state,
        characters: chars,
      };

    case GET_CHARACTER:
      return {
        ...state,
        character: action.payload, //Define os detalhes do personagem
      };
      
//filtrar quadrinho validos 
    case GET_CHARACTER_COMICS:
      if (!action.payload.length)
        return {
          ...state,
          characterComics: "N/A",
        };
      const filteredComics = action.payload.filter(
        (comic) =>
          comic.thumbnail.path.split("/").pop() !== "image_not_available" &&
          comic.thumbnail.extension !== "gif"
      );  
      return {
        ...state,
        characterComics: filteredComics,
      };

//  definir eventos ou N/A
    case GET_CHARACTER_EVENTS:
      if (!action.payload.length)
        return {
          ...state,
          characterEvents: "N/A",
        };
      return {
        ...state,
        characterEvents: action.payload,
      };
// Reseta  quadrinhos do personagem 
    case RESET_CHARACTER_COMICS:
      return {
        ...state,
        characterComics: [],
      };
// reseta eventos do personagem
    case RESET_CHARACTER_EVENTS:
      return {
        ...state,
        characterEvents: [],
      };
// reseta  personagens 
    case RESET_CHARACTERS:
      return {
        ...state,
        characters: [],
      };
// adiciona personagem ao favorito
    case ADD_CHARACTER_TO_FAVOURITES:
      const character = state.characters.find(
        (char) => char.id === action.payload
      );

      return {
        ...state,
        favouriteCharacters: [...state.favouriteCharacters, character],
      };
// remove personagens do favoritos 
    case REMOVE_CHARACTER_FROM_FAVOURITES:
      return {
        ...state,
        favouriteCharacters: state.favouriteCharacters.filter(
          (char) => char.id !== action.payload
        ),
      };
// adiciona quadrinhos aos favoritos
    case ADD_COMIC_TO_FAVOURITES:
      const comic = state.comics.find((comic) => comic.id === action.payload);
      const charComic = state.characterComics.find(
        (comic) => comic.id === action.payload
      );
      return {
        ...state,
        favouriteComics: [...state.favouriteComics, comic ? comic : charComic],
      };
// remove quadrinhos dos favoritos 
    case REMOVE_COMIC_FROM_FAVOURITES:
      return {
        ...state,
        favouriteComics: state.favouriteComics.filter(
          (comic) => comic.id !== action.payload
        ),
      };
// filtra quadrinhos 
    case GET_COMICS: 
      const comics = action.payload.filter(
        (comic) =>
          comic.thumbnail.path.split("/").pop() !== "image_not_available" &&
          comic.thumbnail.extension !== "gif"
      );
      return {
        ...state,
        comics: comics,
      };

    case GET_COMIC:
      return {
        ...state,
        comic: action.payload, //define detalhes do quadrinho
      };

    case GET_EVENTS:
      return {
        ...state,
        events: action.payload, //define a lista de eventos
      };

  
    case GET_STORIES:
      return {
        ...state,
        stories: action.payload, //define a lista de histórias
      };


    default:
      return state;
  }
}
