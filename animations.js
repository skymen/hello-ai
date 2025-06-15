// Animation utilities for the AI News Summarizer

// Async function to animate words with delays
async function animateWordsIn(element, text, delay = 100) {
  return new Promise((resolve) => {
    const words = text.split(" ");
    element.innerHTML = "";

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.className = "word-animate";
      span.style.animationDelay = `${index * delay}ms`;
      element.appendChild(span);
    });

    // Resolve when all animations are complete
    const totalDuration = words.length * delay + 300; // 300ms for the last word animation
    setTimeout(resolve, totalDuration);
  });
}

// Async function to add content to current message with continuous word animation
async function addToCurrentMessage(content, delay = 100) {
  return new Promise((resolve) => {
    const lastMessage = document.querySelector(
      ".message:last-child .message-content"
    );

    // Get existing word count to continue animation sequence
    const existingSpans = lastMessage.querySelectorAll(".word-animate");
    const startingWordIndex = existingSpans.length;

    const words = content.split(" ");

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.className = "word-animate";
      // Continue animation from where it left off
      span.style.animationDelay = `${(startingWordIndex + index) * delay}ms`;
      lastMessage.appendChild(span);
    });

    // Resolve when all new words are animated
    const totalDuration = words.length * delay + 300;
    setTimeout(resolve, totalDuration);
  });
}

// Async function to show thinking animation
async function showThinking(title, content, duration = 3000) {
  return new Promise((resolve) => {
    const thinkingId = `thinkingContainer${Date.now()}`;
    const thinkingHtml = `
      <div class="thinking-container" id="${thinkingId}">
        <div class="thinking-header" onclick="toggleThinking('${thinkingId}')">
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
      </div>
    `;

    const lastMessage = document.querySelector(
      ".message:last-child .message-content"
    );
    lastMessage.innerHTML += thinkingHtml;
    document.getElementById(thinkingId).style.display = "block";

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
        caret.style.display = "inline";
        caret.classList.add("fade-in");
        resolve();
      }, 600); // Wait for completion animation to finish
    }, duration);
  });
}

// Toggle function for thinking sections
function toggleThinking(thinkingId) {
  const content = document.getElementById(`${thinkingId}Content`);
  const caret = document.getElementById(`${thinkingId}Caret`);
  const isOpen = content.style.display === "block";

  content.style.display = isOpen ? "none" : "block";
  if (caret) {
    caret.classList.toggle("open", !isOpen);
  }
}
