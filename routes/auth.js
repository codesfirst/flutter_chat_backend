/*
    path: api/login
*/
const { Router, response } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre', "El nombre es obnligatorio").not().isEmpty(),
    check('email', "El email es obnligatorio").not().isEmpty(),
    check('email', "El email no tiene formato correcto").isEmail(),
    check('password', "El password es requerido").not().isEmpty(),
    validarCampos
], crearUsuario);

//Login
router.post('/', [
    check('email', "El email es obnligatorio").not().isEmpty(),
    check('email', "El email no tiene formato correcto").isEmail(),
    check('password', "El password es requerido").not().isEmpty(),
    validarCampos
], login);

router.get('/renew', validateJWT, renewToken);

module.exports = router;