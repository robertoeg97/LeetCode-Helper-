import { setStorageItem, getStorageItem } from './Storage';

async function getProblemText(): Promise<string> {
    //find problem text
    const problemText: string = await getStorageItem('problemText');
    //clear out storage - if the user visits ChatGPT on their own, it will not trigger a response
    setStorageItem('problemText', '');
    return problemText;
}

function getAnswer(problemText: string) {
    //wait for the page to load
    setTimeout(() => {
        const textBox = window.document.querySelector('textarea[data-id="root"]') as HTMLTextAreaElement;
        // paste the problem text 
        textBox.value = problemText;
        // let the webpage know that the text box was changed
        const inputEvent = new Event('input', { bubbles: true });
        textBox.dispatchEvent(inputEvent);      
        //submit the text
        const submitButton = document.querySelector('button.absolute') as HTMLButtonElement;
        submitButton.click();                 
    }, 50);  
}

async function onStartup() {
    const problemText: string = await getProblemText();
    //only submit the text if a problem has been stored (occurs when this page is opened via contentScript_Leetcode)
    if (problemText !== '') {
        getAnswer(problemText);
    }
}

onStartup();