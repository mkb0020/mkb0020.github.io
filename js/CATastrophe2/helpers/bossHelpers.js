// bossHelpers.js - BOSS BATTLE SETUP AND ANIMATIONS
import { SCREEN_W, SCREEN_H, Colors } from '../config/gameConfig.js';
import { createVolumeToggle } from '../utils/audioControls.js';

/**
 * MUSIC FOR BOSS BATTLE
 */
export function setupBossMusic() {
  window.levelMusic = play("levelMusic", { volume: 0.4, loop: true });
  
  onSceneLeave(() => { 
    if (window.levelMusic) {
      window.levelMusic.stop();
      window.levelMusic = null;
    }
  });
}

/**
 * BACKGROUND FOR BOSS BATTLE
 */
export function addBossBackground(bossConfig) {
  add([
    sprite(bossConfig.background),
    pos(0, 0),
    scale(SCREEN_W / 1000, SCREEN_H / 480),
    z(0)
  ]);
}

/**
 *  ADD CHARACTER SPRITES WITH GLOW ANIMATIONS
 */
export function addBattleSprites(character, bossConfig) {
  // Player glow
  const playerGlow = add([
    sprite("glow"),
    pos(260, 250),
    anchor("center"),
    scale(1.05),
    opacity(1),
    z(0),
    "playerGlow"
  ]);

  // Player sprite
  const playerSprite = add([
    sprite(character.sprites.battle),
    pos(260, 250),
    anchor("center"),
    scale(1),
    opacity(1),
    z(1),
    "playerSprite"
  ]);
  
  // Boss glow
  const bossGlow = add([
    sprite(bossConfig.glowSprite || "glow"),
    pos(725, 120),
    anchor("center"),
    scale(1.05),
    opacity(1),
    z(0),
    "bossGlow"
  ]);

  // Boss sprite
  const bossSprite = add([
    sprite(bossConfig.sprite),
    pos(725, 120),
    anchor("center"),
    scale(1),
    opacity(1),
    z(1),
    "bossSprite"
  ]);

  return { playerSprite, playerGlow, bossSprite, bossGlow };
}

/**
 * ADD PLAYER HP PANNEL AND BAR
 */
export function addPlayerHPPanel(player) {
  // Background panel (dark)
  add([
    rect(400, 85, { radius: 50 }),
    pos(470, 250),
    color(Color.fromHex(Colors.MutedGrey)),
    opacity(1),
    outline(4, Color.fromHex("#000000")),
    z(10)
  ]);

  // Outline panel (cyan glow)
  add([
    rect(400, 85, { radius: 50 }),
    pos(470, 250),
    color(Color.fromHex(Colors.MutedGrey)),
    opacity(1),
    outline(15, Color.fromHex("#00FFFF")),
    z(9)
  ]);

  // Player name (shadow)
  add([
    text(player.name, { size: 23, font: "orbitronBold" }),
    pos(540, 275),
    anchor("center"),
    color(0, 0, 0),
    z(12)
  ]);

  // Player name (main)
  add([
    text(player.name, { size: 23, font: "orbitronBold" }),
    pos(542, 277),
    anchor("center"),
    color(255, 255, 255),
    z(11)
  ]);

  // HP label (shadow)
  add([
    text("HP:", { size: 20, font: "orbitronBold" }),
    pos(520, 295),
    color(Color.fromHex(Colors.NuclearFuscia)),
    z(12)
  ]);

  // HP label (main)
  add([
    text("HP:", { size: 20, font: "orbitronBold" }),
    pos(521, 296),
    color(Color.fromHex('#000000')),
    z(11)
  ]);

  // HP bar background
  add([
    rect(280, 20, { radius: 8 }),
    pos(565, 295),
    color(0, 0, 0),
    opacity(1),
    outline(10, Color.fromHex(Colors.DarCoolGrey)),
    z(11)
  ]);

  // HP bar fill
  const playerHPBar = add([
    rect(280, 20, { radius: 8 }),
    pos(565, 295),
    color(Color.fromHex(Colors.UraniumGreen)),
    z(12),
    "playerHPBar"
  ]);

  // HP text
  const playerHPText = add([
    text(`${player.hp} / ${player.maxHP}`, { size: 16, font: "orbitron" }),
    pos(785, 275),
    anchor("center"),
    color(0, 0, 0),
    z(13)
  ]);

  return { playerHPBar, playerHPText };
}

