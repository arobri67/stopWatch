import "./style.css";

let initialTime;
let elapsedTime = 0;
let timerInterval;

let laps = [];
let lapCounter = 0;

const display = document.querySelector(".stopwatch-display");

const startAndStopBtn = document.getElementById("start-stop");
const lapAndResetBtn = document.getElementById("lap-reset");

const lapsList = document.querySelector(".laps-list");

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
    timerInterval = setInterval(updateTime, 1);
    startAndStopBtn.textContent = "Stop";
    lapAndResetBtn.textContent = "Lap";
  }
}

function lapReset() {
  if (timerInterval) {
    lapRecorder();
    renderLapTime();
  }
  else {
    resetAll();
  }
}

function resetAll() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  display.textContent = "00:00:00.00";

  laps = [];
  lapCounter = 0;
  lapsList.innerHTML = "";
}

function lapRecorder() {
  lapCounter++;
  const currentTime = performance.now();
  const totalTime = currentTime - initialTime;

  laps.push({
    number: lapCounter,
    total: timeFormater(totalTime),
  });
}

function renderLapTime() {
  const currentLap = laps[laps.length - 1];

  const lapItem = document.createElement("li");
  lapItem.className = "lap-item";
  lapItem.id = `lap${currentLap.number}`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "delete-lap";
  deleteButton.addEventListener("click", () => removeLap(currentLap.number));

  const lapNumber = document.createElement("span");
  lapNumber.textContent = `Lap ${currentLap.number}`;

  const lapTime = document.createElement("span");
  lapTime.textContent = currentLap.total;

  lapItem.append(deleteButton);
  lapItem.append(lapNumber);
  lapItem.append(lapTime);
  lapsList.insertBefore(lapItem, lapsList.firstChild);
}

function removeLap(number) {
  const itemToDelete = document.getElementById(`lap${number}`);
  itemToDelete.remove();
}

function updateTime() {
  const currentTime = performance.now();
  const totalTimeElapsed = elapsedTime + (currentTime - initialTime);
  display.textContent = timeFormater(totalTimeElapsed);
}

function timeFormater(t) {
  const hours = Math.floor(t / 3600000)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((t % 3600000) / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((t % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const millisecondes = Math.floor(t % 1000)
    .toString()
    .padStart(3, "0");

  return `${hours}:${minutes}:${seconds}.${millisecondes}`;
}

startAndStopBtn.addEventListener("click", startStop);
lapAndResetBtn.addEventListener("click", lapReset);
