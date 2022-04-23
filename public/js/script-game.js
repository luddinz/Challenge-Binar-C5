const rock_user = document.getElementById("r-user");
const paper_user = document.getElementById("p-user");
const scissors_user = document.getElementById("s-user");
const rock_com = document.getElementById("r-com");
const paper_com = document.getElementById("p-com");
const scissors_com = document.getElementById("s-com");
const winBox = document.getElementById("box");
const inFo = document.getElementById("h1");
const refresh = document.getElementById("refresh");
const x = document.querySelector(".user-tool");
const addElement1 = [...document.getElementsByClassName("dissap")];
const button = document.querySelector("button");

function comThink() {
  const choices = ["Batu", "Gunting", "Kertas"];
  const randomChoices = Math.floor(Math.random() * 3);
  return choices[randomChoices];
}

function resultObject() {
  winBox.classList.add("winBox"),
    inFo.setAttribute("style", "font-size:36px; color:white;");
}

function resultDraw() {
  winBox.classList.add("drawBox");

  inFo.setAttribute("style", "font-size:36px; color:white;");
}

function win() {
  resultObject();
  inFo.innerText = "HUMAN WIN";
}

function lose() {
  resultObject();
  inFo.innerText = "COM WIN";
}

function draw() {
  resultDraw();
  inFo.innerText = "Draw";
}

function gameCompare(pilihanUser) {
  const computerUser = comThink();
  console.log("Hasil User => " + pilihanUser);
  console.log("Hasil dari => " + computerUser);

  switch (pilihanUser + computerUser) {
    case "BatuGunting":
    case "GuntingKertas":
    case "KertasBatu":
      win();

      break;
    case "GuntingBatu":
    case "BatuKertas":
    case "KertasGunting":
      lose();
      break;
    case "GuntingGunting":
    case "BatuBatu":
    case "KertasKertas":
      draw();
  }

  switch (computerUser) {
    case "Batu":
      rock_com.classList.add("chosen");

      break;
    case "Gunting":
      scissors_com.classList.add("chosen");
      break;
    case "Kertas":
      paper_com.classList.add("chosen");
  }
}

function play() {
  rock_user.addEventListener("click", function () {
    this.classList.add("chosen");
    gameCompare("Batu");
    addElement1.forEach((addElement3) => {
      addElement3.setAttribute(
        "style",
        "cursor: not-allowed;pointer-events: none;"
      );
    });
  });

  paper_user.addEventListener("click", function () {
    this.classList.add("chosen");
    gameCompare("Kertas");
    addElement1.forEach((addElement3) => {
      addElement3.setAttribute(
        "style",
        "cursor: not-allowed;pointer-events: none;"
      );
    });
  });

  scissors_user.addEventListener("click", function () {
    this.classList.add("chosen");
    gameCompare("Gunting");
    addElement1.forEach((addElement3) => {
      addElement3.setAttribute(
        "style",
        "cursor: not-allowed;pointer-events: none;"
      );
    });
  });
}

play();
refresh.addEventListener("click", function () {
  addElement1.forEach((addElement2) => {
    addElement2.classList.remove("chosen");
  });
  addElement1.forEach((addElement3) => {
    addElement3.removeAttribute(
      "style",
      "cursor: not-allowed;pointer-events: none;"
    );
  });
  winBox.classList.remove("winBox");
  winBox.classList.remove("drawBox");
  inFo.removeAttribute("style", "color: ''; font-size:'' ");

  inFo.style.marginTop = null;
  inFo.style.fontSize = null;
  inFo.innerText = "VS";
  button.disabled = false;
});
