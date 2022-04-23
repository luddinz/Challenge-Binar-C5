const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const gameRouter = require("./game");
const accountRouter = require("./account");
const datausers = require("./data");
const app = express();

const port = 8080;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/datausers", (req, res) => {
  res.json(datausers);
});

app.get("/datausers/:username", (req, res) => {
  const datauser = datausers.find((i) => i.username === req.params.username);
  res.status(200).json(datauser);
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  datausers.push({
    username,
    email,
    password,
  });
  console.log(datausers);
  fs.writeFileSync("./data.json", JSON.stringify(datausers));
  res.redirect("./views/login.ejs");
});

app.post("/datausers", (req, res) => {
  const { username, email, password } = req.body;

  const datauser = {
    username,
    email,
    password,
  };

  datausers.push(datauser);

  res.status(201).json(datauser);
});

app.put("/datausers/:username", (req, res) => {
  const { email, password } = req.body;

  const indexDataUser = datausers.findIndex(
    (i) => i.username === req.params.username
  );

  datausers[indexDataUser] = {
    username: req.params.username,
    email,
    password,
  };

  res.status(200).json(datausers[indexDataUser]);
});

app.delete("/datausers/:username", (req, res) => {
  const indexDataUser = datausers.findIndex(
    (i) => i.username === req.params.username
  );

  datausers.splice(indexDataUser, 1);

  res.status(200).json({
    message: `User ${req.params.username} has been deleted`,
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  res.send('LOGIN: POST /login, logged in as "' + req.body.email + '"');
});

app.use("/game", gameRouter);
app.use("/account", accountRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
