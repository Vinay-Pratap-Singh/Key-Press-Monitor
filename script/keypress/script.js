const keyboardButtonContainer = document.createElement("ul");
keyboardButtonContainer.setAttribute("id", "keyboardButtonContainer");
document.body.prepend(keyboardButtonContainer);

const buttonList = [];

const renderKeys = () => {
  keyboardButtonContainer.innerHTML = "";
  buttonList.forEach((button) => {
    keyboardButtonContainer.appendChild(button);
  });
};

document.addEventListener("keydown", (event) => {
  const listItem = document.createElement("li");
  listItem.classList.add("keyboardButton");
  listItem.innerText = event.key;
  buttonList.push(listItem);
  renderKeys();
  setTimeout(() => {
    buttonList.shift();
    renderKeys();
  }, 2500);
});
