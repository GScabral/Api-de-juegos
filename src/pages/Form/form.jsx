import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, createGame } from "../../redux/action";
import "../Form/form.css";
import { Link } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(false);
  const allGenres = useSelector((state) => state.allGeners);

  const [state, setState] = useState({
    name: "",
    image: "",
    rating: "",
    released: "",
    platforms: "",
    description: "",
    genres: [],
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });

  };

  const isValidDate = (dateString) => {
    const newDate = new Date(dateString);
    return !isNaN(newDate.getTime()) && newDate.toISOString().slice(0, 10) === dateString;
  };

  const handleGenreChange = (event) => {
    const { name, checked } = event.target;
    const updatedSelectedGenres = checked
      ? [...state.genres, name]
      : state.genres.filter((genre) => genre !== name);
    setState({
      ...state,
      genres: updatedSelectedGenres,
    });
    console.log("en el form", state.genres)
  };

  useEffect(() => {

    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};

      // name
      if (!state.name) {
        newErrors.name = "El nombre es requerido";
      } else if (state.name.length < 3) {
        newErrors.name = "El nombre debe tener al menos 3 caracteres";
      } else if (!/^[a-zA-Z0-9 ]+$/.test(state.name)) {
        newErrors.name = "El nombre no debe contener caracteres especiales";
      } else {
        newErrors.name = "";
      }


      // image
      if (!state.image) {
        newErrors.image = "Imagen requerida";
      }
      // description
      if (!state.description) { // Nombre de propiedad corregido: "description"
        newErrors.description = "Debe tener una descripción mínima";
      } else if (state.description.length < 10) {
        newErrors.description = "Debe tener más de 10 caracteres";
      } else {
        newErrors.description = "";
      }
      // releaseDate
      if (!state.released) {
        newErrors.released = "Fecha requerida";
      } else if(!isValidDate(state.released)) {
        newErrors.released = "fecha invalida";
      }else{
        newErrors.released=""
      }


      //platafomr
      if (!state.platforms) {
        newErrors.platforms = "debe tener minimo una plataforma";
      } else if (!/^(\w{3,},)*\w{3,}$/.test(state.genres)) {
        newErrors.platforms = "los generos deben estar separados por una coma"
      } else {
        newErrors.platforms = ""
      }

      // rating
      if (!state.rating) {
        newErrors.rating = "El rating es requerido";
      } else if (isNaN(state.rating)) {
        newErrors.rating = "El rating debe ser un número";
      } else if (state.rating < 0 || state.rating > 10) {
        newErrors.rating = "El rating debe estar entre 0 y 10";
      } else {
        newErrors.rating = "";
      }

      //generes
      if (!state.genres.length) {
        newErrors.genres = "Selecciona al menos un género";
      } else {
        newErrors.genres = "";
      }


      const isValid = Object.values(newErrors).every((error) => error === "");

      setError(newErrors);
      setIsValid(isValid);
    };
    validateForm();
  }, [state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Estado antes de enviar el formulario:", state);
    console.log("Géneros seleccionados en el formulario:", state.genres);
    dispatch(createGame(state));
  };

  return (
    <div className="form-container">
      <Link className="home-form" to="/home">
        Volver a la Home
      </Link>
      <label className="form-label" htmlFor="name">
        NAME:
      </label>
      <input onChange={handleChange} value={state.name} type="text" name="name" />

      {error.name && <p className="error-message">{error.name}</p>}

      <label className="form-label" htmlFor="image">
        Imagen URL:
      </label>
      <input onChange={handleChange} value={state.image} type="text" name="image" />

      {error.image && <p className="error-message">{error.image}</p>}

      <label className="form-label" htmlFor="description">
        DESCRIPTION
      </label>
      <input onChange={handleChange} value={state.description} type="text" name="description" />
      {error.description && <p className="error-message">{error.description}</p>}

      <label className="form-label" htmlFor="platforms">
        PLATAFORMAS
      </label>
      <input onChange={handleChange} value={state.platforms} type="text" name="platforms" />
      {error.platforms && <p className="error-message">{error.platforms}</p>}

      <label className="form-label" htmlFor="released">
        RELEASE DATE
      </label>
      <input onChange={handleChange} value={state.released} type="date" name="released" />
      {error.released && <p className="error-message">{error.released}</p>}

      <label className="form-label" htmlFor="rating">
        RATING
      </label>
      <input onChange={handleChange} value={state.rating} type="number" name="rating" />
      {error.rating && <p className="error-message">{error.rating}</p>}

      <label className="form-label">Género/s</label>
      {Array.isArray(allGenres) &&
        allGenres.map((genre) => (
          <div key={genre.id} >
            <input
              type="checkbox"
              name={genre.name}
              checked={state.genres.includes(genre.name)}
              onChange={handleGenreChange}
            />
            {genre.name}

          </div>
        ))}
      {error.genres && <p className="error-message">{error.genres}</p>}

      <button
        className={`form-button ${isValid ? "valid-button" : "invalid-button"}`}
        disabled={!isValid}
        onClick={handleSubmit}
        type="submit"
      >
        Create
      </button>
    </div>
  );
};

export default Form;
