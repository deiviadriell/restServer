const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {

    const { correo, password} = req.body;

    try {
        
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            })
        }
        //Si el usuario está activo

        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }
        //Verificar Contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if( !validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })

        }

        //Generar JWT

        const token = await generarJWT (usuario.id);
        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
        
    }

    


}

const googleSignIn = async (req, res = response) => {

    const { id_token} = req.body;

    try {
        const {nombre, img, correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if( !usuario){
            const data = {
                nombre,
                correo,
                password:':P',
                img,
                google:true,
                rol:'ADMIN_ROLE'

            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        //Si el usuario en DB niego la autenticación
        if( !usuario.estado) {
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })
        }

        //generqar el jwt
        const token = await generarJWT(usuario.id);
        
        
        res.json({
            usuario,
            token
        })
    } catch (error) {

        console.log(error);

        res.status(400).json({
            msg:'El token no se puso verificar',
            ok: false
        })
        
    }
    

}

module.exports = {
    login,
    googleSignIn
}