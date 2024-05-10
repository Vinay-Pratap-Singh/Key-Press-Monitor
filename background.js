chrome.runtime.onMessage.addListener(function (message) {
  const { toggleState, tabId } = message;
  if (!tabId) return;
  if (toggleState && tabId) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"],
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId },
      function: () => {
        const keyboardButtonContainer = document.getElementById(
          "keyboardButtonContainer"
        );
        if (keyboardButtonContainer) {
          keyboardButtonContainer.remove();
        }
      },
    });
  }
});