/**
 * ADD BOSS HP PANNEL AND BAR
 */
export function addBossHPPanel(boss) {
  // Background panel (dark)
  add([
    rect(390, 85, { radius: 50 }),
    pos(130, 20),
    color(Color.fromHex(Colors.MutedGrey)),
    opacity(1),
    outline(4, Color.fromHex("#000000")),
    z(10)
  ]);

  // Outline panel (mint/violet glow)
  add([
    rect(390, 85, { radius: 50 }),
    pos(130, 20),
    color(Color.fromHex(Colors.MintBlue)),
    opacity(1),
    outline(15, Color.fromHex(Colors.VortexViolet)),
    z(9)
  ]);

  // Boss name (shadow)
  add([
    text(boss.name, { size: 22, font: "orbitronBold" }),
    pos(220, 45),
    anchor("center"),
    color(0, 0, 0),
    z(12)
  ]);

  // Boss name (main)
  add([
    text(boss.name, { size: 22, font: "orbitronBold" }),
    pos(222, 47),
    anchor("center"),
    color(255, 255, 255),
    z(11)
  ]);

  // HP label (shadow)
  add([
    text("HP:", { size: 20, font: "orbitronBold" }),
    pos(170, 65),
    color(Color.fromHex(Colors.NuclearFuscia)),
    z(12)
  ]);

  // HP label (main)
  add([
    text("HP:", { size: 20, font: "orbitronBold" }),
    pos(171, 66),
    color(Color.fromHex('#000000')),
    z(11)
  ]);

  // HP bar background
  add([
    rect(280, 20, { radius: 8 }),
    pos(215, 65),
    color(0, 0, 0),
    opacity(1),
    outline(10, Color.fromHex(Colors.DarCoolGrey)),
    z(11)
  ]);

  // HP bar fill
  const bossHPBar = add([
    rect(280, 20, { radius: 8 }),
    pos(215, 65),
    color(Color.fromHex(Colors.UraniumGreen)),
    z(12),
    "bossHPBar"
  ]);

  // HP text
  const bossHPText = add([
    text(`${boss.hp} / ${boss.maxHP}`, { size: 16, font: "orbitron" }),
    pos(430, 45),
    anchor("center"),
    color(0, 0, 0),
    z(13)
  ]);

  return { bossHPBar, bossHPText };
}

/**
 * ADD BATTLE LOG PANEL
 */
export function addBattleLogPanel(initialMessage) {
  // Panel background
  add([
    rect(425, 115, { radius: 30 }),
    pos(120, 360),
    color(Color.fromHex(Colors.MutedGrey)),
    opacity(1.0),
    outline(1, Color.fromHex(Colors.DarCoolGrey)),
    z(10)
  ]);

  // Log text
  const logText = add([
    text(initialMessage, { size: 24, font: "narrow", width: 360 }),
    pos(145, 375),
    color(0, 0, 0),
    z(11),
    "logText"
  ]);

  return logText;
}

/**
 * ADD MOVE BUTTONS PANEL BACKGROUND
 */
export function addMoveButtonsPanel() {
  add([
    rect(335, 115, { radius: 5 }),
    pos(550, 360),
    color(Color.fromHex(Colors.MutedGrey)),
    opacity(1),
    outline(2, Color.fromHex(Colors.DarCoolGrey)),
    z(10)
  ]);
}

/**
 * CREATE MOVE BUTTONS FOR PLAYER
 */
