export default function preload(this: Phaser.Scene) {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");

    this.load.image("sound-on", "assets/sound-on.png");
    this.load.image("sound-off", "assets/sound-off.png");

    this.load.spritesheet("dude", "assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
    });

    // Load audio files
    this.load.audio("background", "assets/sounds/background-music.mp3");
    this.load.audio("star-collect", "assets/sounds/star-collect.mp3");
    this.load.audio("game-over", "assets/sounds/game-over.mp3");

    this.load.on("complete", () => {
        console.log("All assets loaded successfully");
    });
}

