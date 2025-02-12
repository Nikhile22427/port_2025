import { GameLevel } from './GameLevel.js'; // Assuming GameLevel.js is your base class
import { Npc } from './Npc.js'; // The Npc class we've updated

class GameLevelIndia extends GameLevel {
    constructor() {
        super();
        this.backgroundImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiha1emSdoQj5oFOqAEsV6FWSYbTMjw_kdmKq_RI_gSWO-uAw8krF_uOekGhwxTcSpmOY-adK_Pq6vbrs5kg_0bA2r81FXygN43OcCUO8a92lk3gt-QBgUK_0zjNBhXk6PzKRBpZ-N8OhAZ/s1600/gh3.jpg"; // The background image for India
        this.npcs = this.createIndiaNpcs(); // Set up the NPCs for this level
    }

    /**
     * Creates the NPCs for GameLevelIndia.
     */
    createIndiaNpcs() {
        return [
            new Npc({
                id: 'npc1',
                spriteData: {
                    x: 100,
                    y: 200,
                    width: 50,
                    height: 100,
                },
                quiz: {
                    title: "Indian History Quiz",
                    questions: [
                        "Who was the first President of India?",
                        "Which river is known as the 'Ganga of the South'?",
                        "Who wrote the Indian national song?"
                    ]
                },
                image: "https://cdn.vectorstock.com/i/1000v/17/63/indian-tamil-man-cartoon-vector-36041763.jpg", // NPC 1 image
                voiceLines: [
                    "Namaste! Welcome to the land of history and culture!",
                    "Did you know the Ganga is considered the holiest river in India?",
                    "The first President of India was Dr. Rajendra Prasad."
                ]
            }),
            new Npc({
                id: 'npc2',
                spriteData: {
                    x: 300,
                    y: 400,
                    width: 50,
                    height: 100,
                },
                quiz: {
                    title: "Indian Culture Quiz",
                    questions: [
                        "What is the national flower of India?",
                        "Which festival is known as the festival of lights?",
                        "What is India's national animal?"
                    ]
                },
                image: "https://t3.ftcdn.net/jpg/06/75/09/04/360_F_675090428_e996XFpVgOJ0fKB7WHeW4kq71qpBS5vU.jpg", // NPC 2 image
                voiceLines: [
                    "Hello there! Ready to test your knowledge of Indian culture?",
                    "Diwali is the festival of lights, celebrated with great joy.",
                    "India's national animal is the majestic Bengal Tiger!"
                ]
            })
        ];
    }

    /**
     * Override the method to draw the background image.
     */
    drawBackground() {
        const img = new Image();
        img.src = this.backgroundImage;
        img.onload = () => {
            context.drawImage(img, 0, 0, canvas.width, canvas.height); // Assuming 'context' and 'canvas' are globally defined
        };
    }

    /**
     * Override the method to update NPCs and interactions.
     */
    update() {
        this.drawBackground();
        this.npcs.forEach(npc => npc.update());
    }

    /**
     * Handle interactions and other events for GameLevelIndia.
     */
    handleInteractions() {
        this.npcs.forEach(npc => npc.handleInteractions()); // Assuming NPC has interaction logic
    }
}

export default GameLevelIndia;
