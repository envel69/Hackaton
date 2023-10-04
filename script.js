var audio = document.getElementById("myAudio");
var songs = ["audio/KIKESA - 42 JOURS.mp3", "audio/Nekfeu - On Verra (Clip Officiel).mp3", "audio/Des Histoires a Raconter.mp3", "audio/Trophée Vald.mp3"];
var currentSongIndex = 0;

function playRandomSongAndShowButtons() {
    var randomIndex = Math.floor(Math.random() * songs.length);
    currentSongIndex = randomIndex;
    audio.src = songs[currentSongIndex];
    audio.play();
    showSongButtons();
}

function showSongButtons() {
    var songButtonsDiv = document.getElementById("songButtons");
    songButtonsDiv.innerHTML = "";
    for (var i = 0; i < songs.length; i++) {
        var button = document.createElement("button");
        button.textContent = getSongTitle(songs[i]);
        button.onclick = createButtonOnClickHandler(i);
        songButtonsDiv.appendChild(button);
    }
}

function getSongTitle(songFileName) {
    // Extrait le nom du fichier (sans l'extension) comme titre de la chanson.
    var fileNameParts = songFileName.split("/");
    var fileName = fileNameParts[fileNameParts.length - 1];
    return fileName.replace(".mp3", "");
}

function createButtonOnClickHandler(index) {
    return function() {
        checkAnswer(index);
    };
}

function checkAnswer(index) {
    if (index === currentSongIndex) {
        document.getElementById("responseMessage").innerHTML = "Bonne réponse!";
        playRandomSongAndShowButtons();
    } else {
        document.getElementById("responseMessage").innerHTML = "Mauvaise réponse!";
    }
}
