const express = require("express");
const morgan = require("morgan");
const gameRouter = require("./game");
const app = express();

const port = 8080;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/game", gameRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
