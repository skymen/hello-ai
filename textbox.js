const targetMessage = "Hello AI, please summarise the news for me";
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
      typeNextCharacter();
    }
    e.preventDefault();
  }
  return false;
}

function typeNextCharacter() {
  if (messageInput.value.length < targetMessage.length) {
    currentIndex = messageInput.value.length;
    messageInput.value = targetMessage.substring(0, currentIndex + 1);

    if (messageInput.value === targetMessage) {
      sendButton.classList.add("enabled");
    }
  }
}
