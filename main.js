// Main application script for AI News Summarizer

// Profile Dialog Functions
function openProfileDialog() {
  const overlay = document.getElementById("profileDialogOverlay");
  overlay.classList.add("show");
}

function closeProfileDialog() {
  const overlay = document.getElementById("profileDialogOverlay");
  overlay.classList.remove("show");
}

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

  // Initialize scroll tracking for auto-scroll behavior
  if (typeof initializeScrollTracking === "function") {
    initializeScrollTracking();
  }
});

function sendMessage() {
  if (!isMessageComplete()) return;

  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  const inputArea = document.getElementById("inputArea");

  const message = messageInput.value.trim();
  if (!message) return;

  // Move input to bottom after first message
  inputArea.classList.remove("centered");

  messageInput.value = "";
  sendButton.classList.remove("enabled");
  messageInput.disabled = true;
  setTimeout(() => {
    inputArea.style.transition = "all 0.3s ease";
    addMessage(message, true);

    // Start the AI response after a brief delay
    setTimeout(() => {
      handleAIResponse();
    }, 500);
  }, 200);
}
