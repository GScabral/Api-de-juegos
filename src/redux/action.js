
import axios from "axios";

export const SEARCH_NAME="SEARCH_NAME";
export const GET_JUEGOS="GET_JUEGOS";
export const PAGINADO="PAGINADO";
export const GAME_PAGE="GAME_PAGE";
export const SEARCH_ID="SEARCH_ID";
export const GENERS="GENERS";
export const CREATE_GAME="CREATE_GAME";
export const  FILTER="FILTER";
export const ORDER="ORDER";
export const RESET_SEARCH_RESULTS="RESET_SEARCH_RESULTS"
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";


export const searchByName = (name) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/juegos/name/${name}`);
    
  
        if (response.data.length > 0) {
          dispatch({
            type: SEARCH_NAME,
            payload: response.data, // Almacena los resultados combinados
          });
        } else {
          // Maneja el caso en el que no se encontraron resultados
          console.log("No se encontraron resultados");
          dispatch({
            type: SEARCH_NAME,
            payload: "", // Establecer payload como una cadena vacía
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
  };


  export const getJuegosId = (id) => {
    return async function (dispatch) {
      try {
        const respuesta = await axios.get(`http://localhost:3001/juegos/id/${id}`);
        console.log("Datos de juego obtenidos:",respuesta.data);
        dispatch({
          type: SEARCH_ID,
          payload: respuesta.data,
        });
      } catch (error) {
        console.error(error);
      }
    };
}

 export const getJuegos = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/juegos/todos`);

             dispatch({
                type: GET_JUEGOS,
                payload: response.data,
           });
       } catch (error) {
           console.error(error);
        }
     };
 };



export const getGenres = () => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/generos/generos`);
        const genresData = response.data; // Datos de géneros recibidos del servidor
       
        dispatch({
          type: GENERS,
          payload: genresData, // Almacena los datos de géneros en el estado
        });
      } catch (error) {
        console.error("Error al traer los géneros", error);
      }
    };
  };

  export const createGame = (state) => {
    return async function (dispatch) {
      try {
        await axios.post(`http://localhost:3001/juegos/nuevo`, state);
  
        alert("Juego creado con éxito.");
      } catch (error) {
        console.log(error);
        alert(error.response.data.error);
      }
    };
  };
  export const filterGames = (genres) => {
    return async function (dispatch) {
    
    
      try {
        dispatch({
          type: FILTER,
          payload: genres,
          
        });
      } catch (error) {
        console.error(error);
      }
    };
  };
  
  
  export function orderGamesAction(orderAux){
    return async function(dispatch){
        try {
            dispatch({
               type: ORDER,
               payload: orderAux
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
  }
  export function paginado(order) {
      return async function(dispatch){
          try{
              dispatch({
                  type:PAGINADO,
                  payload:order
              })
          }catch (error) {
              alert(error.response.data.error)
          }
      }
  }
  export const resetSearchResults = () => ({
    type: RESET_SEARCH_RESULTS,
  });

 

  export const filterBySource = (source) => {
    return async function (dispatch) {
      console.log("esto es la action",source)
      try {
        dispatch({
          type: FILTER_BY_SOURCE,
          payload:source,
        });
      } catch (error) {
        console.error(error);
      }
    };
  };