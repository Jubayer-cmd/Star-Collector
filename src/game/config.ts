import Phaser from "phaser";
import preload from "./scenes/preload";
import create from "./scenes/create/create";
import update from "./scenes/update";
import { WIDTH, HEIGHT } from "../constants";

export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    parent: "game-container",
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

