console.log("ok");
const clientId = '740a08f1a64a40ddbd331b44c3f79b99';
const playerContainer = document.getElementById('spotify-player');
const playButton = document.getElementById('play-button');

let player;

window.onSpotifyWebPlaybackSDKReady = () => {
  player = new Spotify.Player({
    name: 'Mon Lecteur Spotify',
    getOAuthToken: callback => {
      // Définissez la fonction pour obtenir un jeton d'accès Spotify ici
      // Vous devrez implémenter une authentification Spotify, par exemple via l'API OAuth 2.0.
      // Une fois obtenu, appelez le callback avec le jeton d'accès.
      // Pour plus d'informations, consultez la documentation de l'API Spotify.
    },
    volume: 0.5
  });

  // Connectez le lecteur
  player.connect().then(success => {
    if (success) {
      console.log('Le lecteur Spotify est connecté');
    }
  });

  // Écoutez les changements d'état du lecteur
  player.addListener('player_state_changed', state => {
    console.log('Nouvel état du lecteur :', state);
  });

  // Chargez une piste Spotify (utilisez 'spotify:track' pour une piste)
  player.addListener('ready', ({ device_id }) => {
    console.log('Le lecteur est prêt avec l\'identifiant du périphérique', device_id);
  });
};

// Ajoutez un gestionnaire d'événements au bouton pour lancer/arrêter la musique
playButton.addEventListener('click', () => {
  if (player) {
    player.togglePlay();
  } else {
    console.log('Le lecteur Spotify n\'est pas encore prêt.');
  }
});
