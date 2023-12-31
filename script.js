var audio = document.getElementById("myAudio");
var categories = {
  Test: [
    "audio/KIKESA - 42 JOURS.mp3",
    "audio/Nekfeu - On Verra (Clip Officiel).mp3",
    "audio/Trophée Vald.mp3",
    "audio/Des Histoires a Raconter.mp3",
  ],
  "Année 2010": [
    "audio/Roar.mp3",
    "audio/Wake Me Up.mp3",
    "audio/Shape Of You.mp3",
    "audio/Hello.mp3",
    "audio/See You Again.mp3",
    "audio/Party Rock Anthem.mp3",
  ],
  // Ajoutez d'autres catégories ici
};

var currentCategory = null;
var currentSongIndex = 0;
var player1Health = 100;
var player2Health = 100;
var timerInterval;
var gameActive = true; // Variable pour suivre l'état du jeu
var responseCooldown = false; // Variable pour gérer le temps d'attente après une mauvaise réponse

function playRandomSongAndShowButtons() {
  if (!currentCategory) return;
  if (!gameActive) return; // Vérifier si le jeu est actif
  if (responseCooldown) return; // Vérifier si le joueur est en temps d'attente

  var categorySongs = categories[currentCategory];
  if (!categorySongs || categorySongs.length === 0) return;

  // Sélectionner une musique différente de la précédente
  var shuffledSongs = shuffleArray(categorySongs);
  var newSongIndex = currentSongIndex;
  while (newSongIndex === currentSongIndex) {
    newSongIndex = Math.floor(Math.random() * shuffledSongs.length);
  }
  currentSongIndex = newSongIndex;

  audio.src = shuffledSongs[currentSongIndex];
  audio.currentTime = 60; // Définir le temps de lecture à 60 secondes
  audio.play();
  startTimer(); // Lancer le chronomètre
  showRandomButtons(shuffledSongs);
}

function shuffleArray(array) {
  // Mélanger un tableau en utilisant l'algorithme de Fisher-Yates
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showRandomButtons(categorySongs) {
  var songButtonsDiv = document.getElementById("songButtons");
  songButtonsDiv.innerHTML = "";

  // Sélectionner trois titres au hasard
  var randomIndexes = [];
  while (randomIndexes.length < 3) {
    var randomIndex = Math.floor(Math.random() * categorySongs.length);
    if (
      randomIndexes.indexOf(randomIndex) === -1 &&
      randomIndex !== currentSongIndex
    ) {
      randomIndexes.push(randomIndex);
    }
  }

  // Sélectionner un emplacement aléatoire pour la bonne réponse parmi les 4 choix
  var correctAnswerIndex = Math.floor(Math.random() * 4);

  // Ajouter quatre boutons (un pour la bonne réponse et trois pour des réponses aléatoires)
  for (var i = 0; i < 4; i++) {
    var answerButton = document.createElement("button");
    if (i === correctAnswerIndex) {
      // Bouton pour la bonne réponse
      answerButton.textContent = getSongTitle(categorySongs[currentSongIndex]);
      answerButton.onclick = function () {
        checkAnswer(true);
      };
    } else {
      // Bouton pour une réponse incorrecte
      var randomButtonIndex = randomIndexes.pop();
      answerButton.textContent = getSongTitle(categorySongs[randomButtonIndex]);
      answerButton.onclick = function () {
        checkAnswer(false);
      };
    }
    songButtonsDiv.appendChild(answerButton);
  }
}

function getSongTitle(songFileName) {
  var fileNameParts = songFileName.split("/");
  var fileName = fileNameParts[fileNameParts.length - 1];
  return fileName.replace(".mp3", "");
}

function startTimer() {
  var timeLeft = 30;
  var timerElement = document.getElementById("timer");
  clearInterval(timerInterval); // Arrêter le chronomètre précédent
  timerInterval = setInterval(function () {
    timerElement.textContent = "Temps restant: " + timeLeft + "s";
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      // Le temps est écoulé, gérer la fin du temps ici
      endTimer();
    }
  }, 1000);
}

