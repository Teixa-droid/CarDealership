import React from "react";
import { useDarkMode } from "context/darkMode";


const TriggerDarkMode = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => {
        setDarkMode(!darkMode);
      }}
    >
      {darkMode ? "Desactive" : "Active"} dark mode
    </button>
  );
};

export default TriggerDarkMode;
