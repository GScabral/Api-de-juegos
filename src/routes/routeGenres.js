const { Router} = require("express")
const saveDb = require("../controllers/GenresJuegos")




const router=Router();

router.get("/generos",async(req,res)=>{
    try{
        const genero=await saveDb();
        res.status(200).json(genero);
    }catch(error){
        res.status(500).json({error:"error al pedir genros"})
    }
})

module.exports=router;
