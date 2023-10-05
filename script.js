// var audio = document.getElementById("myAudio");
// var categories = {
//   Test: [
//     "audio/KIKESA - 42 JOURS.mp3",
//     "audio/Nekfeu - On Verra (Clip Officiel).mp3",
//     "audio/Trophée Vald.mp3",
//     "audio/Des Histoires a Raconter.mp3",
//   ],
//   "Année 2010": [
//     "audio/Roar.mp3",
//     "audio/Wake Me Up.mp3",
//     "audio/Shape Of You.mp3",
//     "audio/Hello.mp3",
//     "audio/See You Again.mp3",
//     "audio/Party Rock Anthem.mp3",
//   ],
//   // Ajoutez d'autres catégories ici
// };

// var currentCategory = null;
// var currentSongIndex = 0;

// function playRandomSongAndShowButtons() {
//   if (!currentCategory) return;

//   var categorySongs = categories[currentCategory];
//   if (!categorySongs || categorySongs.length === 0) return;

//   var randomSongIndex = Math.floor(Math.random() * categorySongs.length);
//   currentSongIndex = randomSongIndex;
//   audio.src = categorySongs[currentSongIndex];
//   audio.play();
//   showRandomButtons(categorySongs);
// }

// function showRandomButtons(categorySongs) {
//   var songButtonsDiv = document.getElementById("songButtons");
//   songButtonsDiv.innerHTML = "";

//   // Sélectionner trois titres au hasard
//   var randomIndexes = [];
//   while (randomIndexes.length < 3) {
//     var randomIndex = Math.floor(Math.random() * categorySongs.length);
//     if (
//       randomIndexes.indexOf(randomIndex) === -1 &&
//       randomIndex !== currentSongIndex
//     ) {
//       randomIndexes.push(randomIndex);
//     }
//   }

//   // Ajouter un bouton pour la chanson actuelle
//   var currentButton = document.createElement("button");
//   currentButton.textContent = getSongTitle(categorySongs[currentSongIndex]);
//   currentButton.onclick = function () {
//     checkAnswer(currentSongIndex);
//   };
//   songButtonsDiv.appendChild(currentButton);

//   // Ajouter trois boutons pour les titres au hasard
//   for (var i = 0; i < randomIndexes.length; i++) {
//     var randomButton = document.createElement("button");
//     randomButton.textContent = getSongTitle(categorySongs[randomIndexes[i]]);
//     randomButton.onclick = (function (index) {
//       return function () {
//         checkAnswer(index);
//       };
//     })(randomIndexes[i]);
//     songButtonsDiv.appendChild(randomButton);
//   }
// }

// function getSongTitle(songFileName) {
//   // Extrait le nom du fichier (sans l'extension) comme titre de la chanson.
//   var fileNameParts = songFileName.split("/");
//   var fileName = fileNameParts[fileNameParts.length - 1];
//   return fileName.replace(".mp3", "");
// }

// function createButtonOnClickHandler(index) {
//   return function () {
//     checkAnswer(index);
//   };
// }

// function checkAnswer(index) {
//   if (index === currentSongIndex) {
//     document.getElementById("responseMessage").innerHTML = "Bonne réponse!";
//     document.getElementById("responseMessage").classList.remove("red-text");
//     document.getElementById("responseMessage").classList.add("green-text");
//     playRandomSongAndShowButtons();
//   } else {
//     var responseMessage = document.getElementById("responseMessage");
//     responseMessage.innerHTML = "Mauvaise réponse!";
//     responseMessage.classList.remove("green-text");
//     responseMessage.classList.add("red-text");
//   }
// }

// function selectCategory(category) {
//   currentCategory = category;
//   playRandomSongAndShowButtons();
// }

// // Appeler selectCategory pour initialiser la catégorie au chargement de la page (par exemple, "Pop")
// selectCategory("Pop");
