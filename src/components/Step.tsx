import React from "react";

const Step: React.FC<{
	text?: string;
	className?: string;
	height?: number;
	width?: number;
	isCurrent?: boolean;
	isDone?: boolean;
}> = ({
	text = "Entregue",
	className = " ",
	height = 5,
	width = 100,
	isCurrent = false,
	isDone = false,
}) => {
	return (
		<div className={`step${isCurrent ? "-current" : " "} ${className}`}>
			<p className="fs-6 text-white mb-0">{text}</p>
			<div className="step-content">
				<div
					className={`step-content-bar ${
						isDone ? "bg-success" : "bg-secondary"
					} overflow-hidden w-${width} h-${height}px rounded`}
				>
					<div className="h-100 content-bar-fill"></div>
				</div>
			</div>
		</div>
	);
};

export default Step;
