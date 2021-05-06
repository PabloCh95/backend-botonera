import User from '../model/user.js';

export const login =async (req,res)=>{
    try{
        const{email, password}=req.body;
        if(!email || !password){
            res.status(404).send({message:'Los campos deben estar completos'});
        }if(!emailValidation(email)){
            res.status(404).send({message:'El email es invalido, por favor ingrese un Email valido...'});
        }else{
            const user=await User.findOne({email});
            
           if(user){
                const passOK=await bcrypt.compare(password,user.password);
                if(passOK){
                  
                    res.status(200).send({
                        message:'Se ha logueado Correctamente',
                        accessToken:createToken(user),
                        refreshToken:createRefreshToken(user)
                    });
                }else{
                    res.status(404).send({message:'INVALID_PASSWORD'});
                }
            }else{
                res.status(204).send({message:'USER_NOT_FOUND'});
            } 
        }
    }catch(error){
        console.log(error);
        res.status(500).send({message:'Error del servidor'});
    }
}

//funcion para registrarme, funcionando.
export const signUp= async (req,res)=>{
    try{
         const {name,lastname,email,password}=req.body;
         //corrobora si los datos estan vacios
         if(name||lastname||email||password){
             //encriptacion del password
             const hash= await bcrypt.hash(password,15);
             //creacion del usuario en la base de datos
             await User.create({
                 name,
                 lastname,
                 email,
                 password:hash
             });
             res.status(200).send({message:'El Usuario se ha creado correctamente'});
         }else{
             res.status(404).send({message:'los campos deben estar completos'});
         }
    }catch(error){
         console.error(error);
         res.status(500).send({message:"error del servidor"});
    }
}