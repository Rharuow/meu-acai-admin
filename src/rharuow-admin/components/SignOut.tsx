import React from "react";
import Lottie from "lottie-react";
import animationData from "./signOutAnimation.json";

const SignOutAnimation: React.FC<{
  width?: number;
  height?: number;
  title?: string;
}> = ({ width = 250, height = 250, title = "Logout feto com Sucesso!" }) => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <Lottie animationData={animationData} width={width} height={height} />
      <p className="text-white">{title}</p>
    </div>
  );
};

export default SignOutAnimation;
