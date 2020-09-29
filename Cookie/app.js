const affichage = document.querySelector('.affichage');
const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input');
const infoTxt = document.querySelector('.info-txt')
let done = false;


const today =  new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);


let day = ('0' + nextWeek).slice(9,11);
let month = ('0' + (nextWeek.getMonth() + 1)).slice(-2);
let year = today.getFullYear();
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

btns.forEach(btn => {
    btn.addEventListener('click', btnAction);
})

function btnAction(e){
    let nvObj = {};

    inputs.forEach(input => {
        let attrName = input.getAttribute('name');
        let attrValeur = attrName !== "cookieExpire" ? input.value : input.valueAsDate;
        nvObj[attrName] = attrValeur;
    })

    let description = e.target.getAttribute('data-cookie');

    if(description === "creer"){
        createCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire);
    } else if(description === "toutAfficher"){
        listCookies();
    }
}

function createCookie(name, value, exp){

    infoTxt.innerText = "";
    affichage.innerHTML = "";

    let cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        cookie = cookie.trim();
        let formatCookie = cookie.split('=');
        if(formatCookie[0] === encodeURIComponent(name)){
            done = true;
        }
    })

    if(done){
        infoTxt.innerText = "This name already belong to a cookie";
        done = false;
        return;
    }


    if(name.length === 0){
        infoTxt.innerText = `You can't bake a cookie with no name`
        return;
    }

    const nameCookie = encodeURIComponent(name);
    const valueCookie = encodeURIComponent(value);

    document.cookie =  nameCookie + "=" + valueCookie + ";expires=" + exp;
    console.log(document.cookie);
    let info = document.createElement('li');
    info.innerText = `Your cookie ${name} has been baked !`;
    affichage.appendChild(info);
    setTimeout(() => {
        info.remove();
    }, 2000)
}

function listCookies(){

    let cookies = document.cookie.split(';');
    if(cookies.join() === ""){
        infoTxt.innerText = "There is no cookies to show";
        return;
    }

    cookies.forEach(cookie => {

        cookie = cookie.trim();
        let formatCookie = cookie.split('=');

        let item = document.createElement('li');

        infoTxt.innerText = "Click a cookie to delete it";
        item.innerText = `Name : ${decodeURIComponent(formatCookie[0])}, Value : ${decodeURIComponent(formatCookie[1])}`;
        affichage.appendChild(item);

        item.addEventListener('click', () => {
            document.cookie = `${formatCookie[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`
            item.innerText = `Cookie ${formatCookie[0]} has been delete`;
            setTimeout(() => {
                item.remove();
            }, 1000)
        })
    })
}
