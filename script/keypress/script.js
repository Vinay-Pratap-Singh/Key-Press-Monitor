document.addEventListener("keydown", (event) => {
  const heading = document.createElement("h1");
  heading.classList.add("newTestItem");
  heading.innerText = event.key;
  document.body.prepend(heading);
});
