const mongoose = require('mongoose');

const PlanetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    climate: {
        type: String,
        required: true,
    },
    terrain: {
        type: String,
        required: true,
    },
    aparicoes: {
        type: Number,
        required: true,
    },
});

const Planet = mongoose.model('Planet', PlanetSchema);

module.exports = Planet;