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
  Typography,
  Tooltip,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FormTextareaInput from '../../../components/FormTextAreaInput';
import { generateDescription } from '../api/socialform.api';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';

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
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { setValue } = useFormContext();

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    try {
      const content = await generateDescription({ field: label, lang: i18n.language });
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
          <Tooltip title={t('form.smartHelpTooltip')}>
            <Button
              variant="text"
              className=" text-amber-800 text-[12px] border-0 mb-1"
              startIcon={
                loading ? (
                  <CircularProgress size={16} />
                ) : (
                  <AutoAwesomeIcon className="text-amber-600 text-[12px]" />
                )
              }
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? t('form.generating') : t('form.helpMeWrite')}
            </Button>
          </Tooltip>
        }
        maxRows={maxRows}
        textareaProps={textareaProps}
      />

      <Dialog open={open} onClose={handleDiscard} maxWidth="md" fullWidth>
        <DialogTitle>{label}</DialogTitle>
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
            {t('form.discard')}
          </Button>
          <Button onClick={handleAccept} variant="contained">
            {t('form.accept')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormTextareaWithAI;
