/*
    path: api/Mensajes/:from
*/
const { Router } = require('express');
const { getMensajes } = require('../controllers/mensajes');
const { validateJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:from', validateJWT, getMensajes);

module.exports = router;