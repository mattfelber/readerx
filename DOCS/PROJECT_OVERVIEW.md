# 📖 readerX Project Overview

## 🎯 Big Picture

**readerX** (branded as "Tradux" in the UI) is an **interactive language learning web application** built with React that helps users read and comprehend texts in foreign languages. The core concept is to provide instant, contextual translations while reading, combined with a personal vocabulary management system.

### Key Value Proposition
- **Interactive Reading**: Click any word or select phrases for instant translations
- **Vocabulary Building**: Save interesting words with translations for later review
- **Progress Tracking**: Mark words as memorized to track learning progress
- **Multi-language Support**: Supports 10+ languages with Google Translate API integration

## 🏗️ Technical Architecture

### **Frontend Stack**
- **React 19** with functional components and hooks
- **Material-UI v6** for modern, responsive UI components
- **React Router v7** for client-side routing
- **Emotion** for CSS-in-JS styling

### **Backend & Services**
- **Supabase** for authentication and database (PostgreSQL)
- **Google Translate API** for real-time translations
- **GitHub Pages** deployment pipeline

### **Key Features Implementation**
- **Theme System**: Dark/light mode with system preference detection
- **Authentication**: Supabase-based user management with protected routes
- **File Upload**: Drag-and-drop text file processing
- **Real-time Translation**: Instant word/phrase translation with smart positioning
- **Vocabulary Management**: CRUD operations for saved words with search/filter

## 📁 Project Structure

```
readerX/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── TextReader.js   # Core reading interface
│   │   ├── SavedWords.js   # Vocabulary management
│   │   ├── Dashboard.js    # Main app layout
│   │   ├── Login.js        # Authentication
│   │   └── ThemeToggle.js  # Theme switching
│   ├── contexts/
│   │   └── ThemeContext.js # Global theme management
│   ├── services/
│   │   └── translationService.js # Google Translate API
│   ├── App.js              # Main app component & routing
│   └── supabaseClient.js   # Database configuration
├── .env                    # Environment variables
└── package.json           # Dependencies & scripts
```

## 🔧 Functional Details

### **Core Components**

1. **TextReader.js** (~400 lines)
   - File upload with drag-and-drop
   - Smart word selection and phrase detection
   - Real-time translation with popup positioning
   - Language selection (source/target)
   - Integration with vocabulary saving

2. **SavedWords.js** (~400 lines)
   - Comprehensive vocabulary library
   - Search and filter functionality
   - Edit/delete word management
   - Progress tracking (memorized vs. learning)
   - Statistics dashboard

3. **Dashboard.js**
   - Navigation sidebar with routing
   - Responsive layout management
   - User session handling

### **Key Services**

1. **Translation Service**
   - Google Translate API integration
   - Error handling and retry logic
   - Context-aware translation (word vs. phrase)

2. **Supabase Integration**
   - User authentication
   - Saved words CRUD operations
   - Real-time data synchronization

### **Theme System**
- Material-UI theme provider
- CSS custom properties for smooth transitions
- localStorage persistence
- System preference detection

## 🚀 Development Workflow

### **Getting Started**
1. Clone repository
2. Install dependencies: `npm install`
3. Set up environment variables (.env)
4. Start development server: `npm start`
5. Access at http://localhost:3000

### **Key Dependencies**
- **@mui/material**: UI component library
- **@supabase/supabase-js**: Backend integration
- **react-router-dom**: Client-side routing
- **axios**: HTTP requests for translation API

### **Environment Configuration**
- `REACT_APP_SUPABASE_URL`: Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY`: Supabase anonymous key
- `REACT_APP_GOOGLE_TRANSLATE_API_KEY`: Google Translate API key

## 🎨 User Experience Flow

1. **Authentication**: User logs in via Supabase auth
2. **File Upload**: Drag-and-drop or select text file
3. **Reading Mode**: Text displayed with clickable words
4. **Translation**: Click word → popup with translation
5. **Save Words**: Save interesting words to personal library
6. **Review**: Access saved words for study and progress tracking

## 📊 Key Metrics & Features

- **Languages Supported**: 10+ (German, English, Spanish, French, etc.)
- **File Formats**: Plain text (.txt)
- **Translation Speed**: Real-time (< 1 second)
- **Vocabulary Capacity**: Unlimited saved words per user
- **Responsive Design**: Works on desktop, tablet, mobile

---

*This document provides a comprehensive overview for developer onboarding and project understanding.*
