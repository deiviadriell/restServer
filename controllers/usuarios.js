const { response, request} = require ('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    const { q, nombre, apiKey } = req.query;
    res.json({
        msg: 'get API - Controlador'
        })
}; 

const usuariosPost = async (req, res = response) => {

   
    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol});

   

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);
    //guardar en base de datos


    await usuario.save();
    res.json({
        msg: 'post API',
        usuario
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