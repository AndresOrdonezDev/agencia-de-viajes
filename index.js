import express from 'express';
import router  from './routes/index.js';
import db from './config/db.js'

const app = express();

//Conectar a la base de datos
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error => console.log(error))

    
//definir puerto
const port = process.env.PORT || 3000;

//Habilitar pug
app.set('view engine','pug')

//Obtener el año actual
app.use((req,res,next)=>{
    const fecha = new Date();
    
    res.locals.year = fecha.getFullYear()
    res.locals.nombreSitio = 'Agencia de viajes'
    next();
})

//Agragar body parse para leer los datos del formulario
app.use(express.urlencoded({extends:true}))

//Definir carpeta publica
app.use(express.static('public'))

//agregar el router
app.use('/',router);

app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})

