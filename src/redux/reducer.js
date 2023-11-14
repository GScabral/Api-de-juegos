import {
  PAGINADO,
  GET_JUEGOS,
  SEARCH_NAME,
  GENERS,
  ORDER,
  FILTER,
  SEARCH_ID,
  RESET_SEARCH_RESULTS,
} from "./action";

const initialState = {
  allJuegos: [],
  allGamesBackUp: [],
  currentPage: 1,
  filteredGames: [],
  filter: false,
  character: [],
  allGeners: [],
  orderGames: [],
  searchResults: [],
  totalPages: 1,
};

/////////////////////////////////////////////////////////////

const ITEMS_PER_PAGE = 15;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JUEGOS:
     
      const totalItems = action.payload.length;
      const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      console.log(totalPages)
      return {
        ...state,
        allJuegos: action.payload.slice(0, ITEMS_PER_PAGE),
        allGamesBackUp: action.payload,
        totalPages: totalPages,
      };
/////////////////////////////////////////////////////////////

case PAGINADO:
  if (action.payload === "reset") {
    return {
      ...state,
      currentPage: 1,
      filteredGames: [],
      filter: false,
    };
  } else {
    const nextPage = action.payload === "next" ? state.currentPage + 1 : state.currentPage - 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    if (state.filter) {
      if (startIndex >= state.filteredGames.length || startIndex < 0) return state;
    } else {
      if (startIndex >= state.allGamesBackUp.length || startIndex < 0) return state;
    }

    return {
      ...state,
      allJuegos: state.allGamesBackUp.slice(startIndex, endIndex),
      currentPage: nextPage,
    };
  }
        /////////////////////////////////////////////////////////////

    case SEARCH_NAME:
     
      console.log("Valor de action.payload (SEARCH_NAME):", action.payload);

      return {
        ...state,
        searchResults: action.payload,
        currentPage: 1,
      };
/////////////////////////////////////////////////////////////

    case ORDER:

    const newSortOrder = action.payload;

      let orderGame = [];

      if (newSortOrder === "AZ") {
        orderGame = [...state.allGamesBackUp].sort((prev, next) =>
          prev?.name.toLowerCase() > next?.name.toLowerCase() ? 1 : -1
        );
      } else if (newSortOrder === "ZA") {
        orderGame = [...state.allGamesBackUp].sort((prev, next) =>
          prev?.name.toLowerCase() < next?.name.toLowerCase() ? 1 : -1
        );
      } else if (newSortOrder === "ratingAsc") {
        orderGame = [...state.allGamesBackUp].sort((prev, next) =>
          prev.rating - next.rating
        );
      } else if (newSortOrder === "ratingDesc") {
        orderGame = [...state.allGamesBackUp].sort((prev, next) =>
          next.rating - prev.rating
        );
      }

      return {
        ...state,
        allJuegos: [...orderGame].slice(0, ITEMS_PER_PAGE),
        allGamesBackUp: orderGame,
        sortOrder:newSortOrder,
        currentPage: 1,
      };
/////////////////////////////////////////////////////////////

    case GENERS:
      return {
        ...state,
        allGeners: action.payload,
      };
/////////////////////////////////////////////////////////////

      case FILTER:
        const newGentrefilter = action.payload;
        const filterByGenres = state.allGamesBackUp.filter((game) =>
        Array.isArray(game.genres) && game.genres.some((genre) => genre.name === action.payload)
      );
  console.log("Juegos filtrados por género:", filterByGenres);


  const totalFilteredItem = filterByGenres.length;
  const totalFilteredPages = Math.ceil(totalFilteredItem/ITEMS_PER_PAGE)

  return {
    ...state,
    allJuegos: filterByGenres.slice(0, ITEMS_PER_PAGE),
    filteredGames: filterByGenres,
    filter: true,
    totalPages:totalFilteredPages,
    filters:{...state.filters,genre:newGentrefilter}
  };
  /////////////////////////////////////////////////////////////
    
     
    case SEARCH_ID:
      return {
        ...state,
        character: action.payload,
      };
/////////////////////////////////////////////////////////////

    case RESET_SEARCH_RESULTS:
      console.log("Restableciendo resultados de búsqueda...");
      return {
        ...state,
        searchResults: [],
        currentPage: 1,
        firstIndex: 0,
      };

/////////////////////////////////////////////////////////////


    
     default:
      return state;
  }
}

export default reducer;
