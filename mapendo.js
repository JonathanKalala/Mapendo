let btn = document.querySelector("#bouton");
let btnModifier = document.querySelector("#boutonModifier");
let btnSupprimer = document.querySelector("#boutonSupprimer");
let tbody = document.querySelector("tbody");
let newTr;
let newTd;
let tro = document.querySelectorAll(".myClass");
let tdo;
let tabId=[];
let id;

let table = document.querySelector('table');
let nom = document.querySelector('#nom');
let prenom = document.querySelector('#prenom');
let email = document.querySelector('#email');
let age = document.querySelector('#age');
let poste = document.querySelector('#poste');
let numero = document.querySelector('#numero');
let statut = document.querySelector('#statut');
let pays = document.querySelector('#pays');

let recherche = document.querySelector("#recherche");
let input = document.querySelectorAll(".input");




let spanNom = document.querySelector("#spanNom");
let spanPrenom = document.querySelector("#spanPrenom");
let spanEmail = document.querySelector("#spanEmail");
let spanAge = document.querySelector("#spanAge");
let spanPoste = document.querySelector("#spanPoste");
let spanNumero = document.querySelector("#spanNumero");
let spanStatut = document.querySelector("#spanStatut");
let spanPays = document.querySelector("#spanPays");
let users = [];
let regex_text = /^[A-Z][a-z]+/;
let regex_entier = /^[0-9][0-9]/;
let regex_email = /@|com/;
let regex_numero = /^\+[0-9]/;
          
for(i=0; i<input.length; i++){
  input[i].value = "";
}

btn.addEventListener('click', function(e){
    e.preventDefault()
      if(!nom.value.length){
        spanNom.textContent = "Nom vide"
        spanNom.style = "color:red";
      } else if(regex_text.test(nom.value) == false){
        spanNom.textContent = "Format nom incorrect";
        spanNom.style = "color:red"
      } else{
        spanNom.textContent = "";
      }
      if(!prenom.value.length){
        spanPrenom.textContent = "Prenom vide"
        spanPrenom.style = "color:red";
      } else if(regex_text.test(prenom.value) == false){
        spanPrenom.textContent = "Format prenom incorrect";
        spanPrenom.style = "color : red";
      } else{
        spanPrenom.textContent = "";
      }
      if(!email.value.length){
        spanEmail.textContent = "Email vide"
        spanEmail.style = "color:red";
      } else if(regex_email.test(email.value) == false){
        spanEmail.textContent = "Format email incorrect";
        spanEmail.style = "color : red";
      } else{
        spanEmail.textContent = "";
      }
      if(!age.value.length){
        spanAge.textContent = "Age vide"
        spanAge.style = "color:red";
      } else if(age.value.length > 2 || regex_entier.test(age.value) == false){
        spanAge.textContent = "Format age incorrect";
        spanAge.style = "color:red";
      } else{
        spanAge.textContent = "";
      }
      if(!poste.value.length){
        spanPoste.textContent = "poste vide"
        spanPoste.style = "color:red";
      }
      if(!numero.value.length){
        spanNumero.textContent = "numero vide"
        spanNumero.style = "color:red";
      } else if(numero.value.length > 14 || regex_numero.test(numero.value) == false){
        spanNumero.textContent = "Numero incorret";
        spanNumero.style = "color : red";
      } else{
        spanNumero.textContent = '';
      }
      if(!statut.value.length){
        spanStatut.textContent = "Nom vide"
        spanStatut.style = "color:red";
      }
      if(!pays.value.length){
        spanPays.textContent = "pays vide"
        spanPays.style = "color:red";
      }
      do{
        id =  Math.floor(Math.random() * Math.floor(100))
      } while(tabId.includes(id))
      tabId.push(id)
      
    const obj = {
        id:id,
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

    if(recherche.value.length){
      for(i=0; i<tro.length; i++){
          if(tro[i].cells[0].textContent == recherche.value){
            for(a=1; a<9; a++){
              tro[i].cells[a].textContent = input[a-1].value;
              input[a-1].value = "";
            }
          btnSupprimer.style.display = "inline";
          btnModifier.style.display = "inline";
          btn.textContent = "Ajouter";
        }
      }
        
      }else{
        
        if(nom.value.length && prenom.value.length && email.value.length && age.value.length && poste.value.length && numero.value.length && statut.value.length && pays.value.length){
        newTr = document.createElement('tr')
        newTr.className = 'myClass';
        
        table.append(tbody)
        tbody.append(newTr)
        for(element in obj){
        newTd = document.createElement("td");
          newTr.append(newTd);
          newTd.append(obj[element]);
          tro = document.querySelectorAll(".myClass");
        }
        for(i=0; i<input.length; i++){
          input[i].value = "";
        }
        }else{
        
        }
        
      }
      recherche.value = "";
    
})


  btnModifier.addEventListener('click', function(e){
  e.preventDefault();
  if(recherche.value.length){
    for(i=0; i<tro.length; i++){
        if(tro[i].cells[0].textContent == recherche.value){
          for(h=1; h<9; h++){
            input[h-1].value = tro[i].cells[h].textContent
          } 
          btnSupprimer.style.display = "none";
          btnModifier.style.display = "none";
          btn.textContent = "Mise à jour"
        
      }
    }
    
    }

  else{
    alert("Impossible de faire une Modification car le champ recherche est vide")
  }
})

btnSupprimer.addEventListener('click', function(e){
  e.preventDefault();
  if(recherche.value.length){
    for(i=0; i<tro.length; i++){
        if(tro[i].cells[0].textContent == recherche.value){
          if(confirm("Voulez vous vraiment supprimer cet employé? " + tro[i].cells[1].textContent + " " + tro[i].cells[2].textContent)){
            tbody.removeChild(tro[i]);
          }
        
        
      }
    }
    recherche.value = "";
      
    }

  
})