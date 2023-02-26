import React from "react";

const Separator: React.FC<{ className?: string; dashed?: boolean }> = ({
	className,
	dashed = false,
}) => {
	return (
		<div
			className={`w-100 border-primary-light ${
				dashed ? " " : "border-bottom"
			} ${className}`}
			style={dashed ? { borderStyle: "dashed", borderWidth: 1 } : {}}
		/>
	);
};

export default Separator;
