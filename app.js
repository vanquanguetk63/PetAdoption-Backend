const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const Router = require("./routes");
const configs = require("./configs");

const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect(configs.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("PetDB connected."))
  .catch((err) => console.log("Cannot connect to DB...", err));

app.use(cors());
app.use(logger("dev"));
// these creates the "req.body"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Router);

// test server:
app.use("/", (req, res) => {
  res.redirect("/api");
});

app.listen(port, () => {
  console.log(`running on port ${port} at: ${new Date()}`);
});

// https.createServer(options, app).listen(443);

module.exports = app;
