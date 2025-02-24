import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';

class GameLevelWater {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    let width = window.innerWidth; // Fixed issue with GameEnv
    let height = window.innerHeight;

    // Background data
    const image_src_forest = path + "/images/gamify/forest.png";
    const image_data_forest = {
        name: 'forest',
        greeting: "Welcome to the forest! Help Dora find the key and save Rachit!",
        src: image_src_forest,
        pixels: {height: 580, width: 1038}
    };

    // Player data for Dora
    const sprite_src_dora = path + "/images/gamify/dora_sprite.png"; // Ensure file exists
    const DORA_SCALE_FACTOR = 5;
    const sprite_data_dora = {
        id: 'Dora',
        greeting: "¡Hola! I am Dora, ready for an adventure!",
        src: sprite_src_dora,
        SCALE_FACTOR: DORA_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height / DORA_SCALE_FACTOR) }, 
        pixels: {height: 384, width: 512},
        orientation: {rows: 3, columns: 4 },
        down: {row: 0, start: 0, columns: 3 },
        left: {row: 3, start: 0, columns: 3 },
        right: {row: 2, start: 0, columns: 3 },
        up: {row: 1, start: 0, columns: 3 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 },
        hasKey: false
    };

    // NPC data for Boots (stationary NPC with quiz)
    const sprite_src_boots = path + "/assets/npcs/boots.png"; // Ensure file exists
    const sprite_data_boots = {
        id: 'Boots',
        greeting: "Hi! I’m Boots! Let’s learn Spanish together!",
        src: sprite_src_boots,
        SCALE_FACTOR: 8,
        ANIMATION_RATE: 50,
        pixels: {height: 128, width: 128},
        INIT_POSITION: { x: (width / 2), y: (height / 2)},
        orientation: {rows: 2, columns: 2 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        quiz: { 
          title: "Spanish Quiz",
          questions: [
            "How do you say 'hello' in Spanish?\n1. Hola\n2. Bonjour\n3. Hello\n4. Ciao",
            "How do you say 'thank you' in Spanish?\n1. Gracias\n2. Merci\n3. Danke\n4. Arigato",
            "What is the Spanish word for 'blue'?\n1. Azul\n2. Rojo\n3. Verde\n4. Amarillo"
          ] 
        }
    };

    // NPC data for Swiper
    const sprite_src_swiper = path + "/images/gamify/swiper.png";
    const sprite_data_swiper = {
        id: 'Swiper',
        greeting: "Swiper no swiping! Oh man!",
        src: sprite_src_swiper,
        SCALE_FACTOR: 10,
        ANIMATION_RATE: 50,
        pixels: {height: 301, width: 801},
        INIT_POSITION: { x: (width / 4), y: (height / 4)},
        orientation: {rows: 2, columns: 2 },
        down: {row: 0, start: 0, columns: 3 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
        chase: false,
        speed: 5
    };

    // NPC data for the Map
    const sprite_src_map = path + "/assets/npcs/map.png"; // Ensure file exists
    const sprite_data_map = {
        id: 'Map',
        greeting: "I’m the Map! I can help you find the key!",
        src: sprite_src_map,
        SCALE_FACTOR: 10,
        ANIMATION_RATE: 100,
        pixels: {height: 128, width: 128},
        INIT_POSITION: { x: (width * 3 / 4), y: (height * 3 / 4)},
        orientation: {rows: 2, columns: 2 },
        down: {row: 0, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        hint: "Use the Q key to dig!"
    };

    // Random key placement function
    const randomPosition = (width, height) => {
        return { x: Math.random() * width, y: Math.random() * height };
    };

    // Key object
    const key_data = {
        id: 'Key',
        greeting: "You found the key! Now take it to the chest!",
        src: path + "/assets/npcs/key.png",
        SCALE_FACTOR: 5,
        INIT_POSITION: randomPosition(width, height),
        visible: false 
    };

    // Chest object
    const chest_data = {
        id: 'Chest',
        greeting: "Place the key here to unlock Rachit!",
        src: path + "/assets/npcs/chest.png",
        SCALE_FACTOR: 5,
        INIT_POSITION: { x: (width * 2 / 3), y: (height / 3) }
    };

    this.objects = [
        { class: Background, data: image_data_forest },
        { class: Player, data: sprite_data_dora },
        { class: Npc, data: sprite_data_boots },
        { class: Npc, data: sprite_data_swiper },
        { class: Npc, data: sprite_data_map },
        { class: Npc, data: key_data },
        { class: Npc, data: chest_data }
    ];
  }

  dig(x, y) {
    let key = this.objects.find(obj => obj.data.id === 'Key').data;
    if (!key.visible && Math.abs(x - key.INIT_POSITION.x) < 20 && Math.abs(y - key.INIT_POSITION.y) < 20) {
      key.visible = true;
      let swiper = this.objects.find(obj => obj.data.id === 'Swiper').data;
      swiper.chase = true;
    }
  }
}

export default GameLevelWater;