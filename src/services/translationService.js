import axios from 'axios';

/**
 * Translates text using Google Translate API
 * @param {string} text - The text to translate
 * @param {string} sourceLanguage - Source language code (default: 'de' for German)
 * @param {string} targetLanguage - Target language code (default: 'en' for English)
 * @returns {Promise<string>} - The translated text
 */
const translateText = async (text, sourceLanguage = 'de', targetLanguage = 'en') => {
    // Debug: Check if API key is available
    const apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
    console.log('API Key available:', !!apiKey);
    console.log('API Key length:', apiKey?.length);
    console.log('API Key first 10 chars:', apiKey?.substring(0, 10));
    console.log('All env vars starting with REACT_APP_:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')));
    
    if (!apiKey) {
        console.error('ERROR: No API key found! Make sure REACT_APP_GOOGLE_TRANSLATE_API_KEY is set in .env');
        return 'No API key configured';
    }

    // Google Translate API endpoint
    const url = 'https://translation.googleapis.com/language/translate/v2';
    
    const params = {
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        key: apiKey
    };

    try {
        console.log('Attempting to translate:', text);
        const response = await axios.post(url, null, { params });
        console.log('Translation response:', response.data);
        
        if (response.data && 
            response.data.data && 
            response.data.data.translations && 
            response.data.data.translations[0]) {
            return response.data.data.translations[0].translatedText;
        } else {
            console.error('Unexpected response structure:', response.data);
            return 'Translation error: Unexpected response';
        }
    } catch (error) {
        console.error('Translation error details:');
        console.error('Status:', error.response?.status);
        console.error('Status Text:', error.response?.statusText);
        console.error('Error Data:', error.response?.data);
        console.error('Full Error:', error);
        
        if (error.response?.status === 403) {
            console.error('403 Forbidden - Possible issues:');
            console.error('1. Invalid API key');
            console.error('2. API key not enabled for Translate API');
            console.error('3. Billing not set up');
            console.error('4. Request quota exceeded');
        }
        
        return 'Translation error occurred';
    }
};

export { translateText };

