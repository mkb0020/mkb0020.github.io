// gameOver.js
import { SCREEN_W, SCREEN_H, Colors } from '../config/gameConfig.js';
import { createVolumeToggle } from '../utils/audioControls.js';

/**
 * GAME OVER SCENE
 */
export function createGameOverScene(data) {
  const { 
    score = 0, 
    level = "level1", 
    hp = 0, 
    lives = 0,
    character = null 
  } = data || {};
  
  console.log('💀 Game Over Scene | Lives:', lives, 'Level:', level, 'Character:', character?.name);
  
  // STOP ALL MUSIC
  if (window.levelMusic) {
    window.levelMusic.stop();
    window.levelMusic = null;
  }
  if (window.bossMusic) {
    window.bossMusic.stop();
    window.bossMusic = null;
  }
  
  play("gameOverSound", { volume: 0.5 });

  // BG
  add([
    sprite("gameOverBG"),
    pos(0, 0),
    width(SCREEN_W),
    height(SCREEN_H),
    z(0)
  ]);
  
  add([
    rect(SCREEN_W, SCREEN_H),
    pos(0, 0),
    color(0, 0, 0),
    opacity(0.5),
    z(1)
  ]);

  // GAME OVER PANEL - LARGER IF SHOWING LIVES OPTIONS
  const panelHeight = lives > 0 ? 400 : 300;
  add([
    rect(700, panelHeight, { radius: 10 }),
    pos(SCREEN_W / 2 - 350, 100),
    color(42, 26, 74),
    outline(3, Color.fromHex(Colors.Claret)),
    z(2)
  ]);

  // GAME OVER
  add([
    text("GAME OVER!", { 
      size: 48, 
      font: "science",
      weight: "bold"
    }),
    pos(SCREEN_W / 2, 170),
    anchor("center"),
    color(115, 1, 50),
    z(3)
  ]);

  
  let reasonText = "";
  if (level === "level1" || level === "level2" || level === "level3") {
    if (hp <= 0) {
      reasonText = "The enemies were too much!";
    } else {
      reasonText = "You fell into the void!";
    }
  } else if (level === "boss") {
    reasonText = "The boss was too strong...";
  }

  add([
    text(reasonText, { 
      size: 24, 
      font: "science"
    }),
    pos(SCREEN_W / 2, 230),
    anchor("center"),
    color(255, 255, 255),
    z(3)
  ]);

 
  if (score > 0) {
    add([
      text(`Score: ${score}`, { 
        size: 28, 
        font: "science"
      }),
      pos(SCREEN_W / 2, 280),
      anchor("center"),
      color(255, 255, 255),
      z(3)
    ]);
  }

  // ⭐ LIVES SYSTEM 
  if (lives > 0 && character) {
    // SHOW LIVES REMAINING
    add([
      text(`Lives Remaining: ${lives}`, { 
        size: 32, 
        font: "science",
        weight: "bold"
      }),
      pos(SCREEN_W / 2, 330),
      anchor("center"),
      color(255, 107, 157),
      z(3)
    ]);

    // "USE LIFE TO CONTINUE"
    const continueButton = add([
      rect(300, 60, { radius: 10 }),
      pos(SCREEN_W / 2 - 160, 380),
      area(),
      color(38, 243, 130),
      outline(2, Color.fromHex(Colors.White)),
      z(3),
      "continueButton"
    ]);

    add([
      text("USE LIFE", { 
        size: 24, 
        font: "science",
        weight: "bold"
      }),
      pos(SCREEN_W / 2 - 10, 410),
      anchor("center"),
      color(0, 0, 0),
      z(4)
    ]);

    // "BACK TO MENU"
    const menuButton = add([
      rect(300, 60, { radius: 10 }),
      pos(SCREEN_W / 2 - 160, 455),
      area(),
      color(115, 1, 50),
      outline(2, Color.fromHex(Colors.White)),
      z(3),
      "menuButton"
    ]);

    add([
      text("BACK TO MENU", { 
        size: 24, 
        font: "science",
        weight: "bold"
      }),
      pos(SCREEN_W / 2 - 10, 485),
      anchor("center"),
      color(255, 255, 255),
      z(4)
    ]);

    // HOVER BUTTONS
    continueButton.onHover(() => {
      continueButton.color = Color.fromHex("#00ff7f");
    });
    continueButton.onHoverEnd(() => {
      continueButton.color = rgb(38, 243, 130);
    });

    menuButton.onHover(() => {
      menuButton.color = rgb(150, 30, 80);
    });
    menuButton.onHoverEnd(() => {
      menuButton.color = rgb(115, 1, 50);
    });

    // BUTTON CLICK HANDLERS
    continueButton.onClick(() => {
      console.log('🔄 Using life to continue | Level:', level);
      restartLevel(level, character, lives);
    });

    menuButton.onClick(() => {
      returnToMenu();
    });

  } else {
    // NO LIVES LEFT
    add([
      text("No lives remaining...", { 
        size: 24, 
        font: "science",
        style: "italic"
      }),
      pos(SCREEN_W / 2, 340),
      anchor("center"),
      color(176, 180, 255),
      z(3)
    ]);

    const menuButton = add([
      rect(300, 60, { radius: 10 }),
      pos(SCREEN_W / 2 - 150, 390),
      area(),
      color(115, 1, 50),
      outline(2, Color.fromHex(Colors.White)),
      z(3),
      "menuButton"
    ]);

    add([
      text("BACK TO MENU", { 
        size: 28, 
        font: "science",
        weight: "bold"
      }),
      pos(SCREEN_W / 2, 420),
      anchor("center"),
      color(255, 255, 255),
      z(4)
    ]);

    menuButton.onHover(() => {
      menuButton.color = rgb(150, 30, 80);
    });
    menuButton.onHoverEnd(() => {
      menuButton.color = rgb(115, 1, 50);
    });

    menuButton.onClick(() => {
      returnToMenu();
    });
  }

  createVolumeToggle();

  onKeyPress("escape", () => {
    returnToMenu();
  });
}

