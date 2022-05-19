import React from "react";

const SubmitButton = ({ text, isLoading, onClick }) => {
  return (
    <button
      type="submit"
      className="btn"
      disabled={isLoading}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
