// AI Response handling for the AI News Summarizer

// Main async AI response function
async function handleAIResponse() {
  // Create empty AI message container
  createMessageContainer(false);

  // First thinking phase
  await showThinking(
    "Thinking",
    `
    Ossama is asking me to summarize current news. Since he mentioned in the past he's been feeling burnt out, he might want a general overview of what's happening without having to go through potentially negative or overwhelming news.<br><br>
    
    Since my knowledge cutoff is January 2025 and the current date is June 15, 2025, I should search for recent news to provide him with current information. This is exactly the type of query that requires web search - he's asking for current/recent news which changes daily.<br><br>
    
    I should search for general news and try to give him a balanced summary that's informative but not overwhelming.
  `,
    3000
  );

  // Helper message
  await addToCurrentMessage(
    "Hello Ossama! I'll search the internet for current news sources to find the most relevant articles for you."
  );

  // Source searching phase
  await showSourceSearching();

  // Helper message
  await addToCurrentMessage(
    "💡 Great! I've analyzed all the sources. Now I'll organize the most important news stories for you."
  );

  // Second thinking phase
  await showThinking(
    "Filtering and organizing",
    `
    Now I need to filter through these sources and select the most relevant, balanced news items. I want to avoid purely negative or sensationalist content since Ossama mentioned being burnt out. Ossama has also repeatedly expressed interest in world news, technology and finances.<br><br>
    
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
    "💡 Perfect! Based on current news coverage, here's a summary of the major stories that would be relevant to you:"
  );

  // Show news summary
  await showNewsSummary();

  console.log("AI response completed successfully.");

  await addToCurrentMessage(
    "I hope this gives you a good overview of what's been going on in the world. Don't forget to take care of yourself and I hope you feel better soon!"
  );
}