/**
 * RESTART LEVEL WITH ONE LESS LIFE
 */
function restartLevel(levelName, character, remainingLives) {
  console.log(`🔄 Restarting ${levelName} with ${remainingLives - 1} lives`);
  
  if (levelName === "level1") {
    go("level1", character);
  } else if (levelName === "level2") {
    go("level2", character, character.stats.maxHP); 
  } else if (levelName === "level3") {
    go("level3", character, character.stats.maxHP);
  } else if (levelName === "boss") {
    go("menu"); 
  }
}

/**
 * RETURN TO MAIN MENU
 */
function returnToMenu() {
  if (!window.menuMusic || window.menuMusic.paused) {
    window.menuMusic = play("menuMusic", {
      volume: 0.5,
      loop: true
    });
  }
  go("menu");
}

/**
 * FINAL VICTORY
 */
export function createVictoryScene(data) {
  const { character } = data || {};
  
  if (window.levelMusic) {
    window.levelMusic.stop();
    window.levelMusic = null;
  }
  if (window.bossMusic) {
    window.bossMusic.stop();
    window.bossMusic = null;
  }
  
  play("VictorySound", { volume: 0.6 }); 


  add([
    rect(SCREEN_W, SCREEN_H),
    pos(0, 0),
    color(102, 126, 234),
    z(0)
  ]);

  add([
    rect(SCREEN_W, SCREEN_H),
    pos(0, 0),
    color(118, 75, 162),
    opacity(0.6),
    z(0)
  ]);

  
  add([
    rect(700, 280, { radius: 10 }),
    pos(150, 100),
    color(42, 26, 74),
    outline(3, Color.fromHex(Colors.Highlight)),
    z(1)
  ]);

  
  add([
    text("FLAWLESS VICTORY!", { 
      size: 56, 
      font: "science",
      weight: "bold"
    }),
    pos(SCREEN_W / 2, 180),
    anchor("center"),
    color(38, 243, 130),
    z(2)
  ]);


  add([
    text("You did it!", { 
      size: 32, 
      font: "science",
      weight: "bold"
    }),
    pos(SCREEN_W / 2, 240),
    anchor("center"),
    color(255, 255, 255),
    z(2)
  ]);

  
  const charName = character ? character.name : "Hero";
  add([
    text(`${charName} saved Schrödinger's Cat Café!`, { 
      size: 24, 
      font: "science"
    }),
    pos(SCREEN_W / 2, 285),
    anchor("center"),
    color(217, 189, 248),
    z(2)
  ]);


  add([
    text("Quantum bliss has been restored!", { 
      size: 18, 
      font: "science",
      style: "italic"
    }),
    pos(SCREEN_W / 2, 320),
    anchor("center"),
    color(176, 180, 255),
    z(2)
  ]);


  add([
    text("Click anywhere to return to menu", { 
      size: 18, 
      font: "science",
      style: "italic"
    }),
    pos(SCREEN_W / 2, 355),
    anchor("center"),
    color(176, 180, 255),
    z(2)
  ]);

  // CONFETTI
  const confettiColors = [
    rgb(255, 107, 157),
    rgb(157, 78, 221),
    rgb(145, 139, 252),
    rgb(181, 255, 168),
    rgb(255, 140, 171)
  ];

  loop(0.1, () => {
    const confetti = add([
      rect(8, 8),
      pos(rand(0, SCREEN_W), -20),
      color(choose(confettiColors)),
      rotate(rand(0, 360)),
      z(5),
      {
        vel: rand(50, 150),
        rotSpeed: rand(-5, 5)
      }
    ]);

    confetti.onUpdate(() => {
      confetti.move(0, confetti.vel);
      confetti.angle += confetti.rotSpeed;
      
      if (confetti.pos.y > SCREEN_H + 20) {
        destroy(confetti);
      }
    });
  });

  createVolumeToggle();

  onClick(() => {
    returnToMenu();
  });

  onKeyPress("escape", () => {
    returnToMenu();
  });
}

