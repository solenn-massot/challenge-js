const form = document.querySelector(".form-quizz");
let arrResults = [];
const answers = ["a", "c", "a", "c", "b"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];
const titreResult = document.querySelector(".resultats h2");
const noteResult = document.querySelector(".note");
const helpResult = document.querySelector(".aide");
const tryAgain = "Essayez encore !";
const allQuestions = document.querySelectorAll(".question-block");
let verifArr = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  for (let i = 1; i < 6; i++) {
    arrResults.push(
      document.querySelector(`input[name="q${i}"]:checked`).value
    );
  }
  verifFunc(arrResults);
  arrResults = [];
});

function verifFunc(arrayResults) {
  for (let a = 0; a < 5; a++) {
    if (arrayResults[a] === answers[a]) {
      verifArr.push(true);
    } else {
      verifArr.push(false);
    }
  }
  showResult(verifArr);
  colorFunc(verifArr);
  verifArr = [];
}

function showResult(arrCheck) {
  let nbError = arrCheck.filter((el) => el !== true).length;
  switch (nbError) {
    case 0:
      titreResult.innerText = `${emojis[0]}Félicitations, c'est un sans faute !${emojis[0]}`;
      helpResult.innerText = "";
      noteResult.innerText = `5/5`;
      break;
    case 1:
      titreResult.innerText = `${emojis[1]}C'est presque parfait !!${emojis[1]}`;
      helpResult.innerText = tryAgain + `Vous n'êtes plus très loin..`;
      noteResult.innerText = `4/5`;
      break;
    case 2:
      titreResult.innerText = `${emojis[1]}Plus de la moitié, c'est déjà ça !${emojis[2]}`;
      helpResult.innerText = tryAgain;
      noteResult.innerText = `3/5`;
      break;
    case 3:
      titreResult.innerText = `${emojis[2]}Houlala.. C'est pourtant pas si difficile..${emojis[3]}`;
      helpResult.innerText = tryAgain;
      noteResult.innerText = `2/5`;
      break;
    case 4:
      titreResult.innerText = `${emojis[3]}Peux mieux faire !${emojis[3]}`;
      helpResult.innerText = tryAgain;
      noteResult.innerText = `1/5`;
      break;
    case 5:
      titreResult.innerText = `${emojis[4]}.. Bon après tout, vous ne pouvez que vous améliorer${emojis[4]}`;
      helpResult.innerText = tryAgain;
      noteResult.innerText = `0/5`;
      break;

    default:
      `Oula, ça ne peut pas arriver normalement ça..`;
  }
}

function colorFunc(arrValBool) {
  for (let j = 0; j < arrValBool.length; j++) {
      
    if (arrValBool[j] === true) {

      allQuestions[j].style.background = "lightgreen";

    } else {

      allQuestions[j].style.background = "#ffb8b8";
      allQuestions[j].classList.add("echec");

      setTimeout(() => {

        allQuestions[j].classList.remove("echec");

      }, 500);
    }
  }
}

allQuestions.forEach(item => {
    item.addEventListener('click', () => {
        item.style.background = "white";
    })
})