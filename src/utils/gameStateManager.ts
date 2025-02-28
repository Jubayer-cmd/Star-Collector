import { GameState } from "../types/state";
import { ScoreManager } from "./scoreManager";

export class GameStateManager {
    private static instance: GameStateManager;
    private state: GameState;
    private scoreManager: ScoreManager;

    private constructor() {
        this.scoreManager = ScoreManager.getInstance();
        this.state = {
            isRunning: false,
            score: 0,
            highScore: this.scoreManager.getHighScore(),
            lives: 3,
            level: 1,
        };
    }

    public static getInstance(): GameStateManager {
        if (!GameStateManager.instance) {
            GameStateManager.instance = new GameStateManager();
        }
        return GameStateManager.instance;
    }

    public getState(): GameState {
        return { ...this.state };
    }

    public updateScore(points: number): void {
        this.state.score += points;
        this.state.highScore = this.scoreManager.updateHighScore(
            this.state.score
        );
    }

    public resetState(): void {
        this.state = {
            isRunning: false,
            score: 0,
            highScore: this.scoreManager.getHighScore(),
            lives: 3,
            level: 1,
        };
    }

    public setRunning(isRunning: boolean): void {
        this.state.isRunning = isRunning;
    }

    public decrementLives(): number {
        return --this.state.lives;
    }

    public incrementLevel(): number {
        return ++this.state.level;
    }
}

