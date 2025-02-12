import GameLevel from "./GameLevel.js";
import Player from "./Player.js";

class GameLevelRedLightGreenLight extends GameLevel {
    constructor() {
        super("Red Light, Green Light", "assets/backgrounds/red_light_green_light.png");
        this.gameState = "Green Light";
        this.lastSwitchTime = Date.now();
        this.switchInterval = this.getRandomInterval();
        this.goalX = 700; // Winning position
    }

    update() {
        super.update();
        
        // Switch between Red and Green Light
        if (Date.now() - this.lastSwitchTime > this.switchInterval) {
            this.gameState = this.gameState === "Green Light" ? "Red Light" : "Green Light";
            this.lastSwitchTime = Date.now();
            this.switchInterval = this.getRandomInterval();
            alert(this.gameState + "!"); // Announce the state change
        }

        // Check if player moved during Red Light
        if (this.gameState === "Red Light" && Player.getInstance().isMoving()) {
            alert("You moved on Red Light! Restarting...");
            this.resetToDoraLevel();
        }
        
        // Check if player reached goal
        if (Player.getInstance().x >= this.goalX) {
            alert("You won!");
            // Add transition to next level or game completion
        }
    }

    getRandomInterval() {
        return Math.random() * 3000 + 2000; // Switch every 2-5 seconds
    }

    resetToDoraLevel() {
        this.loadLevel("GameLevelDora");
    }
}

export default GameLevelRedLightGreenLight;
