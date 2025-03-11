import "./style.css";

let initialTime;
let elapsedTime = 0;
let timerInterval;

const display = document.querySelector(".stopwatch-display");
const startAndStopBtn = document.getElementById("start-stop");
const lapAndResetBtn = document.getElementById("lap-reset");

function startStop() {
  if (timerInterval) {
    startAndStopBtn.textContent = "Start";
    lapAndResetBtn.textContent = "Reset";
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime += performance.now() - initialTime;
  }
  else {
    initialTime = performance.now();
    timerInterval = setInterval(renderTime, 1);
    startAndStopBtn.textContent = "Stop";
    lapAndResetBtn.textContent = "Lap";
  }
}

function lapReset() {
  if (timerInterval) {
    renderLaps();
  }
  else {
    resetAll();
  }
}

function resetAll() {
  // todo
}

function renderLaps() {
// todo
}

function renderTime() {
  const currentTime = performance.now();
  const totalTimeElapsed = elapsedTime + (currentTime - initialTime);
  display.textContent = timeFormater(totalTimeElapsed);
}

function timeFormater(t) {
  const hours = Math.floor(t / 3600000).toString().padStart(2, "0");
  const minutes = Math.floor((t % 3600000) / 60000).toString().padStart(2, "0");
  const seconds = Math.floor((t % 60000) / 1000).toString().padStart(2, "0");
  const millisecondes = Math.floor(t % 1000).toString().padStart(3, "0");

  return `${hours}:${minutes}:${seconds}.${millisecondes}`;
}

startAndStopBtn.addEventListener("click", startStop);
lapAndResetBtn.addEventListener("click", lapReset);
