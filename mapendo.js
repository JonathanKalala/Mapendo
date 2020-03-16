let btn = document.querySelector("#bouton");
let table = document.querySelector('table');
let nom = document.querySelector('#nom');
let prenom = document.querySelector('#prenom');
let email = document.querySelector('#email');
let age = document.querySelector('#age');
let poste = document.querySelector('#poste');
let numero = document.querySelector('#numero');
let statut = document.querySelector('#statut');
let pays = document.querySelector('#pays');
let users = [];

btn.addEventListener('click', function(e){
    e.preventDefault()
    const obj = {
        nom : nom.value,
        prenom : prenom.value,
        email : email.value,
        age : age.value,
        poste : poste.value,
        numero : numero.value,
        statut : statut.value,
        pays : pays.value
    }

    users.push(obj)
    let newTr = document.createElement('tr')
    table.append(newTr)
    for(element in obj){
    let newTd = document.createElement("td");
      newTr.append(newTd);
      newTd.append(obj[us]);
    } 
})