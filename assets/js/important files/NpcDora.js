import GameEnv from "../adventureGame/GameEnv.js";
import Character from "../adventureGame/CharacterDora.js";
import Prompt from "../adventureGame/Prompt.js";
import Player from "../adventureGame/Player.js";

class Npc extends Character {
    constructor(data = null) {
        super(data);
        this.role = data?.role || "generic"; // Define NPC role (Boots, Map, Swiper, etc.)
        this.sprite = data?.sprite || ""; // Sprite path
        this.position = data?.position || { x: 0, y: 0 }; // NPC position
        this.quiz = data?.quiz?.title || ""; // Quiz title (for Boots)
        this.questions = Prompt.shuffleArray(data?.quiz?.questions || []); // Shuffle questions
        this.dialogue = data?.dialogue || []; // General dialogue for non-quiz NPCs
        this.currentQuestionIndex = 0;
        this.alertTimeout = null;
        this.autoSteal = data?.autoSteal || false; // Swiper behavior
        this.bindEventListeners();
    }

    update() {
        this.draw();
    }

    bindEventListeners() {
        addEventListener("keydown", this.handleKeyDown.bind(this));
        addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    handleKeyDown({ key }) {
        if (key === "e") {
            this.interactWithPlayer();
        }
    }

    handleKeyUp({ key }) {
        if (key === "e" && this.alertTimeout) {
            clearTimeout(this.alertTimeout);
            this.alertTimeout = null;
        }
    }

    interactWithPlayer() {
        const players = GameEnv.gameObjects.filter(obj => obj instanceof Player);
        players.forEach(player => {
            const distance = this.calculateDistance(player);
            if (distance <= 100) {
                this.handleNpcInteraction(player);
            }
        });
    }

    calculateDistance(player) {
        return Math.sqrt(
            Math.pow(player.position.x - this.position.x, 2) +
            Math.pow(player.position.y - this.position.y, 2)
        );
    }

    handleNpcInteraction(player) {
        switch (this.role) {
            case "Boots":
                this.askSpanishQuestion(player);
                break;
            case "Map":
                this.provideGuidance(player);
                break;
            case "Swiper":
                if (this.autoSteal) this.attemptToSteal(player);
                break;
        }
    }

    askSpanishQuestion(player) {
        if (this.questions.length > 0 && !Prompt.isOpen) {
            Prompt.currentNpc = this;
            Prompt.openPromptPanel(this);
        }
    }

    provideGuidance(player) {
        this.showMessage("The key is hidden near the big tree!");
    }

    attemptToSteal(player) {
        if (player.items.length > 0) {
            const stolenItem = player.items.pop();
            this.showMessage(`Swiper swiped your ${stolenItem}!`);
        } else {
            this.showMessage("Swiper: Aw man! Nothing to steal.");
        }
    }

    chasePlayer() {
        const player = Player.getInstance();
        const dx = player.x - this.position.x;
        const dy = player.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) { // Small buffer to stop jittering
            this.position.x += (dx / distance) * 2;
            this.position.y += (dy / distance) * 2;
        }

        if (distance < 30) {
            alert("Swiper caught you! You lost the key.");
            player.removeItem("Key");
        }
    }

    showMessage(message) {
        const alertBox = document.getElementById("custom-alert");
        const alertMessage = document.getElementById("custom-alert-message");
        alertMessage.textContent = message;
        alertBox.style.display = "block";

        this.alertTimeout = setTimeout(() => {
            alertBox.style.display = "none";
        }, 3000);
    }
}

export default Npc;