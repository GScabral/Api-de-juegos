const axios = require("axios");
const { Videogame, Genre } = require('../db');

const gameId = async (id) => {
    try {
        if (!id) {
            throw new Error("Ingrese un ID válido.");
        }

        let juegoInfo;

        try {
            juegoInfo = await Videogame.findByPk(id, {
                include: Genre,
            });
        } catch (dbError) {
            console.error("Error en la consulta a la base de datos", dbError);
            throw new Error("Error en la búsqueda en la base de datos");
        }

        if (!juegoInfo) {
            try {
                const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=cc59f918c382447f93dabde46f654a96`);
                const idJuego = response.data;
                const genres = idJuego.genres.map((genre) => genre.name);
                const platforms = idJuego.platforms.map((platformInfo) => platformInfo.platform.name);

                return {
                    id: idJuego.id,
                    name: idJuego.name,
                    description: idJuego.description_raw,
                    platforms: platforms,
                    image: idJuego.background_image,
                    rating: idJuego.rating,
                    released: idJuego.released,
                    genres: genres,
                };
            } catch (apiError) {
                console.error("Error en la API", apiError);
                throw new Error("Error en la búsqueda en la API");
            }
        }

        
        const dbResult = {
            id: juegoInfo.id,
            name: juegoInfo.name,
            description: juegoInfo.description,
            platforms: juegoInfo.platforms,
            image: juegoInfo.image,
            rating: juegoInfo.rating,
            released: juegoInfo.released,
            genres: juegoInfo.Genres, 
        };

        return dbResult;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = gameId;
