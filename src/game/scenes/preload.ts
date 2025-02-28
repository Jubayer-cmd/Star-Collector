export default function preload(this: Phaser.Scene) {
    // Make sure assets are loaded with proper paths
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    
    // Explicitly set the bomb image with proper path
    this.load.image("bomb", "assets/bomb.png");
    
    this.load.spritesheet("dude", "assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
    });
    
    // Log when assets are loaded
    this.load.on('complete', () => {
        console.log('All assets loaded successfully');
    });
}

