import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class UI {
    constructor(player) {
        this.player = player;
        this.container = new PIXI.Container();
        this.config = App.config.ui;
        this.create();
        this.update();
    }

    createCoinsIcon() {
        this.coins = App.sprite("coin");
        this.coins.anchor.set(0.5);
        this.coins.x = this.config.coinsIcon.x;
        this.coins.y = this.config.coinsIcon.y;
        this.container.addChild(this.coins);
    }

    createLivesIcon() {
        this.lives = App.sprite("heart");
        this.lives.anchor.set(0.5);
        this.lives.x = this.config.livesIcon.x;
        this.lives.y = this.config.livesIcon.y;
        this.container.addChild(this.lives);
    }

    createCoinsText() {
        this.coinsText = new PIXI.Text(this.player.coins.toString(), {fill: 0xffffff});
        this.coinsText.x = this.config.coinsText.x;
        this.coinsText.y = this.config.coinsText.y;
        this.container.addChild(this.coinsText);
    }
    createLivesText() {
        this.livesText = new PIXI.Text(this.player.lives.toString(), {fill: 0xffffff});
        this.livesText.x = this.config.livesText.x;
        this.livesText.y = this.config.livesText.y;
        this.container.addChild(this.livesText);
    }

    create() {
        this.createCoinsIcon();
        this.createCoinsText();
        this.createLivesIcon();
        this.createLivesText();
    }

    update() {
        this.coinsText.text = this.player.coins.toString();
        this.livesText.text = this.player.lives.toString();
    }
}