import { WIDTH, HEIGHT } from "../../../constants/constants";
import { Sprite, GroupType, stat } from "./create";

interface StarConfig {
    minStars: number;
    maxStars: number;
    minY: number;
    maxY: number;
    bounce: number;
}

export const DEFAULT_STAR_CONFIG: StarConfig = {
    minStars: 8,
    maxStars: 12,
    minY: 0,
    maxY: HEIGHT - 200,
    bounce: 0.4,
};

export function createStars(scene: Phaser.Scene) {
    const stars = scene.physics.add.group({
        key: "star",
        repeat: 10,
        setXY: { x: 15, y: 0, stepX: 69 },
    });

    stars.children.iterate((child: Phaser.GameObjects.GameObject): boolean => {
        const star = child as Phaser.Physics.Arcade.Sprite;
        star.setBounceY(Phaser.Math.FloatBetween(0.25, 0.3));
        return true;
    });

    return stars;
}

// Remove createStarParticles and createStarCollectEffect functions as they're not needed

export function respawnStars(stars: GroupType) {
    stars.children.iterate((child: Phaser.GameObjects.GameObject): boolean => {
        const star = child as Sprite;
        star.enableBody(true, star.x, 0, true, true);
        star.setBounceY(Phaser.Math.FloatBetween(0.25, 0.3));
        return true;
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
    // Only play sound and handle basic collection
    star.scene.sound.play("star-collect", { volume: 0.5 });
    star.disableBody(true, true);
    gameStats.score += 10;
    scoreText.setText(`Score: ${gameStats.score} | Best Score: ${bestScore}`);

    // Handle star respawn and bomb creation
    if (stars.countActive(true) === 0) {
        respawnStars(stars);

        const x =
            player.x < 400
                ? Phaser.Math.Between(400, 800)
                : Phaser.Math.Between(0, 400);

        const bomb = bombs.create(x, 16, "bomb") as Sprite;
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 40);
    }

    // Update high score
    if (gameStats.score > parseInt(bestScore)) {
        bestScore = gameStats.score.toString();
        localStorage.setItem("bestScore", bestScore);
    }
}

