import kaplay from "https://unpkg.com/kaplay@3001.0.0-alpha.20/dist/kaplay.mjs";

const k = kaplay({
    width: 1000,
    height: 480,
    canvas: document.getElementById("gameCanvas"),
    background: [12, 5, 18],
    crisp: true,
});

const SCREEN_W = 1000;
const SCREEN_H = 480;

const testCharacter = {
    name: "NIELS",
    sprites: {
        sitLookForwardRegular: "sitLookForwardRegular",
        stretch: "stretch",
        sleep: "sleep"
    }
};

// ============= LOAD ASSETS =============
loadFont("narrow", "assets/fonts/PTSansNarrow-Regular.ttf");
loadFont("narrowBold", "assets/fonts/PTSansNarrow-Bold.ttf");
loadFont("orbitron", "assets/fonts/Orbitron-Regular.ttf");
loadFont("orbitronBold", "assets/fonts/Orbitron-Bold.ttf");
loadFont("silkscreen", "assets/fonts/Silkscreen-Regular.ttf");
loadFont("science", "assets/fonts/ScienceGothic.ttf");
// SOUNDS
k.loadSound("lightning", "assets/sounds/Lightning.mp3");
k.loadSound("menuMusic", "assets/sounds/MenuTrack.mp3"); 
k.loadSound("finalBossMusic", "assets/sounds/FnalBossTrack.mp3");
k.loadSound("VictorySound", "assets/sounds/VictorySound.mp3");
k.loadSound("VictoryTrack", "assets/sounds/VictoryTrack.mp3");
k.loadSound("gameOverSound", "assets/sounds/gameOverSound.mp3");
k.loadSound("GameOverTrack", "assets/sounds/GameOverTrack.mp3");
k.loadSound("collectCup", "assets/sounds/collectCup.mp3");
k.loadSound("flip", "assets/sounds/flip.mp3");
k.loadSound("ratKill", "assets/sounds/ratKill.mp3");
k.loadSound("MEOWXtape", "assets/sounds/MEOWXtape.mp3");
k.loadSound("finalVictory", "assets/sounds/finalVictory.mp3");
// CHARACTER SPRITES
k.loadSprite("catCup00", "assets/images/CATastrophe/test/cup00.png");
k.loadSprite("catCup01", "assets/images/CATastrophe/test/cup01.png");
k.loadSprite("catCup02", "assets/images/CATastrophe/test/cup02.png");
k.loadSprite("catKing00", "assets/images/CATastrophe/test/king00.png");
k.loadSprite("catKing01", "assets/images/CATastrophe/test/king01.png");
k.loadSprite("catKing02", "assets/images/CATastrophe/test/king02.png");
k.loadSprite("sitLookForwardRegular", "assets/images/CATastrophe/test/sitForward.png");
k.loadSprite("sitLookForwardMad", "assets/images/CATastrophe/test/sitForwardMad.png");
k.loadSprite("sitLookBackRegular", "assets/images/CATastrophe/test/sitBack.png");
k.loadSprite("sitLookBackMad", "assets/images/CATastrophe/test/sitBackMad.png");
k.loadSprite("standRegular", "assets/images/CATastrophe/test/stand.png");
k.loadSprite("standMad", "assets/images/CATastrophe/test/standMad.png");
k.loadSprite("pounce", "assets/images/CATastrophe/test/pounce.png");
k.loadSprite("sleep", "assets/images/CATastrophe/test/sleep.png");
k.loadSprite("stretch", "assets/images/CATastrophe/test/stretch.png");
k.loadSprite("wakeUp", "assets/images/CATastrophe/test/wakeup.png");
k.loadSprite("catch", "assets/images/CATastrophe/test/catch.png");
// BGS
k.loadSprite("observerIntro", "assets/images/CATastrophe/backgrounds/ObserverIntro.png");
k.loadSprite("transitionBG", "assets/images/CATastrophe/backgrounds/transitionBG.png");
k.loadSprite("transitionBG2", "assets/images/CATastrophe/backgrounds/transitionBG2.png");
k.loadSprite("transitionBG3", "assets/images/CATastrophe/backgrounds/transitionBG3.png");
k.loadSprite("transitionBG4", "assets/images/CATastrophe/backgrounds/transitionBG4.png");
k.loadSprite("transitionBG5", "assets/images/CATastrophe/backgrounds/transitionBG5.png");
k.loadSprite("transitionBG6", "assets/images/CATastrophe/backgrounds/transitionBG6.png");
k.loadSprite("transitionBG7", "assets/images/CATastrophe/backgrounds/transitionBG7.png");
k.loadSprite("gameOverBG", "assets/images/CATastrophe/backgrounds/GameOverBG.png");
k.loadSprite("creditsBG", "assets/images/CATastrophe/backgrounds/creditsBG.png");
k.loadSprite("cafe", "assets/images/CATastrophe/backgrounds/Cafe.png");
k.loadSprite("darkCafe", "assets/images/CATastrophe/backgrounds/DarkCafe.png");
// EFFECTS
k.loadSprite("drip", "assets/images/CATastrophe/attacks/BloodDrip.png", { 
    sliceX: 10, 
    sliceY: 1, 
    anims: { drip: { from: 0, to: 9 } } 
});
k.loadSprite("lightning", "assets/images/CATastrophe/attacks/Lightning.png", { 
    sliceX: 6, 
    sliceY: 1, 
    anims: { glitch: { from: 0, to: 5 } } 
});
k.loadSprite("smokeReveal1", "assets/images/CATastrophe/attacks/smokeReveal1.png", { 
    sliceX: 21, 
    sliceY: 1, 
    anims: { puff: { from: 0, to: 20, loop: false, speed: 15 } } 
});
k.loadSprite("smoke2", "assets/images/CATastrophe/attacks/smokeReveal2.png", { 
    sliceX: 14, 
    sliceY: 1, 
    anims: { puff: { from: 0, to: 1, loop: false, speed: 10 } } 
});
k.loadSprite("poof", "assets/images/CATastrophe/attacks/Poof.png", { 
    sliceX: 8, 
    sliceY: 1, 
    anims: { burst: { from: 0, to: 7 } } 
});
k.loadSprite("smoke", "assets/images/CATastrophe/attacks/Smoke.png", { 
    sliceX: 9, 
    sliceY: 1, 
    anims: { puff: { from: 0, to: 8 } } 
});

