const toggle = document.getElementById("toggle");
const keySizeDropdown = document.getElementById("keySizeDropdown");
let tabId;
let initialized = false;
const keySizeMap = {
  extraSmall: {
    padding: "2px 4px",
    fontSize: "8px",
  },
  small: {
    padding: "4px 8px",
    fontSize: "12px",
  },
  medium: {
    padding: "6px 12px",
    fontSize: "16px",
  },
  large: {
    padding: "8px 16px",
    fontSize: "20px",
  },
  extraLarge: {
    padding: "10px 20px",
    fontSize: "24px",
  },
};

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
  chrome.runtime.sendMessage({ type: "toggleState", toggleState, tabId });
});

keySizeDropdown.addEventListener("change", (event) => {
  const selectedSize = event.target.value;
  // chrome.runtime.sendMessage({ type: "selectedSize", selectedSize, tabId });
  chrome.tabs.sendMessage(tabId, {
    type: "selectedSize",
    selectedSize: keySizeMap[selectedSize],
  });
});

// Listen for changes to storage
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === "sync" && initialized) {
    const newToggleState = changes.toggleState.newValue;
    toggle.checked = newToggleState;
  }
});
