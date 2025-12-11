import { SCREEN_W, SCREEN_H, Colors } from '../config/gameConfig.js';
import { getTransition } from '../config/transitions.js';
import { createVolumeToggle } from '../utils/audioControls.js';

export function createTransitionScene(transitionKey, character, playerHP) {
  const transition = getTransition(transitionKey);
  
  if (!transition) {
    console.error(`Transition ${transitionKey} not found!`);
    go("menu");
    return;
  }

  console.log(`🎬 Playing transition: ${transitionKey}`);

  let textIndex = 0;
  const textKeys = ['Text1', 'Text2', 'Text3'];
  
  // BG
  add([
    sprite(transition.background),
    pos(0, 0),
    scale(SCREEN_W / 1000, SCREEN_H / 480),
    z(0),
  ]);

  // DARK OVERLAY TO DIM BG
  add([
    rect(SCREEN_W, SCREEN_H),
    pos(0, 0),
    color(0, 0, 0),
    opacity(0.4),
    z(1)
  ]);


  const catSprite = add([
    sprite(character.sprites[transition.sprites[0]] || character.sprites.idle),
    pos(SCREEN_W / 2, SCREEN_H / 2 - 35),
    anchor('center'),
    scale(1.2),
    z(2),
    opacity(1)
  ]);

  // TEXT BG
  add([
    rect(SCREEN_W - 100, 100, { radius: 20 }),
    pos(SCREEN_W / 2, SCREEN_H - 80),
    anchor('center'),
    color(0, 0, 0),
    opacity(0.8),
    outline(4, Color.fromHex(Colors.Highlight)),
    z(2)
  ]);

  // TEXT
  const textDisplay = add([
    text(transition[textKeys[0]][0], {
      size: 25,
      width: SCREEN_W - 150,
      align: 'center',
      font: 'science'
    }),
    pos(SCREEN_W / 2, SCREEN_H - 85),
    anchor('center'),
    color(255, 255, 255),
    z(3)
  ]);

  // DOTS
  const dots = [];
  for (let i = 0; i < 3; i++) {
    const dot = add([
      circle(i === 0 ? 7 : 4),
      pos(SCREEN_W / 2 - 30 + i * 30, SCREEN_H - 45),
      anchor('center'),
      color(i === 0 ? Color.fromHex(Colors.Highlight) : rgb(100, 100, 100)),
      z(3)
    ]);
    dots.push(dot);
  }

  // PROMPT - PRESS SPACE
  const prompt = add([
    text('Press SPACE or ENTER to continue', { 
      size: 18, 
      font: 'science'
    }),
    pos(SCREEN_W / 2, SCREEN_H - 15),
    anchor('center'),
    color(200, 200, 200),
    opacity(0.8),
    z(3)
  ]);

  // BLINKING PROMPT
  let blinkTime = 0;
  prompt.onUpdate(() => {
    blinkTime += dt();
    prompt.opacity = Math.sin(blinkTime * 3) * 0.3 + 0.6;
  });

  // UPDATE TEXT AND DOTS
  function updateText() {
    textDisplay.text = transition[textKeys[textIndex]][0];
    
    // SWAP THE CAT SPRITE!
    const newSprite = transition.sprites[textIndex];
    catSprite.use(sprite(character.sprites[newSprite] || character.sprites.idle));
    
    // FADE-IN
    catSprite.opacity = 0;
    tween(
      0,
      1,
      0.3,
      (val) => catSprite.opacity = val,
      easings.easeOutCubic
    );
    
    // PROGRESS DOTS
    dots.forEach((dot, i) => {
      if (i === textIndex) {
        dot.radius = 10;
        dot.color = Color.fromHex(Colors.Highlight);
      } else if (i < textIndex) {
        dot.radius = 6;
        dot.color = Color.fromHex(Colors.Green);
      } else {
        dot.radius = 6;
        dot.color = rgb(100, 100, 100);
      }
    });
  }

  function handleNext() {
    if (textIndex < textKeys.length - 1) {
      textIndex++;
      updateText();
      play("flip", { volume: 0.3 });
    } else {
      const nextState = transition.nextState;
      
      if (nextState === 'level1') {
        go('level1', { character });
      } else if (nextState === 'level2') {
        go('level2', { character, playerHP });
      } else if (nextState === 'level3') {
        go('level3', { character, playerHP });
      } else if (nextState === 'level4') {
        go('level4', { character, playerHP });
      } else if (nextState === 'level5') {
        go('level5', { character, playerHP });
      } else if (nextState === 'observerBoss') {
        go('observerBoss', { character, playerHP });
      } else if (nextState === 'credits') { 
        go('credits', { character });
      } else {
        go(nextState, { character, playerHP });
      }
    }
  }

  // INPUT HANDLING
  onKeyPress('space', handleNext);
  onKeyPress('enter', handleNext);
  onClick(handleNext);

  createVolumeToggle();
}