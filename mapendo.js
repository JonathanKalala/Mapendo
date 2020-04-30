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


function inputVide(){
  for(i=0; i<input.length; i++){
    input[i].value = "";
  }
}

inputVide()

function rechargerTableau(){
  axios.get('http://167.71.45.243:4000/api/employes?api_key=yfryaep').then(function(response){
    for(i=0; i<response.data.length; i++){
      newTr = document.createElement("tr");
      let td1 = document.createElement('td');
      td1.append(response.data[i]._id);
      let td2 = document.createElement('td');
      td2.append(response.data[i].nom);
      let td3 = document.createElement('td');
      td3.append(response.data[i].prenom);
      let td4 = document.createElement('td');
      td4.append(response.data[i].email);
      let td5 = document.createElement('td');
      td5.append(response.data[i].poste);
      let td6 = document.createElement('td');
      td6.append(response.data[i].numeroTelephone);
      let td7 = document.createElement('td');
      td7.append(response.data[i].estMarie);
      let td8 = document.createElement('td');
      td8.append(response.data[i].pays)

      newTr.append(td1, td2, td3, td4, td5, td6, td7, td8)
      tbody.append(newTr)
    }
  })
}

rechargerTableau()

btn.addEventListener('click', function(e){
    e.preventDefault()
      if(!nom.value.length){
        spanNom.textContent = "Nom vide"
        spanNom.style = "color:red";
      }else{
        spanNom.textContent = "";
      }
      if(!prenom.value.length){
        spanPrenom.textContent = "Prenom vide"
        spanPrenom.style = "color:red";
      }else{
        spanPrenom.textContent = "";
      }
      if(!email.value.length){
        spanEmail.textContent = "Email vide"
        spanEmail.style = "color:red";
      }else{
        spanEmail.textContent = "";
      }
      if(!poste.value.length){
        spanPoste.textContent = "poste vide"
        spanPoste.style = "color:red";
      }
      if(!numero.value.length){
        spanNumero.textContent = "numero vide"
        spanNumero.style = "color:red";
      }else{
        spanNumero.textContent = '';
      }
      if(!pays.value.length){
        spanPays.textContent = "pays vide"
        spanPays.style = "color:red";
      }

      const obj = {
        nom : nom.value,
        prenom : prenom.value,
        email : email.value,
        poste : poste.value,
        numeroTelephone : numero.value,
        estMarie : statut.value=='Oui' ? true : false,
        pays : pays.value
    }
    users.push(obj)
    
    if(nom.value.length && prenom.value.length && email.value.length && poste.value.length && numero.value.length && statut.value.length && pays.value.length){
      if(recherche.value.length){
        let a = recherche.value
        axios.put(`http://167.71.45.243:4000/api/employes/${a}?api_key=yfryaep`, obj)
            .then(function(response){
              rechargerTableau()
                alert("Agent Modifier avec succé")
            })
            .catch(function(erreurs){
                alert(erreurs)
            })
            btnSupprimer.style.display = "inline";
          btnModifier.style.display = "inline";
          btn.textContent = "Ajouter"
          inputVide()
      }
      else{
        axios.post('http://167.71.45.243:4000/api/employes?api_key=yfryaep', obj)
    
            .then(function(response){
              rechargerTableau()
                alert("Agent Ajouté avec succé !")
            })
            .catch(function(erreurs){
                alert(erreurs)
            })
      }
      recherche.value = '';
      tbody.innerHTML ='';
      btnSupprimer.style.display = "inline";
      btnModifier.style.display = "inline";
      btn.textContent = "Ajouter"
      inputVide()
  }    
})

  btnModifier.addEventListener('click', function(e){
  e.preventDefault();
  if(recherche.value.length){
    axios.get('http://167.71.45.243:4000/api/employes?api_key=yfryaep').then(function(response){
      for(i=0; i<response.data.length; i++){
        if(response.data[i]._id == recherche.value){
            
            input[0].value = response.data[i].nom;
            input[1].value = response.data[i].prenom;
            input[2].value = response.data[i].email;
            input[3].value = response.data[i].poste;
            input[4].value = response.data[i].numeroTelephone;
            input[5].value = response.data[i].estMarie;
            input[6].value = response.data[i].pays;
          
        
      }
      btnSupprimer.style.display = "none";
          btnModifier.style.display = "none";
          btn.textContent = "Mise à jour"
    }
    })
    
    
    }

  else{
    alert("Impossible de faire une modification car le champ matricule est vide")
  }
})

btnSupprimer.addEventListener('click', function(e){
  e.preventDefault(); 
  axios.get('http://167.71.45.243:4000/api/employes?api_key=yfryaep').then(function(response){
    if(recherche.value.length){
      for(i=0; i<response.data.length; i++){
        if(response.data[i]._id == recherche.value){
          let a=response.data[i]
          if(confirm("Voulez-vous vraiment supprimer l'agent " + a.nom + " " + a.prenom)){
            axios.delete(`http://167.71.45.243:4000/api/employes/${a._id}?api_key=yfryaep`)
              .then(function(response){
                rechargerTableau()
                  alert("Agent " + a.nom + " " + a.prenom + " supprimé avec succé")
              })
              .catch(function(erreurs){
                  alert(erreurs)
              })
          }
        } 
      }
    }
    else{
      alert("Impossible de faire une suppresion car le champ matricule est vide")
    }
      recherche.value = '';
      tbody.innerHTML ='';
      inputVide() 
    
  }) 
})


