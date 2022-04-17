const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const gameRouter = require("./game");
const accountRouter = require("./account");
const users = require("./data");
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

// app.get("/register", (req, res) => {
//   res.render("register");
// });

app.use("/game", gameRouter);
app.use("/account", accountRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