export function createMoveButtons(player, onMoveClick, gameStateGetter) {
  const moveButtons = [];
  const moveNames = Object.keys(player.moves);

  moveNames.forEach((moveName, i) => {
    const moveData = player.moves[moveName];
    const x = i % 2 === 0 ? 555 : 720;
    const y = i < 2 ? 370 : 420;
    
    // Button background
    const btn = add([
      rect(160, 45, { radius: 25 }),
      pos(x, y),
      color(Color.fromHex(Colors.MutedGrey)),
      outline(1, Color.fromHex(Colors.MutedGrey)),
      area(),
      z(11),
      {
        moveName: moveName,
        moveData: moveData,
        enabled: moveData.uses > 0
      },
      "moveBtn"
    ]);

    // Button text
    const btnText = btn.add([
      text(`${moveName} (${moveData.uses})`, { size: 22, font: "narrowBold" }),
      pos(75, 25),
      anchor("center"),
      color(0, 0, 0),
      z(12)
    ]);

    // Click handler
    btn.onClick(() => {
      if (gameStateGetter() && btn.enabled) {
        onMoveClick(moveName);
      }
    });

    // Hover effects
    btn.onHover(() => {
      if (btn.enabled) {
        btn.color = Color.fromHex(Colors.VortexViolet);
      }
    });

    btn.onHoverEnd(() => {
      btn.color = Color.fromHex(Colors.MutedGrey);
    });

    moveButtons.push({ btn, btnText, moveName });
  });

  return moveButtons;
}

/**
 * UPDATE HP BARS
 */
export function updateHPBars(player, boss, playerHPBar, playerHPText, bossHPBar, bossHPText) {
  const currentHP = parseInt(player.hp) || 0;
  const maxHP = parseInt(player.maxHP) || 1;
  const hpPercent = currentHP / maxHP;
  
  playerHPBar.width = 280 * hpPercent;
  playerHPText.text = `${currentHP} / ${maxHP}`;
  
  const bossCurrentHP = parseInt(boss.hp) || 0;
  const bossMaxHP = parseInt(boss.maxHP) || 1;
  const bossHPPercent = bossCurrentHP / bossMaxHP;
  
  bossHPBar.width = 280 * bossHPPercent;
  bossHPText.text = `${bossCurrentHP} / ${bossMaxHP}`;
}

/**
 * UPDATE MOVE BUTTONS
 */
export function updateMoveButtons(moveButtons, player) {
  moveButtons.forEach(({ btn, btnText, moveName }) => {
    const move = player.moves[moveName];
    btn.enabled = move.uses > 0;
    btnText.text = `${moveName} (${move.uses})`;
    
    if (!btn.enabled) {
      btn.color = rgb(100, 100, 100);
      btn.opacity = 0.5;
    }
  });
}

// ============================================================================
//  BASIC ANIMATIONS
// ============================================================================

/**
 * ANIMATION: ATTACK - SLIDE FORWARD AND BACK
 */
export function animateAttack(sprite, glow, isPlayer) {
  const originalX = sprite.pos.x;
  const slideDistance = isPlayer ? 100 : -100;
  
  tween(
    sprite.pos.x,
    originalX + slideDistance,
    0.2,
    (val) => {
      sprite.pos.x = val;
      glow.pos.x = val;
    },
    easings.easeOutQuad
  ).then(() => {
    tween(
      sprite.pos.x,
      originalX,
      0.2,
      (val) => {
        sprite.pos.x = val;
        glow.pos.x = val;
      },
      easings.easeInQuad
    );
  });
}

/**
 * ANIMATION: HIT / SHAKE
 */
export function animateHit(sprite, glow) {
  const originalX = sprite.pos.x;
  const shakeAmount = 10;
  const shakeDuration = 0.05;
  
  tween(sprite.pos.x, originalX - shakeAmount, shakeDuration, (val) => {
    sprite.pos.x = val;
    glow.pos.x = val;
  })
    .then(() => tween(sprite.pos.x, originalX + shakeAmount, shakeDuration, (val) => {
      sprite.pos.x = val;
      glow.pos.x = val;
    }))
    .then(() => tween(sprite.pos.x, originalX - shakeAmount, shakeDuration, (val) => {
      sprite.pos.x = val;
      glow.pos.x = val;
    }))
    .then(() => tween(sprite.pos.x, originalX + shakeAmount, shakeDuration, (val) => {
      sprite.pos.x = val;
      glow.pos.x = val;
    }))
    .then(() => tween(sprite.pos.x, originalX, shakeDuration, (val) => {
      sprite.pos.x = val;
      glow.pos.x = val;
    }));
}

