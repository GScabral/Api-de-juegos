const {Videogame}= require("../db");
const {Genres}= require("../db");

const createNewGame = async (juegoData) => {
    try {
        const { name, image, description, platforms, rating, released, genres } = juegoData;

        if (!name) {
            throw new Error("Falta el nombre.");
        } else if (!image) {
            throw new Error("Falta la imagen.");
        } else if (!description) {
            throw new Error("Falta la descripción.");
        } else if (!platforms) {
            throw new Error("Falta plataforma.");
        } else if (!rating) {
            throw new Error("Falta el rating.");
        } else if (!released) {
            throw new Error("Falta la fecha.");
        } else if (!genres || genres.length === 0) {
            throw new Error("Falta seleccionar al menos un género.");
        }

        console.log("Géneros seleccionados en createNewGame después de las validaciones:", genres);

       
        const foundGenres = await Genres.findAll({
            where: { name: genres },
        });

        if (foundGenres.length !== genres.length) {
            throw new Error("No se encontraron todos los géneros en la base de datos.");
        }

        // Crear el juego en la base de datos
        const newGame = await Videogame.create({
            name,
            image,
            released,
            description,
            platforms,
            rating,
            source: "db",
        });

        // asocia eso espero los géneros encontrados con el nuevo juego
        await newGame.setGenres(foundGenres);

        return { message: `Se creó un nuevo juego: ${name}` };
    } catch (error) {
        console.log("Error en la creación del juego", error);
        return { error: error.message };
    }
};

module.exports = createNewGame;

