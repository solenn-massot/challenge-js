const inputsCouleur = document.querySelectorAll('.inp-couleur');
const inputRange = document.querySelector('.inp-range');
const btns = document.querySelectorAll('button');
const fond = document.body;
const span = document.querySelector('.error');
const css = document.querySelector('.css');
const containerCouleurs = document.querySelector('.container-couleurs'); 
const btnRandom = document.querySelector('.random');

let valCouleurs = ['#BA5370', '#F4E2D8'];
let inclinaison = 45;
let index = 3;

inputsCouleur[0].value = valCouleurs[0];
inputsCouleur[1].value = valCouleurs[1];
inputsCouleur[0].style.background = valCouleurs[0];
inputsCouleur[1].style.background = valCouleurs[1];
updateBody();

function updateBody(){
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
    css.innerText = `Code css : background: linear-gradient(${inclinaison}deg, ${valCouleurs})`;
}



inputRange.addEventListener('input', (e) => {
    inclinaison = e.target.value * 3.6;
    updateBody();
})

btns.forEach(btn => {
    btn.addEventListener('click', addRemove);
})

function addRemove(e){
    span.innerText = "";
    const allInputs = document.querySelectorAll('.inp-couleur');
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    if(e.target.className === "plus"){

        if(allInputs.length > 8){
            return;
        }
        const nvCouleur = document.createElement('input');
        nvCouleur.setAttribute('class', 'inp-couleur');
        nvCouleur.setAttribute('data-index', index);
        nvCouleur.setAttribute('maxlenght', 7);
        nvCouleur.value = `#${randomColor.toUpperCase()}`;
        nvCouleur.style.background = `#${randomColor}`;
        containerCouleurs.appendChild(nvCouleur);
        valCouleurs.push(nvCouleur.value);
        updateBody();
        index++;
    } else if (e.target.className === "moins") {
        if(valCouleurs.length === 2){
            span.innerText = "Il faut au moins deux couleurs pour faire un dégradé !";
            
        } else {
            valCouleurs.pop();
            allInputs[allInputs.length - 1].remove();
            updateBody();
            index--;
        }

    }

    allInputs.forEach(inp => {
        inp.addEventListener('input', MAJCOLORS);
    });

    

}

inputsCouleur.forEach(inp => {
    inp.addEventListener('input', MAJCOLORS);
})

function MAJCOLORS(e){

        let indexEnCours = e.target.getAttribute('data-index');
        e.target.value = e.target.value.toUpperCase();
        valCouleurs[indexEnCours - 1] = e.target.value.toUpperCase();
        e.target.style.background = valCouleurs[indexEnCours - 1];
        updateBody();
}


btnRandom.addEventListener('click', () => {

    const inputs = document.querySelectorAll('.inp-couleur');
    for(let i = 0; i < valCouleurs.length; i++){
        valCouleurs[i] = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        inputs[i].value = valCouleurs[i].toUpperCase();
        inputs[i].style.background = valCouleurs[i].toUpperCase();
        updateBody();
    }
})