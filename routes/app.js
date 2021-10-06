/*
    path: api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { createApp, updateApp, createDevice, updateDevice } = require('../controllers/app');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/app-create', [
    check('name', "El nombre es obligatorio").not().isEmpty(),
    check('gcm_key', "El key es obligatorio").not().isEmpty(),
    check('android_gcm_sender_id', "El id es obligatorio").not().isEmpty(),
    check('site_name', "El sitio es obligatorio").not().isEmpty(),
    check('organization_id', "la organizacion es obligatorio").not().isEmpty(),
    validarCampos
], createApp);

router.put('/app-update/:id', [
    check('name', "El nombre es obligatorio").not().isEmpty(),
    check('gcm_key', "El key es obligatorio").not().isEmpty(),
    check('android_gcm_sender_id', "El id es obligatorio").not().isEmpty(),
    check('site_name', "El sitio es obligatorio").not().isEmpty(),
    check('organization_id', "la organizacion es obligatorio").not().isEmpty(),
    validarCampos
], updateApp);

router.post('/device-create', [
    check('app_id', "El app id es obligatorio").not().isEmpty(),
    check('device_type', "El device type es obligatorio").not().isEmpty(),
    check('identifier', "El identificado es obligatorio").not().isEmpty(),
    check('language', "El languaje es obligatorio").not().isEmpty(),
    check('device_model', "la device model es obligatorio").not().isEmpty(),
    validarCampos
], createDevice);

router.put('/device-update/:id', [
    check('app_id', "El app id es obligatorio").not().isEmpty(),
    check('device_type', "El device type es obligatorio").not().isEmpty(),
    check('identifier', "El identificado es obligatorio").not().isEmpty(),
    check('language', "El languaje es obligatorio").not().isEmpty(),
    check('device_model', "la device model es obligatorio").not().isEmpty(),
    validarCampos
], updateDevice);

module.exports = router;