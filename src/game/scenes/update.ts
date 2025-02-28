import { gameState } from "../state";

export default function update() {
    if (gameState.gameOver || !gameState.player || !gameState.cursors) {
        return;
    }

    if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-160);
        gameState.player.anims.play("left", true);
    } else if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(160);
        gameState.player.anims.play("right", true);
    } else {
        gameState.player.setVelocityX(0);
        gameState.player.anims.play("turn");
    }

    if (gameState.cursors.up.isDown && gameState.player.body.touching.down) {
        gameState.player.setVelocityY(-330);
    }
}

