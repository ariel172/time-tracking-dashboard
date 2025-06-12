//Récuperation des données du fichier data.json
const reponse = await fetch("data.json");
//Passage de l'objet JSON en objet JS 
const data = await reponse.json();

//Récuperation des éléments du DOM
const body = document.querySelector("body");
let container = document.querySelector(".container");
let timeFrames = document.querySelector(".timeframes");
let activityCards = document.querySelector(".activity-cards");

let periode = "Weekly";

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

    // Création des balises pour chaque carte d’activité

   // Bloc principal contenant la carte d’activité
    const divActivity = document.createElement("div");
    divActivity.classList.add("activity",titre);

    // Bloc pour l’image, qui reçoit la couleur de fond selon l’activité
    let divImage = document.createElement("div");
    divImage.classList.add("activity__img");

    // Élément <img> de l’icône de l’activité
    let imageElement = document.createElement("img");
    imageElement.src = cheminImage;

    //Bloc pour les détails sur l'activités
    let divDetails = document.createElement("div");
    divDetails.classList.add("activity__details");
    //Bloc pour le titre et l'image des points
    let headerActivity = document.createElement("div");
    headerActivity.classList.add("activity__header");
    //images des points
    let imageMenu = document.createElement("img");
    imageMenu.classList.add("activity__header--img");
    imageMenu.src = "images/icon-ellipsis.svg";
    //titre a côté des image points
    let spanTitre = document.createElement("span")
    spanTitre.textContent = `${titre.charAt(0).toUpperCase()}${titre.slice(1).toLowerCase()}`;
    //Bloc pour la stat de chaque activité
    let statsActivity = document.createElement("div");
    statsActivity.classList.add("activity__stats");
    //Balise pour la valeur de la stats
    let statsValue = document.createElement("p")
    statsValue.classList.add("activity__stats--values");
    statsValue.textContent = `${tableActivity.timeframes[periode.toLowerCase()].current }hrs`
    //bloc pour les stats précedent 'Last'
    let spanLast = document.createElement("span");
    spanLast.classList.add("activity__stats--span");
    spanLast.textContent = ` Last ${periode}-${tableActivity.timeframes[periode.toLowerCase()].previous}hrs`;
    
    

    //Ajout des balises enfants dans les parents

    //Ajout Élément <img> de l’icône de l’activité
    divImage.appendChild(imageElement);
    headerActivity.appendChild(spanTitre)
    //Ajout images des points dans le bloc pour le titre et l'image des points
    headerActivity.appendChild(imageMenu);
    //Ajout bloc pour le titre et l'image des points dans 
    divDetails.appendChild(headerActivity)
    //Ajout balise de la valeur de la stats
    statsActivity.appendChild(statsValue)
    //Ajout bloc pour les stats précedent 'Last'
    statsActivity.appendChild(spanLast)
    //Ajout Bloc pour la stat de chaque activité
    divDetails.appendChild(statsActivity);
    
    divActivity.appendChild(divImage);
    divActivity.appendChild(divDetails);
    activityCards.appendChild(divActivity);
}