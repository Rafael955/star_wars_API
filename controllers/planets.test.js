const mockingoose = require('mockingoose').default;
const planetModel = require("../models/planet");

describe("testing mongoose Planet model", () => {
  it("should return a planet by ID", () => {
    const _planet = {
      _id: "5b2d996eafc3c22b206aeb72",
      name: "Coruscant",
      nameLower: "coruscant",
      climate: "temperate",
      terrain: "forests, cities",
      aparicoes: 4
    };

    mockingoose.Planet.toReturn(_planet, "findOne");

    return planetModel
        .findById({ _id: "5b2d996eafc3c22b206aeb72" })
        .then(planet => {
            expect(JSON.parse(JSON.stringify(planet))).toMatchObject(_planet);
        });
    });
});

// https://www.npmjs.com/package/mockingoose
