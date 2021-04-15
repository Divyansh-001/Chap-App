const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

const name = prompt("Enter name");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name} joined `, "right");
});

$(form).submit(function (event) {
  event.preventDefault();

  socket.emit("chat message", $(messageInput).val().trim());
  $(messageInput).val("");
});

socket.on("chat message", (msg, senderName) => {
  if (senderName === name) {
    append(msg, "right");
  } else {
    append(msg, "left");
  }
});
