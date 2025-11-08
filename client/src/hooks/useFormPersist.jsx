import { useEffect } from 'react';

export const useFormPersist = (key, watch, setValue) => {
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      const data = JSON.parse(saved);
      Object.keys(data).forEach((field) => setValue(field, data[field]));
    }
  }, [key, setValue]);

  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem(key, JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [key, watch]);
};