/**
 * LEVEL COMPLETE
 */
export function createLevelCompleteScene(data) {
  const { level = "level1", score = 0, nextLevel = "cupBoss", character, playerHP } = data || {};
  
  if (window.levelMusic) {
    window.levelMusic.stop();
    window.levelMusic = null;
  }
  if (window.bossMusic) {
    window.bossMusic.stop();
    window.bossMusic = null;
  }
  
  play("VictorySound", { volume: 0.6 }); 


  add([
    rect(SCREEN_W, SCREEN_H),
    pos(0, 0),
    color(11, 11, 27),
    z(0)
  ]);

  // BREATHING NEON GRID
  onDraw(() => {
    const pulse = (Math.sin(time() * 1.8) + 1) / 2;
    const gridSize = 40;
    const opacity = 0.15 + pulse * 0.35;
    const thickness = 1 + pulse * 1.8;
    const lineColor = rgb(140 + pulse * 60, 82, 255);

    for (let x = 0; x <= width(); x += gridSize) {
      drawLine({
        p1: vec2(x, 0),
        p2: vec2(x, height()),
        color: lineColor,
        opacity: opacity,
        width: thickness,
      });
    }

    for (let y = 0; y <= height(); y += gridSize) {
      drawLine({
        p1: vec2(0, y),
        p2: vec2(width(), y),
        color: lineColor,
        opacity: opacity,
        width: thickness,
      });
    }
  });

  // PANEL
  add([
    rect(700, 240, { radius: 20 }),
    pos(160, 140),
    color(42, 26, 74),
    opacity(0.9),
    outline(3, Color.fromHex("#ff6bff")),
    z(1)
  ]);

  // TITLE
  let titleText = "LEVEL COMPLETE!";
  if (level === "level2") titleText = "LEVEL 2 COMPLETE!";
  else if (level === "level3") titleText = "LEVEL 3 COMPLETE!";

  add([
    text(titleText, { 
      size: 45, 
      font: "science",
      weight: "bold"
    }),
    pos(SCREEN_W / 2, 220),
    anchor("center"),
    color(255, 107, 255),
    z(2)
  ]);

  // SCORE
  add([
    text(`Final Score: ${score}`, { 
      size: 40, 
      font: "science",
      weight: "bold"
    }),
    pos(SCREEN_W / 2, 290),
    anchor("center"),
    color(0, 255, 234),
    z(2)
  ]);

  // CONTINUE TEXT
  add([
    text("Click anywhere to continue", { 
      size: 24, 
      font: "science"
    }),
    pos(SCREEN_W / 2, 350),
    anchor("center"),
    color(160, 210, 219),
    z(2)
  ]);

  createVolumeToggle();

  // CLICK HANDLER - GO TO NEXT LEVEL/BOSS
  onClick(() => {
    if (nextLevel === "cupBoss") {
      go("cupBoss", { character, playerHP });  
    } else if (nextLevel === "cucumberBoss") {
      go("cucumberBoss", { character, playerHP });
    } else if (nextLevel === "observerBoss") {
      go("observerBoss", { character, playerHP });
    } else if (nextLevel === "level2") {
      go("level2", character, playerHP);
    } else if (nextLevel === "level3") {
      go("level3", character, playerHP);
    } else {
      go("menu");
    }
  });
}

