// Récupération des données du fichier data.json
const response = await fetch("data.json");
// Conversion de la réponse JSON (chaîne) en objet JavaScript
const activitiesData = await response.json();

// Récupération des éléments du DOM
const activityCardsContainer = document.querySelector(".activity-cards");
const periodButtons = document.querySelectorAll(".timeframes__button");

// Objet des mots selon la période
const periodLabels = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month"
};

// Fonction qui génère les cartes d'activités en fonction de la période choisie
function renderActivityCards(period) {
    activitiesData.forEach(activity => {
        const activityTitle = activity.title.toLowerCase().replace(/\s+/g, '-');
        const activityIconPath = `images/icon-${activityTitle}.svg`;

        const currentHours = activity.timeframes[period.toLowerCase()].current;
        const hoursUnit = currentHours <= 1 ? "hr" : "hrs";
        const currentActivityStats = `${currentHours}${hoursUnit}`;

        const previousHours = activity.timeframes[period.toLowerCase()].previous;
        const previousUnit = previousHours <= 1 ? "hr" : "hrs";
        const previousActivityStats = `${periodLabels[period.toLowerCase()] || "Previous"} - ${previousHours}${previousUnit}`;

        // Création des éléments HTML pour chaque carte d'activité
        const activityCard = document.createElement("div");
        activityCard.classList.add("activity", activityTitle);

        const activityImageContainer = document.createElement("div");
        activityImageContainer.classList.add("activity__img");

        const activityImage = document.createElement("img");
        activityImage.classList.add("activity__img--icon");
        activityImage.src = activityIconPath;

        const activityDetailsContainer = document.createElement("div");
        activityDetailsContainer.classList.add("activity__details");

        const activityHeader = document.createElement("div");
        activityHeader.classList.add("activity__header");

        const activityMenuIcon = document.createElement("img");
        activityMenuIcon.classList.add("activity__header--img");
        activityMenuIcon.src = "images/icon-ellipsis.svg";

        const activityTitleElement = document.createElement("span");
        activityTitleElement.textContent = `${activityTitle.charAt(0).toUpperCase()}${activityTitle.slice(1).toLowerCase()}`;

        const activityStatsContainer = document.createElement("div");
        activityStatsContainer.classList.add("activity__stats");

        const currentStatsElement = document.createElement("p");
        currentStatsElement.classList.add("activity__stats--values");
        currentStatsElement.textContent = currentActivityStats;

        const previousStatsElement = document.createElement("span");
        previousStatsElement.classList.add("activity__stats--span");
        previousStatsElement.textContent = previousActivityStats;

        // Ajouter les éléments enfants dans leurs parents
        activityImageContainer.appendChild(activityImage);
        activityHeader.appendChild(activityTitleElement);
        activityHeader.appendChild(activityMenuIcon);
        activityDetailsContainer.appendChild(activityHeader);
        activityStatsContainer.appendChild(currentStatsElement);
        activityStatsContainer.appendChild(previousStatsElement);
        activityDetailsContainer.appendChild(activityStatsContainer);

        activityCard.appendChild(activityImageContainer);
        activityCard.appendChild(activityDetailsContainer);
        activityCardsContainer.appendChild(activityCard);
    });
}

// Mettre à jour les cartes d'activités en fonction de la période sélectionnée
for (let periodButton of periodButtons) {
    periodButton.addEventListener("click", (event) => {
        let selectedPeriod = event.target.textContent.toLowerCase();

        // Retirer la classe active de tous les boutons
        periodButtons.forEach((button) => {
            button.classList.remove("active");
        });

        // Ajouter la classe active au bouton cliqué
        event.target.classList.add("active");

        // Vider le conteneur des anciennes cartes d'activités
        activityCardsContainer.innerHTML = "";

        // Rendre les cartes d'activités selon la période choisie
        renderActivityCards(selectedPeriod);
    });
}

// Initialiser avec la période "weekly" par défaut
renderActivityCards("weekly");