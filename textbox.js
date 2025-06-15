// Textbox functionality for the AI News Summarizer
// Handles guided typing simulation and input validation

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
messageInput.addEventListener("keydown", handleKeydown);

function isMessageComplete() {
  return messageInput.value === targetMessage;
}

function handleKeydown(e) {
  if (e.key.length === 1) {
    typeNextCharacter();

    e.preventDefault();
  } else if (e.key === "Enter") {
    if (isMessageComplete()) {
      sendMessage();
    } else {
      //typeNextCharacter();
      // finish typing the message and send it
      messageInput.value = targetMessage;
      sendButton.classList.add("enabled");
      sendMessage();
    }
    e.preventDefault();
  }
  return false;
}

function typeNextCharacter() {
  if (messageInput.value.length < targetMessage.length) {
    messageInput.value = targetMessage.substring(
      0,
      messageInput.value.length + 1
    );

    if (messageInput.value === targetMessage) {
      sendButton.classList.add("enabled");
    }
  }
}