/**
 * ANIMATION: Heal (pulse/glow)
 */
export function animateHeal(sprite, glow) {
  tween(sprite.opacity, 0.3, 0.3, (val) => {
    sprite.opacity = val;
    glow.opacity = val;
  })
    .then(() => tween(sprite.opacity, 1, 0.3, (val) => {
      sprite.opacity = val;
      glow.opacity = val;
    }))
    .then(() => tween(sprite.opacity, 0.3, 0.3, (val) => {
      sprite.opacity = val;
      glow.opacity = val;
    }))
    .then(() => tween(sprite.opacity, 1, 0.3, (val) => {
      sprite.opacity = val;
      glow.opacity = val;
    }));
}

/**
 * ANIMATION: DEFEAT - SLIDES OFF SCREEN
 */
export function animateDefeat(sprite, glow, isPlayer) {
  const slideDirection = isPlayer ? -300 : 300;
  const targetX = sprite.pos.x + slideDirection;
  
  tween(
    sprite.opacity,
    0,
    1.0,
    (val) => {
      sprite.opacity = val;
      glow.opacity = val;
    },
    easings.easeInQuad
  );
  
  tween(
    sprite.pos.x,
    targetX,
    1.0,
    (val) => {
      sprite.pos.x = val;
      glow.pos.x = val;
    },
    easings.easeInQuad
  );
}

// ============================================================================
// FANCY  ANIMATIONS
// ============================================================================

/**
 * ANIMATION EXPLOSION -
 */
export function animateExplosion(target) {
  shake(30);
  const boom = add([
    sprite("explosion", { anim: "burst" }),
    pos(target.pos),
    scale(4),
    opacity(1),
    z(100),
    anchor("center")
  ]);
  // Fade out after animation plays
  wait(0.5, () => {
    tween(boom.opacity, 0, 0.3, (o) => boom.opacity = o, easings.easeOutQuad)
      .then(() => destroy(boom));
  });
}

/**
 * ANIMATION FIREBALL
 */
export function animateFireball(attacker, target) {
  const start = attacker.pos.add(0, -20);
  const end = target.pos.add(0, -10);
  const mid = start.lerp(end, 0.5).add(rand(-60, 60), rand(-50, -20));

  const fireball = add([
    sprite("fire", { anim: "ball" }),
    pos(start),
    scale(3),
    z(90),
    anchor("center"),
    rotate(0)
  ]);

  // Arc trajectory with rotation
  tween(start, mid, 0.35, (p) => fireball.pos = p, easings.easeOutQuad)
    .then(() => tween(mid, end, 0.35, (p) => fireball.pos = p, easings.easeInQuad))
    .then(() => {
      shake(15);
      animateSmoke(target);
      animateExplosion(target);
      destroy(fireball);
    });
  
  // Spin the fireball
  fireball.onUpdate(() => {
    fireball.angle += 180 * dt();
  });
}

/**
 * ANIMATION SMOKE 
 */
export function animateSmoke(target) {
  const poof = add([
    sprite("smoke", { anim: "puff" }),
    pos(target.pos.add(rand(-20, 20), rand(-20, 20))),
    scale(4),
    opacity(0),
    z(95),
    anchor("center")
  ]);
  // Fade in quickly
  tween(poof.opacity, 0.7, 0.5, (o) => poof.opacity = o, easings.easeOutQuad);
  // Float up while fading
  tween(poof.pos.y, poof.pos.y - 50, 1.2, (y) => poof.pos.y = y, easings.easeOutQuad);
  // Fade out
  wait(0.3, () => {
    tween(poof.opacity, 0, 0.9, (o) => poof.opacity = o, easings.easeOutQuad)
      .then(() => destroy(poof));
  });
}

/**
 *  SWIRL
 */
