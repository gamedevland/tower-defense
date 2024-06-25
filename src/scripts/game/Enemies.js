import * as PIXI from "pixi.js";
import { EventEmitter } from "events";
import { App } from '../system/App';
import { Enemy } from "./Enemy";

const EnemyDelay = 1000;
const WaveDelay = 3000;

export class Enemies extends EventEmitter {

    constructor(map) {
        super();

        this.container = new PIXI.Container();
        this.map = map;
        this.units = [];
        this.config = App.config.enemiesWaves;
        this.index = 0;
        this.enemyDelay = EnemyDelay;
        this.waveDelay = WaveDelay;
        this.create();
    }

    createEnemy(i, type) {
        const enemy = new Enemy(App.config.enemies[type], this.map.path);
        enemy.sprite.anchor.set(0.5);
        this.container.addChild(enemy.sprite);
        this.units.push(enemy);

        const start = this.map.path.find(point => point.name === "1");
        enemy.sprite.x = start.x / 2;
        enemy.sprite.y = start.y / 2;

        window.setTimeout(enemy.move.bind(enemy), this.enemyDelay * i);
        enemy.once("removed", this.onEnemyRemoved.bind(this, enemy));
    }

    onEnemyRemoved(enemy) {
        this.units = this.units.filter(unit => unit !== enemy);

        if (!this.units.length) {
            window.setTimeout(this.create.bind(this), this.waveDelay);
       }
    }

    create() {
        const config = this.config[this.index];

        if (!config) {
            return;
        }

        ++this.index;

        for (let i = 0; i < config.count; i++) {
            this.createEnemy(i, config.type);
        }
    }
}