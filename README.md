# 🌎 readerX - Interactive Language Learning Tool

A modern, user-friendly web application designed to help language learners read and understand texts in multiple languages with ease. Built with React and featuring real-time translations, word saving, and progress tracking.

![readerX Demo](demo-screenshot.png)

## ✨ Features

### 📚 Interactive Reading Experience
- **Single Word Translation**: Click on any word to see its translation instantly
- **Phrase Translation**: Select multiple words to get contextual translations of phrases or sentences
- **Smart Word Selection**: Automatically selects complete words even when clicking or selecting partially
- **Clean Interface**: Translations appear in elegant popups near the selected text

### 💾 Word Management & Learning
- **Save Words**: Save interesting words with their translations for later review
- **Saved Words Library**: Comprehensive view of all your saved words with search functionality
- **Progress Tracking**: Mark words as memorized to track your learning progress
- **Edit & Delete**: Modify word details or remove words from your collection
- **Statistics**: View total words saved, memorized count, and filtered results

### 📝 Text Management
- **File Upload**: Easily upload text files through drag-and-drop or file selection
- **Format Support**: Compatible with plain text (.txt) files
- **Dynamic Display**: Text is formatted for optimal readability with clear word separation

### 🎯 User Experience
- **Intuitive Design**: Modern, clean interface with Material-UI components
- **Responsive Layout**: Works seamlessly on different screen sizes
- **Smart Positioning**: Translation popups automatically position themselves to stay visible
- **Click-Away Clearing**: Translations disappear when clicking outside of words
- **Visual Feedback**: Subtle highlights and animations for better interaction feedback

### 🔄 Translation Features
- **Real-Time Translation**: Instant translations powered by Google Translate API
- **Context-Aware**: Different handling for single words vs. phrases
- **Error Handling**: Graceful handling of translation errors with user feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Google Translate API key
- Supabase account and project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mattfelber/readerX.git
   cd readerX
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your actual API keys:
   ```
   REACT_APP_SUPABASE_URL="your_supabase_project_url"
   REACT_APP_SUPABASE_ANON_KEY="your_supabase_anon_key"
   REACT_APP_GOOGLE_TRANSLATE_API_KEY="your_google_translate_api_key"
   REACT_APP_BASE_URL="http://localhost:3000"
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Technical Stack

- **Frontend**: React.js 19
- **UI Framework**: Material-UI 6.4.2
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Translation**: Google Translate API
- **Routing**: React Router 7.7.1
- **HTTP Client**: Axios for API requests

## 📖 How to Use

1. **Sign Up/Login**:
   - Create an account or login to access personalized features
   - Your saved words are tied to your account

2. **Upload Text**:
   - Navigate to the Reader tab
   - Drag and drop a text file onto the upload area
   - Or click to select a file from your computer

3. **Get Word Translations**:
   - Click any word to see its translation
   - Translation appears in a popup above or below the word
   - Click the bookmark icon to save the word to your collection

4. **Get Phrase Translations**:
   - Click and drag to select multiple words
   - The translation appears for the entire selected phrase
   - Selection automatically expands to include complete words

5. **Manage Saved Words**:
   - Navigate to the "Saved Words" tab
   - Search through your saved words
   - Mark words as memorized to track progress
   - Edit word details or delete words as needed
   - Use the toggle to show only memorized words

6. **Clear Translations**:
   - Click anywhere outside of words to clear current translations
   - Start a new selection to clear previous translations

## 🧪 Development

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run deploy` - Deploy to GitHub Pages

### Project Structure
```
src/
├── components/
│   ├── Dashboard.js      # Main dashboard with navigation
│   ├── Reader.js         # Text reading and translation
│   ├── SavedWords.js     # Saved words management
│   ├── SaveWordButton.js # Word saving functionality
│   └── ...
├── App.js               # Main app component
└── index.js            # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Translation services provided by Google Translate API
- Database and authentication by Supabase
- UI components from Material-UI
- Special thanks to the React community

---

Made with ❤️ for language learners
