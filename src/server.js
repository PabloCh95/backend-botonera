import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

const app = express();

//modulos importados
import RouterUser from './routes/user-routes.js';

const PORT = 5000;
const URL = 'mongodb://admin123:39208224@basededatos1-shard-00-00.7nwet.mongodb.net:27017,basededatos1-shard-00-01.7nwet.mongodb.net:27017,basededatos1-shard-00-02.7nwet.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-vy84mu-shard-0&authSource=admin&retryWrites=true&w=majority'
//configuraciones
app.use( express.urlencoded( { extended:false } ) );
app.use( express.json() );
app.use( morgan('dev') );
//Configuraciones Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//conexion a la base de datos
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('la base de datos se conecto exitosamente');
}).catch((err) => {
    console.error(err);
});

//Rutas
app.use('/api/users',RouterUser);

app.listen(PORT,()=>{
    console.log(`Se conecto al puerto: ${PORT}`)
    console.log(`*******************************`);
    console.log(`*         Bienvenido          *`);
    console.log(`*******************************`);

    console.log(`http://localhost:${PORT}/`);
})