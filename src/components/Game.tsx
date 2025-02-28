import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { createGameConfig, GAME_WIDTH } from "../game/config";
import { buttonConfig } from "../config/button-config";

// Create a global event emitter for communication between game and React
declare global {
    interface Window {
        gameEvents: {
            gameOver: boolean;
            emitter: Phaser.Events.EventEmitter;
        };
    }
}

const Game: React.FC = () => {
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const [gameInstance, setGameInstance] = useState<Phaser.Game | null>(null);
    const [showButton, setShowButton] = useState(true);

    // Initialize global event emitter
    useEffect(() => {
        window.gameEvents = {
            gameOver: false,
            emitter: new Phaser.Events.EventEmitter(),
        };

        // Listen for game over events
        window.gameEvents.emitter.on("gameOver", () => {
            setShowButton(true);
        });

        // Create game immediately to show in background
        if (gameContainerRef.current && !gameInstance) {
            const config = createGameConfig(gameContainerRef.current);
            const game = new Phaser.Game(config);
            setGameInstance(game);
        }

        return () => {
            window.gameEvents.emitter.removeAllListeners();
            gameInstance?.destroy(true);
        };
    }, []);

    const startGame = () => {
        setShowButton(false);

        // Get the main scene and start/restart the game
        if (gameInstance) {
            const mainScene = gameInstance.scene.getScene("MainScene");

            if (window.gameEvents.gameOver) {
                // If game over, restart the scene completely
                gameInstance.scene.stop("MainScene");
                gameInstance.scene.start("MainScene");

                // Allow scene to initialize before starting game
                setTimeout(() => {
                    const freshScene = gameInstance.scene.getScene(
                        "MainScene"
                    ) as any;
                    if (
                        freshScene &&
                        typeof freshScene.startGame === "function"
                    ) {
                        window.gameEvents.gameOver = false;
                        freshScene.startGame();
                    }
                }, 100);
            } else {
                // First time starting the game
                if (
                    mainScene &&
                    typeof (mainScene as any).startGame === "function"
                ) {
                    (mainScene as any).startGame();
                }
            }
        }
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                ref={gameContainerRef}
                style={{
                    width: "100%",
                    maxWidth: `${GAME_WIDTH}px`,
                    height: "100%",
                    maxHeight: "100vh",
                    position: "relative",
                }}
            />

            {showButton && (
                <button
                    onClick={startGame}
                    style={{
                        position: "absolute",
                        color: buttonConfig.buttonStyle.color,
                        backgroundColor:
                            buttonConfig.buttonStyle.backgroundColor,
                        top: buttonConfig.buttonStyle.top,
                        left: buttonConfig.buttonStyle.left,
                        width: `min(${buttonConfig.buttonStyle.width}, ${
                            GAME_WIDTH * 0.7
                        }px)`, // Limit width to 70% of game width
                        height: buttonConfig.buttonStyle.height,
                        borderRadius: buttonConfig.buttonStyle.borderRadius,
                        fontSize: buttonConfig.buttonStyle.fontSize,
                        transform: "translate(-50%, -50%)",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "bold",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    {buttonConfig.buttonText}
                </button>
            )}
        </div>
    );
};

export default Game;

