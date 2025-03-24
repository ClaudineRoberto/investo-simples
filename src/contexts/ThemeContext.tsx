
import React, { createContext, useContext, useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";

type ThemeType = "light" | "dark";
type ColorType = "blue" | "purple" | "green" | "red" | "orange" | "pink";

interface ThemeContextProps {
  theme: ThemeType;
  primaryColor: ColorType;
  toggleTheme: () => void;
  setPrimaryColor: (color: ColorType) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  primaryColor: "blue",
  toggleTheme: () => {},
  setPrimaryColor: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");
  const [primaryColor, setPrimaryColor] = useState<ColorType>("blue");

  // Initialize theme from user preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeType;
    const savedColor = localStorage.getItem("primaryColor") as ColorType;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(isDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDark);
    }

    if (savedColor) {
      setPrimaryColor(savedColor);
      document.documentElement.setAttribute("data-color", savedColor);
    } else {
      document.documentElement.setAttribute("data-color", "blue");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const handleSetPrimaryColor = (color: ColorType) => {
    setPrimaryColor(color);
    document.documentElement.setAttribute("data-color", color);
    localStorage.setItem("primaryColor", color);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        primaryColor, 
        toggleTheme, 
        setPrimaryColor: handleSetPrimaryColor 
      }}
    >
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
