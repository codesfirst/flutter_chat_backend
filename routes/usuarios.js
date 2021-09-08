/*
    path: api/usuarios
*/
const { Router } = require('express');
const { getUsers } = require('../controllers/usuarios');
const { validateJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validateJWT, getUsers);

module.exports = router;