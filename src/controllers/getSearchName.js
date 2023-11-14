const axios = require("axios");
const {Videogame}= require ('../db')
const {Op} = require("sequelize")
//require('dotenv').config();

const buscarDb = async(name)=>{
    try{
        if(!name){
            throw new Error("ingrese un nombre valido");
        }
        const findJuegos = await Videogame.findAll({
            where:{
                name:{
                    [Op.iLike]: `%${name}%`
                }
            },
            limit:15
        });
        return findJuegos.map((juego)=>({
            name:juego.name,
            id:juego.id,
            description:juego.description,
            plataforms:juego.platforms,
            image:juego.image,
            rating:juego.rating,
            relased:juego.released,
            genres:juego.genres,
        }));
    }catch (error){
        return {error:error.message}
    }
};


const buscarApi=async(name)=>{
    try{
        if(!name){
            throw new Error("ingrese nombre valido");
        }
        const URL=`https://api.rawg.io/api/games?search=${name}&page_size=15&key=cc59f918c382447f93dabde46f654a96`;
        const buscar= await axios.get(URL);
   
        return buscar.data.results.map((juego)=>({
            name:juego.name,
            id:juego.id,
            description:juego.description,
            plataforms:juego.plataforms,
            image:juego.background_image,
            rating:juego.rating,
            relased:juego.relased,
            genres:juego.genres,
        }));
    }catch (Error){
        throw Error;
    }
}



const buscarNombre = async(name)=>{
    try{
        if(!name){
            throw new Error("ingrese nombre valido")
        }
        const db=await buscarDb(name);
        const api=await buscarApi(name);

        const resultados=[...db,...api];

        return resultados;
    }catch(error){
        throw error
    }
}

module.exports = buscarNombre;