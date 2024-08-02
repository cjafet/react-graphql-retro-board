import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(300);
  const { timerColor, themeColor } = useContext(ThemeContext);

  useEffect(() => {
    let id;
    if (isRunning) {
      id = setInterval(
        () =>
          setElapsedTime((prevState) => {
            if (prevState >= 1) {
              console.log(prevState);
              return prevState - 1;
            } else {
              setIsRunning(false);
              setElapsedTime(300);
            }
          }),
        1000
      );
    }
    return () => clearInterval(id);
  }, [isRunning]); // Empty array, only runs after the first render

  const formatTime = (time) => {
    var date = new Date(0);
    date.setSeconds(time); // time in SECONDS
    var timeString = date.toISOString().substring(14, 19);
    return timeString;
  };

  return (
    <div className="timer" style={{ backgroundColor: timerColor }}>
      <div className="time">
        {elapsedTime >= 0 ? formatTime(elapsedTime) : formatTime(300)}
      </div>
      <div className="controls">
        <button
          className="btn-timer btn btn-small"
          style={{ backgroundColor: themeColor }}
          onClick={() => setIsRunning((prevValue) => !prevValue)}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="btn-timer btn btn-small"
          style={{ backgroundColor: themeColor }}
          onClick={() => setElapsedTime(300)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
