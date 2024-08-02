import React, { useState } from "react";

// Craetes a context and returns a Consumer/Provider object
export const ThemeContext = React.createContext();

export const Provider = (props) => {
  const [themeColor, setThemeColor] = useState("#ed143d");
  const [timerColor, setTimerColor] = useState("#8e1d1d");

  const handleColorSelection = (bgColor) => {
    setThemeColor(bgColor);
    console.log("selectedColor", bgColor);
    console.log("themeColor", themeColor);
  };

  const handleColorTimerSelection = (bgColor) => {
    setTimerColor(bgColor);
    console.log("selectedColor", bgColor);
    console.log("timerColor", themeColor);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        handleColorSelection,
        timerColor,
        handleColorTimerSelection,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