export function animateSwirl(target) {
  const aura = add([
    sprite("swirl", { anim: "spin" }),
    pos(target.pos),
    scale(2.5),
    opacity(0),
    z(85),
    anchor("center")
  ]);
  // Fade in
  tween(aura.opacity, 0.7, 0.3, (o) => aura.opacity = o, easings.easeOutQuad);
  // Spin it!
  aura.onUpdate(() => {
    aura.angle += 180 * dt();
    aura.pos = target.pos.add(0, -40); // Follow above head
  });
  // Scale pulse
  const startScale = 2.5;
  const endScale = 3.5;
  tween(startScale, endScale, 1.5, (s) => aura.scale = vec2(s), easings.easeInOutSine);
  // Fade out and destroy
  wait(1.5, () => {
    tween(aura.opacity, 0, 0.5, (o) => aura.opacity = o, easings.easeInQuad)
      .then(() => destroy(aura));
  });
}

/**
 *  POWERUP -
 */
export function animatePowerup(target) {
  const startY = target.pos.y + 100;
  const endY = target.pos.y - 150;
  
  const beam = add([
    sprite("powerup", { anim: "beam" }),
    pos(target.pos.x, startY),
    scale(3),
    opacity(0),
    z(95),
    anchor("center")
  ]);
  
  // Fade in quickly
  tween(beam.opacity, 0.8, 0.7, (o) => beam.opacity = o, easings.easeOutQuad);
  // Rise up!
  tween(beam.pos.y, endY, 1.5, (y) => beam.pos.y = y, easings.easeOutQuad);
  // Fade out
  wait(0.8, () => {
    tween(beam.opacity, 0, 0.5, (o) => beam.opacity = o, easings.easeInQuad)
      .then(() => destroy(beam));
  });
}

/**
 *  CATNIP CLAW
 */
export function animateClaw(attacker, target) {
  shake(20);
  const startX = target.pos.x-50;
  const endX = target.pos.x - 250;
  
  const slash = add([
    sprite("claw", { anim: "slash" }),
    pos(startX, attacker.pos.y - 100),
    scale(5),
    z(90),
    anchor("left")
  ]);
  
  // Swipe across!
  tween(slash.pos.x, endX, 1, (x) => slash.pos.x = x, easings.easeInOutQuad)
    .then(() => {
      animateSmoke(target);
      destroy(slash);
    });
}

/**
 * ANIMATION ZOOMIES - GLITCHY ZIP AROUND MOVE
 */
export function animateZoomies(attacker, target) {
  const glitchCat = add([
    sprite("zoomies", { anim: "glitch" }),
    pos(attacker.pos),
    scale(1.5),
    z(110),
    anchor("center"),
    opacity(1)
  ]);
  
  // Rainbow cycle
  let colorUpdate = glitchCat.onUpdate(() => {
    const hue = (time() * 360) % 360;
    glitchCat.color = hsl2rgb(hue / 360, 1, 0.8);
  });
  
  // Rapid zips around the screen
  const zips = [
    vec2(rand(100, 400), rand(150, 400)), 
    vec2(rand(600, 900), rand(100, 300)), 
    vec2(rand(500, 800), rand(300, 500)), 
    target.pos
  ];
  
  let i = 0;
  function zipNext() {
    if (i < zips.length) {
      tween(glitchCat.pos, zips[i], 0.12, (p) => glitchCat.pos = p, easings.linear)
        .then(() => {
          shake(10);
          i++;
          zipNext();
        });
    } else {
      // Final impact!
      shake(40);
      animateExplosion(target);
      const startScale = 1.5;
      const endScale = 3.5;
      tween(startScale, endScale, 0.25, (s) => glitchCat.scale = vec2(s), easings.easeOutQuad)
        .then(() => destroy(glitchCat));
    }
  }
  zipNext();
}

/**
 * ANIMATION BIG BOOM
 */
