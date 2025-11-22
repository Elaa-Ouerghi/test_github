console.log("Application financière chargée");

// ÉTAT GLOBAL DE L'APPLICATION
const state = {
    transactions: [],     
    solde: 0,            
    revenus: 0,          
    depenses: 0          
};

// INITIALISATION AU CHARGEMENT DE LA PAGE
function init() {
    console.log("Tableau de bord initialisé");
    setupEventListeners();
    afficherTransactions();
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
    
    // Ajoute la transaction au système
    ajouterTransaction(transaction);
    
    //Nettoie le formulaire
    document.querySelector('form').reset();
}
// AJOUT D'UNE TRANSACTION
function ajouterTransaction(transaction) {
    state.transactions.push(transaction); 
    calculerTotaux();                     
    afficherTransactions();               
}

// CALCUL DES TOTAUX FINANCIERS
function calculerTotaux() {
    state.revenus = 0;
    state.depenses = 0;
    
    //  Parcours toutes les transactions
    state.transactions.forEach(transaction => {
        if (transaction.type === 'revenu') {
            state.revenus += transaction.montant;  
        } else {
            state.depenses += Math.abs(transaction.montant); 
        }
    });
    
    state.solde = state.revenus - state.depenses; 
    mettreAJourCartes(); 
}
// MISE À JOUR DES CARTES
function mettreAJourCartes() {
    document.querySelector('.montant').textContent = `${state.solde} DT`;
    document.querySelector('.revenus').textContent = `${state.revenus} DT`;
    document.querySelector('.depenses').textContent = `${state.depenses} DT`;
}

// AFFICHAGE DE L'HISTORIQUE DES TRANSACTIONS
function afficherTransactions() {
    const container = document.querySelector('.transactions');
    
    // Si liste vide
    if (state.transactions.length === 0) {
        container.innerHTML = '<p class="message-vide">Aucune transaction</p>';
        return;
    }
    
    //  Crée le HTML pour chaque transaction
    container.innerHTML = state.transactions.map(transaction => `
        <div class="transaction ${transaction.type}">
            <div class="transaction-info">
                <strong>${transaction.description}</strong>
                <span class="transaction-date">${transaction.date}</span>
            </div>
            <span class="transaction-montant ${transaction.type}">
                ${transaction.type === 'revenu' ? '+' : '-'}${Math.abs(transaction.montant)} DT
            </span>
        </div>
    `).join('');
}
