const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router ();


//Obtener todas las categorias - publico
router.get('/', [], obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id',[
   check('id', 'No es un id de Mongo').isMongoId(),
   check('id').custom( existeCategoriaPorId),
   validarCampos
], obtenerCategoria);

 // crear  una categoria por id - privado - cualquier usuario token valido
router.post('/', [ 
   validarJWT,
   check('nombre','El nombre es obligatorio').not().isEmpty(),
   validarCampos
], crearCategoria);

 // actualizar - privado - cualquier usuario token valido
router.put('/:id', [
   validarJWT,
   check('nombre','El nombre es obligatorio').not().isEmpty(),
   check('id').custom(existeCategoriaPorId),
   validarCampos
], actualizarCategoria);


 // actualizar - privado - cualquier usuario token valido
router.delete('/:id', [
   validarJWT,
   esAdminRole,
   check('id', 'No es un id Mongo válido').isMongoId(),
   check('id').custom( existeCategoriaPorId),
   validarCampos
], borrarCategoria);

module.exports = router;