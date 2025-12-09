// game.js - CATASTROPHE 2

import kaplay from "kaplay";
import { SCREEN_W, SCREEN_H, Colors } from './config/gameConfig.js';
import { getCharacterList } from './config/characters.js';
import { getLevel } from './config/levels.js';
import { getBoss } from './config/bosses.js';

// IMPORT SCENES
import { createMainMenuScene, createCharSelectScene } from './scenes/mainMenu.js';
import { createLevel1Scene, createLevel2Scene, createLevel3Scene } from './scenes/gamePlay.js';
import { 
  createCupBossScene, 
  createCucumberBossScene, 
  createObserverBossScene 
} from './scenes/bossScene.js';
import { 
  createGameOverScene, 
  createVictoryScene, 
  createLevelCompleteScene,
  createBossDefeatedScene
} from './scenes/gameOver.js';

console.log('🎮 CATastrophe 2 - Kaplay Edition Loading...');

// INITIALIZE KAPLAY
const k = kaplay({
  width: SCREEN_W,
  height: SCREEN_H,
  letterbox: true,
  background: [11, 11, 27],
  global: false, 
  canvas: document.getElementById("gameCanvas"),
  debug: true, 
});

window.k = k;
Object.assign(window, k);

console.log('✅ Kaplay initialized!');

loadFont("narrow", "assets/fonts/PTSansNarrow-Regular.ttf");
loadFont("narrowBold", "assets/fonts/PTSansNarrow-Bold.ttf");
loadFont("orbitron", "assets/fonts/Orbitron-Regular.ttf");
loadFont("orbitronBold", "assets/fonts/Orbitron-Bold.ttf");
loadFont("silkscreen", "assets/fonts/Silkscreen-Regular.ttf");
loadFont("science", "assets/fonts/ScienceGothic.ttf");

/**
 * LOAD ALL GAME ASSETS
 */
