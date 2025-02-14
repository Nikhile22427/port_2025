import GameLevel from "./GameLevel.js";
import GameEnv from "../rpg/latest/GameEnv.js";
import NpcDora from "./NpcDora.js";
import Player from "../adventureGame/Player.js";
import Character from "../adventureGame/CharacterDora.js";
import Background from "../adventureGame/Background.js";

class GameLevelDora extends GameLevel {
    constructor() {
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        let width = GameEnv.innerWidth;
        let height = GameEnv.innerHeight;
        
        const img_src_dora = path + "assets/backgrounds/dora_background.jpg";
        const image_data_dora = {
            name: 'forest',
            greeting: "hi",
            src: image_src_dora,
            pixels: {height: 1135, width: 2490}
        }
        this.keyFound = false;
        this.correctDigSpot = { x: 400, y: 300 }; // Set correct dig spot for key
        this.chestPosition = { x: 700, y: 350 }; // Position for chest
        this.chestUnlocked = false;
        
        

        const sprite_src_chillguy = path + "/images/gamify/chillguy.png"; // be sure to include the path
        const CHILLGUY_SCALE_FACTOR = 5;
        const sprite_data_chillguy = {
            id: 'Chill Guy',
            greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdome and adventure!",
            src: sprite_src_chillguy,
            SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0, y: height - (height/CHILLGUY_SCALE_FACTOR) }, 
            pixels: {height: 384, width: 512},
            orientation: {rows: 3, columns: 4 },
            down: {row: 0, start: 0, columns: 3 },
            left: {row: 2, start: 0, columns: 3 },
            right: {row: 1, start: 0, columns: 3 },
            up: {row: 3, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 }, // W, A, S, D
            level_data: levelData
        };
    
    
    
    }
}
this.objects = [
    { class: Background, data: image_data_dora }
  ];

export default GameLevelDora;
