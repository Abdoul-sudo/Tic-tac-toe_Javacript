// On charge les informations utiles
const statut = document.querySelector("h2");
let jeuActif = true; // savoir si on joue ou pas
let joueurActif = "X"; 
let style = "#1098F7";
let board = ["", "", "", "", "", "", "", "", ""];

// On peut gagner si on a une ligne, une colonne ou une diagonale
const conditionsVictoire = [
    [0, 1, 2], // 1ere ligne
    [3, 4, 5], // 2e L
    [6, 7, 8], // 3e L
    [0, 3, 6], // 1e colonne
    [1, 4, 7], // 2e C
    [2, 5, 8], // 3e C
    [0, 4, 8], // 1ere diagonale 
    [2, 4, 6] // 2e diagonale    
];

//Messages
const victoire = () => `Le joueur ${joueurActif} a gagné`;
const egalite = () => `Egalité`;
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`;
statut.innerHTML = tourJoueur(); 


//selection de case
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase));
// selection du bouton
document.querySelector("#recommencer").addEventListener("click", recommencer);


function gestionClicCase() {
    // On récupère les valeurs des cases cliqués
    const indexCase = parseInt(this.getAttribute("value"));

    // si la case est déja remplie, on ne fait rien
    if (board[indexCase] !== "" || !jeuActif) { 
        return
    }
    // sinon on y écrit X ou O
    board[indexCase] = joueurActif;
    this.innerHTML = joueurActif;
    this.style.color = style;
    verifVictoire();
}

function verifVictoire() {
    let tourGagnant = false;

    for (const condVictoire of conditionsVictoire) {
        val1 = board[condVictoire[0]];
        val2 = board[condVictoire[1]];
        val3 = board[condVictoire[2]];
        //si le plateau contient encore au moins une case vide
        if (val1 === "" || val2 === "" || val3 === "") {
            continue
        }
        // condition de victoire
        if (val1 === val2 && val2 === val3) {
            tourGagnant = true;
            break;
        }
    }
    // un joueur a rempli les conditions de victoire
    if (tourGagnant) {
        statut.innerHTML = victoire();
        statut.style.color = "#00B295";
        jeuActif = false;
        return
    }
    // le plateau est plein mais que personne n'a gagné
    if (!board.includes("")) {
        statut.innerHTML = egalite();
        statut.style.color = "rgb(163, 15, 15)";
        jeuActif = false;
        return
    }

    joueurActif = joueurActif === "X" ? "O" : "X";
    style = joueurActif === "X" ? "#1098F7" : "#c01964";
    statut.innerHTML = tourJoueur();
}

function recommencer() {
    jeuActif = true;
    joueurActif = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    statut.innerHTML = tourJoueur();
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "");
}

