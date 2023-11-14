import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getJuegosId } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./detail.css";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const character = useSelector((state) => state.character);
  
    useEffect(() => {
      dispatch(getJuegosId(id)); 
    }, [id, dispatch]); 

    console.log("Datos del juego:", character);

  return (
    <div className="detail-background">
      {character && (
        <div>
          <div>
            <img className="detail-image" src={character.image} alt="" />
          </div>
          <h1 className="detail-title">ID: {character.id}</h1>
          <h1 className="detail-title">Nombre: {character.name}</h1>
          <p className="detail-description">Descripción: {character.description}</p>
          <p className="detail-details">Fecha de lanzamiento: {character.released}</p>
          <p className="detail-details">Rating: {character.rating}</p>
          <p className="detail-details">Géneros: {character.genres && character.genres.join(", ")}</p>
          <p>Plataformas: {character.platforms && Array.isArray(character.platforms) ? character.platforms.join(', ') : character.platforms}</p>
        </div>
      )}

      <Link className="volver" to={"/home"}>
        Volver
      </Link>
    </div>
  );
};

export default Detail;
