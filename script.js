console.log("ok")

// Remplacez 'VOTRE_CLE_API' par votre clé API
const apiKey = 'AIzaSyDnakAV4_fHv8iTTGJGFUXiVYwd9ZB7ANk';
const videoId = 'YltjliK0ZeA'; // Remplacez par l'ID de la vidéo YouTube

// Faites une requête à l'API YouTube Data
fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`, {
    method: 'GET'
})
    .then(response => response.json())
    .then(data => {
        // Obtenez l'URL de la vidéo
        const videoUrl = `https://www.youtube.com/watch?v=${data.items[0].id}`;
        console.log(videoUrl);
    
        // Mettez à jour l'URL de la source audio
        const audioSource = document.getElementById('audioSource');
        audioSource.src = videoUrl;
    
        // Rechargez le lecteur audio avec la nouvelle source
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.load();
    })
    
    .catch(error => {
        console.error(error);
    });

// Récupérez une référence vers le bouton et l'élément audio
const playButton = document.getElementById('playButton');
const audioPlayer = document.getElementById('audioPlayer');

// Écoutez l'événement de clic sur le bouton
playButton.addEventListener('click', function () {
    // Vérifiez si le lecteur audio est en pause
    if (audioPlayer.paused) {
        // Si c'est en pause, démarrez la lecture
        audioPlayer.play();
        playButton.textContent = 'Pause'; // Changez le texte du bouton en "Pause"
    } else {
        // Si cela joue, mettez en pause
        audioPlayer.pause();
        playButton.textContent = 'Lancer la lecture'; // Changez le texte du bouton en "Lancer la lecture"
    }
});
