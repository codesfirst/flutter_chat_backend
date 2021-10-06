/*
    path: api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { notificationSegment, notificationSegmentTime, notificationSegmentTemplate, notificationSegmentButtons, notificationSegmentUserId, notificationSegmentDeviceId, notificationCancel } = require('../controllers/notification');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/segment', [
    check('contents', "El contenido es obligatorio").not().isEmpty(),
    check('headings', "El titulo es obligatorio").not().isEmpty(),
    check('included_segments', "El Segmento es obligatorio").not().isEmpty(),
    validarCampos
], notificationSegment);

router.post('/segment-time', [
    check('contents', "El contenido es obligatorio").not().isEmpty(),
    check('headings', "El titulo es obligatorio").not().isEmpty(),
    check('included_segments', "El Segmento es obligatorio").not().isEmpty(),
    check('delivery_time_of_day', "La hora del dia es obligatorio").not().isEmpty(),
    check('delayed_option', "El opcion de envio es obligatorio").not().isEmpty(),
    validarCampos
], notificationSegmentTime);

router.post('/segment-template', [
    check('contents', "El contenido es obligatorio").not().isEmpty(),
    check('headings', "El titulo es obligatorio").not().isEmpty(),
    check('included_segments', "El Segmento es obligatorio").not().isEmpty(),
    check('template_id', "El id del template es obligatorio").not().isEmpty(),
    validarCampos
], notificationSegmentTemplate);

router.post('/segment-buttons', [
    check('contents', "El contenido es obligatorio").not().isEmpty(),
    check('headings', "El titulo es obligatorio").not().isEmpty(),
    check('included_segments', "El Segmento es obligatorio").not().isEmpty(),
    check('buttons', "El arr de botones es obligatorio").not().isEmpty(),
    validarCampos
], notificationSegmentButtons);

router.post('/user-id', [
    check('contents', "El contenido es obligatorio").not().isEmpty(),
    check('headings', "El titulo es obligatorio").not().isEmpty(),
    check('included_segments', "El Segmento es obligatorio").not().isEmpty(),
    check('include_external_user_ids', "El arr de usuarios es obligatorio").not().isEmpty(),
    check('channel_for_external_user_ids', "metodo es obligatorio").not().isEmpty(),
    validarCampos
], notificationSegmentUserId);

router.post('/device', [
    check('contents', "El contenido es obligatorio").not().isEmpty(),
    check('headings', "El titulo es obligatorio").not().isEmpty(),
    check('included_segments', "El Segmento es obligatorio").not().isEmpty(),
    check('include_external_user_ids', "El arr de usuarios es obligatorio").not().isEmpty(),
    check('channel_for_external_user_ids', "metodo es obligatorio").not().isEmpty(),
    validarCampos
], notificationSegmentDeviceId);

router.delete('/cancel', [
    check('id', "Ide de la notificacion es obligatorio").not().isEmpty(),
    validarCampos
], notificationCancel);



module.exports = router;