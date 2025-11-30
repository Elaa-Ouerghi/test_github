console.log("Application financière chargée");

// ÉTAT GLOBAL DE L'APPLICATION
const state = {
    transactions: [],     
    solde: 0,            
    revenus: 0,          
    depenses: 0          
};

const STORAGE_KEY = 'dashboard-financier-data';

// Charger depuis localStorage
function chargerDonnees() {
    const donneesSauvegardees = localStorage.getItem(STORAGE_KEY);
    if (donneesSauvegardees) {
        const donnees = JSON.parse(donneesSauvegardees);
        state.transactions = donnees.transactions || [];
        console.log(`${state.transactions.length} transactions chargées`);
    }
    calculerTotaux();
}

// Sauvegarder dans localStorage
function sauvegarderDonnees() {
    const donneesASauvegarder = {
        transactions: state.transactions,
        derniereSauvegarde: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(donneesASauvegarder));
    console.log("Données sauvegardées");
}

// INITIALISATION AU CHARGEMENT DE LA PAGE
function init() {
    console.log("Tableau de bord initialisé");
    chargerDonnees();
    setupEventListeners();
    afficherTransactions();
    mettreAJourGraphique(); 
}

// Démarre l'application quand la page est prête
document.addEventListener('DOMContentLoaded', init);

// CONFIGURATION DES ÉVÉNEMENTS
function setupEventListeners() {
    const formulaire = document.querySelector('form');
    formulaire.addEventListener('submit', gererSoumissionFormulaire);
}

// GESTION DE LA SOUMISSION DU FORMULAIRE
function gererSoumissionFormulaire(evenement) {
    evenement.preventDefault(); 
    
    const description = document.querySelector('input[type="text"]').value;
    const montant = parseFloat(document.querySelector('input[type="number"]').value);
    
    if (!description || !montant) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    const transaction = {
        id: Date.now(),       
        description: description,
        montant: montant,
        type: montant > 0 ? 'revenu' : 'depense', 
        date: new Date().toLocaleDateString('fr-FR')
    };
    
    ajouterTransaction(transaction);
    document.querySelector('form').reset();
}

// AJOUT D'UNE TRANSACTION
function ajouterTransaction(transaction) {
    state.transactions.push(transaction); 
    calculerTotaux();                     
    afficherTransactions();      
    sauvegarderDonnees();  
}

// FONCTION POUR SUPPRIMER UNE TRANSACTION
function supprimerTransaction(id) {
    if (confirm("Voulez-vous vraiment supprimer cette transaction ?")) {
        state.transactions = state.transactions.filter(transaction => transaction.id !== id);
        calculerTotaux();
        afficherTransactions();
        sauvegarderDonnees();
    }
}

// CALCUL DES TOTAUX FINANCIERS
function calculerTotaux() {
    state.revenus = 0;
    state.depenses = 0;
    
    state.transactions.forEach(transaction => {
        if (transaction.type === 'revenu') {
            state.revenus += transaction.montant;  
        } else {
            state.depenses += Math.abs(transaction.montant); 
        }
    });
    
    state.solde = state.revenus - state.depenses; 
    mettreAJourCartes(); 
    mettreAJourGraphique(); 
}

// FONCTION POUR METTRE À JOUR LE GRAPHIQUE
function mettreAJourGraphique() {
    const total = state.revenus + state.depenses;
    
    let pourcentageRevenus, pourcentageDepenses;
    
    if (total > 0) {
        pourcentageRevenus = (state.revenus / total) * 100;
        pourcentageDepenses = (state.depenses / total) * 100;
    } else {
        // Si pas de données, afficher 0%
        pourcentageRevenus = 0;
        pourcentageDepenses = 0;
    }
    
    // Mettre à jour TOUTES les barres de revenus
    const barresRevenus = document.querySelectorAll('.revenu-bar');
    barresRevenus.forEach(barre => {
        barre.style.width = `${pourcentageRevenus}%`;
    });
    
    // Mettre à jour TOUTES les barres de dépenses
    const barresDepenses = document.querySelectorAll('.depense-bar');
    barresDepenses.forEach(barre => {
        barre.style.width = `${pourcentageDepenses}%`;
    });
    
    // Mettre à jour TOUTES les valeurs
    const valeurs = document.querySelectorAll('.bar-valeur');
    valeurs.forEach((valeur, index) => {
        if (index % 2 === 0) {
            // Index pairs = revenus
            valeur.textContent = `${state.revenus.toFixed(2)} DT`;
        } else {
            // Index impairs = dépenses
            valeur.textContent = `${state.depenses.toFixed(2)} DT`;
        }
    });
    
    // Mettre à jour les cartes de résumé
    mettreAJourCartes();
}
// MISE À JOUR DES CARTES
function mettreAJourCartes() {
    document.querySelector('.montant').textContent = `${state.solde.toFixed(2)} DT`; 
    document.querySelector('.revenus').textContent = `${state.revenus.toFixed(2)} DT`; 
    document.querySelector('.depenses').textContent = `${state.depenses.toFixed(2)} DT`;
}

// AFFICHAGE DE L'HISTORIQUE DES TRANSACTIONS
function afficherTransactions() {
    const container = document.querySelector('.transactions');
    
    if (state.transactions.length === 0) {
        container.innerHTML = '<p class="message-vide">Aucune transaction</p>';
        return;
    }
    
    container.innerHTML = state.transactions.map(transaction => `
        <div class="transaction ${transaction.type}">
            <div class="transaction-info">
                <strong>${transaction.description}</strong>
                <span class="transaction-date">${transaction.date}</span>
            </div>
            <div class="transaction-actions">
            <span class="transaction-montant ${transaction.type}">
                ${transaction.type === 'revenu' ? '+' : '-'}${Math.abs(transaction.montant).toFixed(2)} DT
            </span>
                <button class="btn-supprimer" onclick="supprimerTransaction(${transaction.id})">
                    ×
                </button>
                </div>
        </div>
    `).join('');
}