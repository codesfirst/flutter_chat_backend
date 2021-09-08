const { userDisconnect, userConnect, saveMSG } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers["x-token"]);
    if (!valido) return client.disconnect();

    userConnect(uid);

    //Ingresar sala especifico
    // Sala Global
    // Sala individual
    client.join(uid);

    client.on('send-private', async (payload) => {
        console.log(payload);
        await saveMSG(payload);
        io.to(payload.for).emit('send-private', payload);
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        userDisconnect(uid);
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' });

    });


});
