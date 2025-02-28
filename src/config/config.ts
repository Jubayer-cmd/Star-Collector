import Phaser from "phaser";

import { WIDTH, HEIGHT } from "../constants/constants";
import preload from "../game/scenes/preload";
import create from "../game/scenes/create/create";
import update from "../game/scenes/update";

export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    parent: "game-container",
    scale: {
        mode: Phaser.Scale.FIT,
        parent: "game-container",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: WIDTH,
        height: HEIGHT,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300, x: 0 },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

