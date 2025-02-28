import { HEIGHT, WIDTH } from "../../../constants/constants";
import collectStars from "./startCollection";
import createPlatforms from "./createPlatforms";
import { createPlayer } from "./Player";
import { createStars } from "./createStars";
import gameOverHandler from "./gameOver";

export type Sprite = Phaser.Physics.Arcade.Sprite;
export type GroupType = Phaser.Physics.Arcade.Group;
export type stat = { score: number; gameOver: boolean };

export let player: Sprite;
let platforms: Phaser.Physics.Arcade.StaticGroup;
let highScore: string = localStorage.getItem("highScore") || "0";
let scoreText: Phaser.GameObjects.Text;
let stars: GroupType;
let bombs: GroupType;

const gameStats: stat = {
    score: 0,
    gameOver: false,
};

export default function create(this: Phaser.Scene) {
    highScore = localStorage.getItem("highScore") || "0";
    // background
    this.add.image(WIDTH / 2, HEIGHT / 2, "sky").setDisplaySize(WIDTH, HEIGHT);

    //player creation
    player = createPlayer(this);

    // floors and base
    platforms = createPlatforms(this);

    // enable collisions between player and platforms
    this.physics.add.collider(player, platforms);

    //stars creation
    stars = createStars(this);

    // enable collisions between ground and stars
    this.physics.add.collider(stars, platforms);

    //bomb creation
    bombs = this.physics.add.group();

    // enable collisions between player & bombs, bombs & platforms
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(
        player,
        bombs,
        () => gameOverHandler(this, player, gameStats),
        null,
        this
    );

    // star collection
    this.physics.add.overlap(player, stars, (player, star) => {
        collectStars(
            player as Sprite,
            star as Sprite,
            gameStats,
            highScore,
            scoreText,
            bombs,
            stars
        );
    });

    // display score
    scoreText = this.add.text(16, 16, `score: 0; highscore: ${highScore}`, {
        fontSize: "32px",
        fill: "#000",
    });
}

