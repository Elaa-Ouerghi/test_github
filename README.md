Tableau de Bord Financier Personnel

Une application web responsive permettant de suivre et gérer ses finances personnelles.
L'application permet d'ajouter des transactions (revenus et dépenses), de visualiser le solde actuel,
et d'avoir une vue d'ensemble de sa situation financière grâce à des graphiques et statistiques.

Technologies utilisées:

    HTML5 : Structure sémantique de l'application

    CSS3 : Styles avancés avec flexbox, gradients, animations et design responsive

    JavaScript (ES6+) : Logique métier, gestion d'état et interactions utilisateur

    LocalStorage : Persistance des données côté client

    CSS Grid & Flexbox : Mise en page responsive

Fonctionnalités principales:

    Ajout de transactions (revenus et dépenses)

    Calcul automatique du solde, revenus totaux et dépenses totales

    Historique des transactions avec possibilité de suppression

    Graphique visuel de répartition revenus/dépenses

    Persistance des données via localStorage

    Interface responsive (mobile, tablette, desktop)

    Animations et feedback visuel

Lien vers la page GitHub Pages :

https://elaa-ouerghi.github.io/test_github/

Nouveautés explorées:

    Gestion d'état avancée : Implémentation d'un système de state management

    Persistance des données : Utilisation de localStorage pour sauvegarder les transactions

    Animations CSS avancées : Transitions, transformations et gradients complexes

    Design responsive approfondi : Adaptation sur tous les écrans avec media queries

    Accessibilité : Amélioration de la navigation au clavier et lecture d'écran

    Architecture modulaire : Séparation claire entre logique, présentation et données

Difficultés rencontrées:

    Gestion des pourcentages du graphique : Calcul dynamique des largeurs des barres en fonction des totaux

    Responsive design complexe : Adaptation du layout à deux colonnes vers une seule sur mobile

    Persistance des données : Gestion des erreurs de parsing JSON et données corrompues

    Calculs financiers : Gestion des nombres à virgule et arrondis pour éviter les erreurs

    Performance : Optimisation du re-rendu lors des mises à jour d'interface

Solutions apportées:

    Pour le graphique : Implémentation d'un calcul de pourcentage basé sur le total revenus + dépenses avec gestion du cas zéro

    Pour le responsive : Utilisation de media queries et flexbox avec réorganisation complète du layout

    Pour la persistance : Ajout de try/catch et validation des données chargées

    Pour les calculs : Utilisation de toFixed(2) et gestion des valeurs absolues pour les dépenses

    Pour les performances : Mise à jour sélective des éléments DOM uniquement quand nécessaire
