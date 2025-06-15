// AI Response handling for the AI News Summarizer

// Main async AI response function
async function handleAIResponse() {
  // Create empty AI message container
  createMessageContainer(false);

  // First thinking phase
  await showThinking(
    "Thinking",
    `
    The user is asking me to summarize current news. Since they mentioned in the past they've been feeling under the weather and can't "doom scroll" anymore, they seem to want a general overview of what's happening without having to go through potentially negative or overwhelming news themselves.<br><br>
    
    Since my knowledge cutoff is January 2025 and the current date is June 15, 2025, I should search for recent news to provide them with current information. This is exactly the type of query that requires web search - they're asking for current/recent news which changes daily.<br><br>
    
    I should search for general news and try to give them a balanced summary that's informative but not overwhelming, given their mention of not wanting to doom scroll.
  `,
    3000
  );

  // Helper message
  await addToCurrentMessage(
    "💡 Now I'll search for current news sources to find the most relevant articles for you."
  );

  // Source searching phase
  await showSourceSearching();

  // Helper message
  await addToCurrentMessage(
    "💡 I've analyzed all the sources. Now I'll organize the most important news stories for you."
  );

  // Second thinking phase
  await showThinking(
    "Filtering and organizing",
    `
    Now I need to filter through these sources and select the most relevant, balanced news items. I want to avoid purely negative or sensationalist content since the user mentioned not wanting to doom scroll.<br><br>
    
    I'll focus on:<br>
    • Significant global developments that are important to know<br>
    • Positive scientific or technological breakthroughs<br>
    • Economic updates that affect daily life<br>
    • Climate news that shows progress rather than just problems<br><br>
    
    I'll present 4 key stories with clear headlines and concise summaries, making sure to maintain an informative but not overwhelming tone.
  `,
    2000
  );

  // Helper message
  await addToCurrentMessage(
    "💡 Perfect! Now I'll compile the most important news stories for you."
  );

  // Show news summary
  await showNewsSummary();
}
