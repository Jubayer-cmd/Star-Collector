export const GAME_DIMENSIONS = {
    WIDTH: 720,
    HEIGHT: 1280,
} as const;

export const PLAYER_SETTINGS = {
    MOVEMENT: {
        VELOCITY_X: 160,
        VELOCITY_Y: -330,
        BOUNCE: 0.2,
    },
    ANIMATION: {
        FRAME_RATE: 10,
        TURN_FRAME_RATE: 20,
    },
} as const;

export const SCORE_SETTINGS = {
    POINTS_PER_STAR: 10,
} as const;

