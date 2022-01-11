const { response, request} = require ('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {   
    const { limite = 5, desde = 0 } = req.query;
    const query = {estado: true};
    const [total, usuarios ] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number( limite))
            
    ])
    res.json({
        total,
        usuarios
        
    });
    
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

const usuariosPut = async (req, res = response ) => {

    const { id } = req.params
    const { _id, password, google,correo, ...resto } = req.body;

    //TODO validar contra base de datos 
    if (password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    //const id = req.params.id;
    res.json(usuario);
};

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    const uid = req.uid;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    const usuarioAutenticado = req.usuario;
    res.json({
        usuario        
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