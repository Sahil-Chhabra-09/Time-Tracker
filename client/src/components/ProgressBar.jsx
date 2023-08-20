import React from "react";

const ProgressBar = ({ completed, total }) => {
  const progressPercentage = (completed / total) * 100;

  const progressBarStyle = {
    width: `${progressPercentage}%`,
    height: "10px", // Adjust height as needed
    backgroundColor: "green", // Change color as needed
    transition: "width 0.5s ease-in-out", // Add a smooth transition
  };

  return (
    <div>
      <div
        style={{ width: "100%", height: "10px", backgroundColor: "lightgray" }}
      >
        <div style={progressBarStyle}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
