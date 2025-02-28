import Phaser from "phaser";
import { PLAYER_SETTINGS } from "../../constants/game";

export class Player extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private isDead: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "dude");

        // Add this sprite to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configure physics
        this.setBounce(PLAYER_SETTINGS.MOVEMENT.BOUNCE);
        this.setCollideWorldBounds(true);

        // Create animations
        this.createAnimations();

        // Setup movement controls
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    private createAnimations(): void {
        // Left animation
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: PLAYER_SETTINGS.ANIMATION.FRAME_RATE,
            repeat: -1,
        });

        // Turn animation
        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: PLAYER_SETTINGS.ANIMATION.TURN_FRAME_RATE,
        });

        // Right animation
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: PLAYER_SETTINGS.ANIMATION.FRAME_RATE,
            repeat: -1,
        });
    }

    public update(): void {
        if (this.isDead) return;

        const { left, right, up } = this.cursors;

        // Handle horizontal movement
        if (left.isDown) {
            this.setVelocityX(-PLAYER_SETTINGS.MOVEMENT.VELOCITY_X);
            this.anims.play("left", true);
        } else if (right.isDown) {
            this.setVelocityX(PLAYER_SETTINGS.MOVEMENT.VELOCITY_X);
            this.anims.play("right", true);
        } else {
            this.setVelocityX(0);
            this.anims.play("turn");
        }

        // Handle jump (only when touching the ground)
        if (up.isDown && this.body.touching.down) {
            this.setVelocityY(PLAYER_SETTINGS.MOVEMENT.VELOCITY_Y);
        }
    }

    public die(): void {
        this.isDead = true;
        this.setTint(0xff0000);
        this.anims.play("turn");
    }

    public reset(): void {
        this.isDead = false;
        this.clearTint();
    }
}

