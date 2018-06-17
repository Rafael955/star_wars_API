const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

const mongodb = process.env.MONGO || "mongodb://localhost/StarWarsApi";
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const planets = require("./routes/planets");

app.use(express.static('public'));
app.use("/planets", planets);

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

mongoose
  .connect(mongodb)
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}...`));
  })
  .catch(e => console.log(e));
