import Phaser from "phaser";
import { ASSETS, GAME_WIDTH, GAME_HEIGHT } from "../config";
import { ScoreManager } from "../../utils/scoreManager";

export class MainScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private stars!: Phaser.Physics.Arcade.Group;
    private bombs!: Phaser.Physics.Arcade.Group;
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private score = 0;
    private highScore = 0;
    private gameOver = false;
    private scoreText!: Phaser.GameObjects.Text;
    private highScoreText!: Phaser.GameObjects.Text;
    private scoreManager: ScoreManager;
    private gameStarted = false;

    constructor() {
        super("MainScene");
        this.scoreManager = ScoreManager.getInstance();
    }

    preload(): void {
        this.load.image("sky", ASSETS.sky);
        this.load.image("ground", ASSETS.ground);
        this.load.image("star", ASSETS.star);
        this.load.image("bomb", ASSETS.bomb);
        this.load.spritesheet("dude", ASSETS.dude.sprite, {
            frameWidth: ASSETS.dude.frameWidth,
            frameHeight: ASSETS.dude.frameHeight,
        });
    }

    create(): void {
        // Reset game over state
        this.gameOver = false;
        if (window.gameEvents) {
            window.gameEvents.gameOver = false;
        }

        // Set initial game state
        this.gameStarted =
            !window.gameEvents?.gameOver &&
            window.gameEvents?.emitter.listenerCount("gameOver") > 0;

        // Load high score from localStorage
        this.highScore = this.scoreManager.getHighScore();
        this.score = 0;

        // Background - scale to fill portrait mode
        const sky = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "sky");
        const scaleX = GAME_WIDTH / sky.width;
        const scaleY = GAME_HEIGHT / sky.height;
        const scale = Math.max(scaleX, scaleY);
        sky.setScale(scale);

        // Platforms - adjusted for portrait mode
        this.createPlatforms();

        // Player
        this.createPlayer();

        // Stars
        this.createStars();

        // Bombs
        this.bombs = this.physics.add.group();

        // UI
        this.createUI();

        // Colliders and overlaps
        this.setupCollisions();

        // Input
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        // Add touch controls for mobile
        this.setupTouchControls();

        // If the game hasn't started yet, pause physics
        if (!this.gameStarted) {
            this.physics.pause();
        }
    }

    private setupTouchControls(): void {
        // Left side of screen = move left
        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if (pointer.y > GAME_HEIGHT * 0.7) {
                // Bottom of screen = jump
                if (this.player.body.touching.down) {
                    this.player.setVelocityY(-330);
                }
            } else if (pointer.x < GAME_WIDTH / 2) {
                // Left side = move left
                this.player.setVelocityX(-160);
                this.player.anims.play("left", true);
            } else {
                // Right side = move right
                this.player.setVelocityX(160);
                this.player.anims.play("right", true);
            }
        });

        this.input.on("pointerup", () => {
            // Stop movement when touch ends
            this.player.setVelocityX(0);
            this.player.anims.play("turn");
        });
    }

    update(): void {
        if (this.gameOver || !this.gameStarted) {
            return;
        }

        this.handlePlayerMovement();
    }

    private createPlatforms(): void {
        this.platforms = this.physics.add.staticGroup();

        // Bottom platform (ground) - similar to original, but adjusted for width
        this.platforms
            .create(GAME_WIDTH / 2, GAME_HEIGHT - 32, "ground")
            .setScale(GAME_WIDTH / 400, 2)
            .refreshBody();

        this.platforms.create(400, 1248, "ground").setScale(2).refreshBody(); // base
        this.platforms.create(30, 735, "ground");
        this.platforms.create(670, 675, "ground");
        this.platforms.create(670, 895, "ground");
        this.platforms.create(50, 910, "ground");
        this.platforms.create(600, 1070, "ground");
    }

    private createPlayer(): void {
        // Position player near the bottom of the screen
        this.player = this.physics.add.sprite(
            GAME_WIDTH / 2,
            GAME_HEIGHT * 0.8,
            "dude"
        );
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
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
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    private createStars(): void {
        // Adjust star positions for portrait mode
        this.stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: {
                x: 50,
                y: GAME_HEIGHT * 0.05,
                stepX: (GAME_WIDTH - 100) / 11,
            },
        });

        this.stars.children.iterate((child) => {
            (child as Phaser.Physics.Arcade.Sprite).setBounceY(
                Phaser.Math.FloatBetween(0.4, 0.8)
            );
            return true;
        });
    }

    private createUI(): void {
        // Position UI elements for portrait mode
        this.scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "32px",
            color: "#000",
        });

        this.highScoreText = this.add
            .text(GAME_WIDTH - 16, 16, `High: ${this.highScore}`, {
                fontSize: "32px",
                color: "#000",
            })
            .setOrigin(1, 0); // Right align
    }

    private setupCollisions(): void {
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.overlap(
            this.player,
            this.stars,
            this.collectStar,
            undefined,
            this
        );

        this.physics.add.collider(
            this.player,
            this.bombs,
            this.hitBomb,
            undefined,
            this
        );
    }

    private handlePlayerMovement(): void {
        if (this.cursors?.left?.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (this.cursors?.right?.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else {
            // Only stop if not being controlled by touch
            if (!this.input.activePointer.isDown) {
                this.player.setVelocityX(0);
                this.player.anims.play("turn");
            }
        }

        if (this.cursors?.up?.isDown && this.player.body?.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    private collectStar(
        _player: Phaser.Physics.Arcade.Sprite,
        star: Phaser.Physics.Arcade.Sprite
    ): void {
        const starSprite = star as Phaser.Physics.Arcade.Sprite;
        starSprite.disableBody(true, true);

        // Update score
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);

        // Update high score if needed
        this.highScore = this.scoreManager.updateHighScore(this.score);
        this.highScoreText.setText("High Score: " + this.highScore);

        // Check if all stars are collected
        if (this.stars.countActive(true) === 0) {
            this.resetStars();
            this.createBomb();
        }
    }

    private resetStars(): void {
        this.stars.children.iterate((child) => {
            const starChild = child as Phaser.Physics.Arcade.Sprite;
            starChild.enableBody(true, starChild.x, 0, true, true);
            return true;
        });
    }

    private createBomb(): void {
        const x =
            this.player.x < GAME_WIDTH / 2
                ? Phaser.Math.Between(GAME_WIDTH / 2, GAME_WIDTH)
                : Phaser.Math.Between(0, GAME_WIDTH / 2);

        const bomb = this.bombs.create(
            x,
            16,
            "bomb"
        ) as Phaser.Physics.Arcade.Sprite;
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-300, 400), 40);
        (bomb.body as Phaser.Physics.Arcade.Body).allowGravity = false;
    }

    private hitBomb(
        player: Phaser.Types.Physics.Arcade.GameObjectWithBody
    ): void {
        this.physics.pause();

        const playerSprite = player as Phaser.Physics.Arcade.Sprite;
        playerSprite.setTint(0xff0000);
        playerSprite.anims.play("turn");

        this.gameOver = true;
        this.scoreManager.saveHighScore(this.score);

        // Signal game over to React component
        if (window.gameEvents) {
            window.gameEvents.gameOver = true;
            window.gameEvents.emitter.emit("gameOver");
        }
    }

    public startGame(): void {
        this.gameStarted = true;
        this.physics.resume();
    }
}

