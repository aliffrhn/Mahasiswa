const Mahasiswa = require('../models/mahasiswa.model.js');

// Create and Save a new Mahasiswa
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Mahasiswa can not be empty"
        });
    }

    // Create a Mahasiswa
    const mahasiswa = new Mahasiswa({
        name: req.body.name || "Untitled Mahasiswa", 
        birth: req.body.birth,
        nik: req.body.nik,
        email: req.body.email
    });

    // Save Mahasiswa in the database
    mahasiswa.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Mahasiswa."
        });
    });
};

// Retrieve and return all mahasiswas from the database.
exports.findAll = (req, res) => {
    Mahasiswa.find()
    .then(mahasiswas => {
        res.send(mahasiswas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Mahasiswas."
        });
    });
};

// Find a single mahasiswa with a mahasiswaId
exports.findOne = (req, res) => {
    Mahasiswa.findById(req.params.mahasiswaId)
    .then(mahasiswa => {
        if(!mahasiswa) {
            return res.status(404).send({
                message: "Mahasiswa not found with id " + req.params.mahasiswaId
            });            
        }
        res.send(mahasiswa);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Mahasiswa not found with id " + req.params.mahasiswaId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving mahasiswa with id " + req.params.mahasiswaId
        });
    });
};

// Update a mahasiswa identified by the mahasiswaId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Mahasiswa name can not be empty"
        });
    }

    // Find mahasiswa and update it with the request body
    Mahasiswa.findByIdAndUpdate(req.params.mahasiswaId, {
        name: req.body.name || "Untitled Mahasiswa", 
        birth: req.body.birth,
        nik: req.body.nik,
        email: req.body.email
    }, {new: true})
    .then(mahasiswa => {
        if(!mahasiswa) {
            return res.status(404).send({
                message: "Mahasiswa not found with id " + req.params.mahasiswaId
            });
        }
        res.send(mahasiswa);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Mahasiswa not found with id " + req.params.mahasiswaId
            });                
        }
        return res.status(500).send({
            message: "Error updating mahasiswa with id " + req.params.mahasiswaId
        });
    });
};

// Delete a mahasiswa with the specified mahasiswaId in the request
exports.delete = (req, res) => {
    Mahasiswa.findByIdAndRemove(req.params.mahasiswaId)
    .then(mahasiswa => {
        if(!mahasiswa) {
            return res.status(404).send({
                message: "Mahasiswa not found with id " + req.params.mahasiswaId
            });
        }
        res.send({message: "Mahasiswa deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Mahasiswa not found with id " + req.params.mahasiswaId
            });                
        }
        return res.status(500).send({
            message: "Could not delete mahasiswa with id " + req.params.mahasiswaId
        });
    });
};
