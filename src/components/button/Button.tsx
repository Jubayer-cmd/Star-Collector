import React from "react";
import { ButtonConfig } from "../../types/button";

interface ButtonProps {
    config: ButtonConfig;
    handleClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ config, handleClick }) => {
    return (
        <button
            onClick={handleClick}
            style={{
                position: "absolute",
                color: config.buttonStyle.color,
                backgroundColor: config.buttonStyle.backgroundColor,
                top: config.buttonStyle.top,
                left: config.buttonStyle.left,
                width: config.buttonStyle.width,
                height: config.buttonStyle.height,
                borderRadius: config.buttonStyle.borderRadius,
                fontSize: config.buttonStyle.fontSize,
                transform: "translate(-50%, -50%)",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
        >
            {config.buttonText}
        </button>
    );
};

export default Button;

