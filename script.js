const toggle = document.getElementById("toggle");
let tabId;

// getting current tabID
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const currentTab = tabs[0];
  tabId = currentTab.id;
});

// get toggle state from storage
chrome.storage.sync.get("toggleState", function (data) {
  toggle.checked = data.toggleState || false;
});

toggle.addEventListener("change", function () {
  const toggleState = this.checked;
  chrome.storage.sync.set({ toggleState });
  chrome.runtime.sendMessage({ toggleState, tabId });
});
