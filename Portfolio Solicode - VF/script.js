
class Projet {
    constructor(intitule_valeur, lienGitHub_valeur, competences_valeur, date_valeur) {

        this.intitule = intitule_valeur;
        this.lienGitHub = lienGitHub_valeur;
        this.competences = competences_valeur;
        this.date = date_valeur;

    }
}


class Etudiant {
    constructor(nom_valeur, prenom_valeur, email_valeur, telephone_valeur, groupe_valeur) {

        this.nom = nom_valeur;
        this.prenom = prenom_valeur;
        this.email = email_valeur;
        this.telephone = telephone_valeur;
        this.groupe = groupe_valeur;
        this.projets = [];

    }
}

function submitStudent() {
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("email").value;
    const telephone = document.getElementById("telephone").value;
    const groupe = document.getElementById("groupe").value;

    const nomField = document.getElementById("nom");
    const prenomField = document.getElementById("prenom");
    const emailField = document.getElementById("email");
    const telephoneField = document.getElementById("telephone");
    const groupeField = document.getElementById("groupe");

    document.getElementById("nom-erreur").innerHTML = "";
    document.getElementById("prenom-erreur").innerHTML = "";
    document.getElementById("email-erreur").innerHTML = "";
    document.getElementById("telephone-erreur").innerHTML = "";
    document.getElementById("groupe-erreur").innerHTML = "";

    const fields = [nomField, prenomField, emailField, telephoneField, groupeField];
    for (let field of fields) {
        field.style.border = "";
    }

    let valid = true;

    if (nom === "") {
        document.getElementById("nom-erreur").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Le nom est requis`;
        nomField.style.border = "1px solid red";
        valid = false;
    }

    if (prenom === "") {
        document.getElementById("prenom-erreur").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Le prénom est requis`;
        prenomField.style.border = "1px solid red";
        valid = false;
    }

    if (email === "") {
        document.getElementById("email-erreur").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> L'email est requis`;
        emailField.style.border = "1px solid red";
        valid = false;
    } else {
        const emailPattern = /^[a-zA-Z]+\.[a-zA-Z]+\.solicode@gmail\.com$/;
        if (!emailPattern.test(email)) {
            document.getElementById("email-erreur").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Format d'email invalide`;
            emailField.style.border = "1px solid red";
            valid = false;
        }
    }

    if (telephone === "") {
        document.getElementById("telephone-erreur").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Le numéro de téléphone est requis`;
        telephoneField.style.border = "1px solid red";
        valid = false;
    } else {
        const telephonePattern = /^\+212\d{9}$/;
        if (!telephonePattern.test(telephone)) {
            document.getElementById("telephone-erreur").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Format de téléphone invalide`;
            telephoneField.style.border = "1px solid red";
            valid = false;
        }
    }
    
    if (groupe === "") {
        document.getElementById("groupe-erreur").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Le choix de groupe est requis`;
        groupeField.style.border = "1px solid red";
        valid = false;
    }

    if (!valid) {
        return;
    }

    const etudiants = JSON.parse(localStorage.getItem("etudiants")) || [];

    const nouveauEtudiant = new Etudiant(nom, prenom, email, telephone, groupe);

    etudiants.push(nouveauEtudiant);

    localStorage.setItem("etudiants", JSON.stringify(etudiants));

    window.location.href = "projets.html";
}

// Add project function
function addProject() {
    const intitule = document.getElementById("intitule").value;
    const lien = document.getElementById("lien").value;
    const date = document.getElementById("date").value;
    const competences = document.querySelectorAll("input[name='competences']:checked");

    let competencesArray = [];
    for (let competence of competences) {
        competencesArray.push(competence.value);
    }

    document.getElementById("intitule-erreur").innerHTML = "";
    document.getElementById("lien-erreur").innerHTML = "";
    document.getElementById("date-erreur").innerHTML = "";
    document.getElementById("competences-erreur").innerHTML = "";

    const intituleField = document.getElementById("intitule");
    const lienField = document.getElementById("lien");
    const dateField = document.getElementById("date");

    const fields = [intituleField, lienField, dateField];
    for (let field of fields) {
        field.style.border = "";
    }

    let valid = true;

    if (intitule === "") {
        document.getElementById("intitule-erreur").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> L'intitulé du projet est requis`;
        intituleField.style.border = "1px solid red";
        valid = false;
    }

    if (lien === "") {
        document.getElementById("lien-erreur").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Le lien GitHub est requis`;
        lienField.style.border = "1px solid red";
        valid = false;
    } else {
        const lienPattern = /^https:\/\/github\.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+(\.git)?$/;
        if (!lienPattern.test(lien)) {
            document.getElementById("lien-erreur").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Format de lien invalide`;
            lienField.style.border = "1px solid red";
            valid = false;
        }
    }
    if (date === "") {
        document.getElementById("date-erreur").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> La date de réalisation est requise`;
        dateField.style.border = "1px solid red";
        valid = false;
    }

    if (competences.length === 0) {
        document.getElementById("competences-erreur").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Vous devez choisir au moins une compétence.`;
        valid = false;
    }

    if (!valid) {
        return;
    }

    const etudiants = JSON.parse(localStorage.getItem("etudiants")) || [];

    const student = etudiants[etudiants.length - 1];

    const nouveauProjet = new Projet(intitule, lien, competencesArray, date);

    student.projets.push(nouveauProjet);

    localStorage.setItem("etudiants", JSON.stringify(etudiants));

    displayProject(nouveauProjet);

    document.getElementById("projetForm").reset();
}

// Display project on page
function displayProject(nouveauProjet) {
    const projectCard = document.createElement("div");
    projectCard.className = "projet-carte";
    projectCard.innerHTML = `
        <h3><i class="fa-solid fa-file-signature"></i> ${nouveauProjet.intitule}</h3>
        <p><i class="fa-brands fa-github"></i> GitHub : <a href="${nouveauProjet.lienGitHub}" target="_blank">${nouveauProjet.lienGitHub}</a></p>
        <p><i class="fa-solid fa-code"></i> Compétences : ${nouveauProjet.competences.join(', ')}</p>
        <p><i class="fa-solid fa-calendar-days"></i> Date : ${nouveauProjet.date}</p>
    `;
    document.querySelector(".carte").appendChild(projectCard);
}

function finish() {
    window.location.href = "portfolio.html";
}


// Display student information and projects on portfolio page
function displayPortfolio() {

    const etudiants = JSON.parse(localStorage.getItem("etudiants")) || [];

    const student = etudiants[etudiants.length - 1];

    const studentDetails = document.getElementById("student-details");
    studentDetails.innerHTML = `
        <p><i class="fa-solid fa-signature"></i> Nom : ${student.nom}</p>
        <p><i class="fa-solid fa-signature"></i> Prénom : ${student.prenom}</p>
        <p><i class="fa-solid fa-at"></i> Email : ${student.email}</p>
        <p><i class="fa-solid fa-phone"></i> Téléphone : ${student.telephone}</p>
        <p><i class="fa-solid fa-people-group"></i> Groupe : ${student.groupe}</p>
    `;

    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";

    for (let i = 0; i < student.projets.length; i++) {
        displayProject(student.projets[i]);
    }

}

// Download the page as a PDF file
function downloadPortfolio() {
    const element = document.body;
    const telechargerButton = document.getElementById("telechargerButton");

    if (telechargerButton) {
        telechargerButton.style.display = "none";
    }

    const options = {
        filename: 'Portfolio_Solicode.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save().then(() => {

        if (telechargerButton) {
            telechargerButton.style.display = "block";
        }
    });
}



// Clear all entries
// localStorage.clear();
