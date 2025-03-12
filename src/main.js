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
    startAndStopBtn.style.backgroundColor = "rgba(21, 128, 61, 0.7)";
    lapAndResetBtn.textContent = "Reset";
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime += performance.now() - initialTime;
  }
  else {
    initialTime = performance.now();
    timerInterval = setInterval(updateTime, 1);
    startAndStopBtn.textContent = "Stop";
    startAndStopBtn.style.backgroundColor = "rgba(239, 68, 68, .7)";
    lapAndResetBtn.textContent = "Lap";
    lapAndResetBtn.style.color = "rgba(255, 255, 255, 0.8)";
    lapAndResetBtn.style.cursor = "pointer";
  }
}

function updateTime() {
  const currentTime = performance.now();
  const totalTimeElapsed = elapsedTime + (currentTime - initialTime);
  display.textContent = timeFormater(totalTimeElapsed);
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
  // lapsList.innerHTML = `<li>
  //           <span class="lap-title">Lap No.</span>
  //           <span class="lap-title">Split</span>
  //           <span class="lap-title">Total</span>
  //         </li>`;
  lapsList.innerHTML = "";
}

function lapRecorder() {
  laps.length === 0 ? previousLap = initialTime : previousLap = laps[laps.length - 1].absoluteLapTime;
  lapCounter++;
  const currentTime = performance.now();
  const lapTime = currentTime - previousLap;
  const totalTime = currentTime - initialTime;

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
  lapItem.classList.add("lap-item");
  lapItem.id = `lap${currentLap.number}`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("delete-lap");
  deleteButton.addEventListener("click", () => removeLap(currentLap.number));

  const lapNumber = document.createElement("span");
  lapNumber.textContent = `Lap ${currentLap.number}`;
  lapNumber.classList.add("lap-number");

  const lapTime = document.createElement("span");
  lapTime.textContent = currentLap.laptime;
  lapTime.classList.add("split");

  const totalTime = document.createElement("span");
  totalTime.textContent = currentLap.total;
  totalTime.classList.add("total");

  lapItem.append(lapNumber);
  lapNumber.append(deleteButton);
  lapItem.append(lapTime);
  lapItem.append(totalTime);
  lapsList.append(lapItem);
}

function removeLap(number) {
  const itemToDelete = document.getElementById(`lap${number}`);
  itemToDelete.remove();
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
