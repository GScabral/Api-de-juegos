const axios = require("axios");
const {Genres} = require("../db")
//agregar contra
//require('dotenv').config();

const pedirGenros=async()=>{
    const URL=`https://api.rawg.io/api/genres?key=cc59f918c382447f93dabde46f654a96`;
    try{
        const response =await axios.get(URL);

        if(!response.data.results){
            throw new Error("no se encontraron Generos")
        }
        return response.data.results.map(item=>({name:item.name}));
    }catch(error){
        throw new Error("erro al buscar los generos")
    }
}

const saveDb=async()=>{
    try{
        const generos = await pedirGenros();
       
        const exist=await Genres.findAll({where:{name: generos.map(genre=>genre.name)}})

        const newG=generos.filter(genre=>!exist.find(exist=>exist.name === genre.name))

        if(newG.length>0){
            const saveData= await Genres.bulkCreate(newG);
            console.log("datos guardadsos correctamente",saveData)
        }else{
            console.log("ya existentes ")
        }

        return generos;
    }catch(error){
        console.error("Error",error.message);
    }
}


module.exports=saveDb;