const HIGHSCORE_KEY = "highScore";

export class ScoreManager {
    private static instance: ScoreManager;

    private constructor() {}

    public static getInstance(): ScoreManager {
        if (!ScoreManager.instance) {
            ScoreManager.instance = new ScoreManager();
        }
        return ScoreManager.instance;
    }

    public getHighScore(): number {
        return parseInt(localStorage.getItem(HIGHSCORE_KEY) || "0");
    }

    public saveHighScore(score: number): void {
        const currentHighScore = this.getHighScore();
        if (score > currentHighScore) {
            localStorage.setItem(HIGHSCORE_KEY, score.toString());
        }
    }

    public updateHighScore(score: number): number {
        const currentHighScore = this.getHighScore();
        if (score > currentHighScore) {
            localStorage.setItem(HIGHSCORE_KEY, score.toString());
            return score;
        }
        return currentHighScore;
    }
}

