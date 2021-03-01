/* Alert Dialog */
function alertDialog() {
  let dialog = document.getElementById("dialog");
  dialog.innerHTML = "";
  dialog.open = true;
  dialog.innerHTML = "<p>Alert part 2 clicked</p>";

  let okBtn = document.createElement("button");
  okBtn.setAttribute("id", "ok");
  okBtn.addEventListener("click", cancelClicked);
  okBtn.innerHTML = "Ok";
  dialog.appendChild(okBtn);
}

/* Confirm dialog */
function confirmDialog() {
  let dialog = document.getElementById("dialog");
  dialog.innerHTML = "";
  dialog.open = true;
  dialog.innerHTML = "<p>Confirm part 2 clicked</p>";

  let okBtn = document.createElement("button");
  okBtn.setAttribute("id", "ok");
  okBtn.addEventListener("click", cancelClicked);
  okBtn.innerHTML = "Ok";
  dialog.appendChild(okBtn);
}

/* Prompt dialog */
function promptDialog() {
  let dialog = document.getElementById("dialog");
  dialog.innerHTML = "";
  dialog.open = true;
  dialog.innerHTML = "<p>Enter Prompt Part 2:</p>";

  let textinput = document.createElement("input");
  textinput.type = "text";
  dialog.appendChild(textinput);

  let okBtn = document.createElement("button");
  okBtn.setAttribute("id", "ok");
  okBtn.addEventListener("click", okClicked);
  okBtn.innerHTML = "Ok";

  let cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("id", "cancel");
  cancelBtn.addEventListener("click", cancelClicked);
  cancelBtn.innerHTML = "Cancel";

  dialog.appendChild(okBtn);
  dialog.appendChild(cancelBtn);
}

/* Safer prompt dialog */
function saferPromptDialog() {
  let dialog = document.getElementById("dialog");
  dialog.innerHTML = "";
  dialog.open = true;
  dialog.innerHTML = "<p>Safer Prompt Part 2:</p>";

  let textinput = document.createElement("input");
  textinput.type = "text";
  dialog.appendChild(textinput);

  let okBtn = document.createElement("button");
  okBtn.setAttribute("id", "ok");
  okBtn.addEventListener("click", safeOkClicked);
  okBtn.innerHTML = "Ok";

  let cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("id", "cancel");
  cancelBtn.addEventListener("click", cancelClicked);
  cancelBtn.innerHTML = "Cancel";

  dialog.appendChild(okBtn);
  dialog.appendChild(cancelBtn);
}

/* Ok button handling for prompt */
function okClicked(event) {
  event.preventDefault();
  let dialog = document.getElementById("dialog");
  let output = document.getElementById("output2");
  let input = event.target.previousSibling.value;
  if (input == "") {
    input = "User did not enter anything";
  }
  output.innerHTML = `${getInput(input)}`;
  dialog.open = false;
}

/* Ok button handling for prompt */
function safeOkClicked(event) {
  event.preventDefault();
  let dialog = document.getElementById("dialog");
  let output = document.getElementById("output2");
  let input = event.target.previousSibling.value;
  if (input == "") {
    input = "User did not enter anything";
  }
  input = DOMPurify.sanitize(input);
  output.innerHTML = `${getInput(input)}`;
  dialog.open = false;
}

/* Cancel button or Ok for alert and confirm */
function cancelClicked(event) {
  event.preventDefault();
  let dialog = document.getElementById("dialog");
  dialog.open = false;
}

/* Method to guard against XSS */
function getInput(str) {
  let temp = document.createElement("p");
  temp.textContent = str;
  return temp.innerHTML;
}
