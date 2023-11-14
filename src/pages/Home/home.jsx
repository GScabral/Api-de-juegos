import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import "./home.css";
import Cards from "./cards/cards";
import Nav from "./nav/nav";
import Loading from "./carga/loading";
import {
  searchByName,
  getJuegos,
  getGenres,
  filterGames,
  orderGamesAction,
  paginado,
  resetSearchResults,
} from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const allJuegos = useSelector((state) => state.allJuegos);
  const allGeners = useSelector((state) => state.allGeners) || [];
  const searchResults = useSelector((state) => state.searchResults);
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);
  const [originFilter, setOriginFilter] = useState("");



  

  const resetFilters = () => {
    setLoading(true);
    dispatch(orderGamesAction("az"));
    dispatch(filterGames({ genre: "todos", source: "todos" }));
    dispatch(getJuegos());
    dispatch(resetSearchResults());
    dispatch(paginado("reset"));
    setOriginFilter("");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleSearch = async (name) => {
    try {
      dispatch(searchByName(name));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getJuegos())
      .then((juegos) => {
        
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [dispatch]);



  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const ordenarJuegos = (event) => {
    dispatch(orderGamesAction(event.target.value));
  };

  const filtrarJuegos = (event) => {
    dispatch(filterGames(event.target.value, originFilter));
  }
  
  
  const paginate = (event) => {
    dispatch(paginado(event.target.name));
  }

  return (
    <div className="home-fondo">
      <div className="barra">
        {location.pathname !== "/" && <Nav onSearch={handleSearch} />}
        <div className="nombre-home">Restablecer</div>
        <button id="reset-button" onClick={resetFilters}  aria-label="Restablecer filtros">
        <FontAwesomeIcon icon={faSync} /> {/* Icono de recarga de FontAwesome */}
        </button>
        <div className="nombre-home">Ordenamintos</div>
        <select onChange={ordenarJuegos} className="miSelect">
          <option value="todos">todos</option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
          <option value="ratingAsc">Rating ASC</option>
          <option value="ratingDesc">Rating DES</option>
        </select>
        <div className="nombre-home">Filtros</div>
        <select onChange={filtrarJuegos} className="miSelect">
          <option value="TODOS">todos</option>
          {allGeners.map((genre) => (
            <option key={`${genre.id}-${genre.name}`} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="home-container">
      {isLoading ? (
    <Loading />
) : (searchResults.length > 0 ? searchResults : allJuegos).map((juego) => (
    <Cards key={juego.id} juego={juego} />
))}
</div>
      <div className="botones">
        <div>
          <p className="paginado">{currentPage} de {totalPages}</p>
        </div>
        <button name="prev" onClick={() => currentPage > 1 && dispatch(paginado("prev"))} disabled={currentPage === 1}>
  PREV
</button>
<button name="next" onClick={() => currentPage < totalPages && dispatch(paginado("next"))} disabled={currentPage === totalPages}>
  NEXT
</button>
      </div>
    </div>
  );
};

export default Home;
