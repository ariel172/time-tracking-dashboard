//Récuperation des données du fichier data.json
const reponse = await fetch("data.json");
//Passage de l'objet JSON en objet JS 
const data = await reponse.json();

//Récuperation des éléments du DOM
const body = document.querySelector("body");
let container = document.querySelector(".container");
let timeFrames = document.querySelector(".timeframes");
let activityCards = document.querySelector(".activity-cards");

/**
 * Récupération du titre de chaque activité
 * - Transformation en minuscules
 * - Remplacement des espaces par des tirets
 * - Construction du chemin d’image correspondant
 */
for(let i = 0; i < data.length; i++){
    const tableActivity = data[i];
    let titre = tableActivity.title;
    titre = titre.toLowerCase();
    titre = titre.replace(/\s+/g, '-');
    let cheminImage = `images/icon-${titre}.svg`;

    //création des balises pour les activitées
    const divActivity = document.createElement("div");
    divActivity.classList.add("activity","work","play","study","exercise","social","self-care");
    let imageElement = document.createElement("img");
    imageElement.src = cheminImage
    console.log(imageElement)

    //Ajout des balises enfant dans les parents
}





 

// activityCards.appendChild(divActivity)
// console.log(activityCards);
// body.appendChild(activityCards)
// console.log(body)