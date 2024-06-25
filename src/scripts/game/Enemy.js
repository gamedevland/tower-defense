import { gsap } from "gsap";
import { Tile } from "./Tile";
import { App } from "../system/App";

export class Enemy extends Tile {

    constructor(config, path) {
        super(config.id);
        this.config = config;
        this.sprite.anchor.set(0.5);

        this.pathIndex = 1;
        this.path = path;
        this.hp = this.config.hp;
    }

    get isOutOfTheScreen() {
        if (this.pathIndex === this.path.length) {
            let point = this.sprite.getGlobalPosition();

            if (point.x < 0 ||point.x > App.app.view.width) {
                return true;
            }
        }


        return false;
    }

    getNextPoint() {
        const nextPoint = this.pathIndex + 1;

        return this.path.find(point => point.name === nextPoint.toString());
    }

    getAngle(target) {
        const sourceX = this.sprite.x;
        const sourceY = this.sprite.y;

        const dy = target.y - sourceY;
        const dx = target.x - sourceX;
        return 180 * Math.atan2(dy, dx) / Math.PI; 
    }


    move() {
        const point = this.getNextPoint();
        if (!point) {
            return;
        }
        ++this.pathIndex;

        const sourceX = this.sprite.x;
        const sourceY = this.sprite.y;


        const targetX = point.x / 2;
        const targetY = point.y / 2;

        this.sprite.angle = this.getAngle({x: targetX, y: targetY});

        const diffX = Math.abs(targetX - sourceX);
        const diffY = Math.abs(targetY - sourceY);

        const diff = Math.max(diffX, diffY);

        const duration = diff / this.config.velocity;

        gsap.to(this.sprite, {
            onComplete: () => {
                this.move();
            },
            pixi: { x: point.x / 2, y: point.y / 2 },
            duration,
            ease: "none",
          });

    }

    addDamage(damage) {
        this.hp -= damage;

        if (this.hp <= 0) {
            this.remove();
        }
    }

    remove() {
        gsap.killTweensOf(this.sprite);
        this.sprite.destroy();
        this.sprite = null;
        this.emit("removed");
    }
}