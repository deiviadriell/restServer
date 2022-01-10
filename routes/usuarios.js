const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPath} = require ('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router ();

router.get('/', usuariosGet);
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength(6),
    check('correo', 'El correo no es válido').isEmail(),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE'])
    check('rol').custom( async (rol = '') => {
        const existeRol = await Role.findOne({rol});
        if (!existeRol){
            throw new Error(`El rol ${ rol } no está registrado en la base de datos`);
        } 
    }), validarCampos
    
], usuariosPost);
router.put('/:id', usuariosPut);
router.delete('/', usuariosDelete);
router.patch('/',usuariosPath);
 


module.exports = router;