function endTimer() {
  // Gérer la fin du temps ici
  if (!responseCooldown) {
    changeSongOnTimeout();
  }
}

function changeSongOnTimeout() {
  playRandomSongAndShowButtons();
}

var buttonsDisabled = false;

function checkAnswer(isCorrect) {
  if (!gameActive || buttonsDisabled) return; // Vérifier si le jeu est actif et si les boutons sont désactivés

  if (isCorrect) {
    // L'autre joueur perd de la vie (Joueur 2 dans ce cas)
    updatePlayerHealth(
      2,
      calculateDamage(
        30 - parseInt(document.getElementById("timer").textContent)
      )
    );

    // Passer à la musique suivante
    playRandomSongAndShowButtons();
  } else {
    // Joueur 1 s'est trompé
    var responseMessage = document.getElementById("responseMessage");
    responseMessage.innerHTML = "Mauvaise réponse!";
    responseMessage.classList.remove("green-text");
    responseMessage.classList.add("red-text");

    buttonsDisabled = true; // Désactiver les boutons
    var countdownElement = document.getElementById("errorCountdown");
    countdownElement.style.display = "block"; // Afficher le compteur
    var countdown = 5; // Compteur initial à 5 secondes

    // Mettre à jour le compteur chaque seconde
    var countdownInterval = setInterval(function () {
      countdown--;
      countdownElement.textContent =
        "Temps avant la prochaine tentative : " + countdown + "s";

      if (countdown === 0) {
        clearInterval(countdownInterval); // Arrêter le compteur quand il atteint 0
        countdownElement.style.display = "none"; // Cacher le compteur
        buttonsDisabled = false; // Réactiver les boutons après 5 secondes
      }
    }, 1000);

    // Appliquer des dégâts au joueur 1
    updatePlayerHealth(
      1,
      calculateDamage(
        30 - parseInt(document.getElementById("timer").textContent)
      )
    );
  }

  // Réinitialiser le chronomètre
  startTimer();
}

function endGame() {
  // Gérer la fin de la partie ici
  var winner;
  if (player1Health <= 0 && player2Health <= 0) {
    winner = "Match nul";
  } else if (player1Health <= 0) {
    winner = "Joueur 2";
  } else {
    winner = "Joueur 1";
  }
  document.getElementById("responseMessage").innerHTML =
    "Partie terminée. Le gagnant est : " + winner;
  gameActive = false; // Désactiver le jeu après la fin de la partie
}

function updatePlayerHealth(player, damage) {
  if (player === 1) {
    player1Health -= damage;
    if (player1Health < 0) player1Health = 0;
    document.getElementById("player1Health").textContent =
      "Joueur 1: " + player1Health + " HP";
  } else if (player === 2) {
    player2Health -= damage;
    if (player2Health < 0) player2Health = 0;
    document.getElementById("player2Health").textContent =
      "Joueur 2: " + player2Health + " HP";
  }
}

function selectCategory(category) {
  currentCategory = category;
  player1Health = 100; // Réinitialiser les points de vie du joueur 1
  player2Health = 100; // Réinitialiser les points de vie du joueur 2
  responseCooldown = false; // Réinitialiser le temps d'attente
  playRandomSongAndShowButtons();
}

function calculateDamage(responseTime) {
  if (responseTime >= 20) {
    return 10; // Le joueur perd 10 HP pour un temps de réponse entre 30 et 20 secondes
  } else if (responseTime >= 10) {
    return 7; // Le joueur perd 7 HP pour un temps de réponse entre 19 et 10 secondes
  } else {
    return 5; // Le joueur perd 5 HP pour un temps de réponse entre 0 et 9 secondes
  }
}

// Appeler selectCategory pour initialiser la catégorie au chargement de la page (par exemple, "Pop")
selectCategory("Pop");
