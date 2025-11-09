import React, { useCallback, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize,
  Box,
  CircularProgress,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FormTextareaInput from '../../../components/FormTextAreaInput';
import { generateDescription } from '../api/socialform.api';

/**
 * @param {{
 *   label: string,
 *   name: string,
 *   placeholder?: string,
 *   minRows?: number,
 *   maxRows?: number,
 *   onGenerateAI: () => Promise<string>,
 *   textareaProps?: React.ComponentProps<typeof TextareaAutosize>
 * }} props
 */
function FormTextareaWithAI({ label, name, placeholder, minRows, maxRows, textareaProps }) {
  const [open, setOpen] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { setValue } = useFormContext();

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    try {
      const content = await generateDescription({ field: label });
      setGeneratedContent(content);
      setEditedContent(content);
      setOpen(true);
    } catch (error) {
      console.error('AI generation failed:', error);
    } finally {
      setLoading(false);
    }
  }, [label]);

  const handleAccept = () => {
    setValue(name, editedContent, { shouldValidate: true, shouldDirty: true });
    setOpen(false);
  };

  const handleDiscard = () => {
    setOpen(false);
    setGeneratedContent('');
    setEditedContent('');
  };

  return (
    <>
      <FormTextareaInput
        label={label}
        name={name}
        placeholder={placeholder}
        minRows={minRows}
        aiButton={
          <Button
            variant="text"
            className=" text-purple-800 border-0 mb-2 hover:bg-purple-50"
            startIcon={loading ? <CircularProgress size={16} /> : <AutoAwesomeIcon />}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Help Me Write'}
          </Button>
        }
        maxRows={maxRows}
        textareaProps={textareaProps}
      />

      <Dialog open={open} onClose={handleDiscard} maxWidth="md" fullWidth>
        <DialogTitle>AI Generated Content</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            minRows={8}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              borderRadius: '4px',
              border: '1px solid rgba(0, 0, 0, 0.23)',
              outline: 'none',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiscard} color="error">
            Discard
          </Button>
          <Button onClick={() => setEditedContent(generatedContent)} variant="outlined">
            Reset to Original
          </Button>
          <Button onClick={handleAccept} variant="contained">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormTextareaWithAI;
