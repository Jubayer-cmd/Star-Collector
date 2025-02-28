type playerBody = Phaser.Physics.Arcade.Body;

import { player } from "./create/create";

export default function update(this: Phaser.Scene) {
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    cursors = (
        this.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin
    ).createCursorKeys();

    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play("left", true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play("right", true);
    } else {
        player.setVelocityX(0);

        player.anims.play("turn");
    }

    if (cursors.up.isDown && (player.body as playerBody).touching.down) {
        player.setVelocityY(-330);
    }
}
