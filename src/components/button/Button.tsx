import React from "react";
import { buttonConfig } from "../../config/button-config";

interface ButtonProps {
    config: typeof buttonConfig;
    handleClick: () => void;
}

export default function Button({ config, handleClick }: ButtonProps) {
    return (
        <button
            className="button"
            onClick={handleClick}
            style={config.buttonStyle}
        >
            {config.buttonText}
        </button>
    );
}
