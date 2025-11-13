import { useEffect } from 'react';

/**
 *
 * useFormPersist - Custom Hook to save formdata to localStorage
 *
 * @param {string} key
 * @param {import('react-hook-form').UseFormWatch} watch
 * @param {setValue} setValue
 */
export const useFormPersist = (key, watch, setValue) => {
  useEffect(() => {
    const saved = localStorage.getItem(key);

    // per-fill saved form data
    if (saved) {
      const savedData = JSON.parse(saved);
      Object.keys(savedData).forEach((field) => setValue(field, savedData[field]));
    }
  }, [key, setValue]);

  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem(key, JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [key, watch]);
};
