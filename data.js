const sources = [
  "CNN - Breaking News Update",
  "BBC News - Global Politics",
  "Reuters - Market Analysis",
  "The New York Times - Technology",
  "Washington Post - Climate Report",
  "Associated Press - International",
  "Bloomberg - Economic Indicators",
  "NBC News - Health Updates",
  "Fox News - National Security",
  "The Guardian - Science Breakthrough",
  "NPR - Cultural Analysis",
  "Wall Street Journal - Finance",
  "USA Today - Sports Headlines",
  "ABC News - Political Updates",
  "CBS News - Weather Alerts",
];

const sourceUrls = [
  "./articles/climate-agreement.html",
  "./articles/ai-safety-initiative.html",
  "./articles/market-recovery.html",
  "./articles/quantum-breakthrough.html",
  "./articles/economic-indicators.html",
];

// Repeat sources to get ~50
const allSources = [];
for (let i = 0; i < 4; i++) {
  allSources.push(...sources);
}

// Application constants
const targetMessage = "Hello AI, please summarise the news for me";
