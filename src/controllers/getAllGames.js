const axios = require('axios');
const {Videogame}= require ('../db')
//require('dotenv').config();

const AllGames=async()=>{
    try{
       
        let juegosInfo=[];
        let nextPage = `https://api.rawg.io/api/games?key=cc59f918c382447f93dabde46f654a96`;
    
        while(juegosInfo.length < 100 && nextPage){
            const response= await axios.get(nextPage);
            const allJuegos= response.data.results;

            if(!allJuegos || allJuegos.length ===0){
                throw new Error("no se encontraron juegos")
            }

            juegosInfo = juegosInfo.concat(
                allJuegos.map((juego)=>{
                    return{
                        name:juego.name,
                        id:juego.id,
                        description:juego.description,
                        plataforms:juego.plataforms,
                        image:juego.background_image,
                        rating:juego.rating,
                        relased:juego.relased,
                        genres:juego.genres,
                   
                    }
                })
            );
            nextPage = response.data.next; 
        }
       
        juegosInfo = juegosInfo.slice(0,100);

        const juegosDb=await Videogame.findAll({limit:100})


        const juegoCombi=juegosInfo.concat(
            juegosDb.map(juego=>{
                return{
                    name:juego.name,
                    id:juego.id,
                    description:juego.description,
                    plataforms:juego.plataforms,
                    image:juego.image,
                    rating:juego.rating,
                    relased:juego.relasedate,
                    genres:juego.genres,
                    
                };
            })
        );
        return juegoCombi;
    }catch(error){
        console.error("error al obtener la informacion de los juegos mirar getAllGAmes",error)
        throw error;
    }
}

module.exports = AllGames;