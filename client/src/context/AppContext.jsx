import { useMemo, useState } from 'react';
import { AppContext } from './context.js';

export default function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const appName = 'Form App';

  const value = useMemo(() => ({ loading, setLoading, appName }), [loading]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
