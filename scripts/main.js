// ==== Sélections ====
const elements = {
    usersPics: document.querySelector(".users-pics"),
    userDetails: document.querySelector(".user-details"),
}

// ==== Fonctions utilitaires ====
function createElement(tag, className, content) {
    const element = document.createElement(tag);
    
    if (className) {
        element.className = className;
    }
    if (content) {
        element.innerHTML = content;
    }

    return element;
}
function appendElement(parent, child) {
    parent.append(child);
}

// ==== API ====
// Appel d'api
async function getApi() {
    // Requête
    try {
        const response = await fetch(`../scripts/datas.json`); // soumettre la requête
        const data = await response.json(); // convertir en .json

        console.log(data.users, "data");
        
        return data.users
    }
    // Echec de la requête
    catch (error) {
        console.error(error);
    }
}

// Rendre les photos de tous les utilisateurs
async function renderPictures() {
    // Vider le conteneur avant d'ajouter du contenu
    elements.usersPics.innerHTML = "";

    // Récupérer les données de l'API
    const users = await getApi();

    // Boucle sur les données JSON pour afficher les photos
    users.forEach(user => {
        const profil = createElement("img", "user-img");
        profil.setAttribute("src", `${user.image}`);
        profil.setAttribute("alt", `Photo de ${user.name}`);
        profil.setAttribute("data-id", `${user.id}`);
        appendElement(elements.usersPics, profil);
    });
}
renderPictures()

// Rendre les détails du profil clické
async function renderProfile(profileId) {
    // Vider le conteneur avant d'ajouter du contenu
    elements.userDetails.innerHTML = "";
    // Récupérer les données de l'API
    const users = await getApi();

    users.forEach(user => {
        // on vérifie l'id de l'image avec l'id de la base de données pour n'afficher que celui-là
        if (user.id == profileId) {
            // Création des balises et attributs
            const img = createElement("img");
            img.setAttribute("src", `${user.image}`);
            img.setAttribute("alt", `Photo de ${user.name}`);
            const h2 = createElement("h2", "", `${user.name}`);
            const age = createElement("div", "age", `${user.age}`);
            const mail = createElement("a", "contact", `<i class="fa-solid fa-envelope" aria-hidden="true"></i>`);
            mail.setAttribute("href", `mailto:${user.email}`);
            mail.setAttribute("title", `Envoyez un email à ${user.name}`);
            const addresse = createElement("address", "address", `${user.address.street} - ${user.address.city} | ${user.address.country}`);

            // Ajout dans le html
            appendElement(elements.userDetails, img);
            appendElement(elements.userDetails, h2);
            appendElement(elements.userDetails, age);
            appendElement(elements.userDetails, mail);
            appendElement(elements.userDetails, addresse);
        }
    })
    
}

// ==== Evénements ====
elements.usersPics.addEventListener("click", function (event) {
    event.preventDefault();

    // On cible l'image
    if (event.target.classList.contains("user-img")) {
        // On repère son id pour passer en paramètre
        const profileId = event.target.dataset.id;

        // On applique notre fonction avec l'argument
        renderProfile(profileId)
    }
})