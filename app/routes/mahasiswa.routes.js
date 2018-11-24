module.exports = (app) => {
    const mahasiswa = require('../controllers/mahasiswa.controller.js');

    // Create a new Mahasiswa
    app.post('/mahasiswa', mahasiswa.create);

    // Retrieve all Mahasiswas
    app.get('/mahasiswa', mahasiswa.findAll);

    // Retrieve a mahasiswa with mahasiswaId
    app.get('/mahasiswa/:mahasiswaId', mahasiswa.findOne);

    // Update a mahasiswa with mahasiswaId
    app.put('/mahasiswa/:mahasiswaId', mahasiswa.update);

    // Delete a mahasiswa with mahasiswaId
    app.delete('/mahasiswa/:mahasiswaId', mahasiswa.delete);
}