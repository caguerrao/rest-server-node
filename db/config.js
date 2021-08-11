const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('BD Conectada correctamente');

    } catch (error) {

        console.log(error);
        throw new Error('Error al conectar la Base de Datos');
    }

}



module.exports = {
    dbConnection
}