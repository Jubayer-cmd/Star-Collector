interface GameState {
    player: Phaser.Physics.Arcade.Sprite | null;
    stars: Phaser.Physics.Arcade.Group | null;
    bombs: Phaser.Physics.Arcade.Group | null;
    platforms: Phaser.Physics.Arcade.StaticGroup | null;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;
    score: number;
    gameOver: boolean;
    scoreText: Phaser.GameObjects.Text | null;
}

export const gameState: GameState = {
    player: null,
    stars: null,
    bombs: null,
    platforms: null,
    cursors: null,
    score: 0,
    gameOver: false,
    scoreText: null,
};

export function resetGameState() {
    gameState.score = 0;
    gameState.gameOver = false;
}

