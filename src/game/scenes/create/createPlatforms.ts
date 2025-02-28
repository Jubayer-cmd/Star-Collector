export default function createPlatforms(scene: Phaser.Scene) {
    let platforms: Phaser.Physics.Arcade.StaticGroup;

    platforms = scene.physics.add.staticGroup();
    platforms.create(400, 1248, "ground").setScale(2).refreshBody(); //base
    platforms.create(50, 735, "ground");
    platforms.create(770, 735, "ground");
    platforms.create(760, 895, "ground");
    platforms.create(50, 910, "ground");
    platforms.create(600, 1070, "ground");
    return platforms;
}
