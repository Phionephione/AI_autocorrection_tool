# AI Autocorrect Pro

An intelligent, real-time text correction tool powered by the Google Gemini API. This application enhances writing accuracy and fluency by providing instant, as-you-type suggestions for spelling, grammar, and punctuation mistakes.

![AI Autocorrect Pro Screenshot](https://storage.googleapis.com/aistudio-hosting/readme-images/ai-autocorrect-pro.png)

## ✨ Features

- **Real-time Suggestions**: Automatically corrects your text as you type, with a configurable debounce delay to ensure a smooth user experience.
- **Inline Diff View**: Clearly visualizes suggested changes. Additions are highlighted in green, and deletions are struck through in red.
- **AI-Powered Corrections**: Leverages the power of Google's `gemini-2.5-flash` model for high-quality, context-aware text corrections.
- **Copy Corrected Text**: A convenient one-click button to copy the clean, corrected version of your text to the clipboard.
- **Sleek & Modern UI**: A responsive, dark-themed interface built with React and Tailwind CSS for a professional look and feel.
- **Error Handling**: Gracefully handles potential API errors and provides feedback to the user.

## 🤖 How It Works: The Methodology

The application's core logic revolves around a clever synergy between a debounced input handler and a specifically engineered AI prompt.

### 1. Debounced API Calls

To provide a real-time experience without overwhelming the Gemini API, we use a **debouncing** technique.

- When a user types in the text area, a `useEffect` hook in the `App.tsx` component is triggered.
- Instead of calling the API on every keystroke, we set a `setTimeout` for 800ms.
- If the user continues typing, the previous timer is cleared and a new one is set.
- The API call to the `geminiService` is only made once the user has paused typing for 800ms.
- If the input text is cleared, the results are also cleared, and no API call is made.

### 2. Prompt Engineering & Custom Diff Format

The magic of the inline diff view lies in **prompt engineering**. We instruct the Gemini model to act as an expert proofreader and return the corrected text in a specific custom format.

The system prompt sent to the model includes the following rules:
- Deletions must be wrapped in `[-text-]`.
- Additions must be wrapped in `[+text+]`.

**Example:**
- **Original Input**: `"helo worldd i am comming"`
- **Expected AI Output**: `"[-helo-][+Hello+] world[-d-] i am [-comming-][+coming+]"`

This delegates the complex task of text comparison to the AI, simplifying the frontend logic significantly.

### 3. Frontend Diff Rendering

The `ResultDisplay.tsx` component receives the marked-up string from the API.
- It uses a regular expression (`/(\[-.*?-\]|\[\+.*?\+\])/g`) to split the string into an array of parts, preserving the custom markers.
- It then maps over this array:
  - If a part starts with `[-`, it's rendered as a `<del>` tag with red styling.
  - If a part starts with `[+`, it's rendered as an `<ins>` tag with green styling.
  - Any other part is rendered as a plain `<span>`.
- This process creates the seamless, intuitive inline diff that the user sees.

## 🚀 Getting Started

To run this project locally, follow these steps.

### Prerequisites

You need a modern web browser. The project uses an `importmap` for dependencies, so no `npm install` step is required.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-autocorrect-pro.git
    cd ai-autocorrect-pro
    ```

2.  **Set up your API Key:**
    This project requires a Google Gemini API key. The application is configured to read the key from the `process.env.API_KEY` environment variable. You will need to ensure this variable is available in the environment where you serve the files.

3.  **Serve the files:**
    You can use any simple static file server. A common choice is `http-server`.
    ```bash
    # If you don't have http-server, install it globally
    npm install -g http-server

    # Serve the project directory
    http-server .
    ```
    Now, open your browser and navigate to the local address provided by the server (e.g., `http://localhost:8080`).

## 📂 File Structure

The project is organized into a clear and maintainable structure.

```
/
├── components/           # Reusable React components
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Loader.tsx
│   ├── ResultDisplay.tsx   # Renders the inline diff view
│   └── TextAreaInput.tsx
├── services/             # Modules for external services
│   └── geminiService.ts    # Handles all Gemini API interaction and prompt logic
├── App.tsx               # Main application component, manages state
├── index.html            # Main HTML entry point
├── index.tsx             # React application entry point
├── metadata.json         # Application metadata
└── README.md             # You are here!
```

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or find any issues, feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
