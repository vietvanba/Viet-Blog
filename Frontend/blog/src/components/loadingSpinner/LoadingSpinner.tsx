import React from "react";
import "./loadingSpinner.scss";

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Please wait",
}) => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">{text}</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
