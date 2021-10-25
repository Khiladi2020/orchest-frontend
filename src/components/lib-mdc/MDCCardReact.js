import React from "react";

const MDCCardReact = ({ children, className, style }) => {
  return (
    <div className={`mdc-card ${className}`} style={style}>
      {children}
    </div>
  );
};

export { MDCCardReact };
