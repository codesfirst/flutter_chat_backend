const { response } = require("express");
const Usuario = require('../models/user');

const getUsers = async (req, res = response) => {
    const desde = Number(req.query.desde) || 0;
    const usuarios = await Usuario.find({ _id: { $ne: req.uid } }).sort('-online').skip(desde).limit(20);

    return res.json({
        ok: true,
        usuarios
    });
};

module.exports = {
    getUsers
}