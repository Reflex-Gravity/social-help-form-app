import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <Box
      className="bg-gray-50"
      sx={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        margin: 'auto',
        maxWidth: '1550px',
      }}
    >
      <Outlet />
    </Box>
  );
}
