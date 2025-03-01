export default function createPlatforms(scene: Phaser.Scene) {
    let platforms: Phaser.Physics.Arcade.StaticGroup;

    platforms = scene.physics.add.staticGroup();
    platforms.create(400, 1248, "ground").setScale(2).refreshBody(); //base
    platforms.create(50, 735, "ground");
    platforms.create(700, 600, "ground");
    platforms.create(700, 805, "ground");
    platforms.create(100, 910, "ground");
    platforms.create(600, 1070, "ground");
    return platforms;
}

