import { WIDTH, HEIGHT } from "../../../constants/constants";
import { Sprite, GroupType, stat } from "./create";

interface StarConfig {
    minStars: number;
    maxStars: number;
    minY: number;
    maxY: number;
    bounce: number;
}

const DEFAULT_STAR_CONFIG: StarConfig = {
    minStars: 8,
    maxStars: 12,
    minY: 0,
    maxY: HEIGHT - 200,
    bounce: 0.4,
};

export function createStarSystem(
    scene: Phaser.Scene,
    config: Partial<StarConfig> = {}
) {
    const finalConfig = { ...DEFAULT_STAR_CONFIG, ...config };
    const stars = scene.physics.add.group();

    const starCount = Phaser.Math.Between(
        finalConfig.minStars,
        finalConfig.maxStars
    );

    for (let i = 0; i < starCount; i++) {
        const x = Phaser.Math.Between(0, WIDTH);
        const y = Phaser.Math.Between(finalConfig.minY, finalConfig.maxY);

        const star = stars.create(x, y, "star") as Phaser.Physics.Arcade.Sprite;
        star.setBounceY(finalConfig.bounce);

        if (Math.random() > 0.7) {
            // Reduced probability of moving stars
            star.setVelocityX(Phaser.Math.Between(-30, 30)); // Reduced velocity range
            star.setBounceX(1);
            star.setCollideWorldBounds(true);
        }
    }

    return stars;
}

export function respawnStarSystem(
    stars: Phaser.Physics.Arcade.Group,
    config: Partial<StarConfig> = {}
) {
    const finalConfig = { ...DEFAULT_STAR_CONFIG, ...config };

    stars.children.iterate((child: any) => {
        const star = child as Phaser.Physics.Arcade.Sprite;
        const x = Phaser.Math.Between(0, WIDTH);
        const y = Phaser.Math.Between(finalConfig.minY, finalConfig.maxY);

        star.enableBody(true, x, y, true, true);

        if (Math.random() > 0.7) {
            // Reduced probability of moving stars
            star.setVelocityX(Phaser.Math.Between(-30, 30)); // Reduced velocity range
            star.setBounceX(1);
            star.setCollideWorldBounds(true);
        }
    });
}

export function handleStarCollection(
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
        respawnStarSystem(stars);

        const x =
            player.x < 400
                ? Phaser.Math.Between(400, 800)
                : Phaser.Math.Between(0, 400);

        const bomb = bombs.create(x, 16, "bomb") as Sprite;
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-12, 15), 20);
    }

    if (gameStats.score > parseInt(bestScore)) {
        bestScore = gameStats.score.toString();
        localStorage.setItem("bestScore", bestScore);
    }
}
