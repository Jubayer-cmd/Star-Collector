export interface GameScore {
    score: number;
    highScore: number;
}

export interface GameAssets {
    sky: string;
    ground: string;
    star: string;
    bomb: string;
    dude: {
        sprite: string;
        frameWidth: number;
        frameHeight: number;
    };
}

