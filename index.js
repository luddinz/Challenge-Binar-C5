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

app.get("/datauser", (req, res) => {
  res.json(datausers);
});

app.get("/datauser/:username", (req, res) => {
  const datauser = datausers.find((i) => i.username === +req.params.username);
  res.status(200).json(datauser);
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  datausers.push({
    username,
    email,
    password,
  });
  console.log(datausers);
  fs.writeFileSync("./data.json", JSON.stringify(datausers));
  res.redirect("/account/login");
});

app.get("/data-peserta", (req, res) => {
  res.json(peserta);
});

app.use("/game", gameRouter);
app.use("/account", accountRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
