import { Sprite, GroupType, stat } from "./create";

export default function collectStars(
    player: Sprite,
    star: Sprite,
    gameStats: stat,
    bestScore: string,
    scoreText: Phaser.GameObjects.Text,
    bombs: GroupType,
    stars: GroupType
) {
    star.disableBody(true, true);
    gameStats.score += 10;
    scoreText.setText(`Score: ${gameStats.score}; bestScore: ${bestScore}`);

    if (stars.countActive(true) === 0) {
        stars.children.iterate((child: any) => {
            const star = child as Sprite;
            star.enableBody(true, star.x, 0, true, true);
        });

        const x =
            player.x < 400
                ? Phaser.Math.Between(400, 800)
                : Phaser.Math.Between(0, 400);

        const bomb = bombs.create(x, 16, "bomb") as Sprite;
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-12, 15), 20);

        console.log();
    }

    // Update high score if current score is higher
    if (gameStats.score > parseInt(bestScore)) {
        bestScore = gameStats.score.toString();
        localStorage.setItem("bestScore", bestScore);
    }
}