// ============= OBSERVER INTRO (Transition6) =============
window.testObserverIntro = function() {
    k.go("observerIntro");
};

k.scene("observerIntro", () => {
    console.log('Starting Observer Reveal Cinematic');
    
    const blackScreen = k.add([
        k.rect(k.width(), k.height()),
        k.pos(0, 0),
        k.color(0, 0, 0),
        k.opacity(1),
        k.fixed(),
        k.z(10000),
    ]);
    
    k.wait(0.8, () => {
        const whiteFlash = k.add([
            k.rect(k.width(), k.height()),
            k.pos(0, 0),
            k.color(255, 255, 255),
            k.opacity(0),
            k.fixed(),
            k.z(10001),
        ]);
        
        k.tween(whiteFlash.opacity, 1, 0.15, (o) => whiteFlash.opacity = o, k.easings.easeOutQuad).then(() => {
            k.wait(0.15, () => {
                k.tween(whiteFlash.opacity, 0, 0.3, (o) => whiteFlash.opacity = o, k.easings.easeOutQuad).then(() => {
                    k.destroy(whiteFlash);
                });
                
                k.play("lightning", { volume: 0.4, speed: 0.8 });
                k.shake(50);
                k.tween(blackScreen.opacity, 0, 0.3, (o) => blackScreen.opacity = o, k.easings.easeOutQuad);
                
                k.add([
                    k.sprite("observerIntro"),
                    k.pos(0, 0),
                    k.scale(k.width() / 1000, k.height() / 480),
                    k.z(0),
                ]);
                
                const lightning = k.add([
                    k.sprite("lightning", { anim: "glitch" }),
                    k.pos(0, 0),
                    k.scale(k.width() / 100, k.height() / 48),
                    k.opacity(0.9),
                    k.z(100),
                ]);
                
                lightning.play("glitch");
                
                const flashOverlay = k.add([
                    k.rect(k.width(), k.height()),
                    k.pos(0, 0),
                    k.color(255, 255, 255),
                    k.opacity(0.4),
                    k.fixed(),
                    k.z(99),
                ]);
                
                k.tween(flashOverlay.opacity, 0, 0.3, (o) => flashOverlay.opacity = o).then(() => {
                    k.destroy(flashOverlay);
                });
                
                k.wait(0.5, () => {
                    k.destroy(lightning);
                });
                
                k.wait(0.4, () => {
                    const blackFade = k.add([
                        k.rect(k.width(), k.height()),
                        k.pos(0, 0),
                        k.color(0, 0, 0),
                        k.opacity(0),
                        k.fixed(),
                        k.z(10002),
                    ]);
                    
                    k.tween(blackFade.opacity, 1, 0.4, (o) => blackFade.opacity = o, k.easings.easeInQuad).then(() => {
                        k.wait(0.3, () => {
                            const finalFlash = k.add([
                                k.rect(k.width(), k.height()),
                                k.pos(0, 0),
                                k.color(255, 255, 255),
                                k.opacity(0),
                                k.fixed(),
                                k.z(10003),
                            ]);
                            
                            k.tween(finalFlash.opacity, 1, 0.1, (o) => finalFlash.opacity = o).then(() => {
                                k.wait(0.1, () => {

                                    const endScreen = k.add([k.rect(k.width(), k.height()),
                                      k.pos(0, 0),
                                      k.color(0, 0, 0),
                                      k.opacity(0),
                                      k.fixed(),
                                      k.z(10003),
                                    ]);
                                    k.tween(endScreen.opacity, 1, 0.4, (o) => endScreen.opacity = o, k.easings.easeInQuad)
                                    
                                    k.wait(0.5, () => {
                                    k.add([
                                        k.text("🎬 CUT 🎬 ", {
                                            size: 50,
                                            align: "center"
                                        }),
                                        k.pos(k.width()/2, k.height()/2 - 50),
                                        k.anchor("center"),
                                        k.color(255, 255, 255),
                                        k.z(20000),
                                    ]);
                                
                                });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});



// ============= END / CREDITS =============
window.testVictorySequence = function() {
    k.go("victorySequence", { character: testCharacter });
};

k.scene("victorySequence", ({ character }) => {
    console.log('🎬 Starting Victory Sequence - Post Nuclear + Credits');
    console.log('🎵 Starting Victory Track');
    
    k.play("finalVictory", { volume: 0.5, loop: false });

    // ===== PHASE 1: POST-NUCLEAR BLAST (0-12s) =====
    const bg = k.add([
        k.sprite("transitionBG7"),
        k.pos(0, 0),
        k.scale(k.width() / 1000, k.height() / 480),
        k.opacity(0),
        k.z(0)
    ]);

    const whiteScreen = k.add([
        k.rect(k.width(), k.height()),
        k.pos(0, 0),
        k.color(255, 255, 255),
        k.opacity(1),
        k.fixed(),
        k.z(10000),
    ]);

    k.wait(0.5, () => {
        k.tween(whiteScreen.opacity, 0, 1.0, (val) => whiteScreen.opacity = val, k.easings.easeOutQuad);

        k.wait(0.3, () => {
            for (let i = 0; i < 12; i++) {
                const xPos = (i % 4) * (k.width() / 3) + k.rand(-50, 50);
                const yPos = Math.floor(i / 4) * (k.height() / 2) + k.rand(-50, 50);

                const poof = k.add([
                    k.sprite("smoke", { anim: "puff" }),
                    k.pos(xPos, yPos),
                    k.scale(6 + k.rand(-1, 1)),
                    k.opacity(0.8),
                    k.z(9999),
                    k.anchor("center"),
                    k.fixed(),
                ]);
                poof.play("puff", { loop: true });

                k.tween(poof.pos.y, poof.pos.y + k.rand(-30, 30), 2, (y) => poof.pos.y = y, k.easings.easeOutQuad);

                const smokeClear = k.add([
                    k.sprite('smoke2', { anim: 'puff' }),
                    k.pos(0, 0),
                    k.scale(10, 10),
                    k.z(9998),
                    k.fixed(),
                    k.opacity(0.7)
                ]);
                
                smokeClear.play("puff", { loop: false });
                k.wait(0.8, () => k.destroy(smokeClear));

                k.wait(1.0 + (i * 0.03), () => {
                    k.tween(poof.opacity, 0, 1.5, (o) => poof.opacity = o, k.easings.easeOutQuad)
                        .then(() => k.destroy(poof));
                });
            }

            k.wait(1.0, () => {
                k.destroy(whiteScreen);
                k.tween(bg.opacity, 1, 2.0, (o) => bg.opacity = o, k.easings.easeOutQuad);

                k.wait(11, () => {
                    k.tween(bg.opacity, 0, 1.5, (o) => bg.opacity = o)
                        .then(() => k.destroy(bg));
                });
            });
        });
    });

    const charSprite = k.add([
        k.sprite(character.sprites.sitLookForwardRegular),
        k.pos(330, 215),
        k.scale(1),
        k.z(10),
        k.opacity(0)
    ]);

    const transitionText = k.add([
        k.text("AHHH QUANTUM BLISS RESTORED!", {
            size: 32,
            width: 700,
            align: "center"
        }),
        k.pos(k.width() / 2, k.height() / 2 - 150),
        k.anchor("center"),
        k.color(255, 255, 255),
        k.z(11),
        k.opacity(0)
    ]);

    const shadowText = k.add([
        k.text("AHHH QUANTUM BLISS RESTORED!", {
            size: 32,
            width: 700,
            align: "center"
        }),
        k.pos(k.width() / 2 + 3, k.height() / 2 - 147),
        k.anchor("center"),
        k.color(0, 0, 0),
        k.z(10),
        k.opacity(0)
    ]);

    const messages = [
        "AHHH QUANTUM BLISS RESTORED!",
        "TIME FOR ME TO TAKE A CATNAP",
        "zzzZZZzzzZZZzzz"
    ];

    const sprites = [
        character.sprites.sitLookForwardRegular,
        character.sprites.stretch,
        character.sprites.sleep
    ];

    let msgIdx = 0;

    k.wait(3.5, () => {
        k.tween(charSprite.opacity, 1, 0.5, (o) => charSprite.opacity = o);
        k.wait(0.3, () => {
            k.tween(transitionText.opacity, 1, 0.8, (o) => {
                transitionText.opacity = o;
                shadowText.opacity = o;
            });
        });

        k.wait(3.5, () => {
            msgIdx = 1;
            transitionText.text = messages[1];
            shadowText.text = messages[1];
            charSprite.use(k.sprite(sprites[1]));
            transitionText.opacity = shadowText.opacity = charSprite.opacity = 0;
            k.tween(charSprite.opacity, 1, 0.5, (o) => charSprite.opacity = o);
            k.tween(transitionText.opacity, 1, 0.8, (o) => { 
                transitionText.opacity = o; 
                shadowText.opacity = o; 
            });

            k.wait(3.5, () => {
                msgIdx = 2;
                transitionText.text = messages[2];
                shadowText.text = messages[2];
                charSprite.use(k.sprite(sprites[2]));
                transitionText.opacity = shadowText.opacity = charSprite.opacity = 0;
                k.tween(charSprite.opacity, 1, 0.5, (o) => charSprite.opacity = o);
                k.tween(transitionText.opacity, 1, 0.8, (o) => { 
                    transitionText.opacity = o; 
                    shadowText.opacity = o; 
                });

                k.wait(3.5, () => {
                    k.tween(charSprite.opacity, 0, 1.0, (o) => charSprite.opacity = o);
                    k.tween(transitionText.opacity, 0, 1.0, (o) => {
                        transitionText.opacity = o;
                        shadowText.opacity = o;
                    }).then(() => {
                        k.destroy(charSprite);
                        k.destroy(transitionText);
                        k.destroy(shadowText);
                    });

                    k.wait(1.0, () => startCreditsSequence(character));
                });
            });
        });
    });

    k.wait(15, () => {
        const confettiColors = [
            k.rgb(144,144,192),
            k.rgb(219,226,233),
            k.rgb(101,115,131),
            k.rgb(158,255,158),
            k.rgb(255,199,255)
        ];
        k.loop(0.1, () => {
            const c = k.add([
                k.rect(8, 8),
                k.pos(k.rand(0, k.width()), -20),
                k.color(k.choose(confettiColors)),
                k.rotate(k.rand(0, 360)),
                k.z(15),
                { vel: k.rand(50, 150), rotSpeed: k.rand(-5, 5) }
            ]);
            c.onUpdate(() => {
                c.move(0, c.vel);
                c.angle += c.rotSpeed;
                if (c.pos.y > k.height() + 20) k.destroy(c);
            });
        });
    });
});

function startCreditsSequence(character) {
    const cafeBG = k.add([
        k.sprite("cafe"),
        k.pos(0, 0),
        k.scale(k.width() / 1000, k.height() / 480),
        k.z(1),
        k.opacity(1)
    ]);

    const darkCafeBG = k.add([
        k.sprite("darkCafe"),
        k.pos(0, 0),
        k.scale(k.width() / 1000, k.height() / 480),
        k.z(2),
        k.opacity(0)
    ]);

    const panel = k.add([
        k.rect(800, 400, { radius: 20 }),
        k.pos(100, 30),
        k.color(0, 0, 0),
        k.outline(3, k.rgb(144,144,192)),
        k.opacity(0),
        k.z(7)
    ]);
    k.tween(panel.opacity, 0.9, 1.5, (o) => panel.opacity = o);

    let allCreditObjects = [];

    function clearCredits() {
        allCreditObjects.forEach(obj => k.destroy(obj));
        allCreditObjects = [];
    }

    function fadeInLines(lines, baseY = 150, lineHeight = 50, delayBetween = 1.2) {
        let y = baseY;
        lines.forEach((line, i) => {
            const size = line.includes("CATastrophe2") ? 48 : 36;
            const color = line === "By MK" ? k.rgb(255,199,255) : k.rgb(243,255,229);

            const lineObj = k.add([
                k.text(line, { size }),
                k.pos(k.width() / 2, y),
                k.anchor("center"),
                color,
                k.opacity(0),
                k.z(8)
            ]);
            allCreditObjects.push(lineObj);
            k.wait(0.8 + i * delayBetween, () => {
                k.tween(lineObj.opacity, 1, 0.8, (o) => lineObj.opacity = o, k.easings.easeOutQuad);
            });
            y += lineHeight;
        });
    }

    // 1. YOU DID IT!
    k.wait(2, () => {
        const youDidIt = k.add([
            k.text("YOU DID IT!", { size: 60 }),
            k.pos(k.width() / 2, k.height() / 2 - 50),
            k.anchor("center"),
            k.color(158,255,158),
            k.opacity(0),
            k.z(8)
        ]);
        allCreditObjects.push(youDidIt);

        k.tween(youDidIt.opacity, 1, 1.5, (o) => youDidIt.opacity = o, k.easings.easeOutQuad);
    });

    // HOLD "YOU DID IT!" THEN GO TO CREDITS
    k.wait(6, () => {
        const youDidIt = allCreditObjects.find(obj => obj.text === "YOU DID IT!");
        if (youDidIt) {
            k.tween(youDidIt.opacity, 0, 1.0, (o) => youDidIt.opacity = o).then(() => {
                k.destroy(youDidIt);
                allCreditObjects = allCreditObjects.filter(obj => obj !== youDidIt);
            });
        }


        fadeInLines([
            "CATastrophe2",
            `Starring ${character.name}`,
            "Special thanks:",
            "All the cats at Schrödinger's Cat Café"
        ], 140, 60, 1.4);

        k.wait(9, () => {
            allCreditObjects.forEach(obj => k.tween(obj.opacity, 0, 1.0, (o) => obj.opacity = o));

            k.wait(1.2, () => {
                clearCredits();

                fadeInLines([
                    "Code, concept, story",
                    "character-design, music:",
                    "By MK"
                ], 180, 70, 1.6);

                k.wait(8, () => {
                    allCreditObjects.forEach(obj => k.tween(obj.opacity, 0, 1.0, (o) => obj.opacity = o));

                    k.wait(1.2, () => {
                        clearCredits();

                        fadeInLines([
                            "With special, special thanks to:",
                            "Chief Debugging Officer:",
                            "Claude",
                            "Emotional Support LLM:",
                            "ChatGPT",
                            "Director of Chaos Department:",
                            "GROK"
                        ], 80, 48, 1.1);

                        k.wait(10, () => {
                            allCreditObjects.forEach(obj => {
                                k.tween(obj.opacity, 0, 2.0, (o) => obj.opacity = o);
                            });

                            k.tween(panel.opacity, 0, 2.5, (o) => panel.opacity = o);
                            k.tween(cafeBG.opacity, 0, 4.0, (o) => cafeBG.opacity = o, k.easings.easeInQuad);
                            k.tween(darkCafeBG.opacity, 1, 4.0, (o) => darkCafeBG.opacity = o, k.easings.easeInQuad);

                            k.wait(5, () => {
                                k.add([
                                    k.text("🎬 CUT 🎬 ", { size: 50 }),
                                    k.pos(k.width()/2, k.height()/2),
                                    k.anchor("center"),
                                    k.color(255, 255, 255),
                                    k.z(20000),
                                ]);
                            });
                        });
                    });
                });
            });
        });
    });
}





// ============= GAME OVER =============
window.testBloodDrip = function() {
    k.go("bloodDrip");
};

k.scene("bloodDrip", () => {
    console.log('🩸 Starting Blood Drip Game Over');
    
    k.play("gameOverSound", { volume: 0.5 });
    
    const bloodDrip = add([
                      sprite('drip', { anim: 'drip' }),
                      pos(0, 0),
                      scale(10, 10), 
                      z(1000),
                      fixed(),
                      opacity(1)
                    ]);
            
            bloodDrip.play('drip');

    k.wait(0.5, () => {
        k.tween(bloodDrip.opacity, 0, 1.0, (val) => bloodDrip.opacity = val, k.easings.easeOutQuad);
        k.destroy(bloodDrip);

      const darkRedOverlay = add([
          rect(SCREEN_W, SCREEN_H),
          pos(0, 0),
          color(64, 0, 3), 
          z(1000),
          opacity(1),
          fixed()
        ]);
    
    
      tween(1, 0, 1.5, (o) => {
        darkRedOverlay.opacity = o;
      }, easings.easeInOutQuad).then(() => {
        destroy(darkRedOverlay);
      });
    

      const bg = add([ 
        sprite('gameOverBG'),
        pos(0, 0),
        scale(SCREEN_W / 1000, SCREEN_H / 480),
        z(0),
        opacity(0)
      ]);


const disappointText = add([
    text("YOU'VE DISAPPOINTED EVERYONE", { 
      size: 38, 
      font: "science" 
    }),
    pos(SCREEN_W / 2, 230),
    anchor("center"),
    color(rgb(255,255,255)),
    z(2),
    opacity(0)
  ]);

    const disappointText2 = add([
    text("YOU'VE DISAPPOINTED EVERYONE", { 
      size: 38, 
      font: "science" 
    }),
    pos(SCREEN_W / 2 + 1, 231),
    anchor("center"),
    color(rgb(0,0,0)),
    z(1),
    opacity(0)
  ]);


  const scoreText = add([
    text('Final Score: 100'),
    pos(SCREEN_W / 2, 285),
    anchor("center"),
    color(219, 226, 233),
    z(2),
    opacity(0)
  ]);

    const scoreText2 = add([
    text('Final Score: 100'),
    pos(SCREEN_W / 2 + 1, 286),
    anchor("center"),
    color(0, 0, 0),
    z(1),
    opacity(0)
  ]);

  const restartBtn = add([
    rect(280, 50, { radius: 30 }),
    pos(360, 340),
    color(0, 0, 0),
    outline(3, rgb(144,144,192)),
    area(),
    z(1),
    opacity(0),
    "restartBtn"
  ]);

  const restartBtnText = restartBtn.add([
    text("START OVER", { size: 28, font: "science" }),
    pos(140, 28),
    anchor("center"),
    color(255, 255, 255),
    z(3)
  ]);

  const restartBtnShadow = restartBtn.add([
    text("START OVER", { size: 28, font: "science" }),
    pos(141, 29),
    anchor("center"),
    color(0, 255, 255),
    z(2)
  ]);


  restartBtn.onHover(() => {
    restartBtn.color = rgb(101,115,131);
  });

  restartBtn.onHoverEnd(() => {
    restartBtn.color = rgb(0,0,0);
  });

  const menuBtn = add([
    rect(280, 50, { radius: 30 }),
    pos(360, 405),
    color(0, 0, 0),
    outline(3, rgb(144,144,192)),
    area(),
    z(1),
    opacity(0),
    "menuBtn"
  ]);

  const menuBtnText = menuBtn.add([
    text("MAIN MENU", { size: 28, font: "science" }),
    pos(140, 28),
    anchor("center"),
    color(255, 255, 255),
    z(3)
  ]);

  const menuBtnShadow = menuBtn.add([
    text("MAIN MENU", { size: 28, font: "science" }),
    pos(141, 29),
    anchor("center"),
    color(0, 255, 255),
    z(2)
  ]);


  menuBtn.onHover(() => {
    menuBtn.color = rgb(101,115,131);
  });

  menuBtn.onHoverEnd(() => {
    menuBtn.color = rgb(0, 0, 0);
  });

  wait(0.5, () => {
    tween(0, 1, 1.2, (o) => {
      bg.opacity = o;
      disappointText.opacity = o;
      disappointText2.opacity = o;
      scoreText.opacity = o;
      scoreText2.opacity = o;
      restartBtn.opacity = o;
      menuBtn.opacity = o;
    }, easings.easeOutQuad);
  });

                                k.wait(5, () => {

                                    const endScreen = k.add([k.rect(k.width(), k.height()),
                                      k.pos(0, 0),
                                      k.color(0, 0, 0),
                                      k.opacity(0),
                                      k.fixed(),
                                      k.z(10003),
                                    ]);
                                    k.tween(endScreen.opacity, 1, 0.4, (o) => endScreen.opacity = o, k.easings.easeInQuad)
                                    
                                    k.wait(0.5, () => {
                                    k.add([
                                        k.text("🎬  CUT 🎬 ", {
                                            size: 50,
                                            align: "center"
                                        }),
                                        k.pos(k.width()/2, k.height()/2 - 50),
                                        k.anchor("center"),
                                        k.color(255, 255, 255),
                                        k.z(20000),
                                    ]);
                                
                                });
                                });
});

})
                                
           



// ============= START SCREEN =============
k.scene("start", () => {
    k.add([
        k.text("🎬 CinematicKitty Testing Sandbox", {
            size: 32,
            width: 800,
            align: "center"
        }),
        k.pos(k.width() / 2, k.height() / 2 - 60),
        k.anchor("center"),
        k.color(158, 255, 158),
    ]);

    k.add([
        k.text("Select a cinematic sequence from the buttons above!", {
            size: 20,
            width: 700,
            align: "center"
        }),
        k.pos(k.width() / 2, k.height() / 2 + 40),
        k.anchor("center"),
        k.color(200, 200, 200),
    ]);
});

k.go("start");