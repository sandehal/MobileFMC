// ThemeContext.js

import React, { createContext, useState, useContext } from 'react';
import { dayTheme, nightTheme } from './Styles/colors'

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(dayTheme);
  const [isDayTheme, setIsDayTheme] = useState(true);

  const toggleTheme = (selectedTheme) => {
    setTheme((prevTheme) => (isDayTheme ? nightTheme : dayTheme));
    setIsDayTheme(!isDayTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
