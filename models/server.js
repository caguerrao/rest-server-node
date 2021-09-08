const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:       '/api/auth',
            buscar: '/api/buscar',
            users:      '/api/users',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            uploads: '/api/uploads',
        }
        


        // CONECTAR A  DB
        this.conectarDB();

        //Middlewares
        this.middlewares();


        //Routes
        this.routes();
    }

    async conectarDB(){
        await dbConnection();

    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // LECTURA Y PARSEO
        this.app.use(express.json());

        // DIRECTORIO PUBLICO
        this.app.use(express.static('public'));

        // FileUpload Carga de Archivos 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));


    }


    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.users, require('../routes/user'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en Puerto', this.port)
        });
    }


}

module.exports = Server;