import * as PIXI from "pixi.js";
import { EventEmitter } from "events";
import { App } from '../system/App';

export class Bullet extends EventEmitter {
    constructor(tower, enemy) {
        super();
        this.tower = tower;
        this.enemy = enemy;

        this.sprite = App.sprite("fire");
        this.sprite.anchor.set(0.5, 1);
        this.sprite.x = this.tower.sprite.x;
        this.sprite.y = this.tower.sprite.y;

        this.sprite.angle = this.tower.sprite.angle;
        this.damage = this.tower.config.bullet.damage;
        
        this.init();
    }

    collide(sprite) {
        if (!sprite) {
            return;
        }
        return sprite.containsPoint(this.sprite.getGlobalPosition());
    }

    init() {
        const speed = this.tower.config.bullet.speed;
        const azimuth = (this.sprite.angle) * (Math.PI / 180) - Math.PI / 2;
        this.velocity = {x: Math.cos(azimuth) * speed, y: Math.sin(azimuth) * speed};
        App.app.ticker.add(this.update, this);
    }

    update() {
        this.sprite.x += this.velocity.x;
        this.sprite.y += this.velocity.y;

        let position = this.sprite.getGlobalPosition()

        if (position.x < 0 || position.x > App.app.view.width) {
            this.remove();
        }
    }

    remove() {
        App.app.ticker.remove(this.update, this);
        this.sprite.destroy();
        this.sprite = null;
        this.emit("removed");
    }
}