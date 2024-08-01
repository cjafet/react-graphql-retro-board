import React, { useState, useEffect } from "react";

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(300);

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
    <div className="timer">
      <div className="time">
        {elapsedTime >= 0 ? formatTime(elapsedTime) : formatTime(300)}
      </div>
      <div className="controls">
        <button
          className="btn-timer btn btn-small"
          onClick={() => setIsRunning((prevValue) => !prevValue)}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="btn-timer btn btn-small"
          onClick={() => setElapsedTime(300)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
