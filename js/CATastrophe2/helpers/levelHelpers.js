// levelHelpers.js
import { SCREEN_W, SCREEN_H, Colors } from '../config/gameConfig.js';
import { spawnEnemy, handlePlayerEnemyCollision, updateEnemies } from '../systems/levelSystem.js';
import { createVolumeToggle } from '../utils/audioControls.js';
import { setupPauseSystem } from '../utils/pauseSystem.js';

/**
 * ANIMATION STATE MACHINE - SWITCHES SPRITES ANIMATIONS ONLY ON STATE CHANGE
 */
export function updatePlayerAnim(player, character) {
  let newState;
  const grounded = player.isGrounded();

  if (!grounded) {
    newState = 'jump';
  } else if (player.isMoving) {
    newState = 'walk';
  } else {
    newState = 'idle';
  }

  // ONLY switch if state changed!
  if (newState !== player.curState) {
    player.curState = newState;
    console.log(`🎭 Anim: ${newState}`);

    if (newState === 'walk') {
      player.use(sprite(character.sprites.walk));
      player.play("walk");
    } else if (newState === 'jump') {
      player.use(sprite(character.sprites.jump));
    } else {  // idle
      const idleSpr = character.sprites.idle || character.sprites.stand;
      player.use(sprite(idleSpr));
      if (player.curAnim()) player.stop();
    }
  }
}

/**
 * MUSIC
 */
export function setupLevelMusic() {
  if (window.menuMusic) {
    window.menuMusic.stop();
    window.menuMusic = null;
  }
  window.levelMusic = play("levelMusic", { volume: 0.4, loop: true });
  
  onSceneLeave(() => { 
    if (window.levelMusic) {
      window.levelMusic.stop();
      window.levelMusic = null;
    }
  });
}

/**
 * BG, PLATFORMS, GROUND
 */
export function addLevelEnvironment(levelConfig) {
  // BG
  const bg = add([
    sprite(levelConfig.background, { anim: "idle" }),
    pos(0, 0),
    scale(2, 2),
    z(0),
    "background"
  ]);

  // PLATFORMS
  levelConfig.platforms.forEach(platform => {
    add([
      rect(platform.width, platform.height, { radius: 5 }),
      pos(platform.x, platform.y),
      area(),
      body({ isStatic: true }),
      color(Color.fromHex(Colors.CoolGray)),
      outline(3, Color.fromHex(Colors.DarCoolGrey)),
      "platform"
    ]);
  });

  // GROUND
  const ground = levelConfig.groundPlatform;
  add([
    rect(ground.width, ground.height),
    pos(ground.x, ground.y),
    area(),
    body({ isStatic: true }),
    color(rgb(47, 54, 61)),
    outline(5, rgb(56, 63, 73)),
    "ground"
  ]);

  return { bg };
}

/**
 * TOP RECTS
 */
export function addUIBackgrounds() {
  add([ // FOR SCORE
    rect(200, 50, { radius: 50 }),
    pos(130, 15),
    fixed(),
    color(Color.fromHex("#000000")),
    opacity(1),
    outline(3, Color.fromHex(Colors.NuclearFuscia)),
    z(99)
  ]);

  add([  // FOR HP
    rect(200, 50, { radius: 50 }),
    pos(350, 15),
    fixed(),
    color(Color.fromHex("#000000")),
    opacity(1),
    outline(3, Color.fromHex(Colors.PlasmaPurple)),
    z(99)
  ]);

  add([ // FOR LIVES
    rect(200, 50, { radius: 50 }),
    pos(570, 15),
    fixed(),
    color(Color.fromHex("#000000")),
    opacity(1),
    outline(3, Color.fromHex(Colors.MintBlue)),
    z(99)
  ]);

  add([ // FOR TIMER
    rect(200, 50, { radius: 50 }),
    pos(790, 15),
    fixed(),
    color(Color.fromHex("#000000")),
    opacity(1),
    outline(3, Color.fromHex(Colors.RadioactiveGreen)),
    z(99)
  ]);

  add([ // FOR VOLUME AND PAUSE CONTROLS
    rect(100, 50, { radius: 50 }),
    pos(10, 15),
    fixed(),
    color(Color.fromHex("#000000")),
    opacity(1),
    outline(3, Color.fromHex(Colors.LightGray)),
    z(99)
  ]);
}

