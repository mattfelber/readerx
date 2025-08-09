import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch,
  CircularProgress,
  InputAdornment,
  Fab,
  Tooltip
} from '@mui/material';
// Using Unicode symbols instead of MUI icons for compatibility
import { supabase } from '../supabaseClient';

export default function SavedWords() {
  const [words, setWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMemorizedOnly, setShowMemorizedOnly] = useState(false);
  const [editDialog, setEditDialog] = useState({ open: false, word: null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, word: null });
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchWords();
    }
  }, [user]);

  useEffect(() => {
    filterWords();
  }, [words, searchTerm, showMemorizedOnly]);

  const initializeUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchWords = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_words')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWords(data || []);
    } catch (error) {
      console.error('Error fetching words:', error);
      setFeedback({ open: true, message: 'Error loading saved words', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filterWords = () => {
    let filtered = words;

    if (searchTerm) {
      filtered = filtered.filter(word =>
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showMemorizedOnly) {
      filtered = filtered.filter(word => word.is_memorized);
    }

    setFilteredWords(filtered);
  };

  const toggleMemorized = async (wordId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('user_words')
        .update({ is_memorized: !currentStatus })
        .eq('id', wordId);

      if (error) throw error;

      setWords(words.map(word =>
        word.id === wordId ? { ...word, is_memorized: !currentStatus } : word
      ));

      setFeedback({
        open: true,
        message: !currentStatus ? 'Word marked as memorized!' : 'Word unmarked as memorized',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating word:', error);
      setFeedback({ open: true, message: 'Error updating word', severity: 'error' });
    }
  };

  const handleEdit = async () => {
    try {
      const { error } = await supabase
        .from('user_words')
        .update({
          word: editDialog.word.word,
          translation: editDialog.word.translation,
          source_lang: editDialog.word.source_lang,
          target_lang: editDialog.word.target_lang
        })
        .eq('id', editDialog.word.id);

      if (error) throw error;

      setWords(words.map(word =>
        word.id === editDialog.word.id ? editDialog.word : word
      ));

      setEditDialog({ open: false, word: null });
      setFeedback({ open: true, message: 'Word updated successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error updating word:', error);
      setFeedback({ open: true, message: 'Error updating word', severity: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('user_words')
        .delete()
        .eq('id', deleteDialog.word.id);

      if (error) throw error;

      setWords(words.filter(word => word.id !== deleteDialog.word.id));
      setDeleteDialog({ open: false, word: null });
      setFeedback({ open: true, message: 'Word deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error deleting word:', error);
      setFeedback({ open: true, message: 'Error deleting word', severity: 'error' });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        My Saved Words
      </Typography>

      {/* Search and Filter Controls */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search words or translations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    🔍
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={showMemorizedOnly}
                  onChange={(e) => setShowMemorizedOnly(e.target.checked)}
                />
              }
              label="Show memorized only"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Stats */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Total words: {words.length} | Memorized: {words.filter(w => w.is_memorized).length} | 
          Showing: {filteredWords.length}
        </Typography>
      </Box>

      {/* Words Grid */}
      {filteredWords.length === 0 ? (
        <Box textAlign="center" sx={{ py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {words.length === 0 ? 'No saved words yet' : 'No words match your search'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {words.length === 0 ? 'Start reading and save words to see them here!' : 'Try adjusting your search or filters'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredWords.map((word) => (
            <Grid item xs={12} sm={6} md={4} key={word.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  position: 'relative',
                  '&:hover': { boxShadow: 4 }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {word.word}
                    </Typography>
                    <Tooltip title={word.is_memorized ? 'Mark as not memorized' : 'Mark as memorized'}>
                      <IconButton
                        size="small"
                        onClick={() => toggleMemorized(word.id, word.is_memorized)}
                        color={word.is_memorized ? 'primary' : 'default'}
                      >
                        {word.is_memorized ? '⭐' : '☆'}
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {word.translation}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    {word.source_lang && (
                      <Chip label={word.source_lang.toUpperCase()} size="small" variant="outlined" />
                    )}
                    {word.target_lang && (
                      <Chip label={word.target_lang.toUpperCase()} size="small" variant="outlined" />
                    )}
                    {word.is_memorized && (
                      <Chip label="Memorized" size="small" color="primary" />
                    )}
                  </Box>

                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                    Saved on {formatDate(word.created_at)}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => setEditDialog({ open: true, word: { ...word } })}
                    >
                      ✏️
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDeleteDialog({ open: true, word })}
                      color="error"
                    >
                      🗑️
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, word: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Word</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Word"
            value={editDialog.word?.word || ''}
            onChange={(e) => setEditDialog({
              ...editDialog,
              word: { ...editDialog.word, word: e.target.value }
            })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Translation"
            value={editDialog.word?.translation || ''}
            onChange={(e) => setEditDialog({
              ...editDialog,
              word: { ...editDialog.word, translation: e.target.value }
            })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Source Language"
            value={editDialog.word?.source_lang || ''}
            onChange={(e) => setEditDialog({
              ...editDialog,
              word: { ...editDialog.word, source_lang: e.target.value }
            })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Target Language"
            value={editDialog.word?.target_lang || ''}
            onChange={(e) => setEditDialog({
              ...editDialog,
              word: { ...editDialog.word, target_lang: e.target.value }
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, word: null })}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, word: null })}>
        <DialogTitle>Delete Word</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{deleteDialog.word?.word}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, word: null })}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Snackbar */}
      <Snackbar
        open={feedback.open}
        autoHideDuration={4000}
        onClose={() => setFeedback({ ...feedback, open: false })}
      >
        <Alert severity={feedback.severity} onClose={() => setFeedback({ ...feedback, open: false })}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
