import * as PIXI from "pixi.js";
import { Tile } from "./Tile";
import { Bullet } from "./Bullet";
import { App } from "../system/App";

export class Tower extends Tile {
    constructor(config) {
        super(config.id);
        this.config = config;
        this.place = null;
        this.bullets = [];
        this.active = true;
    }

    detect(enemy) {
        if (enemy.sprite) {
            return this.area.containsPoint(new PIXI.Point(enemy.sprite.x, enemy.sprite.y));
        }
        return false;
    }


    attack(enemy) {
        this.rotateToEnemy(enemy);

        if (this.active) {
            this.active = false;
            this.shoot(enemy);
            window.setTimeout(() => this.active = true, this.config.cooldown);
        }
    }
    
    getAngleByTarget(targetPosition) {
        const x = targetPosition.x - this.sprite.parent.x;
        const y = targetPosition.y - this.sprite.parent.y;
        return 180 * Math.atan2(y, x) / Math.PI + 90;
    }

    shoot(enemy) {
        const bullet = new Bullet(this, enemy);
        this.bullets.push(bullet);
        bullet.once("removed", () => this.bullets = this.bullets.filter(item => item !== bullet));
        this.sprite.parent.addChild(bullet.sprite);
    }

    rotateToEnemy(enemy) {
        this.sprite.angle = this.getAngleByTarget({x: enemy.sprite.x, y: enemy.sprite.y});
    }

    createArea() {
        this.area = new PIXI.Graphics();
        this.area.beginFill(0xffffff, 1);
        this.area.drawCircle(this.sprite.getGlobalPosition().x, this.sprite.getGlobalPosition().y, this.config.range);
        this.area.endFill();
    }
}