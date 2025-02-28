export interface GameState {
    isRunning: boolean;
    score: number;
    highScore: number;
    lives: number;
    level: number;
}

export interface PlayerState {
    x: number;
    y: number;
    isAlive: boolean;
    isJumping: boolean;
    direction: "left" | "right" | "idle";
}

