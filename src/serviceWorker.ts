import { initializeStorageWithDefaults, getStorageItem } from './storage';
import { Stopwatch } from './stopwatch';

chrome.runtime.onInstalled.addListener(async () => {
  // Here goes everything you want to execute after extension initialization

  const defaultStorageData = { stopwatch : new Stopwatch() };
  await initializeStorageWithDefaults(defaultStorageData);

  console.log('Extension successfully installed!');
});

// Log storage changes, might be safely removed
chrome.storage.onChanged.addListener((changes) => {
  for (const [key, value] of Object.entries(changes)) {
    console.log(
      `"${key}" changed from "${value.oldValue}" to "${value.newValue}"`,
    );
  }
});
