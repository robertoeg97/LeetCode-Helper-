import { Stopwatch } from './stopwatch';
import { setStorageItem } from './Storage';

chrome.runtime.onInstalled.addListener(async () => {
  // Here goes everything you want to execute after extension initialization

  //create a new stopwatch object that will be interacted with through the popup
  Stopwatch.initStopwatch();

  //set empty problem text to signal that chatgpt website should not be interacted with (until leetcode problem is loaded)
  setStorageItem('problemText', '');
});

// Log storage changes, might be safely removed
chrome.storage.onChanged.addListener((changes) => {
  for (const [key, value] of Object.entries(changes)) {
    console.log(
      `"${key}" changed from "${value.oldValue}" to "${value.newValue}"`,
    );
  }
});
