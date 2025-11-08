import React, { Suspense } from 'react';

function SuspenseWrapper({ children }) {
  return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
}

export default SuspenseWrapper;
