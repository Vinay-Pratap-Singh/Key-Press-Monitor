const doesScriptInjected = {};

chrome.runtime.onMessage.addListener(function (message) {
  const { type } = message;
  console.log(type, "type hai");
  switch (type) {
    case "toggleState": {
      console.log("toggle state ke andar hai");
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
      break;
    }

    case "selectedSize": {
      const { selectedSize } = message;
      console.log(selectedSize, "size hai ye");
      break;
    }
  }
});
