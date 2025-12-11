import kaplay from "kaplay";

// RESPONSIVE SETUP FOR MOBILE
//const isMobile = window.innerWidth <= 768;
//const canvasWidth = isMobile ? window.innerWidth : 1000;
//const canvasHeight = isMobile ? Math.min(window.innerHeight * 0.6, 480) : 480;

const canvasWidth = 800;
const canvasHeight = 400;

kaplay({
  width: canvasWidth,
  height: canvasHeight,
  scale: 1,
  background: [12, 5, 18],
  debug: true,
  crisp: true,
  canvas: document.getElementById("gameCanvas"),
  stretch: true,
  letterbox: true,
});

loadFont("CyberGoth", "assets/fonts/ScienceGothic.ttf");
loadFont("Basic", "assets/fonts/PTSansNarrow-Regular.ttf");

loadSprite("cat", "assets/images/CATastrophe/DougBattle2.png");
loadSprite("rat", "assets/images/CATastrophe/BigRat.png");

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
loadSprite("lock", "assets/images/CATastrophe/LockOn.png", { sliceX:22, sliceY:1, anims:{glitch:{from:0,to:21,speed:30}} });
loadSprite("arrow", "assets/images/CatArrow.PNG");
loadSprite("superposition", "assets/images/CATastrophe/Superposition.png", { sliceX: 4,   sliceY: 1,   anims: { glitch: { from: 0, to: 3 } }});
loadSprite("shock", "assets/images/CATastrophe/Shock.png", {   sliceX: 4, sliceY: 1,   anims: { burst: { from: 0, to: 3 } }});
loadSprite("hammer", "assets/images/CATastrophe/HydrogenHammer.png", { sliceX: 10, sliceY: 1, anims: { smash: { from: 0, to: 9 } }});
loadSprite("box", "assets/images/CATastrophe/box.png", { sliceX: 2, sliceY: 1, anims: { glitch: { from: 0, to: 1 } }});
loadSprite("bottle", "assets/images/CATastrophe/PoisonBottle.png", { sliceX: 1, sliceY: 1, anims: { glitch: { from: 0, to: 0 } }});
loadSprite("shatter", "assets/images/CATastrophe/Shatter.png", { sliceX: 6, sliceY: 1, anims: { glitch: { from: 0, to: 5 } }});
loadSprite("poison", "assets/images/CATastrophe/Poison.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
loadSprite("bam", "assets/images/CATastrophe/Bam.png", { sliceX: 8, sliceY: 1, anims: { glitch: { from: 0, to: 7 } }});
loadSprite("bite", "assets/images/CATastrophe/Bite.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
loadSprite("laserCharge", "assets/images/CATastrophe/LaserCharge.png", { sliceX: 6, sliceY: 1, anims: { glitch: { from: 0, to: 5 } }});
loadSprite("laserBeam", "assets/images/CATastrophe/LaserBeam.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
loadSprite("zap", "assets/images/CATastrophe/Zap.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
loadSprite("smallRat", "assets/images/CATastrophe/SmallRat.png");
loadSprite("poof", "assets/images/CATastrophe/poof.png", { sliceX:8, sliceY:1, anims:{burst:{from:0,to:7}} });
loadSprite("smallRat2", "assets/images/CATastrophe/SmallRat2.png");
loadSprite("ghostRat", "assets/images/CATastrophe/GhostRat.png");

window.gameActions = {};

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
    pos(30, 220),
    scale(1.1),
    z(2),
    "cat"
    
  ]);

  const hero = add([
    circle(1),
    pos(120, 310),
    color(131, 12, 222),
    outline(4, rgb(165, 90, 225)),
    z(1),
    "hero"
  ]);

  const rat = add([
    sprite('rat'),
    pos(620, 100),
    scale(2.1),
    z(2),
    "rat"
  ]);
  const boss = add([
    circle(1),
    pos(670, 180),
    color(144, 144, 192),
    outline(5, rgb(196, 195, 208)),
    anchor("center"),
    "boss"
  ]);

//  const movesRect = add([
//    rect(800, 130),
//    pos(0, 350),
//    color(rgb(42,52,57)),
//    outline(5, rgb(131, 12, 222)),
//    "moves",
//    z(1)
//  ]);


  window.gameActions = {
    '1': () => animateRedBoom(hero),
    '2': () => animatePurpleBoom(boss),
    '3': () => animateSmoke(boss),
    '4': () => animateSwirl(hero),
    '5': () => animatePowerup(hero),
    '6': () => animateClaw(hero, boss),
    '7': () => animateZoomies(hero, boss),
    '8': () => animateGreenBlast(boss, hero),
    '9': () => animateBiscuits(hero),
    '0': () => animateFireball(boss, hero),
    'q': () => animateScratch(hero, boss),
    'w': () => animateFire(hero, boss),
    'e': () => animateCatArrow(hero, boss),
    'r': () => animateShock(boss),
    't': () => animateSuperpositionSlam(boss, hero),
    'y': () => animateHydrogenHammer(boss, hero),
    'p': () => animatePoisonAttack(boss, hero),
    'm': () => animateMouseMissiles(boss, hero),
    'b': () => animateRatBite(hero),
    'z': () => animateZap(hero),
    'l': () => animateLaserBeam(boss, hero),
    'n': () => animateGhostPoof(boss),
    'x': () => animateKaBAM(boss),
    'u': () => {
      if (!customAnimConfig) {
        console.log("Load a custom sprite first!");
        return;
      }
      animateCustom(boss);
    },
    'space': () => bigBoom(boss)
  };


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
  onKeyPress("e", () => animateCatArrow(hero, boss));
  onKeyPress("r", () => animateShock(boss));
  onKeyPress("t", () => animateSuperpositionSlam(boss, hero));
  onKeyPress("y", () => animateHydrogenHammer(boss, hero));
  onKeyPress("p", () => animatePoisonAttack(boss, hero));
  onKeyPress("m", () => animateMouseMissiles(boss, hero));
  onKeyPress("b", () => animateRatBite(hero));
  onKeyPress("z", () => animateZap(hero));
  onKeyPress("l", () => animateLaserBeam(boss, hero));
  onKeyPress("n", () => animateGhostPoof(boss));
  onKeyPress("x", () =>  animateKaBAM(boss));
 

  function animateRedBoom(target) {
      shake(15);
      const boom = add([
        sprite("redBoom", { anim: "burst" }),
        pos(target.pos),
        scale(3),
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
        scale(3),
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
      pos(startX, attacker.pos.y - 160),
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
      scale(1.1),
      z(15),
      anchor("center"),
      opacity(1)
    ]);

    glitchCat.onUpdate(() => {
      const hue = (time() * 360) % 360;
      glitchCat.color = hsl2rgb(hue / 360, 1, 0.8);
    });

    const zips = [
      vec2(rand(80, 300), rand(150, 300)), 
      vec2(rand(600, 700), rand(100, 300)), 
      vec2(rand(200, 500), rand(100, 500)), 
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
      scale(2.5),
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
        scale(1.3),
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

  function animateCatArrow(attacker, target) {
    const lock = add([ // LOCK ON
      sprite("lock", { anim: "glitch" }),
      pos(target.pos),
      scale(2),
      anchor("center"),
      z(20),
      opacity(0),
    ]);

    tween(lock.opacity, 1, 0.4, (o) => lock.opacity = o);

    let t = 0;
    lock.onUpdate(() => {
      t += dt();
      lock.pos = target.pos.add(Math.sin(t * 20) * 6, Math.cos(t * 10) * 8);
    });

    wait(1, () => {
      destroy(lock);
      shake(8);

      const arrow = add([
        sprite("arrow"),         
        pos(target.pos),
        scale(1),
        anchor("center"),
        rotate(0),
        z(30),
      ]);

      const dirToPlayer = attacker.pos.sub(target.pos).unit();
      arrow.angle = dirToPlayer.angle() + 180;

      
      tween( // PULL BACK
        arrow.pos,
        attacker.pos.add(dirToPlayer.scale(40)), // BEHIND PLAYER
        0.2,
        (p) => arrow.pos = p,
        easings.easeInExpo
      ).then(() => { // STRETCH + WOBBLE
        arrow.scale = vec2(2, 2);
        shake(4);

      
        let vibe = 0;  // VIBRATION
        const vibeHandle = arrow.onUpdate(() => {
          vibe += dt();
          arrow.pos = arrow.pos.add(Math.sin(vibe * 50) * 2, Math.sin(vibe * 30) * 1);
        });

        wait(0.9, () => {                
          vibeHandle.cancel();    // PAUSE TO SEE ARROW        
          arrow.pos = attacker.pos.add(dirToPlayer.scale(40))
          tween(arrow.scale, vec2(0, 0), 0.08, (s) => arrow.scale = s) // WIND UP SQUISH
            .then(() => {
              // FWSSSHHHHHH — RELEASE!!!
              tween(arrow.scale, vec2(1.5), 0.08, (s) => arrow.scale = s);

              tween(
                arrow.pos,
                target.pos,
                0.15,    // FAST                               
                (p) => arrow.pos = p,
                easings.easeInCubic
              ).then(() => {
                tween(arrow.pos, target.pos.add(dirToPlayer.scale(-15)), 0.06, (p) => arrow.pos = p, easings.easeOutCubic) // OVERSHOOT
                  .then(() => {
                    arrow.pos = target.pos;
                    animateRedBoom(target);
                    animateSmoke(target);
                    shake(20);

                    destroy(arrow);
                  });
              });
            });
        });
      });
    });
  }

  function animateBiscuits(target) {
      const paws = add([
        sprite("biscuits", { anim: "glitch" }),
        pos(target.pos.add(100, -20)),
        scale(2.8),
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
        scale(2.5),
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

function animateSuperpositionSlam(boss, hero) {
  const makeCopy = () => add([
    sprite("superposition", { anim: "glitch" }),
    pos(boss.pos),
    scale(2.2),
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

function animateHydrogenHammer(boss, hero) {
  const hammer = add([
    sprite("hammer", { anim: "smash" }),
    pos(boss.pos.add(-200, 10)),
    scale(3.2),
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

function animatePoisonBox(boss) {
  const box = add([
    sprite("box", { frame: 0 }), 
    pos(boss.pos.add(-40, 20)),
    scale(1.8),
    z(30),
    anchor("center"),
    opacity(0)
  ]);

  tween(box.opacity, 1, 0.25, (o) => box.opacity = o);
  tween(box.pos.y, box.pos.y - 20, 0.3, (p) => box.pos.y = p, easings.easeOutQuad);

  wait(0.4, () => {
    box.frame = 1; 
  });

  return box;
}

function animatePoisonBottleRise(box) {
  const bottle = add([
    sprite("bottle"),
    pos(box.pos.add(0, -20)),
    scale(1.8),
    anchor("center"),
    z(35),
    opacity(0)
  ]);

  tween(bottle.opacity, 1, 0.2, (o) => bottle.opacity = o);
  tween(bottle.pos.y, bottle.pos.y - 60, 0.6, (y) => bottle.pos.y = y, easings.easeOutQuad);

  return bottle;
}

function animatePoisonBottleSuperposition(bottle, hero, onComplete) {
  const makeCopy = () => add([
    sprite("bottle"),
    pos(bottle.pos),
    scale(1.8),
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
        if (finished === 2) onComplete(A, B); 
      }
    }
    step();
  };

  warpCopy(A, pathA);
  warpCopy(B, pathB);
}

function animatePoisonMergeAndShatter(A, B, hero, onComplete) {
  const mergePoint = hero.pos.add(0, -120);
  tween(A.pos, mergePoint, 0.12, (p) => A.pos = p);
  tween(B.pos, mergePoint, 0.12, (p) => B.pos = p);

  tween(A.scale, vec2(2.8,2.8), 0.1, (s) => A.scale = s);
  tween(B.scale, vec2(2.8,2.8), 0.1, (s) => B.scale = s);

  wait(0.12, () => {
    shake(30);
    destroy(A);
    destroy(B);
    const shatter = add([
      sprite("shatter", { anim: "glitch" }),
      pos(mergePoint),
      scale(2),
      anchor("center"),
      z(50)
    ]);
    wait(0.4, () => {
      destroy(shatter);
      onComplete();
    });
  });
}

function animatePoisonDrip(hero) {
  const drip = add([
    sprite("poison", { anim: "glitch" }), 
    pos(hero.pos.add(0, 0)),
    scale(2),
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
}

function animatePoisonAttack(boss, hero) {
  const box = animatePoisonBox(boss); // OPEN SHRODINGERS BOX

  wait(0.5, () => {
    const bottle = animatePoisonBottleRise(box); // BOTTLE RISES
      tween(box.opacity, 0, 0.4, (o) => box.opacity = o)
        .then(() => destroy(box));

    wait(0.7, () => {
      animatePoisonBottleSuperposition(bottle, hero, (A, B) => { // SUPERPOSITION
        animatePoisonMergeAndShatter(A, B, hero, () => { // COLLAPSE
          animatePoisonDrip(hero); // DRIP

        });
      });
    });
  });
}

function animateKaBAM(boss, hero) {
  shake(20);
  const kabam = add([
    sprite("bam", { anim: "glitch" }),
    pos(boss.pos),
    scale(5),
    anchor("center"),
    z(40),
    opacity(1)
  ]);

  wait(0.4, () => destroy(kabam))
}

function animateMouseMissiles(boss, hero) {
  const flash = add([
    sprite("bam", { anim: "glitch" }),
    pos(boss.pos.add(-40, 20)),
    scale(4),
    anchor("center"),
    z(40),
    opacity(1)
  ]);

  wait(0.25, () => destroy(flash));

  const count = randi(3, 5);

  for (let i = 0; i < count; i++) {
    wait(i * 0.12, () => {
      const ratProj = add([
        sprite("smallRat"),
        pos(boss.pos.add(-30, 30)),
        scale(5),
        anchor("center"),
        rotate(-15),
        z(40),
      ]);

      tween(
        ratProj.pos,
        hero.pos.add(rand(-10, 10), rand(-10, 10)),
        0.45,
        (p) => ratProj.pos = p,
        easings.easeOutQuad
      ).then(() => {
        shake(12);
        animateRedBoom(hero);
        destroy(ratProj);
      });
    });
  }
}

function animateRatBite(hero) {
  shake(25);

  const bite = add([
    sprite("bite", { anim: "glitch" }),
    pos(hero.pos.add(0, -40)),
    scale(5),
    anchor("center"),
    z(50),
    opacity(1)
  ]);

  tween( bite.scale, vec2(5, 5), 0.15, s => bite.scale = s )
    .then(() => {
      tween( bite.scale, vec2(4, 4), 0.15, s => bite.scale = s )
      shake(30);
    });

  wait(0.4, () => {
    tween(bite.opacity, 0, 0.25, (o) => bite.opacity = o).then(() => destroy(bite));
  });
}

function animateZap(target) {
  shake(20);

  const zap = add([
    sprite("zap", { anim: "glitch" }),
    pos(target.pos),
    scale(5),
    anchor("center"),
    opacity(1),
    z(20)
  ]);

  wait(0.25, () => {
    tween(zap.opacity, 0, 0.2, o => zap.opacity = o)
      .then(() => destroy(zap));
  });
}

function animateLaserBeam(boss, hero) {
  const charge = add([
    sprite("laserCharge", { anim: "glitch" }),
    pos(boss.pos.add(-30, 10)),
    scale(5),
    anchor("center"),
    opacity(0),
    z(50)
  ]);

  tween(charge.opacity, 1, 0.4, o => charge.opacity = o);
  tween(3, 4, 0.4, s => charge.scale = vec2(s));

  wait(0.45, () => {
    destroy(charge);
    shake(12);

    const beamStart = boss.pos.add(-150, 20);
    const beamEnd = hero.pos;

    const beam = add([
      sprite("laserBeam", { anim: "glitch" }),
      pos(beamStart),
      scale(vec2(5)),
      anchor("center"),
      rotate(15),
      z(60),
      opacity(1)
    ]);

    tween(
      beam.pos,
      beamEnd,
      0.3,
      (p) => beam.pos = p,
      easings.easeInQuad
    ).then(() => {
      animateZap(hero);
      shake(25);
      destroy(beam);
    });
  });
}

function animateGhostPoof(target) {
  const pooooof = add([
    sprite("poof", { anim: "burst" }),
    pos(target.pos),
    scale(2),
    opacity(1),
    z(12),
    anchor("center")
    ]);

  wait(0.3, () => {
    tween(pooooof.opacity, 0, 0.25, (o) => pooooof.opacity = o, easings.easeOutQuad)
      .then(() => destroy(pooooof));
    });

  const ghost = add([
        sprite("ghostRat"),
        pos(target.pos),
        scale(1),
        opacity(0.8),
        z(100),
       anchor("center"),
        rotate(0)
      ]);
      
  tween(ghost.pos.y, 0, 1.5, (y) => ghost.pos.y = y, easings.easeOutQuad);
  tween(ghost.opacity, 0, 1.5, (o) => ghost.opacity = o, easings.easeOutQuad);
      
  wait(1.5, () => destroy(ghost));
}

//add([
//    text("1: Fire-Explosion | 2: Plasma-Explosion | 3: Smoke-Puff | 4: Overhead-Swirl | 5: Powerup | 6: Cat-Claw | 7: Zoomies | 8: Cucumber-Cannon | 9: Make-Biscuits | 0: Fireball-Projectile | Q: Scratch | W: Fireball-Arc | E: Cat-Arrow | R. Shock | T. Superposition-Slam | Y. Hydrogen-Hammer | P. Poison | L. Laser-Beam | M. Mouse-Missles | B. Rat-Bite | Z. Zap", {
//      size: 25,
//      width: 800,
//      font: 'Basic'
//    }),
//    pos(20, 360),
//    color(rgb(255, 255, 255)),
//    z(20)
//  ]);

  // =========================== CUSTOM SPRITE TESTER  =========================== 
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
  const errorDiv = document.getElementById("error");

  function showError(message) {
    errorDiv.textContent = `❌ ${message}`;
    errorDiv.style.display = 'block';
    status.textContent = "Upload failed - see error above";
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  }

  function isValidImageFile(file) {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    return validTypes.includes(file.type);
  }

  applyBtn.addEventListener("click", async () => {
    const file = uploadInput.files[0];
    
    if (!file) {
      showError("No file selected! Please choose a sprite sheet image.");
      return;
    }

    if (!isValidImageFile(file)) {
      showError("Invalid file type! Please upload an image file (PNG, JPG, GIF, or WebP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showError("File too large! Please use an image under 10MB.");
      return;
    }

    try {
      status.textContent = "Loading...";
      errorDiv.style.display = 'none';
      
      const sliceY = parseInt(rowsInput.value) || 1;
      const sliceX = parseInt(columnsInput.value) || 1;
      
      if (sliceX < 1 || sliceY < 1) {
        throw new Error("Rows and Columns must be at least 1!");
      }

      if (sliceX > 100 || sliceY > 100) {
        throw new Error("Rows and Columns cannot exceed 100!");
      }

      const totalFrames = sliceX * sliceY;
      
      const preset = document.getElementById("anim-preset").value;
      const customName = animNameInput.value.trim();
      const animName = (preset === "custom" && customName) ? customName : preset;

      if (preset === "custom" && !customName) {
        throw new Error("Please enter a custom animation name or choose a preset!");
      }

      const frameRange = framesInput.value.trim().split("-").map(s => s.trim()).map(Number);
      
      if (frameRange.length !== 2) {
        throw new Error("Frames must be in format 'START-END' (e.g., '0-11')");
      }

      const from = frameRange[0];
      const to = frameRange[1];

      if (isNaN(from) || isNaN(to)) {
        throw new Error("Frame numbers must be valid integers! Use format like '0-11'");
      }

      if (from < 0) {
        throw new Error("Frame start cannot be negative! Frames start counting from 0.");
      }

      if (from > to) {
        throw new Error("Frame start must be less than or equal to frame end!");
      }

      if (to >= totalFrames) {
        throw new Error(
          `Frame range exceeds available frames! You specified frames ${from}-${to}, ` +
          `but with ${sliceX} columns × ${sliceY} rows, you only have ${totalFrames} total frames ` +
          `(numbered 0-${totalFrames - 1}). Please adjust your frame range or grid size.`
        );
      }

      const speed = parseInt(animSpeedInput.value);
      
      if (isNaN(speed) || speed < 1) {
        throw new Error("Speed must be at least 1!");
      }

      if (speed > 100) {
        throw new Error("Speed cannot exceed 100! (That's way too fast!)");
      }

      const offsetStr = positionOffsetInput.value.split(",").map(s => s.trim());
      
      if (offsetStr.length !== 2) {
        throw new Error("Offset must be in format 'X,Y' (e.g., '0,-30')");
      }

      const offsetX = parseFloat(offsetStr[0]);
      const offsetY = parseFloat(offsetStr[1]);

      if (isNaN(offsetX) || isNaN(offsetY)) {
        throw new Error("Offset values must be numbers! Use format like '0,-30'");
      }

      const startOpacity = parseFloat(opacityInput.value);
      
      if (isNaN(startOpacity) || startOpacity < 0 || startOpacity > 1) {
        throw new Error("Opacity must be between 0 and 1!");
      }

      const startScale = parseFloat(scaleInput.value);
      
      if (isNaN(startScale) || startScale <= 0) {
        throw new Error("Scale must be greater than 0!");
      }

      if (startScale > 20) {
        throw new Error("Scale cannot exceed 20! That would be huge!");
      }

      const blobUrl = URL.createObjectURL(file);
      
      try {
        await loadSprite(customSpriteName, blobUrl, {
          sliceX,
          sliceY,
          anims: {
            [animName]: preset === "loop" ? { from, to, loop: true } :
                      preset === "pingpong" ? { from, to, pingpong: true } :
                      { from, to, speed }
          }
        });
      } catch (loadError) {
        URL.revokeObjectURL(blobUrl);
        throw new Error(`Failed to load sprite: ${loadError.message}. Make sure the image is valid!`);
      }

      const frameCount = to - from + 1;

      customAnimConfig = {
        animName,
        offsetX, 
        offsetY,
        startOpacity, 
        startScale,
        totalFrames: frameCount,
        speed,
        isLoop: preset === "loop",
        isPingpong: preset === "pingpong"
      };

      URL.revokeObjectURL(blobUrl);
      
      status.textContent = `✅ Loaded "${animName}" (${frameCount} frames) → Press "U" or tap CUSTOM button!`;
      errorDiv.style.display = 'none';
      
    } catch (err) {
      showError(err.message);
      console.error("Upload error:", err);
    }
  });

  onKeyPress("u", () => {
    if (!customAnimConfig) {
      showError("Load a custom sprite first!");
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