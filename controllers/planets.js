const api = require("../services/api");

/** list all planets */
const getAll = async ({ Planet }, req, res) => {
  const planets = await Planet.find({});

  // res.send(planets);
  res.render('planets/index', { planets });
};

/**get one planet by id */
const getById = async ({ Planet }, req, res) => {
  try {
    const planet = await Planet.findOne({ _id: req.params.id });

    if (planet === null) {
      res.send({
        success: false,
        message: "planet not found"
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
    const planet = await Planet.find({ name: req.params.name });

    if (planet.length === 0) {
      res.send({
        success: false,
        message: "planet not found"
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
      message: "planet removed"
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
  return result.results.length ;
};

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  remove
};
