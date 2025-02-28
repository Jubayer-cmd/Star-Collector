import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { config } from "./game/config";
import { resetGameState } from "./game/state";

export default function Game() {
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        if (!gameRef.current) {
            resetGameState();
            gameRef.current = new Phaser.Game(config);
        }

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    return (
        <div id="game-container" style={{ width: "100%", height: "100%" }} />
    );
}

