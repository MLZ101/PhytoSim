import React from "react";
import "./bar.css";

const Bar = ({ level, color }) => {
  return (
    <div className="bar-body">
      <div style={{ height: level, backgroundColor: color, borderTop:"rgba(0, 0, 0, 0.534) solid 1px"}}></div>
    </div>
  );
};

export default Bar;
