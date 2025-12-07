import kaplay from "kaplay";

kaplay({
  width: 1000,
  height: 480,
  scale: 1,
  background: [12, 5, 18],
  debug: true,
  crisp: true,
  canvas: document.getElementById("gameCanvas"),
});

loadFont("CyberGoth", "assets/fonts/ScienceGothic.ttf");
loadFont("Basic", "assets/fonts/PTSansNarrow-Regular.ttf");

loadSprite("cat", "assets/images/CATastrophe/DougBattle2.png");
loadSprite("rat", "assets/images/CATastrophe/BigRat.png");
loadSprite("BG", "assets/images/AcousticKittyBG.png");

loadSprite("purpleBoom", "assets/images/CATastrophe/Explosion.png", { sliceX:6, sliceY:1, anims:{burst:{from:0,to:5}} });
loadSprite("redBoom", "assets/images/CATastrophe/RedBoom.png", { sliceX:6, sliceY:1, anims:{burst:{from:0,to:5}} });
loadSprite("fire", "assets/images/CATastrophe/Fire.png", { sliceX:9, sliceY:1, anims:{ball:{from:0,to:8}} });
loadSprite("smoke", "assets/images/CATastrophe/Smoke.png", { sliceX:9, sliceY:1, anims:{puff:{from:0,to:8}} });
loadSprite("swirl", "assets/images/CATastrophe/Swirl.png", { sliceX:12, sliceY:1, anims:{spin:{from:0,to:11}} });
loadSprite("powerup", "assets/images/CATastrophe/PowerUp.png", { sliceX:9, sliceY:1, anims:{beam:{from:0,to:8}} });
loadSprite("zoomies", "assets/images/CATastrophe/Zoomies.png", { sliceX:3, sliceY:3, anims:{glitch:{from:0,to:8}} });
loadSprite("claw", "assets/images/CATastrophe/CatnipClaw.png", { sliceX:32, sliceY:1, anims:{slash:{from:0,to:31,speed:30}} });
loadSprite("greenBlast", "assets/images/CATastrophe/GreenBlast.png", { sliceX:12, sliceY:1, anims:{glitch:{from:0,to:11}} });
loadSprite("biscuits", "assets/images/CATastrophe/Biscuits.png", { sliceX:8, sliceY:3, anims:{glitch:{from:0,to:23}} });
loadSprite("fireball", "assets/images/CATastrophe/Fireball.png", { sliceX:4, sliceY:1, anims:{glitch:{from:0,to:3}} });
loadSprite("scratch", "assets/images/CATastrophe/Scratch.png", { sliceX:4, sliceY:1, anims:{glitch:{from:0,to:3}} });
loadSprite("littleCucumber", "assets/images/CATastrophe/LittleCucumber.PNG");

