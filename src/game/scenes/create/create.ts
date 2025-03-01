import { HEIGHT, WIDTH } from "../../../constants/constants";

import { createPlayer } from "./Player";
import { createStars, handleStarCollection } from "./starSystem";
import gameOverHandler from "./gameOver";
import createPlatforms from "./platforms";

export type Sprite = Phaser.Physics.Arcade.Sprite;
export type GroupType = Phaser.Physics.Arcade.Group;
export type stat = { score: number; gameOver: boolean };

export let player: Sprite;
let platforms: Phaser.Physics.Arcade.StaticGroup;
let bestScore: string = localStorage.getItem("bestScore") || "0";
let scoreText: Phaser.GameObjects.Text;
let stars: GroupType;
let bombs: GroupType;
// Add background music variable
export let backgroundMusic: Phaser.Sound.BaseSound;

const gameStats: stat = {
    score: 0,
    gameOver: false,
};

// Add at the top with other exports
export let isMuted: boolean = false;

export default function create(this: Phaser.Scene) {
    bestScore = localStorage.getItem("bestScore") || "0";
    // background
    this.add.image(WIDTH / 2, HEIGHT / 2, "sky").setDisplaySize(WIDTH, HEIGHT);

    // Add sound control icon with smaller size
    const soundButton = this.add
        .image(WIDTH - 50, 30, "sound-on")
        .setScale(0.03)
        .setInteractive()
        .setDepth(1);

    soundButton.on("pointerdown", () => {
        isMuted = !isMuted;
        soundButton.setTexture(isMuted ? "sound-off" : "sound-on");

        if (isMuted) {
            this.sound.mute = true;
        } else {
            this.sound.mute = false;
        }
    });

    // Start background music
    backgroundMusic = this.sound.add("background", {
        volume: 0.5,
        loop: true,
    });
    backgroundMusic.play();

    //player creation
    player = createPlayer(this);

    // floors and base
    platforms = createPlatforms(this);

    // enable collisions between player and platforms
    this.physics.add.collider(player, platforms);

    //stars creation
    stars = createStars(this);
    this.physics.add.collider(stars, platforms);

    //bomb creation
    bombs = this.physics.add.group();

    // enable collisions between player & bombs, bombs & platforms
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(
        player,
        bombs,
        () => gameOverHandler(this, player, gameStats),
        undefined,
        this
    );

    // star collection
    this.physics.add.overlap(player, stars, (player, star) => {
        handleStarCollection(
            player as Sprite,
            star as Sprite,
            gameStats,
            bestScore,
            scoreText,
            bombs,
            stars
        );
    });

    // display score
    scoreText = this.add.text(16, 16, `Score: 0 | Best Score: ${bestScore}`, {
        fontSize: "32px",
        color: "#000",
    });
}

