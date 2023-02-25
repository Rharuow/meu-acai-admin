import React from "react";
import ReactLoading, { LoadingType } from "react-loading";

function ReactLoadingComponent({
  color = "#0275d8",
  type = "spinningBubbles",
  height = 25,
  width = 25,
  size,
}: {
  color?: string;
  type?: LoadingType;
  height?: number;
  width?: number;
  size?: number;
}) {
  return (
    <ReactLoading
      type={type}
      color={color}
      height={size ? size : height}
      width={size ? size : width}
    />
  );
}

export default ReactLoadingComponent;
