import "./style.css";

let initialTime;
let elapsedTime = 0;
let timerInterval;

let laps = [];
let lapCounter = 0;
let previousLap;

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
  display.textContent = timeFormater(0);

  laps = [];
  lapCounter = 0;
  lapsList.innerHTML = "";
}

function lapRecorder() {
  laps.length === 0 ? previousLap = initialTime : previousLap = laps[laps.length - 1].absoluteLapTime;
  lapCounter++;
  const currentTime = performance.now();
  const lapTime = currentTime - previousLap
  const totalTime = currentTime - initialTime;

console.log(previousLap)
  laps.push({
    number: lapCounter,
    absoluteLapTime: currentTime,
    laptime: timeFormater(lapTime),
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
  lapNumber.style.marginInlineEnd = "10px"

  const lapTime = document.createElement("span");
  lapTime.textContent = currentLap.laptime;
  lapTime.style.marginInlineEnd = "10px"

  const totalTime = document.createElement("span");
  totalTime.textContent = currentLap.total;
 

  lapItem.append(deleteButton);
  lapItem.append(lapNumber);
  lapItem.append(lapTime);
  lapItem.append(totalTime);
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
