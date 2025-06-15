// News functionality for the AI News Summarizer

// Async function to show source searching with animation
async function showSourceSearching() {
  return new Promise((resolve) => {
    const sourcesHtml = `
      <div class="sources-container" id="sourcesContainer">
        <div class="sources-header" onclick="toggleSources()">
          <div class="sources-header-content">
            <div class="sources-status-text">
              🔍 Searching news sources
              <div class="thinking-dots" id="searchingDots">
                <div class="thinking-dot"></div>
                <div class="thinking-dot"></div>
                <div class="thinking-dot"></div>
              </div>
            </div>
            <div class="sources-preview-text" id="currentSearching">
              Currently checking: CNN Breaking News...
            </div>
          </div>
          <span class="caret" id="sourcesCaret">▶</span>
        </div>
        <div class="sources-list-container" id="sourcesListContainer">
          <div id="sourcesList"></div>
        </div>
      </div>
    `;

    const lastMessage = document.querySelector(
      ".message:last-child .message-content"
    );
    lastMessage.innerHTML += sourcesHtml;
    document.getElementById("sourcesContainer").style.display = "block";

    const sourcesList = document.getElementById("sourcesList");
    const currentSearchingText = document.getElementById("currentSearching");
    let currentIndex = 0;

    const relevantSources = [
      "Reuters - Global Climate Agreement",
      "BBC News - Tech Safety Initiative",
      "Bloomberg - Market Recovery",
      "Nature - Quantum Computing Breakthrough",
      "Associated Press - Economic Indicators",
    ];

    const irrelevantSources = [
      "Local Tribune - City Council Meeting",
      "Sports Weekly - Basketball Scores",
      "Celebrity Gossip - Red Carpet Events",
      "Gaming News - Latest Video Game",
      "Food Blog - Restaurant Reviews",
      "Weather Channel - Local Forecast",
      "Entertainment Tonight - Movie Premieres",
      "Fashion Weekly - Style Trends",
      "Pet Care - Dog Training Tips",
      "Travel Guide - Tourist Destinations",
    ];

    const websitePreviews = [
      "Breaking: Global leaders announce climate deal...",
      "Tech giants unite for AI safety standards...",
      "Markets surge on positive economic data...",
      "Scientists achieve quantum computing milestone...",
      "Economic indicators show steady growth...",
      "City council approves new budget proposal...",
      "Lakers defeat Warriors in overtime thriller...",
      "Celebrity spotted at movie premiere...",
      "New indie game takes gaming world by storm...",
      "Top 10 restaurants to try this weekend...",
      "Sunny skies expected through the weekend...",
      "Hollywood stars dazzle at award ceremony...",
      "Spring fashion trends you need to know...",
      "Expert tips for training your new puppy...",
      "Hidden gems: 5 must-visit destinations...",
    ];

    const allSearchSources = [...relevantSources, ...irrelevantSources];

    const searchInterval = setInterval(() => {
      if (currentIndex >= allSearchSources.length) {
        clearInterval(searchInterval);
        // Update header to show completion
        document.querySelector(
          "#sourcesContainer .sources-header"
        ).innerHTML = `
          <div class="sources-header-content">
            <div class="sources-status-text">🔍 Found ${relevantSources.length} relevant sources</div>
          </div>
          <span class="caret" id="sourcesCaret">▶</span>
        `;
        resolve();
        return;
      }

      // Update the preview text
      if (currentIndex < websitePreviews.length) {
        currentSearchingText.textContent = `Currently checking: ${websitePreviews[currentIndex]}`;
      }

      const sourceDiv = document.createElement("div");
      const isRelevant = relevantSources.includes(
        allSearchSources[currentIndex]
      );

      sourceDiv.className = `source-preview ${
        isRelevant ? "relevant" : "irrelevant"
      }`;

      // Make ALL sources clickable (both relevant and irrelevant)
      if (isRelevant) {
        sourceDiv.style.cursor = "pointer";
      }
      sourceDiv.onclick = () => {
        // Map relevant sources to their corresponding URLs
        const sourceUrlMap = {
          "Reuters - Global Climate Agreement": sourceUrls[0],
          "BBC News - Tech Safety Initiative": sourceUrls[1],
          "Bloomberg - Market Recovery": sourceUrls[2],
          "Nature - Quantum Computing Breakthrough": sourceUrls[3],
          "Associated Press - Economic Indicators": sourceUrls[4],
          // Add mapping for irrelevant sources to demo URLs
          "Local Tribune - City Council Meeting":
            "https://example.com/local-news",
          "Sports Weekly - Basketball Scores": "https://espn.com",
          "Celebrity Gossip - Red Carpet Events": "https://entertainment.com",
          "Gaming News - Latest Video Game": "https://gamespot.com",
          "Food Blog - Restaurant Reviews": "https://yelp.com",
          "Weather Channel - Local Forecast": "https://weather.com",
          "Entertainment Tonight - Movie Premieres": "https://etonline.com",
          "Fashion Weekly - Style Trends": "https://vogue.com",
          "Pet Care - Dog Training Tips": "https://petco.com",
          "Travel Guide - Tourist Destinations": "https://tripadvisor.com",
        };

        const url =
          sourceUrlMap[allSearchSources[currentIndex]] || sourceUrls[0];
        openSource(url);
      };

      sourceDiv.innerHTML = `
        <span>${isRelevant ? "✓" : "○"} ${allSearchSources[currentIndex]}</span>
        <span class="source-status ${
          isRelevant ? "status-relevant" : "status-irrelevant"
        }">
          ${isRelevant ? "Relevant" : "Irrelevant"}
        </span>
      `;
      sourcesList.appendChild(sourceDiv);

      // Auto-scroll to bottom of sources list
      const container = document.getElementById("sourcesListContainer");
      container.scrollTop = container.scrollHeight;

      currentIndex++;
    }, 300);
  });
}

