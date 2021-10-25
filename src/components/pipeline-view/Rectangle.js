import React from "react";

const getStepSelectorRectangle = (stepSelector) => {
  return {
    x: Math.min(stepSelector.x1, stepSelector.x2),
    y: Math.min(stepSelector.y1, stepSelector.y2),
    width: Math.abs(stepSelector.x2 - stepSelector.x1),
    height: Math.abs(stepSelector.y2 - stepSelector.y1),
  };
};

const Rectangle = ({
  width,
  height,
  x,
  y,
}) => {
  return (
    <div
      className="step-selector"
      style={{
        width: width,
        height: height,
        left: x,
        top: y,
      }}
    ></div>
  );
};

export { getStepSelectorRectangle, Rectangle };
