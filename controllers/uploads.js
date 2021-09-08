const { response } = require("express");

const cargarArchivo = (req, res = response) => { 

    res.json({
        MSG: 'hOLA mUNDO'
    })

}

module.exports = {
    cargarArchivo
}