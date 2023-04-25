import { setStorageItem } from './Storage';

function getProgrammingLanguage(): string {
  const programmingLanguageDropDownMenu = document.querySelector('.text-xs.text-label-2.dark:text-dark-label-2');
  const programmingLanguage = programmingLanguageDropDownMenu.textContent;
  return programmingLanguage;
}

function saveProblem(): void {
  // Select the text you want to copy
  let problemText: string = document.querySelector("meta[name='description']").getAttribute("content");
  problemText = problemText.substring(problemText.indexOf("? ") + 1); //remove ubiquitous prefix: 'Can you solve this real interview question?'
  //problemText += '\nAnswer in language: ' + getProgrammingLanguage(); //request answer in the detected programming language

  //save it in storage for chatGPT tab
  setStorageItem('problemText', problemText);
}

function openChatGPT(): void {
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