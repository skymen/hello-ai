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
  chatArea.scrollTop = chatArea.scrollHeight;

  return messageDiv.querySelector(".message-content");
}

// Async function to show a message with word-by-word animation
async function showMessage(content, delay = 100) {
  const messageElement = createMessageContainer(false);
  return animateWordsIn(messageElement, content, delay);
}

// Async function to show a title with word-by-word animation
async function showTitle(content, className = "news-headline", delay = 100) {
  return new Promise(async (resolve) => {
    const titleHtml = `<div class="${className}">${content}</div>`;
    const lastMessage = document.querySelector(
      ".message:last-child .message-content"
    );
    lastMessage.innerHTML += titleHtml;

    const titleElement = lastMessage.querySelector(`.${className}:last-child`);
    await animateWordsIn(titleElement, content, delay);
    resolve();
  });
}

// Async function to show a link with word-by-word animation
async function showLink(text, url, delay = 100) {
  return new Promise(async (resolve) => {
    const linkHtml = `<a class="source-link" onclick="openSource('${url}')">${text}</a>`;
    const lastMessage = document.querySelector(
      ".message:last-child .message-content"
    );
    lastMessage.innerHTML += linkHtml;

    const linkElement = lastMessage.querySelector(".source-link:last-child");
    await animateWordsIn(linkElement, text, delay);
    resolve();
  });
}

// Async function to show content with word-by-word animation
async function showContent(content, className = "news-content", delay = 100) {
  return new Promise(async (resolve) => {
    const contentHtml = `<div class="${className}">${content}</div>`;
    const lastMessage = document.querySelector(
      ".message:last-child .message-content"
    );
    lastMessage.innerHTML += contentHtml;

    const contentElement = lastMessage.querySelector(
      `.${className}:last-child`
    );
    await animateWordsIn(contentElement, content, delay);
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
