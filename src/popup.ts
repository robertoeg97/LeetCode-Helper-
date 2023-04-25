import '../styles/popup.scss';
import { Stopwatch, StopwatchState } from './stopwatch';

const startStopButton = document.getElementById("startStopButton") as HTMLButtonElement;
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;
const timerDisplay = document.querySelector("#timerDisplay") as HTMLDivElement;

/**
 * initializes the stopwatch and the popup display
 * sets a timer to update the displayed stopwatch time regularly
 */
let stopwatch: Stopwatch;
async function initPopup() {
  //get stopwatch from storage
  stopwatch = await Stopwatch.getStopwatch();
  //sets all values in the popup to correctly match the state of the stopwatch 
  if (stopwatch.getState() == StopwatchState.on) {
    startStopwatch();
  }
  else {
    stopStopwatch();
  }
  //begin regularly updating the popup stopwatch time display
  const updateRate = 10;  // (ms)
  setInterval(updateTimerDisplay, updateRate);  
}
initPopup();

/**
 * turns the stopwatch on, updates the popup accordingly
 */
function startStopwatch() {
  stopwatch.start();
  startStopButton.textContent = "Stop";
}

/**
 * turns the stopwatch off, updates the popup accordingly
 */
function stopStopwatch() {
  stopwatch.stop();    
  startStopButton.textContent = "Start";
}

/**
 * switches between the stopwatch's on and off state
 */
function toggleStopwatchState() {
  if (stopwatch.getState() === StopwatchState.off) {     
    startStopwatch();
  } else {
    stopStopwatch();
  }
}

/**
 * turns the stopwatch off, sets its time to 0 
 * and updates the popup accordingly
 */
function resetStopwatch() {
  stopwatch.reset();
  startStopButton.textContent = "Start";
}

/**
 * pads zeroes to the front of a given number
 * @param num a number between 0 and 99
 * @returns the 2-digit string of the number, with leading zeroes
 */
function padZero(num: number) : string {
  return num.toString().padStart(2, "0");
}

/**
 * sets the time on the popup display to whatever the corresponding time of the stopwatch is
 */
function updateTimerDisplay() {
  const totalElapsedMilliseconds: number = stopwatch.getElapsedTime();
  const hours: number = Math.floor(totalElapsedMilliseconds / 3600000);
  const minutes: number = Math.floor((totalElapsedMilliseconds % 3600000) / 60000);
  const seconds:number = Math.floor((totalElapsedMilliseconds % 60000) / 1000);
  const milliseconds: number = Math.floor(totalElapsedMilliseconds % 1000 / 10);
  timerDisplay.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds)}`;
}

//switches between on/off when the user presses the start/stop button
startStopButton.addEventListener("click", toggleStopwatchState);

//resetts the stopwatch whenever the user presses the reset button
resetButton.addEventListener("click", resetStopwatch);

//sends a message to the content script of the active tab, saying the chatGPTButton was pressed
document.getElementById('chatGPTButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'chatGPT' });
  });
});