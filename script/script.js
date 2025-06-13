//Récuperation des données du fichier data.json
const reponse = await fetch("data.json");
//Passage de l'objet JSON en objet JS 
const data = await reponse.json();

//Récuperation des éléments du DOM
const body = document.querySelector("body");
let container = document.querySelector(".container");
let timeFrames = document.querySelector(".timeframes");
let activityCards = document.querySelector(".activity-cards");


//Récuperation des boutons
let btnTimeframes = document.querySelectorAll(".timeframes__button");

//Période par défaut
let periode = "weekly";

//Objet des mots selon la prériode
const periodeLabels = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month"
};


/**
 * Récupération du titre de chaque activité
 * - Transformation en minuscules
 * - Remplacement des espaces par des tirets
 * - Construction du chemin d’image correspondant
 */
function timeFramesData (periode){
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
        imageElement.classList.add("activity__img--icon");
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
        let spanTitre = document.createElement("span");
        spanTitre.textContent = `${titre.charAt(0).toUpperCase()}${titre.slice(1).toLowerCase()}`;

        //Bloc pour la stat de chaque activité
        let statsActivity = document.createElement("div");
        statsActivity.classList.add("activity__stats");

        //Balise pour la valeur de la stats
        let statsValue = document.createElement("p");
        statsValue.classList.add("activity__stats--values");
        const currentHours = tableActivity.timeframes[periode.toLowerCase()].current;
        const unitHours = currentHours <= 1 ? "hr" : "hrs";
        statsValue.textContent = `${currentHours}${unitHours}`;

        //bloc pour les stats précedent 
        let spanLast = document.createElement("span");
        spanLast.classList.add("activity__stats--span");
        const label = periodeLabels[periode.toLowerCase()] || "Previous"; // fallback au cas où
        const previousHours = tableActivity.timeframes[periode.toLowerCase()].previous;
        const unit = previousHours <= 1 ? "hr" : "hrs";
        spanLast.textContent = `${label} - ${previousHours}${unit}`;
                
        
        //Ajout des balises enfants dans les parents
        //Ajout Élément <img> de l’icône de l’activité
        divImage.appendChild(imageElement);
        //Ajout titre a côté des image points
        headerActivity.appendChild(spanTitre);
        //Ajout images des points dans le bloc pour le titre et l'image des points
        headerActivity.appendChild(imageMenu);
        //Ajout bloc pour le titre et l'image des points dans 
        divDetails.appendChild(headerActivity);
        //Ajout balise de la valeur de la stats
        statsActivity.appendChild(statsValue);
        //Ajout bloc pour les stats précedent 'Last'
        statsActivity.appendChild(spanLast);
        //Ajout Bloc pour la stat de chaque activité
        divDetails.appendChild(statsActivity);
        
        divActivity.appendChild(divImage);
        divActivity.appendChild(divDetails);
        activityCards.appendChild(divActivity);
    }
}
timeFramesData(periode)

//mise a jour des données en fonction du clique
for (let button of btnTimeframes) {
    button.addEventListener("click", (e) => {
    //le contenu de l'élément HTML qui a été cliqué
    let valueBtn = e.target.textContent;
    //Retirer la class sur les éléments dans btnTimeframes
    btnTimeframes.forEach((btn)=>{
        btn.classList.remove("active");
    })
    //Ajouter la class active uniquement sur HTML qui a été cliqué
    e.target.classList.add("active");
    //Mettre le contenu de l'élément HTML qui a été cliqué en minuscule
    valueBtn = valueBtn.toLowerCase();
    periode = valueBtn;
    activityCards.innerHTML = "";
    timeFramesData(periode);
  });
}