const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProducto, obtenerProductos, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router ();

//Obtener todas las productos - publico
router.get('/', [], obtenerProductos);

// Obtener una producto por id - publico
router.get('/:id',[
   check('id', 'No es un id de Mongo').isMongoId(),
   check('id').custom( existeProductoPorId),
   validarCampos
], obtenerProducto);

 // crear  una producto por id - privado - cualquier usuario token valido
router.post('/', [ 
   validarJWT,
   check('nombre','El nombre es obligatorio').not().isEmpty(),
   check('categoria','No es un id Mongo').isMongoId(),
   check('categoria').custom( existeCategoriaPorId),
   validarCampos
], crearProducto);

 // actualizar - privado - cualquier usuario token valido
router.put('/:id', [
   validarJWT,
   check('categoria','No es un id Mongo').isMongoId(),   
   check('id').custom(existeProductoPorId),
   check('categoria').custom( existeCategoriaPorId),
   validarCampos
], actualizarProducto);

 // actualizar - privado - cualquier usuario token valido
router.delete('/:id', [
   validarJWT,
   esAdminRole,
   check('id', 'No es un id Mongo válido').isMongoId(),
   check('id').custom( existeProductoPorId),
   validarCampos
], borrarProducto);

module.exports = router;