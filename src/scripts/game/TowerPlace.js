import { App } from "../system/App";
import { Tile } from "./Tile";

export class TowerPlace extends Tile {

    constructor(id) {
        super(id)
        this.level = 0;
        this.sprite.interactive = true;
        this.sprite.on("pointerdown", this.onClick, this);
        this.tower = null;
    }

    onClick() {
        App.emit("tower-place-click", this);
    }
}