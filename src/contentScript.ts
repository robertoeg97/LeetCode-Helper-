let chatWindow: Window;

function openChatGPTandPasteProblem() {
  // Step 1: Select the text you want to copy
  const textToCopy = document.querySelector("meta[name='description']").getAttribute("content");

  // Step 2: Copy the selected text to clipboard
  navigator.clipboard.writeText(textToCopy);

  // Step 3: Open a new tab to chat.openai.com
  chatWindow = window.open('https://chat.openai.com', '_blank');

  // Step 4: Find the text box and paste the copied text
  chatWindow.addEventListener('load', () => {
    const textBox = chatWindow.document.querySelector('textarea[data-id="root"]') as HTMLTextAreaElement;
    textBox.focus();
    chatWindow.document.execCommand('paste');
  });
}

openChatGPTandPasteProblem();