document.addEventListener("DOMContentLoaded", function () {
  const countdown = document.getElementById("countdown");
  let seconds = 30;

  function updateCountdown() {
    countdown.textContent = seconds + " secondes";
  }

  function countdownInterval() {
    updateCountdown();
    if (seconds === 0) {
      clearInterval(interval);
      countdown.textContent = "Terminé!";
    } else {
      seconds--;
    }
  }

  const interval = setInterval(countdownInterval, 1000);

  countdownInterval();
});
