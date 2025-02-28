import { gameState } from "../../state/state";

export default function collectStar(
    this: Phaser.Scene,
    player: Phaser.Physics.Arcade.Sprite,
    star: Phaser.Physics.Arcade.Sprite
) {
    star.disableBody(true, true);

    // Add and update the score
    gameState.score += 10;
    if (gameState.scoreText) {
        gameState.scoreText.setText("Score: " + gameState.score);
    }

    if (gameState.stars?.countActive(true) === 0) {
        // A new batch of stars to collect
        gameState.stars.children.iterate((child) => {
            const star = child as Phaser.Physics.Arcade.Sprite;
            star.enableBody(true, star.x, 0, true, true);
            return true;
        });

        const x =
            player.x < 400
                ? Phaser.Math.Between(400, 800)
                : Phaser.Math.Between(0, 400);

        if (gameState.bombs) {
            const bomb = gameState.bombs.create(x, 16, "bomb");
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            (bomb.body as Phaser.Physics.Arcade.Body).allowGravity = false;
        }
    }
}

