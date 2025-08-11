# 🚀 Installation Guide

## Prerequisites

Before setting up readerX, ensure you have the following installed:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** for version control
- A **Google Cloud Platform** account for Translate API
- A **Supabase** account for backend services

## 📦 Quick Setup

### 1. Clone the Repository
```bash
git clone https://github.com/mattfelber/readerx.git
cd readerx
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
```

### 4. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🔧 Detailed Setup Instructions

### Supabase Backend Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Database Setup**
   - Navigate to SQL Editor in Supabase dashboard
   - Create the `saved_words` table:
   ```sql
   CREATE TABLE saved_words (
     id SERIAL PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     word TEXT NOT NULL,
     translation TEXT NOT NULL,
     source_language TEXT NOT NULL,
     target_language TEXT NOT NULL,
     memorized BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **Row Level Security**
   - Enable RLS on the `saved_words` table
   - Add policy for users to access only their own words:
   ```sql
   ALTER TABLE saved_words ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Users can view own words" ON saved_words
     FOR SELECT USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can insert own words" ON saved_words
     FOR INSERT WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can update own words" ON saved_words
     FOR UPDATE USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can delete own words" ON saved_words
     FOR DELETE USING (auth.uid() = user_id);
   ```

### Google Translate API Setup

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one

2. **Enable Translate API**
   - Navigate to APIs & Services > Library
   - Search for "Cloud Translation API"
   - Click "Enable"

3. **Create API Key**
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "API Key"
   - Copy the API key to your `.env` file

4. **Restrict API Key (Recommended)**
   - Click on your API key to edit
   - Under "API restrictions", select "Restrict key"
   - Choose "Cloud Translation API"

## 🛠️ Development Environment

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run deploy     # Deploy to GitHub Pages
```

## 🔍 Verification

After setup, verify everything works:

1. **Authentication**: Try logging in/signing up
2. **File Upload**: Upload a text file
3. **Translation**: Click on words to see translations
4. **Save Words**: Save a word and check it appears in Saved Words
5. **Theme Toggle**: Switch between light/dark modes

## 🐛 Common Issues

### Node.js Version Issues
```bash
# Check Node version
node --version

# If using nvm, switch to compatible version
nvm use 16
```

### Supabase Connection Issues
- Verify URL and keys in `.env`
- Check Supabase project status
- Ensure RLS policies are correctly set

### Translation API Issues
- Verify API key is correct
- Check Google Cloud billing is enabled
- Ensure Translation API is enabled

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Production Deployment

### GitHub Pages Deployment
```bash
npm run deploy
```

### Environment Variables for Production
Ensure all environment variables are properly set in your deployment platform.

---

**Need help?** Check the [Troubleshooting Guide](./TROUBLESHOOTING.md) or open an issue on GitHub.
