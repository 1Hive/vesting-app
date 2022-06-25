import { useEffect, useState } from 'react';
import { useEthersContext } from 'eth-hooks/context';
import { useThemeSwitcher } from 'react-css-theme-switcher';

const initialTheme = window.localStorage.getItem('theme') ?? 'light';

export const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === 'dark');
  const { switcher, currentTheme, status, themes } = useThemeSwitcher();
  const ethersContext = useEthersContext();

  useEffect(() => {
    window.localStorage.setItem('theme', currentTheme ?? '');
    if (currentTheme === 'light' || currentTheme === 'dark') {
      ethersContext?.setModalTheme?.(currentTheme);
    }
  }, [currentTheme, ethersContext]);

  const toggleTheme = (isChecked: boolean): void => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
    ethersContext?.setModalTheme?.(isDarkMode ? 'dark' : 'light');
  };

  if (status === 'loading' || status === 'idle') {
    return null;
  }

  return (
    <div className="text-xl text-center text-black" onClick={() => toggleTheme(currentTheme === 'dark')}>
      {currentTheme === 'light' ? '☀️' : '🌜'}
    </div>
  );
};