scene("test", () => {

  onDraw(() => {
    const pulse = (Math.sin(time() * 1.8) + 1) / 2;
    const opacity = 0.15 + pulse * 0.35;
    const thickness = 1 + pulse * 1.8;
    const lineColor = rgb(140 + pulse * 60, 82, 255);
    const gs = 50;
    for (let x = 0; x <= width(); x += gs)
      drawLine({ p1: vec2(x, 0), p2: vec2(x, height()), color: lineColor, opacity, width: thickness });
    for (let y = 0; y <= height(); y += gs)
      drawLine({ p1: vec2(0, y), p2: vec2(width(), y), color: lineColor, opacity, width: thickness });
  });

  const cat = add([
    sprite('cat'),
    pos(60, 190),
    scale(1.2),
    z(2),
    "cat"
    
  ]);

  const hero = add([
    circle(1),
    pos(170, 300),
    color(131, 12, 222),
    outline(4, rgb(165, 90, 225)),
    z(1),
    "hero"
  ]);

  const rat = add([
    sprite('rat'),
    pos(750, 100),
    scale(2.3),
    z(2),
    "rat"
  ]);
  const boss = add([
    circle(1),
    pos(810, 160),
    color(144, 144, 192),
    outline(5, rgb(196, 195, 208)),
    anchor("center"),
    "boss"
  ]);

  const movesRect = add([
    rect(1000, 130),
    pos(0, 350),
    color(rgb(42,52,57)),
    outline(5, rgb(131, 12, 222)),
    "moves",
    z(1)
  ]);

  onKeyPress("1", () => animateRedBoom(hero));
  onKeyPress("2", () => animatePurpleBoom(boss));
  onKeyPress("3", () => animateSmoke(boss));
  onKeyPress("4", () => animateSwirl(hero));
  onKeyPress("5", () => animatePowerup(hero));
  onKeyPress("6", () => animateClaw(hero, boss));
  onKeyPress("7", () => animateZoomies(hero, boss));
  onKeyPress("8", () => animateGreenBlast(boss, hero));   
  onKeyPress("9", () => animateBiscuits(hero));           
  onKeyPress("0", () => animateFireball(boss, hero));     
  onKeyPress("q", () => animateScratch(hero, boss)); 
  onKeyPress("w", () => animateFire(hero, boss));     
  onKeyPress("space", () => bigBoom(boss));

  function animateRedBoom(target) {
    shake(15);
    const boom = add([
      sprite("redBoom", { anim: "burst" }),
      pos(target.pos),
      scale(4),
      opacity(1),
      z(10),
      anchor("center")
    ]);
    wait(0.5, () => {
      tween(boom.opacity, 0, 0.3, (o) => boom.opacity = o, easings.easeOutQuad)
        .then(() => destroy(boom));
    });
  }

  function animatePurpleBoom(target) {
    shake(15);
    const boom = add([
      sprite("purpleBoom", { anim: "burst" }),
      pos(target.pos),
      scale(4),
      opacity(1),
      z(10),
      anchor("center")
    ]);
    wait(0.5, () => {
      tween(boom.opacity, 0, 0.3, (o) => boom.opacity = o, easings.easeOutQuad)
        .then(() => destroy(boom));
    });
  }

  function animateFire(attacker, target) {
    const start = attacker.pos.add(0, -20);
    const end = target.pos.add(0, -10);
    const mid = start.lerp(end, 0.5).add(rand(-60, 60), rand(-100, -40));

    const fireball = add([
      sprite("fire", { anim: "ball" }),
      pos(start),
      scale(2),
      z(5),
      anchor("center"),
      rotate(0)
    ]);

    tween(start, mid, 0.35, (p) => fireball.pos = p, easings.easeOutQuad)
      .then(() => tween(mid, end, 0.35, (p) => fireball.pos = p, easings.easeInQuad))
      .then(() => {
        shake(15);
        animateSmoke(target);
        animateRedBoom(target);
        destroy(fireball);
      });

    fireball.onUpdate(() => fireball.angle += 360 * dt());
  }

  function animateSmoke(target) {
    const poof = add([
      sprite("smoke", { anim: "puff" }),
      pos(target.pos.add(rand(-20, 20), rand(-20, 20))),
      scale(3),
      opacity(0),
      z(8),
      anchor("center")
    ]);
    tween(poof.opacity, 1, 0.15, (o) => poof.opacity = o);
    tween(poof.pos.y, poof.pos.y - 50, 1.2, (y) => poof.pos.y = y, easings.easeOutQuad);
    wait(0.3, () => {
      tween(poof.opacity, 0, 0.9, (o) => poof.opacity = o)
        .then(() => destroy(poof));
    });
  }

  function animateSwirl(target) {
    const aura = add([
      sprite("swirl", { anim: "spin" }),
      pos(target.pos),
      scale(3),
      opacity(0),
      z(8),
      anchor("center")
    ]);
    tween(aura.opacity, 0.7, 0.3, (o) => aura.opacity = o);
    aura.onUpdate(() => {
      aura.angle += 180 * dt();
      aura.pos = target.pos.add(0, -60);
    });
    tween(3, 4, 1.5, (s) => aura.scale = vec2(s), easings.easeInOutSine);
    wait(1.5, () => {
      tween(aura.opacity, 0, 0.5, (o) => aura.opacity = o)
        .then(() => destroy(aura));
    });
  }

  function animatePowerup(target) {
    const startY = target.pos.y + 100;
    const endY = target.pos.y - 150;

    const beam = add([
      sprite("powerup", { anim: "beam" }),
      pos(target.pos.x, startY),
      scale(3),
      opacity(0),
      z(8),
      anchor("center")
    ]);

    tween(beam.opacity, 0.8, 0.1, (o) => beam.opacity = o);
    tween(beam.pos.y, endY, 1.0, (y) => beam.pos.y = y, easings.easeOutQuad);

    wait(0.8, () => {
      tween(beam.opacity, 0, 0.3, (o) => beam.opacity = o)
        .then(() => destroy(beam));
    });
  }

  function animateClaw(attacker, target) {
    shake(20);
    const startX = target.pos.x-150;
    const endX = target.pos.x-150;

    const slash = add([
      sprite("claw", { anim: "slash" }),
      pos(startX, attacker.pos.y - 120),
      scale(4),
      z(5),
      anchor("left")
    ]);

    tween(slash.pos.x, endX, 1, (x) => slash.pos.x = x, easings.easeInOutQuad)
      .then(() => {
        destroy(slash);
      });
  }

  function animateZoomies(attacker, target) {
    const glitchCat = add([
      sprite("zoomies", { anim: "glitch" }),
      pos(attacker.pos),
      scale(1.8),
      z(15),
      anchor("center"),
      opacity(1)
    ]);

    glitchCat.onUpdate(() => {
      const hue = (time() * 360) % 360;
      glitchCat.color = hsl2rgb(hue / 360, 1, 0.8);
    });

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
        shake(40);
        animatePurpleBoom(target);
        tween(1.8, 3.5, 0.25, (s) => glitchCat.scale = vec2(s), easings.easeOutQuad)
          .then(() => destroy(glitchCat));
      }
    }

    zipNext();
  }

  function animateGreenBlast(attacker, target) {
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
          animateRedBoom(target);
          animateSmoke(target);
          destroy(shot);
        });
    });
  }

  function animateBiscuits(target) {
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

  function animateFireball(attacker, target) {
    const start = attacker.pos.add(40, -30);
    const end = target.pos.add(-20, 0);

    const fb = add([
      sprite("fireball", { anim: "glitch" }),
      pos(start),
      scale(3),
      anchor("center"),
      z(40)
    ]);

    fb.onUpdate(() => fb.angle += 720 * dt());

    tween(start, end, 0.45, (p) => fb.pos = p, easings.easeInQuad)
      .then(() => {
        animateRedBoom(target);
        animateSmoke(target);
        destroy(fb);
      });
  }

  function animateScratch(attacker, target) {
    shake(30);

    const angles = [-10, -10, 0, 0];
    const offsets = [
      vec2(15, -30),
      vec2(0, 10),
      vec2(-20, 15),
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

      tween(1, 0, 0.5, (o) => slash.opacity = o)
        .then(() => destroy(slash));

      i++;
      wait(0.05, slashNext);
    }

    slashNext();
  }

  function bigBoom(target) {
    shake(80);
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
          z(20)
        ]);
      });
    }

    const flash = add([
      circle(100),
      pos(target.pos),
      color(WHITE),
      opacity(0.8),
      z(25),
      anchor("center")
    ]);

    tween(flash.scale, 3, 0.3, (s) => flash.scale = s);
    tween(flash.opacity, 0, 0.3, (o) => flash.opacity = o)
      .then(() => destroy(flash));
  }

  add([
    text("1: Fire-Explosion | 2: Plasma-Explosion | 3: Smoke-Puff | 4: Overhead-Swirl | 5: Powerup | 6: Cat-Claw-Slash | 7: Cat-Zoomies | 8: Cucumber-Cannon | 9: Make-Cat-Biscuits | 0: Fireball-Projectile | Q: Scratch | W: Fireball-Arc |", {
      size: 32,
      width: 960,
      font: 'Basic'
    }),
    pos(20, 370),
    color(rgb(255, 255, 255)),
    z(20)
  ]);


  // =========================== CUSTOM SPRITE TESTER =========================== 
  let customSpriteName = "userSprite"; 
  let customAnimConfig = null;

  const uploadInput = document.getElementById("sprite-upload");
  const rowsInput = document.getElementById("rows");
  const columnsInput = document.getElementById("columns");
  const animNameInput = document.getElementById("anim-name");
  const framesInput = document.getElementById("frames");
  const animSpeedInput = document.getElementById("anim-speed");
  const positionOffsetInput = document.getElementById("position-offset");
  const opacityInput = document.getElementById("opacity");
  const scaleInput = document.getElementById("scale"); 
  const applyBtn = document.getElementById("apply-btn");
  const status = document.getElementById("status");

  applyBtn.addEventListener("click", async () => {
    const file = uploadInput.files[0];
    if (!file) {
      status.textContent = "No file uploaded!";
      return;
    }

    try {
      status.textContent = "Loading...";
      const blobUrl = URL.createObjectURL(file);
      
      const sliceY = parseInt(rowsInput.value) || 1;
      const sliceX = parseInt(columnsInput.value) || 1;
      
      const preset = document.getElementById("anim-preset").value;
      const customName = animNameInput.value.trim();
      const animName = (preset === "custom" && customName) ? customName : preset;

      const frameRange = framesInput.value.split("-").map(Number);
      const from = frameRange[0];
      const to = frameRange[1] || from; 
      const speed = parseInt(animSpeedInput.value) || 10;

      const offsetStr = positionOffsetInput.value.split(",").map(s => s.trim());
      const offsetX = parseFloat(offsetStr[0]) || 0;
      const offsetY = parseFloat(offsetStr[1]) || 0;
      const startOpacity = parseFloat(opacityInput.value) || 1;
      const startScale = parseFloat(scaleInput.value) || 3;

      if (isNaN(from) || isNaN(to) || from > to || from < 0) {
        throw new Error("Invalid frames! Use format like 0-11");
      }

     
      await loadSprite(customSpriteName, blobUrl, {
        sliceX,
        sliceY,
        anims: {
          [animName]: preset === "loop" ? { from, to, loop: true } :
                    preset === "pingpong" ? { from, to, pingpong: true } :
                    { from, to, speed }
        }
      });

      customAnimConfig = {
        animName,
        offsetX, offsetY,
        startOpacity, startScale,
        totalFrames: to - from + 1,
        speed,
        isLoop: preset === "loop",
        isPingpong: preset === "pingpong"
      };

      URL.revokeObjectURL(blobUrl);
      status.textContent = `Loaded "${animName}" (${customAnimConfig.totalFrames}f) → Press U!`;
    } catch (err) {
      status.textContent = `Error: ${err.message}`;
    }
  });

  onKeyPress("u", () => {
    if (!customAnimConfig) {
      debug.log("💡 Load a custom sprite first!");
      return;
    }
    animateCustom(boss); 
  });

  function animateCustom(target) {
    const {
      animName,
      offsetX,
      offsetY,
      startOpacity,
      startScale, 
      totalFrames,
      speed
    } = customAnimConfig;

    const duration = totalFrames / speed; 

    const customEffect = add([
      sprite(customSpriteName, { anim: animName }),
      pos(target.pos.add(offsetX, offsetY)),
      scale(startScale), 
      opacity(startOpacity),
      z(15), 
      anchor("center")
    ]);

    shake(8);

    wait(duration, () => {
      tween(customEffect.opacity, 0, 0.4, (o) => { customEffect.opacity = o; })
        .then(() => destroy(customEffect));
    });
  }

    onKeyPress("escape", () => {});
  });

go("test");
