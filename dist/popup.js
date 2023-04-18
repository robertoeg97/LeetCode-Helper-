"use strict";
const startStopButton = document.getElementById("startStopButton");
const resetButton = document.getElementById("resetButton");
const timerDisplay = document.querySelector(".timer");
let stopwatch = new Stopwatch();
let intervalId;
function startStopwatch() {
    const updateRate = 10; //update rate (ms)
    stopwatch.start();
    intervalId = setInterval(updateTimerDisplay, updateRate);
    startStopButton.textContent = "Stop";
}
function stopStopwatch() {
    stopwatch.stop();
    clearInterval(intervalId); //stop updating timer display (time is unchanging)          
    startStopButton.textContent = "Start";
}
function changeStopwatchState() {
    if (stopwatch.getState() === StopwatchState.off) {
        startStopwatch();
    }
    else {
        stopStopwatch();
    }
}
function padZero(num) {
    return num.toString().padStart(2, "0");
}
function updateTimerDisplay() {
    const totalElapsedMilliseconds = stopwatch.getElapsedTime();
    const hours = Math.floor(totalElapsedMilliseconds / 3600000);
    const minutes = Math.floor((totalElapsedMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalElapsedMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor(totalElapsedMilliseconds % 1000 / 10);
    timerDisplay.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds)}`;
}
startStopButton.addEventListener("click", changeStopwatchState);
resetButton.addEventListener("click", stopwatch.reset);
//# sourceMappingURL=popup.js.map