export function animateBigBoom(target) {
  shake(100);
  // Create multiple particle bursts
  for (let i = 0; i < 3; i++) {
    wait(i * 0.1, () => {
      add([
        pos(target.pos.add(rand(-30, 30), rand(-30, 30))),
        particles({
          max: 120,
          speed: [100, 300],
          direction: 0,
          spread: 360,
          lifeTime: [0.5, 1.5],
        }, () => [
          circle(rand(2, 8)),
          color(choose([ORANGE, YELLOW, RED, MAGENTA, rgb(255, 100, 255)])),
          opacity(1),
          move(rand(0, 360), rand(100, 300)),
          lifespan(rand(0.5, 1.5)),
        ]),
        z(120)
      ]);
    });
  }
  // Big flash
  const flash = add([
    circle(100),
    pos(target.pos),
    color(WHITE),
    opacity(0.8),
    z(125),
    anchor("center")
  ]);
  tween(flash.scale, 3, 0.3, (s) => flash.scale = vec2(s), easings.easeOutQuad);
  tween(flash.opacity, 0, 0.3, (o) => flash.opacity = o, easings.easeOutQuad)
    .then(() => destroy(flash));
}

 /**
 * ANIMATION CUCUMBER CANNON - CHARGE THEN FIRE CUCUMBER
 */
export function animateGreenBlast(attacker, target) {
    const charge = add([
      sprite("greenBlast", { anim: "glitch" }),
      pos(attacker.pos),
      scale(3),
      anchor("center"),
      z(20),
      opacity(0)
    ]);

    tween(charge.opacity, 1, 0.2, (o) => charge.opacity = o);
    tween(3, 4.2, 0.4, (s) => charge.scale = vec2(s));

    let t = 0;
    charge.onUpdate(() => {
      t += dt();
      charge.pos = attacker.pos.add(Math.sin(t * 40) * 6, Math.cos(t * 40) * 6);
    });

    wait(0.45, () => {
      destroy(charge);
      shake(10);

      const shot = add([
        sprite("littleCucumber"),
        pos(attacker.pos),
        scale(1.5),
        anchor("center"),
        z(30)
      ]);

      tween(shot.pos, target.pos, 0.45, (p) => shot.pos = p, easings.easeOutQuad)
        .then(() => {
          animateExplosion(target);
          animateSmoke(target);
          destroy(shot);
        });
    });
  }

 /**
 * ANIMATION: MAKE BISCUITS - HEALING MOVE
 */
export function animateBiscuits(target) {
    const paws = add([
      sprite("biscuits", { anim: "glitch" }),
      pos(target.pos.add(100, -20)),
      scale(3),
      anchor("center"),
      z(30),
      opacity(0)
    ]);

    tween(paws.opacity, 1, 0.5, (o) => paws.opacity = o);

    let t = 0;
    paws.onUpdate(() => {
      t += dt();
      const squish = 1 + Math.sin(t * 8) * 0.01;
      paws.scale = vec2(3 * squish, 3 / squish);
      paws.pos = target.pos.add(100, -20);
    });

    wait(1.0, () => {
      tween(paws.opacity, 0, 1, (o) => paws.opacity = o)
        .then(() => destroy(paws));
    });
  }

 /**
 * ANIMATION: ESPRESSO FIREBALL - PROJECTILE FIREBALL WITH EXPLOSION
 */
export function animateEspressoFireball(attacker, target) {
    const start = attacker.pos.add(40, -30);
    const end = target.pos.add(-20, 0);

    const fb = add([
      sprite("fireball", { anim: "glitch" }),
      pos(start),
      scale(2),
      anchor("center"),
      z(40)
    ]);

    fb.onUpdate(() => fb.angle += 720 * dt());

    tween(start, end, 0.45, (p) => fb.pos = p, easings.easeInQuad)
      .then(() => {
        animateExplosion(target);
        animateSmoke(target);
        destroy(fb);
      });
  }

 /**
 * ANIMATION: SCRATCH
 */
  export function animateScratch(attacker, target) {
    shake(20);

    const angles = [30, 10, 0, 0];
    const offsets = [
      vec2(15, -20),
      vec2(0, 10),
      vec2(-20, 10),
      vec2(-40, 20)
    ];

    let i = 0;

   function slashNext() {
      if (i >= angles.length) return;

      const slash = add([
        sprite("scratch", { anim: "glitch" }),
        pos(target.pos.add(offsets[i])),
        scale(10),
        anchor("center"),
        rotate(angles[i]),
        z(30),
        opacity(1)
      ]);

      tween(1, 0, 0.7, (o) => slash.opacity = o)
        .then(() => destroy(slash));

      i++;
      wait(0.05, slashNext);
    }

    slashNext();
  }

