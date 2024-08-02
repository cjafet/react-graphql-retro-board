import React, { useContext } from "react";
import { SketchPicker } from "react-color";
import { ThemeContext } from "./context/ThemeContext";
import Timer from "./Timer";

const Settings = () => {
  const {
    themeColor,
    handleColorSelection,
    timerColor,
    handleColorTimerSelection,
  } = useContext(ThemeContext);
  console.log(themeColor, timerColor);

  const handleChangeComplete = (color) => {
    console.log("Handling color change to:", color.hex);
    handleColorSelection(color.hex);
  };

  const handleTimerChangeComplete = (color) => {
    console.log("Handling timer color change to:", color.hex);
    handleColorTimerSelection(color.hex);
  };

  return (
    <div className="settings">
      <div style={{ padding: "10px" }}>
        <p>Theme Color</p>
        <SketchPicker
          color={themeColor}
          onChangeComplete={handleChangeComplete}
        />
      </div>
      <div style={{ padding: "10px" }}>
        <p>Timer Color</p>
        <SketchPicker
          color={themeColor}
          onChangeComplete={handleTimerChangeComplete}
        />
      </div>
      <Timer></Timer>
    </div>
  );
};

export default Settings;
