const form = document.querySelector('form');
const liste = document.querySelector('ul');
const input = document.querySelector('form input');
let allTask = [];

form.addEventListener('submit', event => {
    event.preventDefault();

    const text = input.value.trim();
    if(text !== ""){
        addTask(text);
        input.value = "";
    }
})

function addTask(text){
    const todo = {
        text,
        id: Date.now()
    }

    showList(todo);
}

function showList(todo){

    const item = document.createElement('li');
    item.setAttribute('data-key', todo.id);

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.addEventListener('click', taskDone);
    item.appendChild(input);

    const txt = document.createElement('span');
    txt.innerText = todo.text;
    item.appendChild(txt);

    const btn = document.createElement("button");
    btn.addEventListener('click', deleteTask);
    const img = document.createElement('img');
    img.setAttribute('src', 'ressources/fermer.svg');
    btn.appendChild(img);
    item.appendChild(btn);

    liste.appendChild(item);
    allTask.push(item);
}

function taskDone(e){
    e.target.parentNode.classList.toggle('finDeTache');
}

function deleteTask(e){

    allTask.forEach(el => {
        if(e.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')){
            el.remove();
            allTask = allTask.filter(li => li.dataset.key !== el.dataset.key);
        }
    })
}