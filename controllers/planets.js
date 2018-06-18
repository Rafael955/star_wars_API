const api = require("../services/api");

/** list all planets */
const getAll = async ({ Planet }, req, res) => {
  try {
    const planets = await Planet.find({});

    if (planets.length === 0) {
      res.send({
        success: false,
        message: "Nenhum planeta cadastrado."
      });
    }
    res.send(planets);
    // res.render("planets/index", { planets });
  } catch (e) {
    res.send({
      success: false,
      errors: Object.keys(e.errors)
    });
  }
};

/**get one planet by id */
const getById = async ({ Planet }, req, res) => {
  try {
    const planet = await Planet.findOne({ _id: req.params.id });

    if (planet === null) {
      res.send({
        success: false,
        message: "planeta não encontrado"
      });
    } else {
      res.send(planet);
    }
  } catch (e) {
    res.send({
      success: false,
      errors: Object.keys(e.errors)
    });
  }
};

/**get one planet by name */
const getByName = async ({ Planet }, req, res) => {
  try {
    const planet = await Planet.find({ nameLower: req.params.name.toLowerCase() });

    if (planet.length === 0) {
      res.send({
        success: false,
        message: "planeta não encontrado"
      });
      return false;
    } else {
      res.send(planet);
      return true;
    }
  } catch (e) {
    res.send({
      success: false,
      errors: Object.keys(e.errors)
    });
  }
};

/** add a planet */
const add = async ({ Planet }, req, res) => {
  try {
    result = new Planet(req.body);

    /* Verifica se planeta já existe */
    const getPlanet = await Planet.find({ name: result.name });

    if (getPlanet.length > 0) {
      res.send({
        success: false,
        message: "planeta já cadastrado."
      });
    } else {
      let newPlanet = new Planet({
        _id: result._id,
        name: result.name,
        nameLower: result.name.toLowerCase(),
        climate: result.climate,
        terrain: result.terrain,
        aparicoes: await getAparicoes(result.name)
      });

      await newPlanet.save();
      res.send(newPlanet);
    }
  } catch (e) {
    res.send({
      success: false,
      errors: Object.keys(e.errors)
    });
  }
};

/** delete a planet */
const remove = async ({ Planet }, req, res) => {
  try {
    await Planet.remove({ _id: req.params.id });
    res.send({
      success: true,
      message: "planeta removido"
    });
  } catch (e) {
    res.send({
      success: false,
      errors: Object.keys(e.errors)
    });
  }
};

const getAparicoes = async planetName => {
  const { data: result } = await api.get(`/planets/?search=${planetName}`);
  return result.results.length;
};

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  remove
};