/**
 *  ADD VICTORY AREA (CAT TOWER + PATFORM)
 */
export function addVictoryArea(levelConfig) {
  const catTower = add([
    sprite('catTower'),
    pos(levelConfig.length - 750, 140),
    scale(1.0),
    z(10),
    "catTower"
  ]);

  const arrow = add([
    sprite('arrow'),
    pos(levelConfig.length - 640, 220),
    anchor("center"),
    scale(0.7),
    z(11),
    "arrow"
  ]);

  const arrow2 = add([
    sprite('arrow'),
    pos(levelConfig.length - 640, 360),
    anchor("center"),
    scale(0.7),
    z(11),
    "arrow2"
  ]);

  const victoryPlatform = add([
    rect(190, 20),
    pos(levelConfig.length - 725, 140),
    area(),
    body({ isStatic: true }),
    color(Color.fromHex(Colors.PlasmaPurple)),
    outline(7, Color.fromHex(Colors.PlasmaPurple)),
    z(11),
    "victoryPlatform"
  ]);

  const helperPlatform = add([
    rect(100, 20),
    pos(levelConfig.length - 1150, 310),
    area(),
    body({ isStatic: true }),
    color(Colors.MintBlue),
    opacity(1),
    z(11),
    "helperPlatform"
  ]);

  const helperPlatform2 = add([
    rect(100, 20),
    pos(levelConfig.length - 950, 240),
    area(),
    body({ isStatic: true }),
    color(Colors.MintBlue),
    opacity(1),
    z(11),
    "helperPlatform2"
  ]);

  return { catTower, arrow, arrow2, victoryPlatform, helperPlatform, helperPlatform2 };
}

/**
 * SPAWN CUPS ON PLATFORMS
 */
export function addCups(levelConfig) {
  levelConfig.platforms.forEach(platform => {
    const numCups = Math.floor(levelConfig.cups.count / levelConfig.platforms.length);
    for (let i = 0; i < numCups; i++) {
      const x = platform.x + (platform.width / (numCups + 1)) * (i + 1);
      const y = platform.y - 61;
      add([
        sprite('cup'),
        pos(x, y),
        area({ width: 40, height: 60 }),
        anchor("center"),
        scale(0.8),
        "cup"
      ]);
    }
  });
}

/**
 * SPECIAL ITEMS
 */
export function addSpecialItems(levelConfig) {
  // GET ALL PLATFORMS THAT CAN HAVE SPECIAL ITEMS
  const eligiblePlatforms = levelConfig.platforms.filter(p => p.width >= 200);
  
  // SPAWN TUNA CANS
  const numTunaCans = 2 + Math.floor(Math.random() * 2); // 2-3 CANS
  for (let i = 0; i < Math.min(numTunaCans, eligiblePlatforms.length); i++) {
    const platform = choose(eligiblePlatforms);
    const x = platform.x + rand(50, platform.width - 50);
    const y = platform.y - 70;
    
    add([
      sprite('tunaCan'),
      pos(x, y),
      area({ width: 50, height: 50 }),
      anchor("center"),
      scale(0.6),
      "tunaCan"
    ]);
  }
  
  // MILK
  const numMilkBottles = 1 + Math.floor(Math.random() * 2); // 1-2 BOTTLES
  for (let i = 0; i < Math.min(numMilkBottles, eligiblePlatforms.length); i++) {
    const platform = choose(eligiblePlatforms);
    const x = platform.x + rand(50, platform.width - 50);
    const y = platform.y - 70;
    
    add([
      sprite('milkBottle'),
      pos(x, y),
      area({ width: 50, height: 50 }),
      anchor("center"),
      scale(0.6),
      "milkBottle"
    ]);
  }
}

/**
 * CREATE PLAYER WITH STANDARD SET UP
 */
