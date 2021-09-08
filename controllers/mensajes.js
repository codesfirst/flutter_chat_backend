const Mensaje = require('../models/mensaje');

const getMensajes = async (req, res) => {
    const userFrom = req.params.from;
    const userMy = req.uid;

    const last30 = await Mensaje.find({
        $or: [{ from: userFrom, for: userMy }, { from: userMy, for: userFrom }]
    }).sort({ createdAt: 'desc' })
        .limit(30);

    return res.json({
        ok: true,
        mensajes: last30
    });
}

module.exports = {
    getMensajes
}