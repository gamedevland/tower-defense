import * as PIXI from "pixi.js";
import { Tile } from "./Tile";
import { App } from "../system/App";
import { TileFactory } from "./TileFactory";
const TilemapJson = require("../../json/tilemap.json");

export class LevelMap {
    constructor() {
        this.container = new PIXI.Container();
        this.tiles = {};
        this.path = {};
        this.render();
    }

    get towers() {
        return this.tiles["towers"].filter(towerPlace => towerPlace.tower).map(towerPlace => towerPlace.tower);
    }

    renderTile(id, row, col) {
        const tile = TileFactory.create(id);
        tile.sprite.x = col * App.config.level.tileSize;
        tile.sprite.y = row * App.config.level.tileSize;
        tile.sprite.width = App.config.level.tileSize;
        tile.sprite.height = App.config.level.tileSize;
        this.container.addChild(tile.sprite);
        return tile;
    }

    render() {
        for (let layer = 0; layer < App.config.level.layers; layer++) {
            let index = 0;
            const layerData = TilemapJson.layers[layer];
            this.tiles[layerData.name] = [];

            if (layerData.data) {
                for (let row = 0; row < App.config.level.rows; row++) {
                    for (let col = 0; col < App.config.level.cols; col++) {
                        const tileId = TilemapJson.layers[layer].data[index];
                        index++;
                        if (tileId) {
                            const tile = this.renderTile(tileId, row, col);
                            this.tiles[layerData.name].push(tile);
                        }
                    }
                }
            } else if (layerData.objects) {
                this.path = layerData.objects;
            }
        }

    }
}