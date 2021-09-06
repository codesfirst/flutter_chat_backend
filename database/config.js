
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("init DB");
    } catch (error) {
        console.log(error);
        throw new Error("Error en la base de datos - contacte con un admin");
    }
}

module.exports = {
    dbConnection
}