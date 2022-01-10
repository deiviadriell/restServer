const { response, request} = require ('express');
const usuariosGet = (req = request, res = response) => {
    const { q, nombre, apiKey } = req.query;
    res.json({
        msg: 'get API - Controlador'
        })
}; 

const usuariosPost = (req, res = response) => {

    const body = req.body;
    res.json({
        msg: 'post API',
        body
        })
};

const usuariosPut = (req, res = response ) => {

    const id = req.params.id;
    res.json({
        msg: 'put API',
        id
        })
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
        })
};

const usuariosPath = (req, res = response) => {
    res.json({
        msg: 'path API'
        })
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPath
}