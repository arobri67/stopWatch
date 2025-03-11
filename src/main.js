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
    const deleteLapBtn = document.querySelector(".delete-lap");
    deleteLapBtn.addEventListener("click", removeLap);
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

function removeLap() {
  const parent = document.parentElement;
  console.log(parent);
}

function lapRecorder() {
  lapCounter++;
  const currentTime = performance.now();
  const totalTime = currentTime - initialTime;
  laps.push({
    number: lapCounter,
    total: timeFormater(totalTime),
  });

  const lapItem = document.createElement("li");
  lapItem.className = "lap-item";
  lapItem.id = `lap${lapCounter}`;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "delete-lap";
  const lapNumber = document.createElement("span");
  lapNumber.textContent = `Lap ${lapCounter}`;
  const lapTime = document.createElement("span");
  lapTime.textContent = `${timeFormater(totalTime)}`;

  // lapItem.innerHTML = `
  // <button>X</button>
  // <span class="lap-number">Lap ${lapCounter}</span>
  // <span class="lap-time">${timeFormater(totalTime)}</span>
  //  `;
  lapItem.append(deleteButton);
  lapItem.append(lapNumber);
  lapItem.append(lapTime);
  lapsList.insertBefore(lapItem, lapsList.firstChild);
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
