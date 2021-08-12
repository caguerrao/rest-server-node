const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.apiPath = '/api/users';
        this.authPath = '/api/auth';


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
    }


    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.apiPath, require('../routes/user'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en Puerto', this.port)
        });
    }


}

module.exports = Server;