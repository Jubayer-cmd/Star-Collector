// import { OVER } from "../../../constants";
import Phaser from "phaser";
import { stat } from "./create";
export default function gameOverHandler(
    scene: Phaser.Scene,
    player: Phaser.Physics.Arcade.Sprite,
    gameStats: stat
) {
    scene.physics.pause();
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

