import { setStorageItem } from './Storage';

function saveProblem() {
  // Select the text you want to copy
  const problemText: string = document.querySelector("meta[name='description']").getAttribute("content");

  //save it in storage for chatGPT tab
  setStorageItem('problemText', problemText);
}

function openChatGPT() {
  // Open a new tab to chat.openai.com
  window.open('https://chat.openai.com', '_blank');
}

//user requested help from chatGPT
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'chatGPT') {
    saveProblem();
    openChatGPT();
  }
});