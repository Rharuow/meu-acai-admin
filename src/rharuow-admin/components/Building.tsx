import React from "react";
import Lottie from "lottie-react";
import animationData from "./build.json";

const Building: React.FC<{
  width?: number;
  height?: number;
  title?: string;
}> = ({ width = 400, height = 400, title = "Em construção" }) => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <Lottie animationData={animationData} width={width} height={height} />
      <p className="text-white">{title}</p>
    </div>
  );
};

export default Building;