/**
 * ⚡ SHOCK 
 */
function animateShock(target) {
  shake(20);

  const zap = add([
    sprite("shock", { anim: "burst" }),
    pos(target.pos),
    scale(4),
    opacity(1),
    z(12),
    anchor("center")
  ]);

  wait(0.3, () => {
    tween(zap.opacity, 0, 0.25, (o) => zap.opacity = o, easings.easeOutQuad)
      .then(() => destroy(zap));
  });
}

/**
 * ⚡ SUPERPOSITION SLAM - QUANTUM COPIES WARP AND CONVERGE
 */
export function animateSuperpositionSlam(boss, hero) {
  const makeCopy = () => add([
    sprite("superposition", { anim: "glitch" }),
    pos(boss.pos),
    scale(2),
    anchor("center"),
    z(20),
    opacity(0)
  ]);

  const copyA = makeCopy();
  const copyB = makeCopy();

  tween(copyA.opacity, 1, 0.2, (o) => copyA.opacity = o);
  tween(copyB.opacity, 1, 0.2, (o) => copyB.opacity = o);

  const makeWarpPath = () => [
    hero.pos.add(rand(-220, -120), rand(-140, 90)),
    hero.pos.add(rand(-100, 140), rand(-170, 150)),
    hero.pos.add(rand(80, 240), rand(-80, 120)),
    hero.pos, 
  ];

  const warpsA = makeWarpPath();
  const warpsB = makeWarpPath();

  function warpCopy(copy, path, onFinish) {
    let i = 0;

    function step() {
      if (i < path.length) {
        tween(copy.pos, path[i], 0.15, (p) => copy.pos = p, easings.easeInOutQuad)
          .then(() => {
            shake(5);
            i++;
            step();
          });
      } else {
        onFinish();
      }
    }
    step();
  }

  let finishedCount = 0;
  function notifyFinished() {
    finishedCount++;
    if (finishedCount === 2) {
      collapseAndHit();
    }
  }

  warpCopy(copyA, warpsA, notifyFinished);
  warpCopy(copyB, warpsB, notifyFinished);

  function collapseAndHit() {
    tween(copyA.scale, vec2(3, 3), 0.1, (s) => copyA.scale = s);
    tween(copyB.scale, vec2(3, 3), 0.1, (s) => copyB.scale = s);

    tween(copyA.pos, hero.pos, 0.1, (p) => copyA.pos = p);
    tween(copyB.pos, hero.pos, 0.1, (p) => copyB.pos = p);

    wait(0.1, () => {
      shake(40);
      animateShock(hero);

      tween(copyA.opacity, 0, 0.25, (o) => copyA.opacity = o)
        .then(() => destroy(copyA));

      tween(copyB.opacity, 0, 0.25, (o) => copyB.opacity = o)
        .then(() => destroy(copyB));
    });
  }
}

/**
 * 🔨 HYDROGEN HAMMER 
 */
export function animateHydrogenHammer(boss, hero) {
  const hammer = add([
    sprite("hammer", { anim: "smash" }),
    pos(boss.pos.add(-200, 10)),
    scale(3.5),
    anchor("center"),
    z(25),
    opacity(1)
  ]);
  
  tween(hammer.pos, boss.pos.add(-200, -40), 0.6, (p) => hammer.pos = p, easings.easeOutQuad)
    .then(() => {
      tween(
        hammer.pos,
        hero.pos.add(20, -50),
        0.1,
        (p) => hammer.pos = p,
        easings.easeInCubic
      ).then(() => {
        shake(40);
        animateShock(hero);
        tween(hammer.opacity, 0, 0.8, (o) => hammer.opacity = o)
          .then(() => destroy(hammer));
      });
    });
}

/**
 * ☠️ POISON - OPEN SCHRODINGERS BOX - POISON BOTTLE FLOATS UP - BOTTLE SPLITS / SUPERPOSITIONS ITSELF -BOTTLES CONVERGE AND SHATTER - POISON SPILLS
 */
