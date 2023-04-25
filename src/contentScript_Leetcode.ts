import { setStorageItem } from './Storage';
import { Stopwatch} from './stopwatch';

function getProgrammingLanguage(): string {
  const divElement = document.querySelector('div.h-full.w-full[data-mode-id]');
  const programmingLanguage = divElement?.getAttribute('data-mode-id');
  return programmingLanguage;
}

function saveProblem(): void {
  // Select the text you want to copy
  let problemText: string = document.querySelector("meta[name='description']").getAttribute("content");
  problemText = problemText.substring(problemText.indexOf("? ") + 1); //remove ubiquitous prefix: 'Can you solve this real interview question?'
  problemText += '\nAnswer in language: ' + getProgrammingLanguage(); //request answer in the detected programming language

  //save it in storage for chatGPT tab
  setStorageItem('problemText', problemText);
}

function openChatGPT(): void {
  // Open a new tab to chat.openai.com
  window.open('https://chat.openai.com', '_blank');
}

/**
 * resetting and starting the stopwatch every time a new problem is loaded
 */
let stopwatch: Stopwatch;
async function onStartup(): Promise<void> {
  stopwatch = await Stopwatch.getStopwatch();
  stopwatch.reset();
  stopwatch.start();
}
onStartup();

//user requested help from chatGPT
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'chatGPT') {
    saveProblem();
    openChatGPT();
  }
});