import Phaser from "phaser";
import { stat, backgroundMusic } from "./create";

export default function gameOverHandler(
    scene: Phaser.Scene,
    player: Phaser.Physics.Arcade.Sprite,
    gameStats: stat
) {
    scene.physics.pause();

    // Stop background music and play game over sound
    backgroundMusic.stop();
    scene.sound.play("game-over", { volume: 0.7 });

    const storedbestScore = localStorage.getItem("bestScore");

    if (!storedbestScore || parseInt(storedbestScore) < gameStats.score) {
        localStorage.setItem("bestScore", gameStats.score.toString());
    }
    window.postMessage({ type: "OVER" });
    gameStats.score = 0;
    player.setTint(0xff0000);
    player.anims.play("turn");
    gameStats.gameOver = true;
}