export function createPlayer(levelConfig, character, startHP) {
  const player = add([
    sprite(character.sprites.stand),
    pos(levelConfig.playerSpawn.x, levelConfig.playerSpawn.y - 50),
    area({ width: 50, height: 80 }),
    body(),
    anchor("center"),
    scale(1.0),
    {
      speed: character.platformerStats.speed * 50,
      playerJumpForce: Math.abs(character.platformerStats.jumpPower) * 65,
      hp: startHP || character.stats.maxHP,
      maxHP: character.stats.maxHP,
      isMoving: false,
      facingRight: true,
      invulnerable: false,
      invulnerableTime: 0,
      curState: 'idle'
    },
    "player"
  ]);

  // LAND AND DEBUG
  player.onCollide("platform", (plat) => {
    if (player.vel.y >= 0) console.log('💥 LANDED on platform');
  });
  player.onCollide("ground", (plat) => {
    if (player.vel.y >= 0) console.log('💥 LANDED on ground');
  });

  return player;
}

/**
 * SETUP PLAYER CONTROLS - MOVE AND JUMP
 */
export function setupPlayerControls(player, gameStateGetter) {
  onKeyDown("left", () => {
    if (gameStateGetter()) {
      player.move(-player.speed, 0);
      player.isMoving = true;
      player.facingRight = false;
      player.flipX = true;
    }
  });

  onKeyDown("right", () => {
    if (gameStateGetter()) {
      player.move(player.speed, 0);
      player.isMoving = true;
      player.facingRight = true;
      player.flipX = false;
    }
  });

  onKeyRelease(["left", "right"], () => { 
    player.isMoving = false; 
  });

  onKeyPress("space", () => {
    if (gameStateGetter() && player.isGrounded()) {
      player.jump(player.playerJumpForce);
      console.log('🚀 JUMP! Force:', player.playerJumpForce);
    }
  });
}

/**
 * UNIFIED HUD - SCORE, HP, LIVES, TIMER
 */
export function createUnifiedHUD(player) {
  // Score rect is at (130, 15) with width 200, height 50
  // Center X = 130 + 200/2 = 230, Center Y = 15 + 50/2 = 40
  const scoreText = add([
    text(`Score: 0`, { size: 24, font: "science" }),
    pos(230, 42),
    anchor("center"),
    fixed(),
    z(100),
    color(Color.fromHex(Colors.White)),
    "scoreText"
  ]);

  // HP rect is at (350, 15) with width 200, height 50
  // Center X = 350 + 200/2 = 450, Center Y = 15 + 50/2 = 40
  const hpText = add([
    text(`HP: ${player.hp}/${player.maxHP}`, { size: 24, font: "science" }),
    pos(450, 42),
    anchor("center"),
    fixed(),
    z(100),
    color(Color.fromHex(Colors.White)),
    "hpText"
  ]);

  // Lives rect is at (570, 15) with width 200, height 50
  // Center X = 570 + 200/2 = 670, Center Y = 15 + 50/2 = 40
  const livesText = add([
    text(`Lives: 3`, { size: 24, font: "science" }),
    pos(670, 42),
    anchor("center"),
    fixed(),
    z(100),
    color(Color.fromHex(Colors.White)),
    "livesText"
  ]);


  const clock = add([
    sprite('clock'),
    pos(840, 38),
    anchor("center"),
    fixed(),
    scale(0.3),
    z(101),
    "clock"
  ]);

  const timerText = add([
    text(`: 0s`, { size: 24, font: "science" }),
    pos(905, 42),
    anchor("center"),
    fixed(),
    z(100),
    color(Color.fromHex(Colors.White)),
    "timerText"
  ]);

  return { scoreText, hpText, livesText, timerText, clock };
}

/**
 * UPDATE UNIFIED HUD
 */
export function updateUnifiedHUD(hudElements, score, timeLeft, player, lives) {
  hudElements.scoreText.text = `Score: ${score}`;
  hudElements.hpText.text = `HP: ${player.hp}/${player.maxHP}`;
  hudElements.livesText.text = `Lives: ${lives}`;
  hudElements.timerText.text = `: ${timeLeft}s`;
  
  if (timeLeft < 10) {
    hudElements.timerText.color = Color.fromHex(Colors.RadiationRed);
  }
}