export function animatePoisonAttack(boss, hero) {
  // Phase 1: Open Schrödinger's Box
  const box = add([
    sprite("box", { frame: 0 }), 
    pos(boss.pos.add(-40, 20)),
    scale(2),
    z(30),
    anchor("center"),
    opacity(0)
  ]);

  tween(box.opacity, 1, 0.25, (o) => box.opacity = o);
  tween(box.pos.y, box.pos.y - 20, 0.3, (p) => box.pos.y = p, easings.easeOutQuad);

  wait(0.4, () => {
    box.frame = 1; // Open box
  });

  wait(0.5, () => {
    // Phase 2: Bottle rises from box
    const bottle = add([
      sprite("bottle"),
      pos(box.pos.add(0, -20)),
      scale(2.2),
      anchor("center"),
      z(35),
      opacity(0)
    ]);

    tween(bottle.opacity, 1, 0.2, (o) => bottle.opacity = o);
    tween(bottle.pos.y, bottle.pos.y - 60, 0.6, (y) => bottle.pos.y = y, easings.easeOutQuad);
    
    tween(box.opacity, 0, 0.4, (o) => box.opacity = o)
      .then(() => destroy(box));

    wait(0.7, () => {
      // Phase 3: Bottle enters superposition
      const makeCopy = () => add([
        sprite("bottle"),
        pos(bottle.pos),
        scale(2.2),
        anchor("center"),
        z(40),
        opacity(0)
      ]);

      destroy(bottle);

      const A = makeCopy();
      const B = makeCopy();

      tween(A.opacity, 1, 0.15, (o) => A.opacity = o);
      tween(B.opacity, 1, 0.15, (o) => B.opacity = o);

      const makePath = () => [
        hero.pos.add(rand(-250, -150), rand(-120, 120)),
        hero.pos.add(rand(-150, 150), rand(-160, 160)),
        hero.pos.add(rand(100, 260), rand(-100, 140)),
        hero.pos.add(0, -120)
      ];

      const pathA = makePath();
      const pathB = makePath();

      let finished = 0;

      const warpCopy = (obj, path) => {
        let i = 0;
        function step() {
          if (i < path.length) {
            tween(obj.pos, path[i], 0.15, (p) => obj.pos = p, easings.easeInOutQuad)
              .then(() => {
                shake(5);
                i++;
                step();
              });
          } else {
            finished++;
            if (finished === 2) {
              // Phase 4: Bottles merge and shatter
              const mergePoint = hero.pos.add(0, -120);
              tween(A.pos, mergePoint, 0.12, (p) => A.pos = p);
              tween(B.pos, mergePoint, 0.12, (p) => B.pos = p);

              tween(A.scale, vec2(2.8, 2.8), 0.1, (s) => A.scale = s);
              tween(B.scale, vec2(2.8, 2.8), 0.1, (s) => B.scale = s);

              wait(0.12, () => {
                shake(30);
                destroy(A);
                destroy(B);
                
                const shatter = add([
                  sprite("shatter", { anim: "glitch" }),
                  pos(mergePoint),
                  scale(3),
                  anchor("center"),
                  z(50)
                ]);
                
                wait(0.4, () => {
                  destroy(shatter);
                  
                  // Phase 5: Poison drips down
                  const drip = add([
                    sprite("poison", { anim: "glitch" }), 
                    pos(hero.pos.add(0, -10)),
                    scale(3),
                    opacity(0),
                    anchor("center"),
                    z(60)
                  ]);

                  tween(drip.opacity, 1, 0.2, (o) => drip.opacity = o);
                  tween(drip.pos.y, hero.pos.y + 40, 0.6, (y) => drip.pos.y = y, easings.easeInQuad);

                  wait(0.5, () => {
                    tween(drip.opacity, 0, 0.3, (o) => drip.opacity = o)
                      .then(() => destroy(drip));
                  });
                });
              });
            }
          }
        }
        step();
      };

      warpCopy(A, pathA);
      warpCopy(B, pathB);
    });
  });
}