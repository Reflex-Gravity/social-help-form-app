import { CircularProgress } from '@mui/material';
import { Suspense } from 'react';

function SuspenseWrapper({ children }) {
  return (
    <Suspense
      fallback={
        <CircularProgress
          variant="indeterminate"
          disableShrink
          enableTrackSlot
          size={40}
          thickness={4}
          className="fixed flex flex-col items-center m-auto top-0 bottom-0 right-0 left-0 z-99999"
        />
      }
    >
      {children}
    </Suspense>
  );
}

export default SuspenseWrapper;
