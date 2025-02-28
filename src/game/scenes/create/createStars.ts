export function createStars(scene: Phaser.Scene) {
    let stars: Phaser.Physics.Arcade.Group;

    stars = scene.physics.add.group({
        key: "star",
        repeat: 10,
        setXY: { x: 15, y: 0, stepX: 69 },
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.25, 0.3));
    });

    return stars;
}