function toggleSources() {
  const content = document.getElementById("sourcesListContainer");
  const caret = document.getElementById("sourcesCaret");
  const isOpen = content.style.display === "block";

  content.style.display = isOpen ? "none" : "block";
  if (caret) {
    caret.classList.toggle("open", !isOpen);
  }
}

async function showNewsSummary() {
  // Add a news item container
  const newsHtml = `<div class="news-summary"></div>`;
  const lastMessage = document.querySelector(
    ".message:last-child .message-content"
  );
  lastMessage.innerHTML += newsHtml;

  const newsSummary = lastMessage.querySelector(".news-summary");
  newsSummary.style.display = "block";

  // News stories data
  const newsStories = [
    {
      headline: "Global Climate Summit Reaches Historic Agreement",
      content:
        "World leaders from 195 countries have agreed on ambitious new climate targets, setting a pathway to limit global warming to 1.5°C. The agreement includes unprecedented funding commitments for renewable energy infrastructure and climate adaptation measures.",
      source: "Source: Reuters Climate Report",
      url: sourceUrls[0],
    },
    {
      headline: "Major Tech Companies Announce AI Safety Initiative",
      content:
        "Leading technology companies have launched a collaborative effort to establish global standards for artificial intelligence safety and ethics. The initiative aims to ensure responsible AI development while fostering innovation across industries.",
      source: "Source: TechCrunch Analysis",
      url: sourceUrls[1],
    },
    {
      headline: "Economic Markets Show Strong Recovery Signals",
      content:
        "Global stock markets have posted significant gains following positive economic indicators and reduced inflation rates. Analysts predict continued growth momentum through the next quarter, with particular strength in technology and renewable energy sectors.",
      source: "Source: Financial Times Market Update",
      url: sourceUrls[2],
    },
    {
      headline: "Breakthrough in Quantum Computing Achieved",
      content:
        "Researchers have successfully demonstrated a quantum computer capable of solving complex problems exponentially faster than traditional computers. This milestone brings practical quantum computing applications significantly closer to reality.",
      source: "Source: Nature Scientific Journal",
      url: sourceUrls[3],
    },
  ];

  // Create all the HTML structure first
  let summaryContent = "";

  for (let i = 0; i < newsStories.length; i++) {
    const story = newsStories[i];
    summaryContent += `
      <div class="news-item">
        <div class="news-headline">${story.headline}</div>
        <div class="news-content">${story.content}</div>
        <a class="source-link" onclick="openSource('${story.url}')">${story.source}</a>
      </div>
    `;
  }

  // Add sources referenced section
  summaryContent += `
    <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #3e3e3e;">
      <strong>Sources Referenced:</strong><br>
      <a class="source-link" onclick="openSource('${sourceUrls[0]}')">Reuters</a> • 
      <a class="source-link" onclick="openSource('${sourceUrls[1]}')">BBC News</a> • 
      <a class="source-link" onclick="openSource('${sourceUrls[2]}')">The New York Times</a> • 
      <a class="source-link" onclick="openSource('${sourceUrls[3]}')">Washington Post</a> • 
      <a class="source-link" onclick="openSource('${sourceUrls[4]}')">Bloomberg</a>
    </div>
  `;

  // Add all content to the summary container
  newsSummary.innerHTML = summaryContent;

  // Now animate everything word by word
  const allTextElements = newsSummary.querySelectorAll(
    ".news-headline, .news-content, .source-link, strong"
  );
  let wordIndex = 0;

  for (let element of allTextElements) {
    const text = element.textContent;
    const words = text.split(" ");
    element.innerHTML = "";

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.className = "word-animate";
      span.style.animationDelay = `${wordIndex * 100}ms`;
      element.appendChild(span);
      wordIndex++;
    });
  }

  // Return a promise that resolves when all animations are complete
  return new Promise((resolve) => {
    const totalDuration = wordIndex * 100 + 300;
    setTimeout(resolve, totalDuration);
  });
}
