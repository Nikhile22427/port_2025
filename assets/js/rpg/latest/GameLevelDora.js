import GameLevel from "./GameLevel.js";
import Npc from "../../adventureGame/NpcDora.js";
import Player from "../../adventureGame/Player.js";
import GameLevelRedLightGreenLight from "../../adventureGame/GameLevelRedLightGreenLight.js";

class GameLevelDora extends GameLevel {
    constructor() {
        super("Dora Land", "assets/background/dorahood.png"); // Pixelated Dora-themed background
        this.setupNPCs();
        this.keyFound = false;
        this.correctDigSpot = { x: 400, y: 300 }; // Set correct dig spot for key
        this.chestPosition = { x: 700, y: 350 }; // Position for chest
        this.chestUnlocked = false;
    }

    setupNPCs() {
        this.npcs = [
            new Npc({
                role: "Boots",
                position: { x: 200, y: 150 },
                sprite: "assets/npcs/boots_pixel.png",
                quiz: {
                    title: "Spanish Questions",
                    questions: [
                        "How do you say 'apple' in Spanish? (Press W to answer)",
                        "What is the Spanish word for 'door'? (Press W to answer)"
                    ]
                }
            }),
            new Npc({
                role: "Map",
                position: { x: 500, y: 200 },
                sprite: "assets/npcs/map_pixel.png",
                dialogue: ["To find the key, you must dig in the right place! (Press Q at the spot)"]
            }),
            new Npc({
                role: "Swiper",
                position: { x: 600, y: 350 },
                sprite: "assets/npcs/swiper_pixel.png",
                autoSteal: true
            })
        ];

        this.digSpot = new Npc({
            role: "DigSpot",
            position: this.correctDigSpot,
            sprite: "assets/npcs/dig_spot.png",
            dialogue: ["Press Q to dig here!"]
        });
        this.npcs.push(this.digSpot);

        this.chest = new Npc({
            role: "Chest",
            position: this.chestPosition,
            sprite: "assets/npcs/chest.png",
            dialogue: ["Press E to use the key and open the chest!"]
        });
        this.npcs.push(this.chest);
    }

    update() {
        super.update();
        
        if (this.keyFound) {
            this.makeSwiperChase();
        }
    }

    makeSwiperChase() {
        const swiper = this.npcs.find(npc => npc.role === "Swiper");
        if (swiper) swiper.chasePlayer();
    }

    handleKeyPress(key) {
        const player = Player.getInstance();
        if (key === 'q' && !this.keyFound) {
            if (Math.abs(player.x - this.correctDigSpot.x) < 20 && Math.abs(player.y - this.correctDigSpot.y) < 20) {
                this.keyFound = true;
                player.addItem("Key");
                alert("You found the key! Now return to Rachit before Swiper catches you!");
            } else {
                alert("Nothing here... try another spot.");
            }
        }
        if (key === 'e' && this.keyFound && !this.chestUnlocked) {
            if (Math.abs(player.x - this.chestPosition.x) < 30 && Math.abs(player.y - this.chestPosition.y) < 30) {
                this.chestUnlocked = true;
                alert("You unlocked the chest and saved Rachit! Now onto the next challenge!");
                this.transitionToNextLevel();
            }
        }
    }

    transitionToNextLevel() {
        const player = Player.getInstance();
        player.setLevel(new GameLevelRedLightGreenLight());
    }
}

export default GameLevelDora;
