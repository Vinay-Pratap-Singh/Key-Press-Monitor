let keyboardButtonContainer = null;
const buttonList = [];

// for first time render
handleToggleTrueState();

function createListItem(text) {
  const listItem = document.createElement("li");
  listItem.classList.add("keyboardButton");
  listItem.innerText = text;
  buttonList.push(listItem);
  renderKeys();
  setTimeout(() => {
    buttonList.shift();
    renderKeys();
  }, 2500);
}

function renderKeys() {
  if (!keyboardButtonContainer) return;
  keyboardButtonContainer.innerHTML = "";
  buttonList.forEach((button) => {
    keyboardButtonContainer.appendChild(button);
  });
}

function handleKeyPress(event) {
  if (
    event.key === "Control" ||
    event.key === "Alt" ||
    event.key === "Shift" ||
    event.key === "Meta"
  ) {
    return;
  }

  if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
    let shortcutString = "";
    if (event.ctrlKey) shortcutString += "Ctrl+";
    if (event.altKey) shortcutString += "Alt+";
    if (event.shiftKey) shortcutString += "Shift+";
    if (event.metaKey) shortcutString += "Meta+";
    shortcutString += event.key;
    createListItem(shortcutString);
    return;
  }

  const text = event.key;
  createListItem(text);
}

function handleToggleTrueState() {
  keyboardButtonContainer = document.createElement("ul");
  keyboardButtonContainer.setAttribute("id", "keyboardButtonContainer");
  document.body.prepend(keyboardButtonContainer);
  document.addEventListener("keydown", handleKeyPress);
}

function handleToggleFalseState() {
  const keyboardButtonContainer =
    document.getElementById("keyboardButtonContainer") || null;
  if (keyboardButtonContainer) {
    keyboardButtonContainer.remove();
  }
  buttonList.length = 0;
  document.removeEventListener("keydown", handleKeyPress);
}

// Listen for changes to toggleState
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === "sync" && "toggleState" in changes) {
    const newToggleState = changes.toggleState.newValue;
    console.log("Toggle state changed:", newToggleState);
    newToggleState ? handleToggleTrueState() : handleToggleFalseState();
  }
});
