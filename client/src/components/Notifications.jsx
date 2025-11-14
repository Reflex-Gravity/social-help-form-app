import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { useSelector } from 'react-redux';
import { removeNotification } from '../store/notificationSlice';
import store from '../store/store';

// for perf optimization, defined outside.
const handleClose = (id) => (event, reason) => {
  if (reason === 'clickaway') return;
  store.dispatch(removeNotification(id));
};

/**
 * Notification Center
 * @returns
 */
export default function Notifications() {
  const notifications = useSelector((state) => state.notificationCenter.notifications);

  return (
    <>
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.duration}
          onClose={handleClose(notification.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          style={{ bottom: `${24 + index * 70}px` }}
        >
          <Alert
            onClose={handleClose(notification.id)}
            severity={notification.severity}
            variant="standard"
          >
            {notification.title ? <AlertTitle>{notification.title}</AlertTitle> : null}
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
