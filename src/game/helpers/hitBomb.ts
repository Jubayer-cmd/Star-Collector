import { gameState } from "../../state/state";

export default function hitBomb(
    this: Phaser.Scene,
    player: Phaser.Physics.Arcade.Sprite
) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    gameState.gameOver = true;
}

