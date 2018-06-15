const express = require("express");
const router = express.Router();
const planetsController = require('../controllers/planets')

const Planet = require('../models/planet')

const models = {
    Planet
}

router.get("/", planetsController.getAll.bind(null, models))
router.get("/:id", planetsController.getById.bind(null, models))
router.get("/name/:name", planetsController.getByName.bind(null, models))

router.post("/", planetsController.add.bind(null, models))

router.delete("/delete/:id", planetsController.remove.bind(null, models))

module.exports = router;