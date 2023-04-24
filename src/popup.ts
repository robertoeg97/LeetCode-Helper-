import '../styles/popup.scss';
import { Stopwatch, StopwatchState } from './stopwatch';

const startStopButton = document.getElementById("startStopButton") as HTMLButtonElement;
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;
const timerDisplay = document.querySelector("#timerDisplay") as HTMLDivElement;

let intervalId: NodeJS.Timer; 

let stopwatch: Stopwatch;
async function initPopup() {
  stopwatch = await Stopwatch.getStopwatch();
  if (stopwatch.getState() == StopwatchState.on) {
    startStopwatch();
  }
  else {
    stopStopwatch();
  }
}
initPopup();

function startStopwatch() {
  const updateRate = 10;    //update rate (ms)
  stopwatch.start();
  intervalId = setInterval(updateTimerDisplay, updateRate);  
  startStopButton.textContent = "Stop";
}

function stopStopwatch() {
  stopwatch.stop();
  updateTimerDisplay();
  clearInterval(intervalId);   //stop updating timer display        
  startStopButton.textContent = "Start";
}

function toggleStopwatchState() {
  if (stopwatch.getState() === StopwatchState.off) {     
    startStopwatch();
  } else {
    stopStopwatch();
  }
}

function resetStopwatch() {
  stopwatch.reset();
  updateTimerDisplay();
  startStopButton.textContent = "Start";
}


function padZero(num: number) : string {
  return num.toString().padStart(2, "0");
}

function updateTimerDisplay() {
  const totalElapsedMilliseconds: number = stopwatch.getElapsedTime();
  const hours: number = Math.floor(totalElapsedMilliseconds / 3600000);
  const minutes: number = Math.floor((totalElapsedMilliseconds % 3600000) / 60000);
  const seconds:number = Math.floor((totalElapsedMilliseconds % 60000) / 1000);
  const milliseconds: number = Math.floor(totalElapsedMilliseconds % 1000 / 10);
  timerDisplay.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds)}`;
}

startStopButton.addEventListener("click", toggleStopwatchState);

resetButton.addEventListener("click", resetStopwatch);