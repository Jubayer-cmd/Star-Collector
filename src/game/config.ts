import Phaser from "phaser";
import { GameAssets } from "../types/game";
import { MainScene } from "./scenes/MainScene";

export const GAME_WIDTH = 720;
export const GAME_HEIGHT = 1280;

export const ASSETS: GameAssets = {
    sky: "assets/sky.png",
    ground: "assets/platform.png",
    star: "assets/star.png",
    bomb: "assets/bomb.png",
    dude: {
        sprite: "assets/dude.png",
        frameWidth: 32,
        frameHeight: 48,
    },
};

export const createGameConfig = (
    parent: HTMLElement | null
): Phaser.Types.Core.GameConfig => {
    return {
        type: Phaser.AUTO,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 300 },
                debug: false,
            },
        },
        scene: [MainScene],
        parent: parent || undefined,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
    };
};

