// UI Components for the AI News Summarizer

// Utility function to create message containers
function createMessageContainer(isUser = false) {
  const chatArea = document.getElementById("chatArea");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isUser ? "user-message" : "ai-message"}`;

  if (isUser) {
    const messageContent = document.createElement("div");
    messageContent.className = "message-content";

    const avatar = document.createElement("div");
    avatar.className = "avatar user-avatar";
    avatar.textContent = "You";

    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(avatar);
  } else {
    const avatar = document.createElement("div");
    avatar.className = "avatar ai-avatar";
    avatar.textContent = "AI";

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
  }

  chatArea.appendChild(messageDiv);

  // Auto-scroll to bottom with better timing
  setTimeout(() => {
    if (typeof autoScrollToBottom === "function") {
      autoScrollToBottom();
    } else {
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  }, 50); // Small delay to ensure DOM is updated

  return messageDiv.querySelector(".message-content");
}

// Async function to show a message with word-by-word animation
async function showMessage(content, delay = 70) {
  const messageElement = createMessageContainer(false);
  return animateWordsIn(messageElement, content, delay);
}

// Async function to show a title with word-by-word animation
async function showTitle(content, className = "news-headline", delay = 70) {
  return new Promise(async (resolve) => {
    const titleDiv = document.createElement("div");
    titleDiv.className = className;

    const lastMessage = document.querySelector(
      ".message:last-child .message-content"
    );
    lastMessage.appendChild(titleDiv);

    await animateWordsIn(titleDiv, content, delay);
    resolve();
  });
}

// Async function to show a link with word-by-word animation
async function showLink(text, url, delay = 70) {
  return new Promise(async (resolve) => {
    const linkElement = document.createElement("a");
    linkElement.className = "source-link";
    linkElement.onclick = () => openSource(url);

    const lastMessage = document.querySelector(
      ".message:last-child .message-content"
    );
    lastMessage.appendChild(linkElement);

    await animateWordsIn(linkElement, text, delay);
    resolve();
  });
}

// Async function to show content with word-by-word animation
async function showContent(content, className = "news-content", delay = 70) {
  return new Promise(async (resolve) => {
    const contentDiv = document.createElement("div");
    contentDiv.className = className;

    const lastMessage = document.querySelector(
      ".message:last-child .message-content"
    );
    lastMessage.appendChild(contentDiv);

    await animateWordsIn(contentDiv, content, delay);
    resolve();
  });
}

// Legacy function for backward compatibility
function addMessage(content, isUser = false) {
  const chatArea = document.getElementById("chatArea");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isUser ? "user-message" : "ai-message"}`;

  if (isUser) {
    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.innerHTML = content;

    const avatar = document.createElement("div");
    avatar.className = "avatar user-avatar";
    avatar.textContent = "You";

    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(avatar);
  } else {
    const avatar = document.createElement("div");
    avatar.className = "avatar ai-avatar";
    avatar.textContent = "AI";

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.innerHTML = content;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
  }

  chatArea.appendChild(messageDiv);
  chatArea.scrollTop = chatArea.scrollHeight;

  return messageDiv.querySelector(".message-content");
}