/**
 * BOSS DEFEATED
 */
export function createBossDefeatedScene(data) {
  const { level = "cupBoss", score = 0, nextLevel = "level2", character, playerHP } = data || {};
  
  if (window.levelMusic) {
    window.levelMusic.stop();
    window.levelMusic = null;
  }
  if (window.bossMusic) {
    window.bossMusic.stop();
    window.bossMusic = null;
  }
  
  play("VictorySound", { volume: 0.6 }); 

 
  add([
    rect(SCREEN_W, SCREEN_H),
    pos(0, 0),
    color(11, 11, 27),
    z(0)
  ]);

  //GRID
  add([
    pos(0, 0),
    z(0),
    {
      draw() {
        const gridSize = 40;
        const lineColor = rgb(140, 82, 255);

        for (let x = 0; x <= SCREEN_W; x += gridSize) {
          drawLine({
            p1: vec2(x, 0),
            p2: vec2(x, SCREEN_H),
            color: lineColor,
            opacity: 0.3,
            width: 2,
          });
        }

        for (let y = 0; y <= SCREEN_H; y += gridSize) {
          drawLine({
            p1: vec2(0, y),
            p2: vec2(SCREEN_W, y),
            color: lineColor,
            opacity: 0.3,
            width: 2,
          });
        }
      }
    }
  ]);

  // PANEL
  add([
    rect(950, 240, { radius: 30 }),
    pos(25, 140),
    color(42, 26, 74),
    opacity(0.9),
    outline(3, Color.fromHex("#ff6bff")),
    z(1)
  ]);

 
  let titleText = "THE GIANT CUP WAS DEFEATED!";
  if (level === "cucumberBoss") titleText = "THE WEIRD CUCUMBER WAS DEFEATED!";
  else if (level === "observerBoss") titleText = "THE CREEPY OBSERVER WAS DEFEATED!";

  add([
    text(titleText, { 
      size: 38, 
      font: "science",
      weight: "bold"
    }),
    pos(SCREEN_W / 2, 220),
    anchor("center"),
    color(255, 107, 255),
    z(2)
  ]);


  add([
    text("Click anywhere to continue", { 
      size: 24, 
      font: "science"
    }),
    pos(SCREEN_W / 2, 350),
    anchor("center"),
    color(160, 210, 219),
    z(2)
  ]);

  createVolumeToggle();

  onClick(() => {
    if (nextLevel === "level2") {
      go("level2", { character, playerHP });
    } else if (nextLevel === "level3") {
      go("level3", { character, playerHP });
    } else if (nextLevel === "observerBoss") {
      go("observerBoss", { character, playerHP });
    } else {
      go("menu");
    }
  });
}