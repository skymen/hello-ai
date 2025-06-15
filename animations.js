// Animation utilities for the AI News Summarizer

// Utility function to auto-scroll the chat area
function autoScrollToBottom() {
  const chatArea = document.getElementById("chatArea");
  // Use requestAnimationFrame for smooth scrolling
  requestAnimationFrame(() => {
    chatArea.scrollTop = chatArea.scrollHeight;
  });
}

// Make function globally available
window.autoScrollToBottom = autoScrollToBottom;

// Async function to animate words with delays
async function animateWordsIn(element, text, delay = 70) {
  return new Promise((resolve) => {
    const words = text.split(" ");
    element.innerHTML = "";
    let currentDelay = 0;

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.className = "word-animate";

      span.style.animationDelay = `${currentDelay}ms`;

      // Add pause after punctuation
      if (word.match(/[:;,]$/)) {
        currentDelay += delay * 2; // Extra pause for punctuation
      }
      if (word.match(/[.!?]$/)) {
        currentDelay += delay * 4; // Extra pause for punctuation
      }

      element.appendChild(span);

      // Auto-scroll as words appear
      setTimeout(() => {
        autoScrollToBottom();
      }, currentDelay + 150); // Scroll slightly after each word appears

      currentDelay += delay;
    });

    // Resolve when all animations are complete
    const totalDuration = currentDelay + 300; // 300ms for the last word animation
    setTimeout(() => {
      autoScrollToBottom(); // Final scroll at the end
      resolve();
    }, totalDuration);
  });
}

// Async function to add content to current message with continuous word animation
async function addToCurrentMessage(content, delay = 70) {
  return new Promise((resolve) => {
    const lastMessage = document.querySelector(
      ".message:last-child .message-content"
    );

    // Get existing word count to continue animation sequence
    const existingSpans = lastMessage.querySelectorAll(".word-animate");
    const startingWordIndex = existingSpans.length;

    const words = content.split(" ");
    let currentDelay = startingWordIndex * delay;

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.className = "word-animate";
      span.style.animationDelay = `${currentDelay}ms`;

      // Add pause after punctuation
      if (word.match(/[:;,]$/)) {
        currentDelay += delay * 2; // Extra pause for punctuation
      }
      if (word.match(/[.!?]$/)) {
        currentDelay += delay * 4; // Extra pause for punctuation
      }

      lastMessage.appendChild(span);

      // Auto-scroll as words appear
      setTimeout(() => {
        autoScrollToBottom();
      }, currentDelay + 150); // Scroll slightly after each word appears

      currentDelay += delay;
    });

    // Resolve when all new words are animated
    const totalDuration = currentDelay + 300;
    setTimeout(() => {
      autoScrollToBottom(); // Final scroll at the end
      resolve();
    }, totalDuration);
  });
}

// Async function to show thinking animation
async function showThinking(title, content, duration = 3000) {
  return new Promise((resolve) => {
    const thinkingId = `thinkingContainer${Date.now()}`;

    // Create thinking container element
    const thinkingContainer = document.createElement("div");
    thinkingContainer.className = "thinking-container";
    thinkingContainer.id = thinkingId;
    thinkingContainer.innerHTML = `
      <div class="thinking-header thinking-in-progress" onclick="toggleThinking('${thinkingId}')">
        <div class="thinking-header-text">
          🧠 ${title}
          <div class="thinking-dots" id="${thinkingId}Dots">
            <div class="thinking-dot"></div>
            <div class="thinking-dot"></div>
            <div class="thinking-dot"></div>
          </div>
        </div>
        <span class="caret" id="${thinkingId}Caret" style="display: none;">▶</span>
      </div>
      <div class="thinking-content" id="${thinkingId}Content">
        ${content}
      </div>
    `;

    const lastMessage = document.querySelector(
      ".message:last-child .message-content"
    );
    lastMessage.appendChild(thinkingContainer);
    thinkingContainer.style.display = "block";

    // Auto-scroll when thinking container is added
    autoScrollToBottom();

    // Hide dots and show caret after duration
    setTimeout(() => {
      // Start completion animation for dots
      const dots = document.querySelectorAll(
        `#${thinkingId}Dots .thinking-dot`
      );
      dots.forEach((dot, index) => {
        setTimeout(() => {
          dot.classList.add("complete");
        }, index * 100); // Stagger the completion animation
      });

      // Hide dots container and show caret after completion animation
      setTimeout(() => {
        document.getElementById(`${thinkingId}Dots`).style.display = "none";
        const caret = document.getElementById(`${thinkingId}Caret`);
        const header = document.querySelector(
          `#${thinkingId} .thinking-header`
        );

        // Remove in-progress class to enable clicking and add completed styling
        header.classList.remove("thinking-in-progress");
        header.classList.add("completed");

        caret.style.display = "inline";
        caret.classList.add("fade-in");
        setTimeout(() => {
          caret.classList.remove("fade-in");
        }, 400);

        // Add completion pulse effect
        header.classList.add("sources-complete");

        resolve();
      }, 600); // Wait for completion animation to finish
    }, duration);
  });
}

// Toggle function for thinking sections
function toggleThinking(thinkingId) {
  const header = document.querySelector(`#${thinkingId} .thinking-header`);

  // Don't allow toggling if still in progress
  if (header.classList.contains("thinking-in-progress")) {
    return;
  }

  const content = document.getElementById(`${thinkingId}Content`);
  const caret = document.getElementById(`${thinkingId}Caret`);
  const isOpen = content.style.display === "block";

  content.style.display = isOpen ? "none" : "block";
  if (caret) {
    caret.classList.toggle("open", !isOpen);
  }
}
