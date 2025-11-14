import React, { useCallback, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize,
  CircularProgress,
  Tooltip,
  Stack,
  Icon,
} from '@mui/material';
import { useController } from 'react-hook-form';
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

function FormTextareaWithAI({ label, name, placeholder, minRows, maxRows = 4, textareaProps }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    field: { onChange, value },
  } = useController({ name });

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    try {
      const content = await generateDescription({
        userPrompt: open ? editedContent : value, // incase popup is open considered editedContent, else form field
        field: label,
        lang: i18n.language,
      });
      setEditedContent(content);
      setOpen(true);
    } catch (error) {
      console.error('AI generation failed:', error);
    } finally {
      setLoading(false);
    }
  }, [editedContent, label, open, value]);

  const handleAccept = useCallback(() => {
    onChange(editedContent);
    setOpen(false);
  }, [editedContent, onChange]);

  const handleDiscard = () => {
    setOpen(false);
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
        <DialogActions className="justify-between">
          <Button
            className="self-start"
            variant="outlined"
            onClick={handleGenerate}
            disabled={loading}
            color="warning"
            startIcon={
              <Icon className={`text-yellow-600 ${loading ? 'animate-spin' : ''}`}>autorenew</Icon>
            }
          >
            {loading ? t('form.generating') : t('form.regenerate')}
          </Button>
          <Stack flexDirection={'row'}>
            <Button onClick={handleDiscard} color="error">
              {t('form.discard')}
            </Button>
            <Button onClick={handleAccept} variant="contained">
              {t('form.accept')}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormTextareaWithAI;
