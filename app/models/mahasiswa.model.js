const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    name: String,
    birth: String,
    nik: Number,
    email: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Mahasiswa', NoteSchema);
