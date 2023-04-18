"use strict";
const startStopButton = document.getElementById("startStopButton");
const resetButton = document.getElementById("resetButton");
const timerDisplay = document.querySelector(".timer");
let startTime = null;
let elapsedTime = 0;
let intervalId = null;
function startStopTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        startStopButton.textContent = "Start";
    }
    else {
        startTime = Date.now();
        intervalId = setInterval(updateTimerDisplay, 10);
        startStopButton.textContent = "Stop";
    }
}
function resetTimer() {
    startTime = null;
    elapsedTime = 0;
    updateTimerDisplay();
}
function updateTimerDisplay() {
    if (!startTime) {
        timerDisplay.textContent = "00:00:00";
        return;
    }
    const elapsedMilliseconds = elapsedTime + (Date.now() - startTime);
    const hours = Math.floor(elapsedMilliseconds / 3600000);
    const minutes = Math.floor((elapsedMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((elapsedMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor(elapsedMilliseconds % 1000 / 10);
    timerDisplay.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds)}`;
}
function padZero(num) {
    return num.toString().padStart(2, "0");
}
startStopButton.addEventListener("click", startStopTimer);
//# sourceMappingURL=popup.js.map