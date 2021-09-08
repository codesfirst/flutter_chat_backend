const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/user');
const { generarJwt } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        console.log(req.body);
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const user = new Usuario(req.body);

        //Encriptar
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);


        await user.save();

        //JSON WEB TOKEN
        const token = await generarJwt(user.uid);

        res.json({
            ok: true,
            usuario: user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con un administrador"
        });
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) return res.status(404).json({
            ok: false,
            msg: 'Email no encontrado'
        });

        const comparePass = bcrypt.compareSync(password, usuarioDB.password);
        if (!comparePass) return res.status(404).json({
            ok: false,
            msg: 'Password incorrecto'
        });

        const token = await generarJwt(usuarioDB.id);
        return res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con un administrador"
        });
    }
};

const renewToken = async (req, res = response) => {
    const uid = req.uid;

    try {
        const token = await generarJwt(uid);
        if (!token) return res.status(400).json({
            ok: false,
            msg: "Error al generar un token"
        });

        const usuario = await Usuario.findById(uid).exec();

        if (!usuario) return res.status(400).json({
            ok: false,
            msg: "usuario invalido"
        });

        return res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: "Comuniquese con un administrador"
        });
    }




};

module.exports = {
    crearUsuario,
    login,
    renewToken
}