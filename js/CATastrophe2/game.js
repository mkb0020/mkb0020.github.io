import kaplay from "kaplay";
import { SCREEN_W, SCREEN_H, Colors } from './config/gameConfig.js';
import { getCharacterList } from './config/characters.js';
import { getLevel } from './config/levels.js';
import { getBoss } from './config/bosses.js';
import { createVolumeToggle, stopAllMusic, startMenuMusic } from './utils/audioControls.js';
// IMPORT SCENES
import { createStartScene, createMainMenuScene, createCharSelectScene } from './scenes/mainMenu.js';
import { createTransitionScene } from './scenes/transitionScene.js';
import { createLevel1Scene, createLevel2Scene, createLevel3Scene, createLevel4Scene, createLevel5Scene } from './scenes/gamePlay.js';
import { 
  createLaserPointerBossScene,
  createCupBossScene, 
  createCucumberBossScene, 
  createRatKingBossScene,         
  createObserverBossScene 
} from './scenes/bossScene.js';
import {  
  createYouDiedScene,  
  createVictoryScene, 
  createLevelCompleteScene,
  createBossDefeatedScene,
  createGameOverScene,
  //createCreditsScene  
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
  //MUSIC
  loadSound("menuMusic", "assets/sounds/MenuTrack.mp3"); 
  loadSound("finalBossMusic", "assets/sounds/FnalBossTrack.mp3");
  loadSound("GameOverTrack", "assets/sounds/GameOverTrack.mp3")
  loadSound("VictoryTrack", "assets/sounds/VictoryTrack.mp3");
  loadSound("catnipTrack", "assets/sounds/CatnipTrack.mp3");
  loadSound("finalVictory", "assets/sounds/FinalVictory.mp3");
  loadSound("levelMusic", "assets/sounds/PlatformerTrack.mp3");
  loadSound("bossMusic", "assets/sounds/BossTrack.mp3");
  loadSound("PlatformerTrack1", "assets/sounds/PlatformerTrack1.mp3");
  loadSound("PlatformerTrack2", "assets/sounds/PlatformerTrack2.mp3");
  loadSound("PlatformerTrack3", "assets/sounds/PlatformerTrack3.mp3");
  loadSound("PlatformerTrack4", "assets/sounds/PlatformerTrack4.mp3");
  loadSound("PlatformerTrack5", "assets/sounds/PlatformerTrack5.mp3");
  //SOUNDS
  loadSound("collectCup", "assets/sounds/mk/cup.mp3");
  loadSound("powerUp", "assets/sounds/mk/getPoints.mp3");
  loadSound("extraLife", "assets/sounds/mk/exrtraLife.mp3");
  loadSound("flip", "assets/sounds/mk/flip.mp3");
  loadSound("ratKill", "assets/sounds/mk/rat.mp3");
  loadSound("takeHit", "assets/sounds/mk/takehit.mp3");
  loadSound("laserHit", "assets/sounds/mk/laserHit.mp3");
  loadSound("gameOverSound", "assets/sounds/gameOverSound.mp3");
  loadSound("VictorySound", "assets/sounds/VictorySound.mp3");
  loadSound("lightning", "assets/sounds/Lightning.mp3");
  loadSound("bossLand", "assets/sounds/bossLand.mp3");
// MEOWS
  loadSound("happyMeow", "assets/sounds/mk/meow06.mp3");
  loadSound("meow00", "assets/sounds/meow00.mp3");
  loadSound("meow01", "assets/sounds/meow01.mp3");
  loadSound("meow02", "assets/sounds/mk/meow05.mp3"); 
// SPECIAL MOVE SOUNDS
  loadSound("cupFinishHim", "assets/sounds/cup.mp3");
  loadSound("cucumberFinishHim", "assets/sounds/cucumber.mp3");
  loadSound("ratFinishHim", "assets/sounds/rat.mp3");
  loadSound("laserFinishHim", "assets/sounds/laser.mp3");
  loadSound("finalFinishHim", "assets/sounds/finalBoom.mp3");


  loadSprite("questionBubble", "assets/images/CATastrophe/question.png");
  loadSprite("purrBubble", "assets/images/CATastrophe/purr.png");
  loadSprite("meowBubble", "assets/images/CATastrophe/meow.png");
  loadSprite("heartBubble", "assets/images/CATastrophe/heart.png");
  loadSprite("plusHeartBubble", "assets/images/CATastrophe/plusHeart.png");
  loadSprite("starBubble", "assets/images/CATastrophe/star.png");
  loadSprite("plusTenBubble", "assets/images/CATastrophe/ten.png");
  loadSprite("plusHPBubble", "assets/images/CATastrophe/HP.png");
  loadSprite("exclamationBubble", "assets/images/CATastrophe/exclamation.png");
  // BACKGRUNDS
  loadSprite("startBG", "assets/images/CATastrophe/backgrounds/StartBG.png");
  loadSprite("menuBG", "assets/images/CATastrophe/backgrounds/MenuBG3.png");
  loadSprite("SelectBG", "assets/images/CATastrophe/backgrounds/Select.png");
  loadSprite("transitionBG", "assets/images/CATastrophe/backgrounds/transitionBG.png");
  loadSprite("transitionBG2", "assets/images/CATastrophe/backgrounds/transitionBG2.png");
  loadSprite("transitionBG3", "assets/images/CATastrophe/backgrounds/transitionBG3.png");
  loadSprite("transitionBG4", "assets/images/CATastrophe/backgrounds/transitionBG4.png");
  loadSprite("transitionBG5", "assets/images/CATastrophe/backgrounds/transitionBG5.png");
  loadSprite("transitionBG6", "assets/images/CATastrophe/backgrounds/transitionBG6.png");
  loadSprite("transitionBG7", "assets/images/CATastrophe/backgrounds/transitionBG7.png");
  loadSprite("observerIntro", "assets/images/CATastrophe/backgrounds/ObserverIntro.png");
  loadSprite("battleBG1", "assets/images/CATastrophe/backgrounds/BattleBG1.png");
  loadSprite("gameOverBG", "assets/images/CATastrophe/backgrounds/GameOverBG.png"); // FOR LOSING ALL LIVES
  loadSprite("VictoryBG", "assets/images/CATastrophe/backgrounds/VictoryBG.png"); // FOR FINAL VICTORY
  loadSprite("creditsBG", "assets/images/CATastrophe/backgrounds/creditsBG.png"); // FOR FINAL VICTORY
  loadSprite("cafe", "assets/images/CATastrophe/backgrounds/Cafe.png"); // FOR FINAL VICTORY
  loadSprite("darkCafe", "assets/images/CATastrophe/backgrounds/DarkCafe.png"); // FOR FINAL VICTORY

  loadSprite("level1BG", "assets/images/CATastrophe/backgrounds/level1BG.png", {
    sliceX: 1,  
    sliceY: 1,   
    anims: {
      idle: { from: 0, to: 0} 
    }
  });

    loadSprite("l2BG", "assets/images/CATastrophe/backgrounds/Level2BG.png", {
    sliceX: 1,  
    sliceY: 1,   
    anims: {
      idle: { from: 0, to: 0} 
    }
  });

    loadSprite("l3BG", "assets/images/CATastrophe/backgrounds/Level3BG.png", {
    sliceX: 1,  
    sliceY: 1,  
    anims: {
      idle: { from: 0, to: 0} 
    }
  });

    loadSprite("l4BG", "assets/images/CATastrophe/backgrounds/Level4BG.png", {
    sliceX: 1,  
    sliceY: 1,   
    anims: {
      idle: { from: 0, to: 0} 
    }
  });

    loadSprite("l5BG", "assets/images/CATastrophe/backgrounds/Level5BG.png", {
    sliceX: 1,  
    sliceY: 1,   
    anims: {
      idle: { from: 0, to: 0} 
    }
  });
  
  // ENEMIES
  loadSprite("glow", "assets/images/CATastrophe/cats/battle/Glow.png");
  loadSprite("cup", "assets/images/CATastrophe/enemies/Cup.png");
  loadSprite("littleCucumber", "assets/images/CATastrophe/attacks/LittleCucumber.png");
  loadSprite("smallRat", "assets/images/CATastrophe/attacks/SmallRat.png");
  loadSprite("smallRat2", "assets/images/CATastrophe/enemies/SmallRat2.png");
  loadSprite("ghostRat", "assets/images/CATastrophe/attacks/GhostRat.png");
  loadSprite("bigRat", "assets/images/CATastrophe/enemies/BigRat.png");

  loadSprite("bossLaserPointer", "assets/images/CATastrophe/enemies/BossLaserPointer.png");
  loadSprite("laserPointerGlow", "assets/images/CATastrophe/enemies/LaserGlow.png");
  loadSprite("bossCup", "assets/images/CATastrophe/enemies/BossCup.png");
  loadSprite("CupGlow", "assets/images/CATastrophe/enemies/CupGlow.png");
  loadSprite("bossRat", "assets/images/CATastrophe/enemies/BossRatKing.png");
  loadSprite("RatGlow", "assets/images/CATastrophe/enemies/RatGlow.png");
  loadSprite("bossCucumber", "assets/images/CATastrophe/enemies/BossCucumber.png");
  loadSprite("CucumberGlow", "assets/images/CATastrophe/enemies/CucumberGlow.png");
  loadSprite("bossRat", "assets/images/CATastrophe/enemies/BossRatKing.png");
  loadSprite("observer", "assets/images/CATastrophe/enemies/Observer.png");
  loadSprite("ObserverGlow", "assets/images/CATastrophe/enemies/ObserverGlow.png");
  // ITEMS
  loadSprite("catTower", "assets/images/CATastrophe/items/CatTower.png");
  loadSprite("arrow", "assets/images/CATastrophe/items/Arrow.png");
  loadSprite("catnip", "assets/images/CATastrophe/items/Catnip.png");
  loadSprite("fish", "assets/images/CATastrophe/items/FishBones.png");
  loadSprite("tunaCan", "assets/images/CATastrophe/items/TunaCan.png");
  loadSprite("milkBottle", "assets/images/CATastrophe/items/MilkBottle.png");
  loadSprite("clock", "assets/images/CATastrophe/items/clock.png");
  loadSprite("catnip", "assets/images/CATastrophe/items/Catnip.png");
  loadSprite("yeet", "assets/images/CATastrophe/yeet.png");
  loadSprite("pawsed", "assets/images/CATastrophe/pawsed.png");
  loadSprite("nekoState", "assets/images/CATastrophe/attacks/nekoState.png", { sliceX:8, sliceY:1, anims:{pulse:{from:0,to:7, loop: false, speed:7}} });
  loadSprite("nekoNA", "assets/images/CATastrophe/attacks/nekoNA.png", { sliceX:33, sliceY:1, anims:{pulse:{from:0,to:32, loop: false, speed:7}} });
  // SCENES
  loadSprite("drip", "assets/images/CATastrophe/attacks/BloodDrip.png", { sliceX:10, sliceY:1, anims:{drip:{from:0,to:9, loop: false, speed:7}} });
  loadSprite("drip2", "assets/images/CATastrophe/attacks/Drip2.png", { 
    sliceX: 17, 
    sliceY: 1, 
    anims: { drip: { from: 0, to: 16 } } 
});
  loadSprite("drip3", "assets/images/CATastrophe/attacks/Drip3.png", { 
    sliceX: 12, 
    sliceY: 1, 
    anims: { drip: { from: 0, to: 11 } } 
});
  loadSprite("lightning", "assets/images/CATastrophe/attacks/Lightning.png", { sliceX:6, sliceY:1, anims:{glitch:{from:0,to:5}} });
  loadSprite("smokeReveal1", "assets/images/CATastrophe/attacks/smokeReveal1.png", { sliceX:21, sliceY:1, anims:{puff:{from:0,to:20, loop: false, speed:15}} });
  loadSprite("smoke2", "assets/images/CATastrophe/attacks/smokeReveal2.png", { sliceX:14, sliceY:1, anims:{puff:{from:0,to:13, loop: false, speed:10}} });
  loadSprite("smokeClear", "assets/images/CATastrophe/attacks/smokeClear.png", { sliceX:18, sliceY:1, anims:{puff:{from:0,to:17, loop: false, speed:10}} });
  loadSprite("levelShiftStart", "assets/images/CATastrophe/attacks/glitchTransition.png", { 
    sliceX: 55, 
    sliceY: 1, 
    anims: {
      glitch: { from: 0, to: 16, loop: false, speed: 50 }
    } 
  });

  loadSprite("levelShiftEnd", "assets/images/CATastrophe/attacks/glitchTransition.png", { 
    sliceX: 55, 
    sliceY: 1, 
    anims: {
      glitch: { from: 32, to: 54, loop: false, speed: 50 }
    } 
  });

  // BATTLE ANIMATIONS
  loadSprite("explosion", "assets/images/CATastrophe/attacks/Explosion.png", { sliceX:6, sliceY:1, anims:{burst:{from:0,to:5}} });
  loadSprite("fire", "assets/images/CATastrophe/attacks/Fire.png", { sliceX:9, sliceY:1, anims:{ball:{from:0,to:8}} });
  loadSprite("smoke", "assets/images/CATastrophe/attacks/Smoke.png", { sliceX:9, sliceY:1, anims:{puff:{from:0,to:8}} });
  loadSprite("swirl", "assets/images/CATastrophe/attacks/Swirl.png", { sliceX:12, sliceY:1, anims:{spin:{from:0,to:11}} });
  loadSprite("powerup", "assets/images/CATastrophe/attacks/Powerup.png", { sliceX:9, sliceY:1, anims:{beam:{from:0,to:8}} });
  loadSprite("zoomies", "assets/images/CATastrophe/attacks/Zoomies.png", { sliceX:3, sliceY:3, anims:{glitch:{from:0,to:8}} });
  loadSprite("claw", "assets/images/CATastrophe/attacks/CatnipClaw.png", { sliceX:32, sliceY:1, anims:{slash:{from:0,to:31,speed:30}} }); 
  loadSprite("greenBlast", "assets/images/CATastrophe/attacks/GreenBlast.png", { sliceX:12, sliceY:1, anims:{glitch:{from:0,to:11}} });
  loadSprite("biscuits", "assets/images/CATastrophe/attacks/Biscuits.png", { sliceX:8, sliceY:3, anims:{glitch:{from:0,to:23}} });
  loadSprite("fireball", "assets/images/CATastrophe/attacks/Fireball.png", { sliceX:4, sliceY:1, anims:{glitch:{from:0,to:3}} });
  loadSprite("scratch", "assets/images/CATastrophe/attacks/Scratch.png", { sliceX:4, sliceY:1, anims:{glitch:{from:0,to:3}} });
  loadSprite("superposition", "assets/images/CATastrophe/attacks/Superposition.png", { sliceX: 4,   sliceY: 1,   anims: { glitch: { from: 0, to: 3 } }});
  loadSprite("shock", "assets/images/CATastrophe/attacks/Shock.png", {   sliceX: 4, sliceY: 1,   anims: { burst: { from: 0, to: 3 } }});
  loadSprite("hammer", "assets/images/CATastrophe/attacks/HydrogenHammer.png", { sliceX: 10, sliceY: 1, anims: { smash: { from: 0, to: 9 } }});
  loadSprite("box", "assets/images/CATastrophe/attacks/box.png", { sliceX: 2, sliceY: 1, anims: { glitch: { from: 0, to: 1 } }});
  loadSprite("bottle", "assets/images/CATastrophe/attacks/PoisonBottle.png", { sliceX: 1, sliceY: 1, anims: { glitch: { from: 0, to: 0 } }});
  loadSprite("shatter", "assets/images/CATastrophe/attacks/Shatter.png", { sliceX: 6, sliceY: 1, anims: { glitch: { from: 0, to: 5 } }});
  loadSprite("poison", "assets/images/CATastrophe/attacks/Poison.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
  loadSprite("bam", "assets/images/CATastrophe/attacks/Bam.png", { sliceX: 8, sliceY: 1, anims: { glitch: { from: 0, to: 7 } }});
  loadSprite("bite", "assets/images/CATastrophe/attacks/Bite.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
  loadSprite("laserCharge", "assets/images/CATastrophe/attacks/LaserCharge.png", { sliceX: 6, sliceY: 1, anims: { glitch: { from: 0, to: 5 } }});
  loadSprite("laserBeam", "assets/images/CATastrophe/attacks/LaserBeam.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
  loadSprite("zap", "assets/images/CATastrophe/attacks/Zap.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
  loadSprite("rage", "assets/images/CATastrophe/attacks/RodentRage.png", { sliceX:3, sliceY:3, anims:{glitch:{from:0,to:8}} });
  loadSprite("boom", "assets/images/CATastrophe/attacks/RedBoom.png", { sliceX:6, sliceY:1, anims:{burst:{from:0,to:5}} });
  loadSprite("poof", "assets/images/CATastrophe/attacks/Poof.png", { sliceX:8, sliceY:1, anims:{burst:{from:0,to:7}} });
  //FINISH HIM MOVES
  loadSprite("lock", "assets/images/CATastrophe/attacks/LockOn.png", { sliceX:22, sliceY:1, anims:{glitch:{from:0,to:21,speed:15}} });
  loadSprite("catArrow", "assets/images/CATastrophe/attacks/CatArrow2.png");
  loadSprite("CocktailLight", "assets/images/CATastrophe/attacks/MeowlotovCocktailLight2.png", { sliceX:3, sliceY:1, anims:{glitch:{from:0,to:2}} });
  loadSprite("CocktailSpin", "assets/images/CATastrophe/attacks/MeowlotovCocktailSpin2.png", { sliceX:4, sliceY:1, anims:{glitch:{from:0,to:3}} });
  loadSprite("lock2", "assets/images/CATastrophe/attacks/LockOn2.png", { sliceX:22, sliceY:1, anims:{glitch:{from:0,to:21,speed:30}} });
  loadSprite("Burn", "assets/images/CATastrophe/attacks/Burn.png", { sliceX:4, sliceY:1, anims:{glitch:{from:0,to:3}} });
  loadSprite("MuzzleFlash", "assets/images/CATastrophe/attacks/MuzzleFlash.png", { sliceX:6, sliceY:1, anims:{burst:{from:0,to:5}} });
  loadSprite("pinkBoom", "assets/images/CATastrophe/attacks/PinkBoom.png", { sliceX:6, sliceY:1, anims:{burst:{from:0,to:5}} });
  loadSprite("mushroom", "assets/images/CATastrophe/attacks/MushroomCloud2.png", { sliceX:4, sliceY:2, anims:{burst:{from:0,to:7}} });
  loadSprite("splat", "assets/images/CATastrophe/attacks/Splat.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
  loadSprite("BrassToeBeans", "assets/images/CATastrophe/attacks/BrassToeBeans2.png");
  loadSprite("rifle", "assets/images/CATastrophe/attacks/PurrcisionRifle2.png");
  loadSprite("CrossBow", "assets/images/CATastrophe/attacks/CatCrossBow2.png", { sliceX: 2, sliceY: 1, anims: { glitch: { from: 0, to: 1 } }});
// SPECIAL MOVE
  loadSprite("whip", "assets/images/CATastrophe/attacks/whip2.png", { sliceX:5, sliceY:1, anims:{glitch:{from:0,to:4,speed:50}} });

  const characters = getCharacterList();
  
  for (const char of characters) {
    loadSprite(char.sprites.glitchBlue, `${char.sprites.glitchBlue}`);
    loadSprite(char.sprites.glitchRed, `${char.sprites.glitchRed}`);
    loadSprite(char.sprites.glow, `${char.sprites.glow}`);
    loadSprite(char.sprites.battle, `${char.sprites.battle}`);
    loadSprite(char.sprites.catch, `${char.sprites.catch}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.cup00, `${char.sprites.cup00}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.cup01, `${char.sprites.cup01}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.cup02, `${char.sprites.cup02}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.jump, `${char.sprites.jump}`);
    loadSprite(char.sprites.king00, `${char.sprites.king00}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.king01, `${char.sprites.king01}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.king02, `${char.sprites.king02}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.menu, `${char.sprites.menu}`);
    loadSprite(char.sprites.sitSmall, `${char.sprites.sitSmall}`);
    loadSprite(char.sprites.sitLookForwardRegular, `${char.sprites.sitLookForwardRegular}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.sitLookForwardMad, `${char.sprites.sitLookForwardMad}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.sitLookBackRegular, `${char.sprites.sitLookBackRegular}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.sitLookBackMad, `${char.sprites.sitLookBackMad}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.idle, `${char.sprites.idle}`);
    loadSprite(char.sprites.standRegular, `${char.sprites.standRegular}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.standMad, `${char.sprites.standMad}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.standSmall, `${char.sprites.standSmall}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.pounce, `${char.sprites.pounce}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.select, `${char.sprites.select}`);
    loadSprite(char.sprites.sleep, `${char.sprites.sleep}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.stretch, `${char.sprites.stretch}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.wakeUp, `${char.sprites.wakeUp}`); // FOR TRANSITION SCENE
    loadSprite(char.sprites.walk, `${char.sprites.walk}`, {
      sliceX: 8,  
      sliceY: 1,
      anims: {
        walk: { from: 0, to: 7, loop: true, speed: 10 }
      }});

 
    loadSprite("rainbowIdle", "assets/images/CATastrophe/cats/catnip/stand.png");
    loadSprite("rainbowJump", "assets/images/CATastrophe/cats/catnip/jump.png");
    loadSprite("rainbowWalk", "assets/images/CATastrophe/cats/catnip/walk.png", {
      sliceX: 8,
      sliceY: 1,
      anims: {
        walk: { from: 0, to: 7, loop: true, speed: 10 }
      }
    });

   
  }
  
  console.log('✅ Assets loaded!');
}

/**
 * REGISTER ALL GAME SCENES
 */
function registerScenes() {
  console.log('🎬 Registering scenes...');

  scene("start", () => createStartScene());

  scene("menu", () => createMainMenuScene());
  scene("charSelect", () => createCharSelectScene());


 scene("level1", (data) => {
  createLevel1Scene(data); 
});

  scene("level2", (data) => {
      createLevel2Scene(data);
    });

  scene("level3", (data) => {
      createLevel3Scene(data);
    });

  scene("level4", (data) => {
      createLevel4Scene(data);
    });

  scene("level5", (data) => {
      createLevel5Scene(data);
    });

  // BOSS BATTLES
  scene("laserPointerBoss", (data) => createLaserPointerBossScene(data.character, data.playerHP));
  scene("cupBoss", (data) => createCupBossScene(data.character, data.playerHP));
  scene("cucumberBoss", (data) => createCucumberBossScene(data.character, data.playerHP));
  scene("bossRatKing", (data) => createRatKingBossScene(data.character, data.playerHP));
  scene("observerBoss", (data) => createObserverBossScene(data.character, data.playerHP));
  
  // GAME OVER AND VICTORY
  scene("youDied", (data) => createYouDiedScene(data));
  scene("gameOver", (data) => createGameOverScene(data));
  scene("victory", (data) => createVictoryScene(data));
  scene("levelComplete", (data) => createLevelCompleteScene(data));
  scene("bossDefeated", (data) => createBossDefeatedScene(data));
  
  scene("transition", (transitionKey, character, playerHP) => 
    createTransitionScene(transitionKey, character, playerHP)
    );



  console.log('✅ Scenes registered!');
}


async function startGame() {
  console.log('🚀 Starting CATastrophe 2...');
  
  await loadAssets();
  
  registerScenes();
  
  // START AT MENU
  go("start");
  console.log('✅ Game started! Click to begin...');
}


startGame();