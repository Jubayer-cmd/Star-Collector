import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import Button from "./components/button/Button";
import { resetGameState } from "./state/state";
import { config } from "./config/config";
import { buttonConfig } from "./config/button-config";

export default function App() {
    const gameRef = useRef<Phaser.Game | null>(null);
    const [showButton, setShowButton] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);

    const startGame = () => {
        setShowButton(false);
        if (gameRef.current) {
            gameRef.current.destroy(true);
            gameRef.current = null;
        }
        resetGameState();
        gameRef.current = new Phaser.Game(config);
    };

    useEffect(() => {
        const handleGameOver = (event: MessageEvent) => {
            if (event.data.type === "OVER") {
                setShowButton(true);
                setIsGameOver(true);
            }
        };

        window.addEventListener("message", handleGameOver);
        return () => {
            window.removeEventListener("message", handleGameOver);
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    return (
        <div id="game-container" style={{ width: "100%", height: "100%" }}>
            {showButton && (
                <Button
                    config={{
                        ...buttonConfig,
                        buttonText: isGameOver ? "Play Again" : "Start Game",
                    }}
                    handleClick={startGame}
                />
            )}
        </div>
    );
}

