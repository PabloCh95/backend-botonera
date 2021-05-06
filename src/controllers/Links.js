import Links from '../model/enlaces.js';
//crea links
export const createLink= (req , res) => {
    try {
        const {url,name,icon}=req.body;
        if(url || name || icon ){
         await Links.create({
                image,
            name,
            age,
            weight,
            history,
            film
       });
       res.status(200).send({message:'Se ha el enlace correctamente'});
    }else{
        res.status(404).send({message:'Los campos deben estar completos'});
    }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'ERROR DEL SERVIDOR'});
    }
}
//muestra links
export const getLinks = ( req , res ) => {
    Links.find().then((links)=>{
        if(!links){
            res.status(404).send({message:'No se encontraron links'});
        }else{
            res.status(200).send({links});
        }
    }).catch((e)=>{
        console.log(e);
        res.status(500).send({message:"ERROR DEL SERVIDOR"});
    });
}

//actualiza links
export const updateLinks = async ( req , res) => {
        try{
            const linksData = req.body;
            const {id} = req.params;
    
            const links = await Links.findByIdAndUpdate({id},linksData);
            if(!links){
                res.status(404).send({code:404,message:'No se encontro el Links'});
            }else{
                res.status(200).send({code:200,message:'Link actualizado correctamente'});
            }
        }catch(err){
            res.status(500).send({code:500,message:err.message});
        }
}