import React from "react";

const Loader = ({ text = "Loading ...", hideText = false }) => {
  return (
    <div className="content-loader">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      {!hideText && (
        <p className="loading-text" title={text}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
