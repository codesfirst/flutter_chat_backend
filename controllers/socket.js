const Usuario = require('../models/user');
const Mensaje = require('../models/mensaje');

const userConnect = async (uid = '') => {
    const user = await Usuario.findById(uid);
    user.online = true;
    await user.save();
    return user;
}

const userDisconnect = async (uid = '') => {
    const user = await Usuario.findById(uid);
    user.online = false;
    await user.save();
    return user;
}

const saveMSG = async (payload) => {
    const mensaje = new Mensaje(payload);
    mensaje.save();
}

module.exports = {
    userConnect,
    userDisconnect,
    saveMSG
}