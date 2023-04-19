const startStopButton = document.getElementById("startStopButton") as HTMLButtonElement;
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;
const timerDisplay = document.querySelector(".timer") as HTMLDivElement;

let intervalId: number; 

let stopwatch: Stopwatch = new Stopwatch();
/* let stopwatch: Stopwatch;
chrome.storage.session.get("stopwatch", function(data) {
  stopwatch = data.stopwatch;
}); */

function startStopwatch() {
  const updateRate: number = 10;    //update rate (ms)
  stopwatch.start();
  intervalId = setInterval(updateTimerDisplay, updateRate);  
  startStopButton.textContent = "Stop";
}

function stopStopwatch() {
  stopwatch.stop();
  clearInterval(intervalId);   //stop updating timer display (time is unchanging)          
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
  return (num as any).toString().padStart(2, "0");
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

//we start the stopwatch when the popup opens
startStopwatch();