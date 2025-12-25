import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

/**
 * Custom hook for theme management
 * Persists theme preference in localStorage
 * Applies theme class to document element for Tailwind dark mode
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('xfuse_theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Default to dark theme
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;

    // Remove both classes first
    root.classList.remove('light', 'dark');

    // Add current theme class
    root.classList.add(theme);

    // Save to localStorage
    localStorage.setItem('xfuse_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return { theme, toggleTheme, setTheme, isDark: theme === 'dark' };
}
