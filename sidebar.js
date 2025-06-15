// Sidebar functionality for the AI News Summarizer

function openSource(url) {
  const sidebar = document.getElementById("sidebar");
  const iframe = document.getElementById("articleFrame");
  const body = document.body;

  iframe.src = url;
  sidebar.classList.add("open");
  body.classList.add("sidebar-open");
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const body = document.body;

  sidebar.classList.remove("open");
  body.classList.remove("sidebar-open");
}
