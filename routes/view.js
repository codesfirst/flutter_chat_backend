/*
    path: api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { viewapps, viewAnApps, viewDevices, viewAnDevice } = require('../controllers/view');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/app', viewapps);

router.get('/app/:id',viewAnApps);

router.get('/device',[
        check('limit', "El limit es obligatorio").not().isEmpty(),
        check('offset', "El offset es obligatorio").not().isEmpty(),
        validarCampos
    ],viewDevices);

router.get('/device/:id',viewAnDevice);

router.get('/notification',[
    check('limit', "El limit es obligatorio").not().isEmpty(),
    check('offset', "El offset es obligatorio").not().isEmpty(),
    validarCampos
],viewDevices);

router.get('/notification/:id',viewAnDevice);


module.exports = router;