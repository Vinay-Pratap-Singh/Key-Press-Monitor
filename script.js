const toggle = document.getElementById("toggle");
let tabId;
let initialized = false;

// getting current tabID
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const currentTab = tabs[0];
  tabId = currentTab.id;

  // Set toggle state from storage
  chrome.storage.sync.get("toggleState", function (data) {
    toggle.checked = data.toggleState || false;
  });

  // Set initialized to true after the first load
  initialized = true;
});

toggle.addEventListener("change", function () {
  const toggleState = this.checked;
  chrome.storage.sync.set({ toggleState });
  chrome.runtime.sendMessage({ toggleState, tabId });
});

// Listen for changes to storage
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === "sync" && initialized) {
    const newToggleState = changes.toggleState.newValue;
    toggle.checked = newToggleState;
  }
});
