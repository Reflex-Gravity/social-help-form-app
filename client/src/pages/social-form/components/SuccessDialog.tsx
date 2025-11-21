import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from 'react-i18next';

interface SuccessDialogProps {
  applicationNo: string;
  onClose: () => void;
}

export default function SuccessDialog({ onClose, applicationNo }: SuccessDialogProps) {
  const { t } = useTranslation();
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
            fontWeight={700}
            variant="body2"
            color="text.secondary"
            textAlign="center"
          >
            {t('form.applicationNo')} {applicationNo}
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
