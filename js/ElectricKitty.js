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

  loadSound("cupFinishHim", "assets/sounds/cup.mp3");
  loadSound("cucumberFinishHim", "assets/sounds/cucumber.mp3");
  loadSound("ratFinishHim", "assets/sounds/rat.mp3");
  loadSound("laserFinishHim", "assets/sounds/laser.mp3");
  loadSound("finalFinishHim", "assets/sounds/finalBoom.mp3");


loadFont("CyberGoth", "assets/fonts/ScienceGothic.ttf");
loadFont("Basic", "assets/fonts/PTSansNarrow-Regular.ttf");

loadSprite("cat", "assets/images/Niels2.png");
loadSprite("rat", "assets/images/CATastrophe/enemies/BigRat.png");

loadSprite("purpleBoom", "assets/images/CATastrophe/attacks/Explosion.png", { sliceX:6, sliceY:1, anims:{burst:{from:0,to:5}} });
loadSprite("redBoom", "assets/images/CATastrophe/attacks/RedBoom.png", { sliceX:6, sliceY:1, anims:{burst:{from:0,to:5}} });
loadSprite("fire", "assets/images/CATastrophe/attacks/Fire.png", { sliceX:9, sliceY:1, anims:{ball:{from:0,to:8}} });
loadSprite("smoke", "assets/images/CATastrophe/attacks/Smoke.png", { sliceX:9, sliceY:1, anims:{puff:{from:0,to:8}} });
loadSprite("swirl", "assets/images/CATastrophe/attacks/Swirl.png", { sliceX:12, sliceY:1, anims:{spin:{from:0,to:11}} });
loadSprite("powerup", "assets/images/CATastrophe/attacks/PowerUp.png", { sliceX:9, sliceY:1, anims:{beam:{from:0,to:8}} });
loadSprite("zoomies", "assets/images/CATastrophe/attacks/Zoomies.png", { sliceX:3, sliceY:3, anims:{glitch:{from:0,to:8}} });
loadSprite("claw", "assets/images/CATastrophe/attacks/CatnipClaw.png", { sliceX:32, sliceY:1, anims:{slash:{from:0,to:31,speed:30}} });
loadSprite("greenBlast", "assets/images/CATastrophe/attacks/GreenBlast.png", { sliceX:12, sliceY:1, anims:{glitch:{from:0,to:11}} });
loadSprite("biscuits", "assets/images/CATastrophe/attacks/Biscuits.png", { sliceX:8, sliceY:3, anims:{glitch:{from:0,to:23}} });
loadSprite("fireball", "assets/images/CATastrophe/attacks/Fireball.png", { sliceX:4, sliceY:1, anims:{glitch:{from:0,to:3}} });
loadSprite("scratch", "assets/images/CATastrophe/attacks/Scratch.png", { sliceX:4, sliceY:1, anims:{glitch:{from:0,to:3}} });
loadSprite("littleCucumber", "assets/images/CATastrophe/attacks/LittleCucumber.PNG");
loadSprite("lock", "assets/images/CATastrophe/attacks/LockOn.png", { sliceX:22, sliceY:1, anims:{glitch:{from:0,to:21,speed:15}} });
loadSprite("arrow", "assets/images/CATastrophe/attacks/CatArrow.png");
loadSprite("superposition", "assets/images/CATastrophe/attacks/Superposition.png", { sliceX: 4,   sliceY: 1,   anims: { glitch: { from: 0, to: 3 } }});
loadSprite("shock", "assets/images/CATastrophe/attacks/Shock.png", {   sliceX: 4, sliceY: 1,   anims: { burst: { from: 0, to: 3 } }});
loadSprite("hammer", "assets/images/CATastrophe/attacks/HydrogenHammer.png", { sliceX: 10, sliceY: 1, anims: { smash: { from: 0, to: 9 } }});
loadSprite("box", "assets/images/CATastrophe/attacks/Box.png", { sliceX: 2, sliceY: 1, anims: { glitch: { from: 0, to: 1 } }});
loadSprite("bottle", "assets/images/CATastrophe/attacks/PoisonBottle.png", { sliceX: 1, sliceY: 1, anims: { glitch: { from: 0, to: 0 } }});
loadSprite("shatter", "assets/images/CATastrophe/attacks/Shatter.png", { sliceX: 6, sliceY: 1, anims: { glitch: { from: 0, to: 5 } }});
loadSprite("poison", "assets/images/CATastrophe/attacks/Poison.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
loadSprite("bam", "assets/images/CATastrophe/attacks/Bam.png", { sliceX: 8, sliceY: 1, anims: { glitch: { from: 0, to: 7 } }});
loadSprite("bite", "assets/images/CATastrophe/attacks/Bite.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
loadSprite("laserCharge", "assets/images/CATastrophe/attacks/LaserCharge.png", { sliceX: 6, sliceY: 1, anims: { glitch: { from: 0, to: 5 } }});
loadSprite("laserBeam", "assets/images/CATastrophe/attacks/LaserBeam.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
loadSprite("zap", "assets/images/CATastrophe/attacks/Zap.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
loadSprite("smallRat", "assets/images/CATastrophe/attacks/SmallRat.png");
loadSprite("poof", "assets/images/CATastrophe/attacks/Poof.png", { sliceX:8, sliceY:1, anims:{burst:{from:0,to:7}} });
loadSprite("smallRat2", "assets/images/CATastrophe/attacks/smallRat2.png");
loadSprite("ghostRat", "assets/images/CATastrophe/attacks/GhostRat.png");



loadSprite("CocktailLight", "assets/images/CATastrophe/attacks/MeowlotovCocktailLight.png", { sliceX:3, sliceY:1, anims:{glitch:{from:0,to:2}} });
loadSprite("CocktailSpin", "assets/images/CATastrophe/attacks/MeowlotovCocktailSpin.png", { sliceX:4, sliceY:1, anims:{glitch:{from:0,to:3}} });
loadSprite("lock2", "assets/images/CATastrophe/attacks/LockOn2.png", { sliceX:22, sliceY:1, anims:{glitch:{from:0,to:21,speed:30}} });
loadSprite("Burn", "assets/images/CATastrophe/attacks/Burn.png", { sliceX:4, sliceY:1, anims:{glitch:{from:0,to:3}} });
loadSprite("MuzzleFlash", "assets/images/CATastrophe/attacks/MuzzleFlash.png", { sliceX:6, sliceY:1, anims:{burst:{from:0,to:5}} });
loadSprite("pinkBoom", "assets/images/CATastrophe/attacks/PinkBoom.png", { sliceX:6, sliceY:1, anims:{burst:{from:0,to:5}} });
loadSprite("mushroom", "assets/images/CATastrophe/attacks/MushroomCloud.png", { sliceX:4, sliceY:2, anims:{burst:{from:0,to:7}} });
loadSprite("splat", "assets/images/CATastrophe/attacks/Splat.png", { sliceX: 4, sliceY: 1, anims: { glitch: { from: 0, to: 3 } }});
loadSprite("BrassToeBeans", "assets/images/CATastrophe/attacks/BrassToeBeans.png");
loadSprite("rifle", "assets/images/CATastrophe/attacks/PurrcisionRifle.png");
loadSprite("CrossBow", "assets/images/CATastrophe/attacks/CatCrossBow.png", { sliceX: 2, sliceY: 1, anims: { glitch: { from: 0, to: 1 } }});



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
    pos(10, 165),
    scale(1.1),
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


  onKeyPress("a", () =>  animateMeowlotovCocktail(hero, boss));
  onKeyPress("s", () =>  animateBrassToeBeans(hero, boss));
  onKeyPress("d", () =>   animatePurrcisionRifle(hero, boss));
  onKeyPress("f", () =>  animateFelineFission(boss));
  onKeyPress("c", () =>    animateCatCrossbow(hero,boss));



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
    scale(5.5),
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

// =================== SPECIAL FINISHING MOVES ===================
function animateMeowlotovCocktail(attacker, target) {
    const lightPos = attacker.pos.add(vec2(30, -150));
    const cocktailLight = add([
        sprite("CocktailLight", { anim: "glitch" }),
        pos(lightPos),
        scale(4.5), 
        z(40),
    ]);
    cocktailLight.play("glitch", { loop: false });
    play("laserFinishHim");

    wait(0.6, () => { 
        destroy(cocktailLight);

        const startPos = lightPos;
        const endPos = target.pos.add(vec2(-30, -30)); 
        const throwTime = 0.8;
        const spin = add([
            sprite("CocktailSpin", { anim: "glitch" }),
            pos(startPos),
            scale(3),
            z(40),
        ]);
        spin.play("glitch", { loop: true });
        const startY = startPos.y;
        const endY = endPos.y;
        const peakHeight = 150;
        
        tween(0, 1, throwTime, (t) => {
            spin.pos.x = startPos.x + (endPos.x - startPos.x) * t;
            const arcProgress = Math.sin(t * Math.PI);
            spin.pos.y = startY + (endY - startY) * t - (peakHeight * arcProgress);
        }, easings.easeInQuad);

        wait(throwTime, () => {
            destroy(spin);

            animateKaBAM(target, attacker);
            
            for (let i = 0; i < 12; i++) {
                wait(i * 0.1, () => {
                    const burnOffset = vec2(rand(-130, 2), rand(-110, 2));
                    const burn = add([
                        sprite("Burn", { anim: "glitch" }),
                        pos(endPos.add(burnOffset)),
                        scale(3.5 + rand(-0.6, 0.6)),
                        opacity(0.7),
                        z(35),
                    ]);
                    burn.play("glitch", { loop: false });
                    wait(1, () => destroy(burn));
                });
            }
            wait(0.7, () => {animateSmoke(target); } )
        });
    });
}

function animateFelineFission(target) {
    shake(30);
    play("finalFinishHim");
    const startPos = target.pos.sub(vec2(250, -90));
    const mushroom = add([
        sprite("mushroom", { anim: "burst" }),
        pos(startPos), 
        scale(2),
        z(50),
        opacity(0.8),
    ]);
    
    const startScale = 3; // GROW CLOUD UP
    const endScale = 9;
    tween(0, 1, 1.5, (t) => {
        const currentScale = startScale + (endScale - startScale) * t;
        mushroom.scale = vec2(currentScale, currentScale);
        const scaleGrowth = currentScale - startScale; // KEEP BOTTOM ANCHORED
        mushroom.pos.y = startPos.y - (scaleGrowth * 50); //  HEIGHT MULTIPLIER
    }, easings.easeOutQuad);
    
    tween(mushroom.opacity, 0.7, 0.5, (o) => mushroom.opacity = o);
    mushroom.play("burst", { loop: false });

    wait(0.4, () => {
        shake(70); // SHAKE BUILD UP
        const flash1 = add([ // QUICK FLASH
            rect(width(), height()),
            pos(0, 0),
            color(255, 255, 255), 
            opacity(0),
            fixed(),
            z(10000),
        ]);
        
        tween(flash1.opacity, 1, 0.15, (val) => flash1.opacity = val, easings.easeInQuad);
        wait(0.15, () => {
            tween(flash1.opacity, 0, 0.2, (val) => flash1.opacity = val, easings.easeOutQuad);
            wait(0.2, () => destroy(flash1));
        });
        
        wait(1.5, () => destroy(mushroom)); // DESTROY MUSHROOM AFTER FIRST FLASH
        wait(0.6, () => { // CINEMATIC FLASH
            shake(100);
            const flash2 = add([
                rect(width(), height()),
                pos(0, 0),
                color(255, 255, 255), 
                opacity(0),
                fixed(),
                z(10000),
            ]);
            tween(flash2.opacity, 1, 0.3, (val) => flash2.opacity = val, easings.easeInQuad); // LINGERING FULL WHITE SCREEN 
            
            wait(1.5, () => {
                for (let i = 0; i < 12; i++) { // FILL SCREEN WITH SMOKE
                    const xPos = (i % 4) * (width() / 3) + rand(-50, 50);
                    const yPos = Math.floor(i / 4) * (height() / 2) + rand(-50, 50);
                    const poof = add([ // SMOKE
                        sprite("smoke", { anim: "puff" }),
                        pos(xPos, yPos),
                        scale(6 + rand(-1, 1)),
                        opacity(0),
                        z(9999),
                        anchor("center"),
                        fixed(),
                    ]);
                    poof.play("puff", { loop: true });
                    
                    wait(i * 0.03, () => { // FILL SCREEN WITH SMOKE
                        tween(poof.opacity, 0.8, 0.3, (o) => poof.opacity = o);
                        tween(poof.pos.y, poof.pos.y + rand(-30, 30), 2, (y) => poof.pos.y = y, easings.easeOutQuad); // DRIFT SMOKE
                        
                        wait(1.5, () => { // FADE OUT SMOKE
                            shake(10);
                            tween(poof.opacity, 0, 1.0, (o) => poof.opacity = o, easings.easeOutQuad)
                                .then(() => destroy(poof));
                        });
                    });
                }
                wait(0.35, () => { // FADE WHITE OUT SLOWLY
                    tween(flash2.opacity, 0, 1.2, (val) => flash2.opacity = val, easings.easeOutQuad);
                    wait(1.2, () => destroy(flash2));
                    
                });
            });
        });
    });
}

function animateBrassToeBeans(hero, target) {
    const startPos = hero.pos.add(vec2(100, -100));
    
    // SHOW OFF THE KNUCKLES
    const knuckles = add([
        sprite("BrassToeBeans"),
        pos(startPos),
        scale(1),
        rotate(0),
        z(45),
        opacity(0),
        anchor("center"),
    ]);
    
    tween(knuckles.opacity, 1, 0.2, (o) => knuckles.opacity = o);
    play("cucumberFinishHim"); 

    wait(0.2, () => {
        tween(knuckles.scale, vec2(2, 2), 0.3, (s) => knuckles.scale = s, easings.easeOutBack);
    });
    
    wait(0.7, () => {
        const windUpPos = startPos.add(vec2(-100, 0));
        tween(knuckles.pos, windUpPos, 0.25, (p) => knuckles.pos = p, easings.easeInQuad);
        tween(knuckles.angle, 110, 0.25, (a) => knuckles.angle = a);
        
        wait(0.2, () => {
            const punchTime = 0.1;
            const endPos = target.pos.add(vec2(50, 0));
            
            tween(knuckles.pos, endPos, punchTime, (p) => knuckles.pos = p, easings.easeInCubic);
            tween(knuckles.scale, vec2(1.8, 1.8), punchTime * 0.5, (s) => knuckles.scale = s, easings.easeInQuad);
            
            wait(punchTime, () => {
                shake(70);
                
                for (let i = 0; i < 4; i++) {
                    wait(i * 0.08, () => {
                        const angle = (i * 90) + rand(-20, 20);
                        const distance = rand(2, 2);
                        const splatOffset = vec2(
                            Math.cos(angle * Math.PI / 180) * distance,
                            Math.sin(angle * Math.PI / 180) * distance
                        );
                        
                        const splat = add([
                            sprite("splat", { anim: "glitch" }),
                            pos(target.pos.add(splatOffset)),
                            scale(1.2 + rand(-0.2, 0.3)),
                            rotate(rand(0, 360)),
                            z(40),
                            opacity(0.6),
                        ]);
                        splat.play("glitch", { loop: false });
                        wait(0.5, () => destroy(splat));
                    });
                }
                
                wait(0.1, () => shake(30));
                
                wait(0.01, () => {
                    const heroReturnPos = hero.pos.add(vec2(120, -20)); // Back near the hero
                    tween(knuckles.pos, heroReturnPos, 0.25, (p) => knuckles.pos = p, easings.easeOutQuad);
                    tween(knuckles.scale, vec2(1.5, 1.5), 0.25, (s) => knuckles.scale = s);
                    tween(knuckles.angle, 90, 0.1, (a) => knuckles.angle = a, easings.easeInQuad);
                    
                    wait(0.45, () => {
                        tween(knuckles.angle, 25, 0.1, (a) => knuckles.angle = a, easings.easeInQuad);
                        
                        wait(0.12, () => {
                            tween(knuckles.angle, 115, 0.1, (a) => knuckles.angle = a, easings.easeOutQuad);
                            
                            wait(0.1, () => {
                                const flickAngle = 35; 
                                const flickSplat = add([
                                    sprite("splat", { anim: "glitch" }),
                                    pos(knuckles.pos),
                                    scale(1.3),
                                    rotate(rand(0, 360)),
                                    z(46),
                                    opacity(1),
                                ]);
                                flickSplat.play("glitch", { loop: false });
                                
                                const flickTarget = knuckles.pos.add(vec2(
                                    Math.cos(flickAngle * Math.PI / 180) * 200,
                                    Math.sin(flickAngle * Math.PI / 180) * 200
                                ));
                                tween(flickSplat.pos, flickTarget, 0.4, (p) => flickSplat.pos = p, easings.easeOutQuad);
                                tween(flickSplat.opacity, 0, 0.4, (o) => flickSplat.opacity = o);
                                wait(0.5, () => destroy(flickSplat));
                            });
                            
                            wait(0.3, () => {
                                tween(knuckles.opacity, 0, 0.3, (o) => knuckles.opacity = o);
                                wait(0.3, () => destroy(knuckles));
                            });
                        });
                    });
                });
            });
        });
    });
}

function animatePurrcisionRifle(hero, target) {
    const startPos = hero.pos.add(vec2(-90, 50));
    const rifle = add([
        sprite("rifle"),
        pos(startPos),
        scale(2.3),
        rotate(-85), // START VERTICAL-ISH
        z(100),
        opacity(0),
    ]);
  
    tween(rifle.opacity, 1, 0.2, (o) => rifle.opacity = o);
        wait(0.6, () => { // PAUSE TO SHOW OFF RIFLE
        const aimingAngle = -15; // ROTATE TO AIMING POSITION
        const aimingPos = hero.pos.add(vec2(-110, -120));
        
        tween(rifle.angle, aimingAngle, 0.8, (a) => rifle.angle = a, easings.easeInOutQuad);
        tween(rifle.pos, aimingPos, 0.8, (p) => rifle.pos = p, easings.easeInOutQuad);
        
        const lock = add([ // LOCK ON TARGET
            sprite("lock2", { anim: "glitch" }),
            pos(target.pos.add(vec2(-90, -70))),
            scale(2),
            opacity(0),
            z(150),
        ]);
        
        wait(0.6, () => {
            tween(lock.opacity, 0.8, 0.2, (o) => lock.opacity = o);
            lock.play("glitch", { loop: false, speed: 30 });
        });
        play("ratFinishHim"); 
        wait(1.8, () => {
            destroy(lock);
            const flashPos = rifle.pos.add(vec2(340, -20)); // MUZZLE FLASH
            const flash = add([
                sprite("MuzzleFlash", { anim: "burst" }),
                pos(flashPos),
                scale(3.5),
                rotate(-15),
                z(150),
            ]);
            flash.play("burst", { loop: false, speed: 20 });
            shake(50);
            
            tween(rifle.angle, -45, 0.08, (a) => rifle.angle = a, easings.easeOutQuad); // RECOIL
            tween(rifle.pos, aimingPos.add(vec2(-50, 15)), 0.08, (p) => rifle.pos = p, easings.easeOutQuad);
            
            wait(0.08, () => { // RETURN TO FIRING POSITION
                tween(rifle.angle, aimingAngle, 0.15, (a) => rifle.angle = a, easings.easeOutQuad);
                tween(rifle.pos, aimingPos, 0.15, (p) => rifle.pos = p, easings.easeOutQuad);
            });
            
            wait(0.07, () => {
              animateKaBAM(boss, hero)

                wait(0.5, () => {
                    destroy(flash);
  
                    
                    wait(0.2, () => {
                        tween(rifle.opacity, 0, 0.3, (o) => rifle.opacity = o);
                        wait(0.3, () => destroy(rifle));
                    });
                });
            });
        });
    });
}

function animateCatCrossbow(attacker, target) {
    const crossbow = add([
      sprite("CrossBow"), 
      pos(attacker.pos.add(130, 20)),
      scale(1.3),
      anchor("center"),
      z(25),
      rotate(-35),
      opacity(0),
    ]);
    crossbow.frame = 0;
    tween(crossbow.opacity, 1, 0.25, (o) => crossbow.opacity = o);
    wait(0.8, () => {
      play("cupFinishHim"); 

      const dirToTarget = target.pos.sub(attacker.pos).unit();
      
      const spriteWidth = crossbow.width * crossbow.scale.x; // CALCULATE OFFSET TO KEEP HANDLE IN SAME SPOT
      const spriteHeight = crossbow.height * crossbow.scale.y; // HANDLE MOVES FROM TOP-LEFT TO BOTTOM-LEFT
      
      const handleOffset = vec2(20, spriteHeight * -0.3); // THIS ADJUSTS VERTICALLY // OFFEST TO COMPENSATE FOR HANDLE PLACEMENT ON SPRITE SHEET
            crossbow.frame = 1; // FRAME 2 - TILT UP TO AIM
      crossbow.pos = crossbow.pos.add(handleOffset);
      crossbow.angle = dirToTarget.angle()+10;

      const lock = add([ // LOCK ON TARGET
        sprite("lock", { anim: "glitch" }),
        pos(target.pos),
        scale(2),
        anchor("center"),
        z(20),
        opacity(0),
      ]);

      tween(lock.opacity, 1, 0.3, (o) => lock.opacity = o);

      let t = 0;
      lock.onUpdate(() => {
        t += dt();
        lock.pos = target.pos.add(Math.sin(t * 20) * 6, Math.cos(t * 10) * 8);
      });

      wait(1, () => {
        const arrow = add([ // SPAWN ARROW ON THE BOW
          sprite("arrow"),         
          pos(attacker.pos.add(dirToTarget.scale(20))), // SLIGHTLY IN FRONT
          scale(1.1),
          anchor("center"),
          rotate(dirToTarget.angle()),
          z(30),
        ]);


        tween( // COCK IT BACK
          arrow.pos,
          attacker.pos.add(dirToTarget.scale(-15)), // PULL BACK
          0.3,
          (p) => arrow.pos = p,
          easings.easeOutQuad
        ).then(() => {
          crossbow.scale = vec2(1.2, 1.3); // SLIGHT TENSION SQUISH
          
          let vibe = 0; // VIBRATION - HOLDING THAT TENSION
          const vibeHandle = arrow.onUpdate(() => {
            vibe += dt();
            arrow.pos = arrow.pos.add(Math.sin(vibe * 50) * 2, Math.sin(vibe * 30) * 1);
            arrow.scale = vec2(1.3, 1.4); // SLIGHT TENSION SQUISH

          });

          wait(1.0, () => {
            vibeHandle.cancel();
            destroy(lock);
            
            tween(arrow.scale, vec2(0.3, 0.8), 0.08, (s) => arrow.scale = s)  // WIND UP SQUISH
              .then(() => {
                shake(20);
                
                tween(arrow.scale, vec2(1.5), 0.08, (s) => arrow.scale = s); // FIRE!!!
                
                const recoilDir = dirToTarget.scale(-5);  // CROSSBOW RECOIL
                const originalPos = crossbow.pos;
                tween(
                  crossbow.pos,
                  originalPos.add(recoilDir.scale(20)),
                  0.1,
                  (p) => crossbow.pos = p,
                  easings.easeOutQuad
                ).then(() => {
                  tween(crossbow.pos, originalPos, 0.2, (p) => crossbow.pos = p, easings.easeInOutQuad);
                });
                
                crossbow.scale = vec2(2, 2); // RECOIL STRETCH

                tween( // ARROW FLIES
                  arrow.pos,
                  target.pos,
                  0.15,
                  (p) => arrow.pos = p,
                  easings.easeInCubic
                ).then(() => {
                  tween(arrow.pos, target.pos.add(dirToTarget.scale(15)), 0.06, (p) => arrow.pos = p, easings.easeOutCubic)
                    .then(() => {
                      arrow.pos = target.pos;
                      animateKaBAM(target);
                      animateSmoke(target);
                      shake(70);

                      destroy(arrow);
                      
                      tween(crossbow.opacity, 0, 0.5, (o) => crossbow.opacity = o) // FADE OUT CROSSBOW
                        .then(() => destroy(crossbow));
                    });
                });
              });
          });
        });
      });
    });
  }


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