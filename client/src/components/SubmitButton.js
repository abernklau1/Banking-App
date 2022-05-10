import React from "react";

const SubmitButton = ({ text, isLoading }) => {
  return (
    <button type="submit" className="btn" disabled={isLoading}>
      {text}
    </button>
  );
};

export default SubmitButton;
