import { useEffect, useState } from 'react';

const useDarkMode = () => {
  // Always start in light mode (false)
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Force remove dark class on mount
    document.documentElement.classList.remove('dark');
  }, []);

  useEffect(() => {
    // Apply or remove dark class to document element
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
