export interface GameEventEmitter extends Phaser.Events.EventEmitter {
    emit(event: string, ...args: any[]): boolean;
    on(event: string, fn: Function, context?: any): this;
}

export interface GameEvents {
    gameOver: boolean;
    emitter: GameEventEmitter;
}

export interface GameEventPayload {
    type: string;
    data?: any;
}