async function loadAssets() {
  console.log('📦 Loading game assets...');
  
  loadSound("menuMusic", "assets/sounds/MenuTrack.mp3"); 
  loadSound("levelMusic", "assets/sounds/PlatformerTrack.mp3");
  loadSound("bossMusic", "assets/sounds/BossTrack.mp3");
  loadSound("VictorySound", "assets/sounds/VictorySound.mp3");
  loadSound("VictoryTrack", "assets/sounds/VictoryTrack.mp3");
  loadSound("GameOverSound", "assets/sounds/GameOverSound.mp3");
  loadSound("GameOverTrack", "assets/sounds/GameOverTrack.mp3")
  loadSound("collectCup", "assets/sounds/collectCup.mp3");
  loadSound("powerUp", "assets/sounds/powerUp.mp3");
  loadSound("extraLife", "assets/sounds/extraLife.mp3")

  // BACKGRUNDS
  loadSprite("menuBG", "assets/images/CATastrophe/MenuBG3.png");
  loadSprite("SelectBG", "assets/images/CATastrophe/Select.png");
  loadSprite("battleBG", "assets/images/CATastrophe/BattleBG.png");
  loadSprite("battleBG2", "assets/images/CATastrophe/BattleBG2.png");
  loadSprite("battleBG3", "assets/images/CATastrophe/BattleBG3.png");
  loadSprite("battleBG5", "assets/images/CATastrophe/BattleBG5.png");
  //loadSprite("gameOverBG", "assets/images/CATastrophe/GameOverBG.png");
  loadSprite("level1BG", "assets/images/CATastrophe/Level1BG2.png", {
    sliceX: 1,  // 10 columns
    sliceY: 1,   // 1 row
    anims: {
      idle: { from: 0, to: 0} 
    }
  });
  
  // ENEMIES
  loadSprite("cup", "assets/images/CATastrophe/Cup.png");
  loadSprite("bossCup", "assets/images/CATastrophe/BossCup.png");
  loadSprite("smallRat", "assets/images/CATastrophe/SmallRat.png");
  loadSprite("bigRat", "assets/images/CATastrophe/BigRat.png");
  loadSprite("bossRat", "assets/images/CATastrophe/BossRatKing.png");
  loadSprite("littleCucumber", "assets/images/CATastrophe/LittleCucumber.png");
  loadSprite("bossCucumber", "assets/images/CATastrophe/BossCucumber.png");
  loadSprite("observer", "assets/images/CATastrophe/Observer.png");
  
  // ITEMS
  loadSprite("catTower", "assets/images/CATastrophe/CatTower.png");
  loadSprite("arrow", "assets/images/CATastrophe/Arrow.png");
  loadSprite("catnip", "assets/images/CATastrophe/Catnip.png");
  loadSprite("fish", "assets/images/CATastrophe/FishBones.png");
  loadSprite("mouse", "assets/images/CATastrophe/Mouse.png");
  loadSprite("tunaCan", "assets/images/CATastrophe/TunaCan.png");
  loadSprite("milkBottle", "assets/images/CATastrophe/MilkBottle.png");
  loadSprite("clock", "assets/images/CATastrophe/clock.png");

  //GLOWS
  loadSprite("glow", "assets/images/CATastrophe/BattleGlow.png");
  loadSprite("CupGlow", "assets/images/CATastrophe/CupGlow.png");
  loadSprite("CucumberGlow", "assets/images/CATastrophe/CucumberGlow.png");
  loadSprite("ObserverGlow", "assets/images/CATastrophe/ObserverGlow.png");
  
  // BATTLE ANIMATIONS
  loadSprite("explosion", "assets/images/CATastrophe/Explosion.png", { sliceX:6, sliceY:1, anims:{burst:{from:0,to:5}} });
  loadSprite("fire", "assets/images/CATastrophe/Fire.png", { sliceX:9, sliceY:1, anims:{ball:{from:0,to:8}} });
  loadSprite("smoke", "assets/images/CATastrophe/Smoke.png", { sliceX:9, sliceY:1, anims:{puff:{from:0,to:8}} });
  loadSprite("swirl", "assets/images/CATastrophe/Swirl.png", { sliceX:12, sliceY:1, anims:{spin:{from:0,to:11}} });
  loadSprite("powerup", "assets/images/CATastrophe/Powerup.png", { sliceX:9, sliceY:1, anims:{beam:{from:0,to:8}} });
  loadSprite("zoomies", "assets/images/CATastrophe/Zoomies.png", { sliceX:3, sliceY:3, anims:{glitch:{from:0,to:8}} });
  loadSprite("claw", "assets/images/CATastrophe/CatnipClaw.png", { sliceX:32, sliceY:1, anims:{slash:{from:0,to:31,speed:30}} }); 
  loadSprite("greenBlast", "assets/images/CATastrophe/GreenBlast.png", { sliceX:12, sliceY:1, anims:{glitch:{from:0,to:11}} });
  loadSprite("biscuits", "assets/images/CATastrophe/Biscuits.png", { sliceX:8, sliceY:3, anims:{glitch:{from:0,to:23}} });
  loadSprite("fireball", "assets/images/CATastrophe/Fireball.png", { sliceX:4, sliceY:1, anims:{glitch:{from:0,to:3}} });
  loadSprite("scratch", "assets/images/CATastrophe/Scratch.png", { sliceX:4, sliceY:1, anims:{glitch:{from:0,to:3}} });
  loadSprite("superposition", "assets/images/CATastrophe/Superposition.png", { sliceX: 4,   sliceY: 1,   anims: { glitch: { from: 0, to: 3 } }});
  loadSprite("shock", "assets/images/CATastrophe/Shock.png", {   sliceX: 4, sliceY: 1,   anims: { burst: { from: 0, to: 3 } }});
  loadSprite("hammer", "assets/images/CATastrophe/HydrogenHammer.png", { sliceX: 10, sliceY: 1, anims: { smash: { from: 0, to: 9 } }});
  loadSprite("box", "assets/images/CATastrophe/box.png", { sliceX: 2, sliceY: 1, anims: { glitch: { from: 0, to: 1 } }});
  loadSprite("bottle", "assets/images/CATastrophe/PoisonBottle.png", { sliceX: 1, sliceY: 1, anims: { glitch: { from: 0, to: 0 } }});
  loadSprite("shatter", "assets/images/CATastrophe/Shatter.png", { sliceX: 6, sliceY: 1, anims: { glitch: { from: 0, to: 5 } }});
  loadSprite("poison", "assets/images/CATastrophe/Poison.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});



  const characters = getCharacterList();
  
  for (const char of characters) {

    loadSprite(char.sprites.menu, `${char.sprites.menu}`);
    loadSprite(char.sprites.big, `${char.sprites.big}`);
    loadSprite(char.sprites.battle, `${char.sprites.battle}`);
    
    loadSprite(char.sprites.stand, `${char.sprites.stand}`);
    loadSprite(char.sprites.walk, `${char.sprites.walk}`, {
      sliceX: 8,  
      sliceY: 1,
      anims: {
        walk: { from: 0, to: 7, loop: true, speed: 10 }
      }});
    loadSprite(char.sprites.jump, `${char.sprites.jump}`);
    loadSprite(char.sprites.idle, `${char.sprites.idle}`);
  }
  
  console.log('✅ Assets loaded!');
}

/**
 * REGISTER ALL GAME SCENES
 */
function registerScenes() {
  console.log('🎬 Registering scenes...');
  
  scene("menu", () => createMainMenuScene());
  scene("charSelect", () => createCharSelectScene());


scene("level1", (data) => {
  const character = data?.character || data;
  createLevel1Scene(character);
});

scene("level2", (data, hp) => {
  const character = data?.character || data;
  const playerHP = data?.playerHP || hp;
  createLevel2Scene(character, playerHP);
});

scene("level3", (data, hp) => {
  const character = data?.character || data;
  const playerHP = data?.playerHP || hp;
  createLevel3Scene(character, playerHP);
});

// BOSS BATTLES
scene("cupBoss", (data) => createCupBossScene(data.character, data.playerHP));
scene("cucumberBoss", (data) => createCucumberBossScene(data.character, data.playerHP));
scene("observerBoss", (data) => createObserverBossScene(data.character, data.playerHP));
  
  // GAME OVER AND VICTORY
  scene("gameOver", (data) => createGameOverScene(data));
  scene("victory", (data) => createVictoryScene(data));
  scene("levelComplete", (data) => createLevelCompleteScene(data));
  scene("bossDefeated", (data) => createBossDefeatedScene(data));
  
  console.log('✅ Scenes registered!');
}

/**
 * START THE GAME
 */
async function startGame() {
  console.log('🚀 Starting CATastrophe 2...');
  
  await loadAssets();
  
  registerScenes();
  

  const menuMusic = play("menuMusic", {
    volume: 0.5,
    loop: true
  });
  
  // STORE GLOBALLY SO SCENES CAN ACCESS
  window.menuMusic = menuMusic;
  
  // START AT MENU
  go("menu");
  console.log('✅ Game started! Welcome to CATastrophe 2: Cucumber Invasion!');
}


startGame();