const { Schema, model } = require('mongoose');

const userSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false
    }
});

userSchema.method('toJSON', function () {
    const { __v, _id, password, ...data } = this.toObject();
    data.uid = _id;
    return data;
});

module.exports = model('Usuario', userSchema);