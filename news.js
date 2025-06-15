// News functionality for the AI News Summarizer

// Async function to show source searching with animation
async function showSourceSearching() {
  return new Promise((resolve) => {
    // Create sources container element
    const sourcesContainer = document.createElement("div");
    sourcesContainer.className = "sources-container";
    sourcesContainer.id = "sourcesContainer";
    sourcesContainer.innerHTML = `
      <div class="sources-header sources-in-progress" onclick="toggleSources()">
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
          </div>
        </div>
        <span class="caret" id="sourcesCaret" style="display: none;">▶</span>
      </div>
      <div class="sources-list-container" id="sourcesListContainer">
        <div id="sourcesList"></div>
      </div>
    `;

    const lastMessage = document.querySelector(
      ".message:last-child .message-content"
    );
    lastMessage.appendChild(sourcesContainer);
    sourcesContainer.style.display = "block";

    // Auto-scroll when sources container is added
    autoScrollToBottom();

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

        // Start completion animation for search dots
        const searchDots = document.querySelectorAll(
          "#searchingDots .thinking-dot"
        );
        searchDots.forEach((dot, index) => {
          setTimeout(() => {
            dot.classList.add("complete");
          }, index * 100);
        });

        // Update header to show completion after dot animation
        setTimeout(() => {
          const sourcesHeader = document.querySelector(
            "#sourcesContainer .sources-header"
          );

          // Remove in-progress class to enable clicking
          sourcesHeader.classList.remove("sources-in-progress");
          sourcesHeader.classList.add("completed");

          sourcesHeader.innerHTML = `
            <div class="sources-header-content">
              <div class="sources-status-text">
                <span class="research-complete-icon">✅</span> Found ${relevantSources.length} relevant sources
              </div>
            </div>
            <span class="caret" id="sourcesCaret">▶</span>
          `;

          const caret = document.getElementById("sourcesCaret");
          caret.classList.add("fade-in");
          setTimeout(() => {
            caret.classList.remove("fade-in");
          }, 400);

          // Add completion pulse effect
          sourcesHeader.classList.add("sources-complete");

          resolve();
        }, 600); // Wait for completion animation
        return;
      }

      // Update the preview text with fade-in animation
      if (currentIndex < websitePreviews.length) {
        const newText = `Currently checking: ${websitePreviews[currentIndex]}`;

        // Fade out current text
        currentSearchingText.style.opacity = "0.3";

        // Update text and fade in after a short delay
        setTimeout(() => {
          currentSearchingText.textContent = newText;
          currentSearchingText.style.opacity = "1";
          currentSearchingText.style.transition = "opacity 0.4s ease";
          currentSearchingText.classList.add("search-preview-fade");
        }, 150);
      }

      const sourceDiv = document.createElement("div");
      const isRelevant = relevantSources.includes(
        allSearchSources[currentIndex]
      );

      sourceDiv.className = `source-preview ${
        isRelevant ? "relevant" : "irrelevant"
      } fade-in`;

      // Add staggered fade-in animation
      sourceDiv.style.animationDelay = `${currentIndex * 50}ms`;

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
  const sourcesHeader = document.querySelector(
    "#sourcesContainer .sources-header"
  );

  // Don't allow toggling if still in progress
  if (sourcesHeader.classList.contains("sources-in-progress")) {
    return;
  }

  const content = document.getElementById("sourcesListContainer");
  const caret = document.getElementById("sourcesCaret");
  const isOpen = content.style.display === "block";

  content.style.display = isOpen ? "none" : "block";
  if (caret) {
    caret.classList.toggle("open", !isOpen);
  }

  // Scroll to top when opening
  if (!isOpen) {
    content.scrollTop = 0;
  }
}

async function showNewsSummary() {
  // Create news summary container element
  const newsSummaryDiv = document.createElement("div");
  newsSummaryDiv.className = "news-summary";

  const lastMessage = document.querySelector(
    ".message:last-child .message-content"
  );
  lastMessage.appendChild(newsSummaryDiv);
  newsSummaryDiv.style.display = "block";

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

  let totalWordIndex = 0;

  // Animate each news story sequentially
  for (let i = 0; i < newsStories.length; i++) {
    const story = newsStories[i];

    // Create news item container
    const newsItem = document.createElement("div");
    newsItem.className = "news-item";
    newsItem.style.opacity = "0";
    newsItem.style.borderBottom = "1px solidrgba(62, 62, 62, 0)";

    // Create headline
    const headline = document.createElement("div");
    headline.className = "news-headline";

    // Create content
    const content = document.createElement("div");
    content.className = "news-content";

    // Create source link (initially invisible)
    const sourceLink = document.createElement("a");
    sourceLink.className = "source-link";
    sourceLink.style.opacity = "0";
    sourceLink.style.border = "none";
    sourceLink.style.background = "transparent";
    sourceLink.onclick = () => openSource(story.url);

    newsItem.appendChild(headline);
    newsItem.appendChild(content);
    newsItem.appendChild(sourceLink);
    newsSummaryDiv.appendChild(newsItem);

    // Show the news item container
    newsItem.style.opacity = "1";

    // Animate headline
    await animateWordsIn(headline, story.headline);

    // Small pause after headline
    // await new Promise((resolve) => setTimeout(resolve, 50));

    // Animate content
    await animateWordsIn(content, story.content);

    // Small pause before source
    // await new Promise((resolve) => setTimeout(resolve, 50));

    // Show source link with animation
    sourceLink.style.opacity = "1";
    sourceLink.style.border = "1px solid rgba(16, 163, 127, 0.2)";
    sourceLink.style.background = "rgba(16, 163, 127, 0.1)";
    sourceLink.style.transition = "all 0.3s ease";

    await animateWordsIn(sourceLink, story.source);

    // Show border divider after content is done (except for last item)
    if (i < newsStories.length - 1) {
      setTimeout(() => {
        newsItem.style.borderBottom = "1px solid #3e3e3e";
        // newsItem.style.transition = "border-bottom 0.3s ease";
      }, 300);
    }

    // Pause between stories
    // await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Add sources referenced section
  const sourcesSection = document.createElement("div");
  sourcesSection.style.marginTop = "20px";
  sourcesSection.style.paddingTop = "15px";
  sourcesSection.style.borderTop = "none"; // Hide border initially

  const sourcesTitle = document.createElement("strong");
  const sourcesLinks = document.createElement("div");

  sourcesSection.appendChild(sourcesTitle);
  sourcesSection.appendChild(document.createElement("br"));
  sourcesSection.appendChild(sourcesLinks);
  newsSummaryDiv.appendChild(sourcesSection);

  // Animate "Sources Referenced:"
  await animateWordsIn(sourcesTitle, "Sources Referenced:");

  // Show top border
  sourcesSection.style.borderTop = "1px solid #3e3e3e";
  //   sourcesSection.style.transition = "border-top 0.3s ease";

  //   await new Promise((resolve) => setTimeout(resolve, 200));

  // Create and animate source links
  const sourceNames = [
    "Reuters",
    "BBC News",
    "The New York Times",
    "Washington Post",
    "Bloomberg",
  ];

  for (let i = 0; i < sourceNames.length; i++) {
    const link = document.createElement("a");
    link.className = "source-link";
    link.style.opacity = "0";
    link.style.border = "none";
    link.style.background = "transparent";
    link.onclick = () => openSource(sourceUrls[i]);

    if (i > 0) {
      const separator = document.createTextNode(" • ");
      sourcesLinks.appendChild(separator);
    }

    sourcesLinks.appendChild(link);

    // Show link with animation
    link.style.opacity = "1";
    link.style.border = "1px solid rgba(16, 163, 127, 0.2)";
    link.style.background = "rgba(16, 163, 127, 0.1)";
    link.style.transition = "all 0.3s ease";

    await animateWordsIn(link, sourceNames[i]);

    // Small pause between links
    if (i < sourceNames.length - 1) {
      //   await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  return Promise.resolve();
}
