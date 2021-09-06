const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = async (req, res = response, next) => {
    const token = req.header('x-token');

    try {
        if (!token) return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion"
        });

        const { uid } = jwt.verify(token, process.env.JWT_KEY);

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "token invalido"
        });
    }


    //console.log(token);

};

module.exports = {
    validateJWT
}