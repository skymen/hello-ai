// Sidebar functionality for the AI News Summarizer

function openSource(url) {
  const sidebar = document.getElementById("sidebar");
  const iframe = document.getElementById("articleFrame");
  const body = document.body;
  const sidebarTitle = document.getElementById("sidebarTitle");

  // Start with fade out animation
  sidebarTitle.classList.remove("fade-in");
  sidebarTitle.classList.add("fade-out");

  // Update iframe source
  iframe.src = url;
  sidebar.classList.add("open");
  body.classList.add("sidebar-open");

  // Set up iframe load event to get the page title
  iframe.onload = function () {
    try {
      // Try to get the title from the iframe
      const iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;
      const pageTitle = iframeDocument.title;

      if (pageTitle && pageTitle.trim()) {
        // After a brief delay, update title and fade in
        setTimeout(() => {
          sidebarTitle.textContent = pageTitle;
          sidebarTitle.classList.remove("fade-out");
          sidebarTitle.classList.add("fade-in");
        }, 200);
      } else {
        // Fallback to URL-based title
        setTimeout(() => {
          const urlTitle = getUrlTitle(url);
          sidebarTitle.textContent = urlTitle;
          sidebarTitle.classList.remove("fade-out");
          sidebarTitle.classList.add("fade-in");
        }, 200);
      }
    } catch (error) {
      // If we can't access iframe content (CORS), use URL-based title
      setTimeout(() => {
        const urlTitle = getUrlTitle(url);
        sidebarTitle.textContent = urlTitle;
        sidebarTitle.classList.remove("fade-out");
        sidebarTitle.classList.add("fade-in");
      }, 200);
    }
  };

  // Fallback timeout in case iframe doesn't load
  setTimeout(() => {
    if (sidebarTitle.classList.contains("fade-out")) {
      const urlTitle = getUrlTitle(url);
      sidebarTitle.textContent = urlTitle;
      sidebarTitle.classList.remove("fade-out");
      sidebarTitle.classList.add("fade-in");
    }
  }, 3000);

  if (url.includes("hello-ai") || url.includes("hello-ai")) {
    setTimeout(() => {
      closeSidebar();
      localStorage.setItem("error_csp", "true");
      setTimeout(() => {
        window.location.href = "./error.html";
      }, 200);
    }, 3000);
  }
}

// Helper function to extract a readable title from URL
function getUrlTitle(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace(/^www\./, "");

    // Map common domains to readable names
    const domainMap = {
      "cnn.com": "CNN",
      "bbc.com": "BBC News",
      "reuters.com": "Reuters",
      "nytimes.com": "The New York Times",
      "washingtonpost.com": "The Washington Post",
      "bloomberg.com": "Bloomberg",
      "techcrunch.com": "TechCrunch",
      "theguardian.com": "The Guardian",
    };

    return (
      domainMap[hostname] ||
      hostname.split(".")[0].charAt(0).toUpperCase() +
        hostname.split(".")[0].slice(1)
    );
  } catch (error) {
    return "Article Preview";
  }
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const body = document.body;
  const sidebarTitle = document.getElementById("sidebarTitle");

  sidebar.classList.remove("open");
  body.classList.remove("sidebar-open");

  // Reset title with animation
  sidebarTitle.classList.remove("fade-in");
  sidebarTitle.classList.add("fade-out");
  setTimeout(() => {
    sidebarTitle.textContent = "Article Preview";
    sidebarTitle.classList.remove("fade-out");
  }, 200);
}