/**
 * DEPRECATED - KEEPING FOR BACKWARDS CONPATIBILITY
 */
export function createHUD(hasHP = false, hasLives = false) {
  console.warn('createHUD is deprecated - use createUnifiedHUD instead');
  return createUnifiedHUD({ hp: 100, maxHP: 100 });
}

export function updateHUD(hudElements, score, timeLeft, player = null, lives = null) {
  console.warn('updateHUD is deprecated - use updateUnifiedHUD instead');
  if (player) {
    updateUnifiedHUD(hudElements, score, timeLeft, player, lives || 3);
  }
}

export function createHUDWithHP(player) {
  console.warn('createHUDWithHP is deprecated - use createUnifiedHUD instead');
  return createUnifiedHUD(player);
}

export function updateHUDWithHP(hudElements, score, timeLeft, player) {
  console.warn('updateHUDWithHP is deprecated - use updateUnifiedHUD instead');
  updateUnifiedHUD(hudElements, score, timeLeft, player, 3);
}

/**
 * CAT TOWER VICTORY PLATFORM COLLISION
 */
export function setupVictoryCollision(player, levelName, nextBoss, character, gameStateGetter, gameStateSetter) {
  player.onCollide("victoryPlatform", (platform) => {
    if (player.vel.y >= 0 && gameStateGetter()) {
      console.log('🏆 LANDED ON THE CAT TOWER! Level Complete!');
      gameStateSetter(false);
      
      wait(0.5, () => {
        go("levelComplete", {
          level: levelName,
          score: 0,
          nextLevel: nextBoss,
          character: character,
          playerHP: player.hp
        });
      });
    }
  });
}

/**
 * CUP/SCORE COLLECTION
 */
export function setupCupCollection(player, scoreGetter, scoreSetter) {
  player.onCollide("cup", (cup) => {
    destroy(cup);
    scoreSetter(scoreGetter() + 1);
    play("collectCup", { volume: 0.3 });
  });
}

/**
 * SPECIAL ITEM COLLECTION
 */
export function setupSpecialItemCollection(player, livesGetter, livesSetter) {
  // TUNA - RESTORES HP
  player.onCollide("tunaCan", (item) => {
    destroy(item);
    const healAmount = 25;
    player.hp = Math.min(player.hp + healAmount, player.maxHP);
    console.log(`🐟 Collected Tuna Can! +${healAmount} HP`);
    play("powerUp", { volume: 0.4 });
  });
  
  // MILK - EXTRA LIFE
  player.onCollide("milkBottle", (item) => {
    destroy(item);
    livesSetter(livesGetter() + 1);
    console.log(`🥛 Collected Milk Bottle! +1 Life`);
    play("extraLife", { volume: 0.5 });
  });
}

/**
 * TIMER  (PASSES LIVES AND CHARACTER DATA)
 */
export function setupTimer(levelConfig, gameStateGetter, gameStateSetter, timeLeftGetter, timeLeftSetter, levelName, scoreGetter, livesGetter, characterGetter) {
  loop(1, () => {
    if (gameStateGetter()) {
      const newTime = timeLeftGetter() - 1;
      timeLeftSetter(newTime);
      
      if (newTime <= 0) {
        gameStateSetter(false);
        go("gameOver", { 
          score: scoreGetter(), 
          level: levelName,
          lives: livesGetter ? livesGetter() : 0,
          character: characterGetter ? characterGetter() : null
        });
      }
    }
  });
}

/**
 * FALL DETECTION (PASSES ALL DATA)
 */
