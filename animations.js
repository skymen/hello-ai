// Animation utilities for the AI News Summarizer

// Track if user has scrolled up to disable auto-scroll
let userScrolledUp = false;
let scrollIndicator = null;
let lastScrollTop = 0;

// Utility function to auto-scroll the chat area
function autoScrollToBottom() {
  const chatArea = document.getElementById("chatArea");

  // Don't auto-scroll if user has manually scrolled up
  if (userScrolledUp) {
    return;
  }

  // Check if user was already near the bottom (within 100px)
  const isNearBottom =
    chatArea.scrollHeight - chatArea.scrollTop - chatArea.clientHeight <= 100;

  // Only auto-scroll if user was already near the bottom
  if (isNearBottom) {
    chatArea.scrollTop = chatArea.scrollHeight;
    lastScrollTop = chatArea.scrollTop;
  }
}

// Function to show scroll indicator when auto-scroll is disabled
function showScrollIndicator() {
  if (!scrollIndicator) {
    scrollIndicator = document.createElement("div");
    scrollIndicator.className = "scroll-indicator";
    scrollIndicator.innerHTML = "↓ New messages below";
    scrollIndicator.onclick = scrollToBottom;
    document.body.appendChild(scrollIndicator);
  }

  scrollIndicator.classList.add("show");
}

// Function to hide scroll indicator
function hideScrollIndicator() {
  if (scrollIndicator) {
    scrollIndicator.classList.remove("show");
  }
}

// Function to manually scroll to bottom and re-enable auto-scroll
function scrollToBottom() {
  const chatArea = document.getElementById("chatArea");
  chatArea.scrollTo({
    top: chatArea.scrollHeight,
    behavior: "smooth",
  });

  // Re-enable auto-scroll after manual scroll to bottom
  setTimeout(() => {
    userScrolledUp = false;
    hideScrollIndicator();
    lastScrollTop = chatArea.scrollTop;
  }, 500);
}

// Function to handle scroll events
function handleScroll(e) {
  const chatArea = document.getElementById("chatArea");
  const currentScrollTop = chatArea.scrollTop;
  const isAtBottom =
    chatArea.scrollHeight - chatArea.scrollTop - chatArea.clientHeight <= 100;

  // Check if user scrolled up (not just at bottom/not at bottom)
  const scrolledUp = currentScrollTop < lastScrollTop;

  // If user scrolled up from their previous position, disable auto-scroll
  if (scrolledUp && !userScrolledUp) {
    userScrolledUp = true;
    showScrollIndicator();
  }
  // If user is back at bottom, re-enable auto-scroll
  else if (isAtBottom && userScrolledUp) {
    userScrolledUp = false;
    hideScrollIndicator();
  }

  lastScrollTop = currentScrollTop;
}

// Initialize scroll tracking
function initializeScrollTracking() {
  const chatArea = document.getElementById("chatArea");
  if (chatArea) {
    chatArea.addEventListener("scroll", handleScroll);
    lastScrollTop = chatArea.scrollTop;
  }
}

// Make functions globally available
window.autoScrollToBottom = autoScrollToBottom;
window.initializeScrollTracking = initializeScrollTracking;

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
    // Set AI face to thinking state
    setAIFaceThinking();

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
        // Set AI face to done thinking
        setAIFaceDoneThinking();

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

        // Transition back to normal face after a short delay
        setTimeout(() => {
          setAIFaceNormal();
        }, 800);

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

// AI Face Animation Functions
function setAIFaceThinking() {
  const avatars = document.querySelectorAll(".ai-avatar");
  avatars.forEach((avatar) => {
    avatar.classList.remove("done-thinking");
    avatar.classList.add("thinking");
  });
}

function setAIFaceDoneThinking() {
  const avatars = document.querySelectorAll(".ai-avatar");
  avatars.forEach((avatar) => {
    avatar.classList.remove("thinking");
    avatar.classList.add("done-thinking");
  });
}

function setAIFaceNormal() {
  const avatars = document.querySelectorAll(".ai-avatar");
  avatars.forEach((avatar) => {
    avatar.classList.remove("thinking", "done-thinking");
    avatar.classList.add("returning-normal");

    // Remove the returning-normal class after animation completes
    setTimeout(() => {
      avatar.classList.remove("returning-normal");
    }, 600); // Match the animation duration
  });
}

// Make functions globally available
window.setAIFaceThinking = setAIFaceThinking;
window.setAIFaceDoneThinking = setAIFaceDoneThinking;
window.setAIFaceNormal = setAIFaceNormal;
