const {Router} = require("express")
const AllGames = require("../controllers/getAllGames")
const gameId = require("../controllers/getGameId")
const buscarNombre = require("../controllers/getSearchName")
const createNewGame = require("../controllers/postGame")


const router = Router();

router.get("/todos",async(req,res)=>{
    try{
        const juego = await AllGames();
        res.status(200).json(juego);
    }catch(error){
        res.status(500).json({error:"erro al obtener los juegios"})
    }
})


router.get("/id/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const resultadoId=await gameId(id);
        res.status(200).json(resultadoId)
    }catch(error){
        res.status(500).json({error:"error al buscar id"})
    }
})

router.get("/name/:name",async(req,res)=>{
    const name=req.params.name;
    try{
        const resultadoName=await buscarNombre(name);
        res.status(200).json(resultadoName);
    }catch(error){
        res.status(500).json({error:"error al buscar name"})
    }
})

router.post("/nuevo",async(req,res)=>{
    const nuevoJuego=await createNewGame(req.body)
    if(nuevoJuego.error){
        res.status(404).json({error:nuevoJuego.message})
    }else{
        res.status(200).json(nuevoJuego)
    }
})

module.exports = router;
