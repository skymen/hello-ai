# AI News Summarizer

A modern web application that provides AI-powered news summarization with an elegant chat interface.

## Project Structure

```
📁 AI News Summarizer/
├── 📄 index.html          # Main HTML structure
├── 🎨 styles.css         # All CSS styles and animations
├── 📄 README.md          # This documentation
│
├── 📁 JavaScript Modules:
│   ├── 📄 data.js         # Application constants and data
│   ├── 📄 textbox.js      # Input handling and typing simulation
│   ├── 📄 animations.js   # Word-by-word animations and thinking UI
│   ├── 📄 ui-components.js # Message containers and UI elements
│   ├── 📄 news.js         # News source searching and display
│   ├── 📄 ai-response.js  # Main AI response orchestration
│   ├── 📄 sidebar.js      # Article preview sidebar functionality
│   └── 📄 main.js         # Application initialization and main logic
│
└── 📄 index copy.html     # Original monolithic version (backup)
```

## Module Dependencies

The JavaScript files are loaded in dependency order:

1. **data.js** - Application constants (no dependencies)
2. **textbox.js** - Input handling (depends on data.js)
3. **animations.js** - Animation utilities (no dependencies)
4. **ui-components.js** - UI components (depends on animations.js)
5. **news.js** - News functionality (depends on data.js, animations.js)
6. **ai-response.js** - AI response logic (depends on all UI modules)
7. **sidebar.js** - Sidebar controls (no dependencies)
8. **main.js** - Main application logic (depends on all modules)

## Key Features

- 🎯 **Modular Architecture**: Clean separation of concerns
- 🎬 **Smooth Animations**: Word-by-word typing effects
- 🔍 **Source Searching**: Animated news source discovery
- 🧠 **Thinking Process**: Expandable AI reasoning display
- 📱 **Responsive Design**: Works on all screen sizes
- 🖼️ **Article Preview**: Sidebar iframe for source articles

## Development

Each module handles a specific aspect of the application:

- **Data Management**: Centralized constants and configuration
- **User Input**: Intelligent typing simulation and validation
- **Animations**: Reusable word-by-word animation system
- **UI Components**: Modular message and component creation
- **News Logic**: Source searching and content organization
- **AI Responses**: Orchestrated conversation flow
- **Sidebar**: Article preview and navigation

## Usage

Simply open `index.html` in a modern web browser. The application will:

1. Load all JavaScript modules in order
2. Initialize the chat interface
3. Enable the guided typing experience
4. Provide an AI news summarization demo

The modular structure makes it easy to extend, modify, or debug individual features without affecting the entire application.
