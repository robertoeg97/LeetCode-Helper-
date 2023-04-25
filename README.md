boilerplate project source code: https://github.com/sszczep/chrome-extension-webpack


## Overview

Chrome browser extension designed to assist with practicing problems on leetcode.com.
Includes a stopwatch used to help pacing when working on practice problems.
It can be viewed and interacted with through the extension popup.
The stopwatch automatically starts ticking from 0 whenever a new leetcode problem webpage is loaded.
THe popup also includes an "Ask ChatGPT" button, to ask ChatGPT for the answer to the current problem.
This button opens up a new tab with the chatGPT website, and pastes the problem statement,
prompting chatGPT to give an answer in whatever the user's currently selected programming language is.


### Installing and running

1. Clone the repository
2. Run `npm install`
3. Run `npm run start` for development mode, `npm run build` for production build
4. Add the extension to Chrome:
    1. Go to `chrome://extensions/`
    2. Enable the `Developer mode`
    3. Click on `Load unpacked`
    4. Choose the `dist` directory
5. You are good to go! You can also pin the extension to the toolbar for easy access.