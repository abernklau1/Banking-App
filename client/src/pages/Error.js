import React from "react";

const Error = () => {
  return (
    <div>
      <img className="not-found" src="/404.svg" alt="Not Found" />
      <h2 className="error-heading">Page Not Found</h2>
      <p className="error-text">
        We can't seem to find the page you're looking for
      </p>
      <a className="error-link" href="/">
        Return Home
      </a>
    </div>
  );
};

export default Error;
