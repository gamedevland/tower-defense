import { App } from "../system/App";

export class Player {
    constructor() {
        this.coins = App.config.player.coins;
        this.lives = App.config.player.lives;
    }
}