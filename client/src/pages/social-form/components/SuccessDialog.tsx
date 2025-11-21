import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Icon,
  IconButton,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { copyToClipboard } from '../../../lib/library.functions';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../store/notificationSlice';

interface SuccessDialogProps {
  applicationNo: string;
  onClose: () => void;
}

export default function SuccessDialog({ onClose, applicationNo }: SuccessDialogProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleCopyApplicationNo = useCallback(async () => {
    try {
      await copyToClipboard(applicationNo);
      dispatch(
        showNotification({ message: 'Application No copied to clipboard.', severity: 'success' }),
      );
    } catch (error) {
      console.error('error while copying');
      dispatch(
        showNotification({ message: 'Error while copying Application No', severity: 'error' }),
      );
    }
  }, [applicationNo]);

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 2,
          }}
        >
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 64,
              color: 'success.main',
              mb: 2,
            }}
          />
          <DialogTitle sx={{ p: 0, mb: 1 }}>{t('form.success')}</DialogTitle>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {t('form.submitMessage')}
          </Typography>
          <Typography
            marginTop={3}
            variant="body2"
            color="text.secondary"
            border={1}
            className="rounded-2xl border-amber-300 text-black"
            padding={1}
            alignItems={'center'}
            textAlign="center"
          >
            {t('form.applicationNo')} <span className="font-bold">{applicationNo}</span>
            <IconButton
              size="small"
              className="ml-3 text-amber-900"
              onClick={handleCopyApplicationNo}
            >
              <Icon>file_copy</Icon>{' '}
            </IconButton>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          {t('buttons.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
