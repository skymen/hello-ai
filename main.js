// Main application script for AI News Summarizer

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  const messageInput = document.getElementById("messageInput");

  // Auto-resize textarea
  messageInput.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 200) + "px";
  });
  // focus the input field on page load
  messageInput.focus();
});

function sendMessage() {
  if (!isMessageComplete()) return;

  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");

  const message = messageInput.value.trim();
  if (!message) return;

  addMessage(message, true);

  messageInput.value = "";
  sendButton.classList.remove("enabled");
  messageInput.disabled = true;

  // Start the AI response after a brief delay
  setTimeout(() => {
    handleAIResponse();
  }, 500);
}
