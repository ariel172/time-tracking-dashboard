// Récupération des données du fichier data.json
const reponse = await fetch("data.json");
// Conversion de la réponse JSON (chaîne) en objet JavaScript
const data = await reponse.json();


// Récupération des éléments du DOM
let activityCards = document.querySelector(".activity-cards");

// Récupération des boutons
let btnTimeframes = document.querySelectorAll(".timeframes__button");

// Objet des mots selon la période
const periodeLabels = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month"
};

// Fonction qui génère les cartes d'activités en fonction de la période
function timeFramesData(periode) {
    for (let i = 0; i < data.length; i++) {
        const tableActivity = data[i];
        let titre = tableActivity.title.toLowerCase().replace(/\s+/g, '-');
        let cheminImage = `images/icon-${titre}.svg`;

        // Création des balises pour chaque carte d’activité
        const divActivity = document.createElement("div");
        divActivity.classList.add("activity", titre);

        let divImage = document.createElement("div");
        divImage.classList.add("activity__img");

        let imageElement = document.createElement("img");
        imageElement.classList.add("activity__img--icon");
        imageElement.src = cheminImage;

        let divDetails = document.createElement("div");
        divDetails.classList.add("activity__details");

        let headerActivity = document.createElement("div");
        headerActivity.classList.add("activity__header");

        let imageMenu = document.createElement("img");
        imageMenu.classList.add("activity__header--img");
        imageMenu.src = "images/icon-ellipsis.svg";

        let spanTitre = document.createElement("span");
        spanTitre.textContent = `${titre.charAt(0).toUpperCase()}${titre.slice(1).toLowerCase()}`;

        let statsActivity = document.createElement("div");
        statsActivity.classList.add("activity__stats");

        let statsValue = document.createElement("p");
        statsValue.classList.add("activity__stats--values");

        const currentHours = tableActivity.timeframes[periode.toLowerCase()].current;
        const unitHours = currentHours <= 1 ? "hr" : "hrs";
        statsValue.textContent = `${currentHours}${unitHours}`;

        let spanLast = document.createElement("span");
        spanLast.classList.add("activity__stats--span");

        const label = periodeLabels[periode.toLowerCase()] || "Previous";
        const previousHours = tableActivity.timeframes[periode.toLowerCase()].previous;
        const unit = previousHours <= 1 ? "hr" : "hrs";
        spanLast.textContent = `${label} - ${previousHours}${unit}`;

        // Ajout des balises enfants dans les parents
        divImage.appendChild(imageElement);
        headerActivity.appendChild(spanTitre);
        headerActivity.appendChild(imageMenu);
        divDetails.appendChild(headerActivity);
        statsActivity.appendChild(statsValue);
        statsActivity.appendChild(spanLast);
        divDetails.appendChild(statsActivity);

        divActivity.appendChild(divImage);
        divActivity.appendChild(divDetails);
        activityCards.appendChild(divActivity);
    }
}

// Mettre à jour les données en fonction du clic
for (let button of btnTimeframes) {
    button.addEventListener("click", (e) => {
        let valueBtn = e.target.textContent.toLowerCase();

        // Retirer la classe active des autres boutons
        btnTimeframes.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Ajouter la classe active sur le bouton cliqué
        e.target.classList.add("active");

        // Mettre à jour les cartes d'activités avec la nouvelle période
        activityCards.innerHTML = ""; // Vider les anciennes cartes
        timeFramesData(valueBtn); // Passer la nouvelle période en argument
    });
}

// Initialiser avec la période "weekly" par défaut
timeFramesData("daily");