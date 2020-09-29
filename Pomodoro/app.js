const affichageTravail = document.querySelector(".affichageT");
const affichagePause = document.querySelector(".affichageP");
const btnGo = document.querySelector(".b1");
const btnPause = document.querySelector(".b2");
const btnReset = document.querySelector(".b3");
const cycles = document.querySelector("h2");

let checkInterval = false;
let tempsInitial = 1800;
let tempsDeRepos = 300;
let pause = false;
let nbDeCycles = 0;

showTimeP();
showTimeT();
showCycles();

function showCycles() {
  cycles.innerText = `Nombre de cycles ${nbDeCycles}`;
}

function showTimeT() {
  affichageTravail.innerText = `${Math.trunc(tempsInitial / 60)} : ${
    tempsInitial % 60 < 10 ? `0${tempsInitial % 60}` : tempsInitial % 60
  }`;
}

function showTimeP() {
  affichagePause.innerText = `${Math.trunc(tempsDeRepos / 60)} : ${
    tempsDeRepos % 60 < 10 ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60
  }`;
}

btnGo.addEventListener("click", () => {
  if (checkInterval === false) {
    checkInterval = true;
    tempsInitial--;
    showTimeT();

    let timer = setInterval(() => {
      if (pause === false && tempsInitial > 0) {
        tempsInitial--;
        showTimeT();
      } else if (pause === false && tempsDeRepos === 0 && tempsInitial === 0) {
        tempsInitial = 1800;
        tempsDeRepos = 300;
        showTimeT();
        showTimeP();
        nbDeCycles++;
        showCycles();
      } else if (pause === false && tempsInitial === 0) {
        tempsDeRepos--;
        showTimeP();
      }
    }, 1000);

    btnReset.addEventListener("click", () => {
      clearInterval(timer);
      checkInterval = false;
      tempsInitial = 1800;
      tempsDeRepos = 300;
      showTimeP();
      showTimeT();
    });
  } else {
    return;
  }
});

btnPause.addEventListener("click", () => {
  if (pause === false) {
    btnPause.innerText = "Reprendre";
  } else if (pause === true) {
    btnPause.innerText = "Pause";
  }
  pause = !pause;
});
