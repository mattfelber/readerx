import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import { supabase } from '../supabaseClient';

export default function SaveWordButton({ userId, word, translation, sourceLang, targetLang }) {
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });

  const handleSave = async () => {
    if (!userId) {
      setFeedback({ open: true, message: 'Please log in to save words', severity: 'error' });
      return;
    }
    if (!word || !translation) {
      setFeedback({ open: true, message: 'No word or translation to save', severity: 'warning' });
      return;
    }

    setSaving(true);
    
    try {
      const { data: existingWords, error: queryError } = await supabase
        .from('user_words')
        .select('*')
        .eq('user_id', userId)
        .eq('word', word)
        .eq('source_lang', sourceLang);

      if (queryError) throw queryError;

      if (existingWords && existingWords.length > 0) {
        setFeedback({ open: true, message: '✏️ Word already saved', severity: 'info' });
        return;
      }
    // Insert new word
      const { error } = await supabase.from('user_words').insert({
        user_id: userId,
        word: word,
        translation: translation,
        source_lang: sourceLang,
        target_lang: targetLang,
        is_memorized: false,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      setFeedback({ open: true, message: '✅ Word saved successfully!', severity: 'success' });
    } catch (err) {
      console.error('Save error:', err);
      setFeedback({ 
        open: true, 
        message: err.message || '❌ Failed to save word', 
        severity: 'error' 
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={saving}
        sx={{ 
          mt: 1,
          '&:hover': {
            backgroundColor: 'primary.dark',
          }
        }}
        startIcon={saving ? null : '💾'}
      >
        {saving ? 'Saving...' : 'Save word'}
      </Button>
      
      <Snackbar
        open={feedback.open}
        autoHideDuration={4000}
        onClose={() => setFeedback(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={feedback.severity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}