import { GameScene } from "./Game";
import { Tools } from "../system/Tools";
import { TowerPlace } from "./TowerPlace";

export const Config = {
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    scenes: {
        "Game": GameScene
    },
    ui: {
        coinsIcon: {
            x: 50,
            y: 40
        },
        coinsText: {
            x: 90,
            y: 30
        },
        livesIcon: {
            x: 50,
            y: 100
        },
        livesText: {
            x: 90,
            y: 90
        }
    },
    player: {
        coins: 200,
        lives: 5
    },
    tiles: {
        42: TowerPlace,
        111: TowerPlace
    },
    level: {
        rows: 18,
        cols: 32,
        layers: 5,
        tileSize: 32
    },
    enemies: {
        "unit1": {
            "id": 246,
            "velocity": 75,
            "hp": 1,
            "coins": 20
        },
        "unit2": {
            "id": 247,
            "velocity": 100,
            "hp": 2,
            "coins": 30
        },
        "unit3": {
            "id": 248,
            "velocity": 125,
            "hp": 3,
            "coins": 40
        },
        "unit4": {
            "id": 249,
            "velocity": 150,
            "hp": 4,
            "coins": 50
        }
    },
    towers: {
        "tower1": {
            "id": 250,
            "range": 200,
            "cooldown": 1000,
            "coins": 100,
            "bullet": {
                "speed": 10,
                "damage": 1
            }
        },
        "tower2": {
            "id": 251,
            "coins": 200,
            "range": 250,
            "cooldown": 500,
            "bullet": {
                "speed": 15,
                "damage": 2
            }
        }
    },
    enemiesWaves: [{
        count: 8,
        type: "unit1"
    }, {
        count: 12,
        type: "unit2"
    }, {
        count: 16,
        type: "unit3"
    }, {
        count: 20,
        type: "unit4"
    }],
    atlas: {
        cols: 23,
        rows: 13,
        tileSize: 64
    }    
};
