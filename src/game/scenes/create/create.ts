import { gameState } from "../../state";
import collectStar from "../../helpers/collectStar";
import hitBomb from "../../helpers/hitBomb";

export default function create(this: Phaser.Scene) {
    // A simple background for our game
    this.add.image(400, 300, "sky");

    gameState.platforms = this.physics.add.staticGroup();

    // Here we create the ground.
    // Scale it to fit the width of the game (the original sprite is 400x32 in size)
    gameState.platforms.create(400, 568, "ground").setScale(2).refreshBody();

    // Now let's create some ledges
    gameState.platforms.create(600, 400, "ground");
    gameState.platforms.create(50, 250, "ground");
    gameState.platforms.create(750, 220, "ground");

    // The player and its settings
    gameState.player = this.physics.add.sprite(100, 450, "dude");

    // Player physics properties. Give the little guy a slight bounce.
    gameState.player.setBounce(0.2);
    gameState.player.setCollideWorldBounds(true);

    // Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20,
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });

    // Input Events
    gameState.cursors = this.input.keyboard.createCursorKeys();

    // Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    gameState.stars = this.physics.add.group({
        key: "star",
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 },
    });

    gameState.stars.children.iterate((child) => {
        // Give each star a slightly different bounce
        (child as Phaser.Physics.Arcade.Sprite).setBounceY(
            Phaser.Math.FloatBetween(0.4, 0.8)
        );
        return true;
    });

    gameState.bombs = this.physics.add.group();

    // The score
    gameState.scoreText = this.add.text(16, 16, "Score: 0", {
        fontSize: "32px",
        fill: "#000",
    });

    // Collide the player and the stars with the platforms
    if (gameState.player && gameState.platforms) {
        this.physics.add.collider(gameState.player, gameState.platforms);
    }

    if (gameState.stars && gameState.platforms) {
        this.physics.add.collider(gameState.stars, gameState.platforms);
    }

    if (gameState.bombs && gameState.platforms) {
        this.physics.add.collider(gameState.bombs, gameState.platforms);
    }

    // Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    if (gameState.player && gameState.stars) {
        this.physics.add.overlap(
            gameState.player,
            gameState.stars,
            collectStar,
            undefined,
            this
        );
    }

    if (gameState.player && gameState.bombs) {
        this.physics.add.collider(
            gameState.player,
            gameState.bombs,
            hitBomb,
            undefined,
            this
        );
    }
}

