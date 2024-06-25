import * as PIXI from "pixi.js";
import { App } from '../system/App';
import { Scene } from '../system/Scene';
import { Enemies } from './Enemies';
import { Enemy } from './Enemy';
import { LevelMap } from './LevelMap';
import { Player } from './Player';
import { Tower } from './Tower';
import { UI } from './UI';


export class GameScene extends Scene {
    create() {
        this.createCollisionsContainer();
        this.createPlayer();
        this.createMap();
        this.createEnemies();
        this.setEvents();
        this.createUI();
    }

    createCollisionsContainer() {
        this.collisions = new PIXI.Container();
        this.container.addChild(this.collisions);
    }

    createUI() {
        this.ui = new UI(this.player);
        this.container.addChild(this.ui.container);
    }

    createPlayer() {
        this.player = new Player();
    }

    setEvents() {
        App.on("tower-place-click", this.onTowerPlaceClick.bind(this));
        App.app.ticker.add(this.update, this);
    }

    onTowerPlaceClick(towerPlace) {
        const towerConfig = App.config.towers["tower" + (towerPlace.level + 1)];

        if (!towerConfig) {
            return;
        }

        if (this.player.coins < towerConfig.coins) {
            return;
        }

        this.player.coins -= towerConfig.coins;
        ++towerPlace.level;

        if (towerPlace.tower) {
            towerPlace.tower.sprite.destroy();
        }

        const tower = new Tower(towerConfig);
        towerPlace.tower = tower;
        tower.place = towerPlace;
        towerPlace.sprite.addChild(tower.sprite);
        tower.createArea();
        this.collisions.addChild(tower.area);
    }

    checkGameOver() {
        if (this.player.lives <= 0) {
            alert("Game Over!");
            App.scenes.start("Game");
        }
    }

    processCompletedEnemies() {
        const enemy = this.enemies.units.find(enemy => enemy.isOutOfTheScreen);

        if (enemy) {
            enemy.remove();
            --this.player.lives;
            this.checkGameOver();
        }
    }

    processEnemyBulletCollision() {
        this.map.towers.forEach(tower => {
            tower.bullets.forEach(bullet => {
                const enemy = this.enemies.units.find(unit => bullet.collide(unit.sprite));

                if (enemy) {
                    enemy.addDamage(bullet.damage);
                    if (enemy.hp <= 0) {
                        this.player.coins += enemy.config.coins;
                    }
                    bullet.remove();
                }
            });
        });
    }

    processTowerAttackEnemies() {
        this.map.towers.forEach(tower => {
            const enemy = this.enemies.units.find(unit => tower.detect(unit));

            if (enemy) {
                tower.attack(enemy);
            }
        });
    }

    update() {
        this.processCompletedEnemies();
        this.processEnemyBulletCollision();
        this.processTowerAttackEnemies();
        this.ui.update();
    }

    createMap() {
        this.map = new LevelMap();
        this.container.addChild(this.map.container);
    }
    createEnemies() {
        // const enemy = new Enemy("unit1", this.map.path);
        // this.container.addChild(enemy.sprite);
        // enemy.sprite.x = 130;
        // enemy.sprite.y = 530;
        // enemy.move();
        this.enemies = new Enemies(this.map);
        this.container.addChild(this.enemies.container);
    
    }
}