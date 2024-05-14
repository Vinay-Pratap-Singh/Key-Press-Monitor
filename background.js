const doesScriptInjected = {};

chrome.runtime.onMessage.addListener(function (message) {
  const { toggleState, tabId } = message;

  if (!tabId) return;
  if (toggleState && !doesScriptInjected[tabId]) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"],
    });
    chrome.scripting.insertCSS({
      target: { tabId },
      files: ["content.css"],
    });
    doesScriptInjected[tabId] = true;
  }
});
