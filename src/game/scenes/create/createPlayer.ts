export function createPlayer(scene: Phaser.Scene) {
    let player: Phaser.Physics.Arcade.Sprite;
    player = scene.physics.add.sprite(100, 450, "dude");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // left view of player
    scene.anims.create({
        key: "left",
        frames: scene.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
    });
    //still view of player
    scene.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20,
    });
    // right view of player
    scene.anims.create({
        key: "right",
        frames: scene.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });

    return player;
}