export function setupFallDetection(player, gameStateGetter, gameStateSetter, levelName, scoreGetter, livesGetter, livesSetter, characterGetter) {
  player.onUpdate(() => {
    if (player.pos.y > SCREEN_H + 100 && gameStateGetter()) {
      console.log('💀 FELL OFF');
      
      const currentLives = livesGetter();
      if (currentLives > 1) {
        // LOSE LIFE AT RESPAWN
        livesSetter(currentLives - 1);
        player.pos = vec2(200, 300); // RESPAWN POS
        player.hp = Math.min(player.hp + 20, player.maxHP); // SMALL HP BOOST ON RESPAWN
        console.log(`❤️ Lives remaining: ${currentLives - 1}`);
      } else {
        // GAME OVER
        gameStateSetter(false);
        go("gameOver", { 
          score: scoreGetter(), 
          level: levelName,
          lives: currentLives - 1, // LAST LIFE
          character: characterGetter ? characterGetter() : null
        });
      }
    }
  });
}

/**
 * ENEMY SPAWNER FOR AUTOSCROLL LEVELS
 */
export function setupEnemySpawner(levelConfig, gameStateGetter, cameraXGetter, enemyModule) {
  loop(levelConfig.enemies.spawnRate / 1000, () => {
    if (gameStateGetter() && cameraXGetter() < levelConfig.length - 1000) {
      const spawnX = cameraXGetter() + SCREEN_W + rand(0, 200);
      enemyModule.spawnEnemy(spawnX, levelConfig.enemies);
    }
  });
}

/**
 * ENEMY COLLISION 
 */
export function setupEnemyCollision(player, levelConfig, gameStateGetter, gameStateSetter, levelName, scoreGetter, enemyModule, livesGetter, livesSetter, characterGetter) {
  player.onCollide("enemy", (enemy) => {
    if (!player.invulnerable) {
      enemyModule.handlePlayerEnemyCollision(player, enemy, levelConfig.enemies.invulnerabilityTime / 1000);
      
      if (player.hp <= 0) {
        const currentLives = livesGetter();
        if (currentLives > 1) {
          // LOSE LIFE AND RESPAWN
          livesSetter(currentLives - 1);
          player.hp = Math.floor(player.maxHP * 0.5); // RESPAWN WITH 50% HP
          player.pos = vec2(200, 300);
          console.log(`💔 Lost a life! Lives remaining: ${currentLives - 1}`);
        } else {
          // GAME OVER
          gameStateSetter(false);
          go("gameOver", { 
            score: scoreGetter(), 
            level: levelName, 
            hp: player.hp,
            lives: currentLives - 1, // LAST LIFE
            character: characterGetter ? characterGetter() : null
          });
        }
      }
    }
  });
}

/**
 * PAUSE LEVEL
 */
export function setupLevelPause(gameActiveGetter, gameActiveSetter, onQuitCallback = null) {
  return setupPauseSystem(gameActiveGetter, gameActiveSetter, onQuitCallback);
}

export function setupAutoscrollCamera(levelConfig, player, character, gameStateGetter, cameraXGetter, cameraXSetter, updateEnemiesFn) {
  onUpdate(() => {
    if (gameStateGetter()) {
      const newCameraX = cameraXGetter() + levelConfig.scrollSpeed;
      cameraXSetter(newCameraX);
      setCamPos(newCameraX + SCREEN_W / 2, SCREEN_H / 2);
      
      //PARALAX BG
      const bg = get("background")[0];
      if (bg) {
        bg.pos.x = -(newCameraX * 0.5);
      }

      // BOUNDARIES
      const minX = newCameraX + levelConfig.playerBoundaries.left;
      const maxX = newCameraX + SCREEN_W - levelConfig.playerBoundaries.right;
      player.pos.x = clamp(player.pos.x, minX, maxX);

      updatePlayerAnim(player, character);
      updateEnemiesFn(newCameraX);
    }
  });
}

/**
 * SET UP LEVELS AND CHECK FOR AUTOSCROLL
 */
export function setupAutoscrollEnd(levelConfig, gameStateGetter, gameStateSetter, cameraXGetter, levelName, nextBoss, character, playerGetter, scoreGetter) {
  onUpdate(() => {
    if (gameStateGetter() && cameraXGetter() >= levelConfig.length - SCREEN_W) {
      gameStateSetter(false);
      wait(0.5, () => {
        go("levelComplete", {
          level: levelName,
          score: scoreGetter(),
          nextLevel: nextBoss,
          character: character,
          playerHP: playerGetter().hp
        });
      });
    }
  });
}