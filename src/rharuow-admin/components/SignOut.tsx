import React from "react";
import Lottie from "react-lottie";
import animationData from "./signOutAnimation.json";

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

const SignOutAnimation: React.FC<{
	width?: number;
	height?: number;
	title?: string;
}> = ({ width = 250, height = 250, title = "Logout feto com Sucesso!" }) => {
	return (
		<div className="d-flex justify-content-center align-items-center flex-column">
			<Lottie options={defaultOptions} width={width} height={height} />
			<p className="text-white">{title}</p>
		</div>
	);
};

export default SignOutAnimation;
