const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongodb = process.env.MONGO || "mongodb://localhost/StarWarsApi";
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const bodyParser = require("body-parser");
app.use(bodyParser({ extended: true }));

const planets = require("./routes/planets");

app.use("/planets", planets);

mongoose
  .connect(mongodb)
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}...`));
  })
  .catch(e => console.log(e));
