// mainMenu.js
import { SCREEN_W, SCREEN_H, Colors } from '../config/gameConfig.js';
import { getCharacterList } from '../config/characters.js';
import { createVolumeToggle } from '../utils/audioControls.js';

export function createMainMenuScene() {

  const menuBG = add([
    sprite('menuBG'),
    pos(0, 0),
    scale(SCREEN_W / 1000, SCREEN_H / 480),
    z(0)
  ]);

  // TITLE BACKGROUND PANEL
  add([
    rect(600, 80, { radius: 30 }),
    pos(200, 20),
    color(17, 12, 30),
    outline(4, Color.fromHex("#dc4ce8")),
    z(1)
  ]);

  add([
    text("CATastrophe 2", { 
      size: 50, 
      font: "orbitronBold",
      weight: "bold"
    }),
    pos(SCREEN_W / 2, 60),
    anchor("center"),
    color(255, 255, 255),
    z(3)
  ]);

  add([
    text("CATastrophe 2", { 
      size: 50, 
      font: "orbitronBold",
      weight: "bold"
    }),
    pos(SCREEN_W / 2+2, 62),
    anchor("center"),
    color(0, 255, 255),
    z(2)
  ]);

  const playBtn = add([
    rect(300, 56, { radius: 30 }),
    pos(350, 325),
    color(17, 12, 30), 
    outline(3, Color.fromHex("#58e84c")),
    area(),
    z(1),
    "playBtn"
  ]);

  playBtn.add([
    text("PLAY", { size: 32, font: "science" }),
    pos(150, 28),
    anchor("center"),
    color(255, 255, 255),
    z(3)
  ]);

  playBtn.add([
    text("PLAY", { size: 32, font: "science" }),
    pos(151, 29),
    anchor("center"),
    color(0, 255, 255),
    z(2)
  ]);

  playBtn.onClick(() => {
    go("charSelect");
  });

  playBtn.onHover(() => {
    playBtn.color = Color.fromHex("#58e84c");
  });

  playBtn.onHoverEnd(() => {
    playBtn.color = Color.fromHex("#000000");
  });

  const backBtn = add([
    rect(300, 56, { radius: 30 }),
    pos(350, 400),
    color(0, 0, 0), 
    outline(4, Color.fromHex('#730132')),
    area(),
    z(1),
    "backBtn"
  ]);

  backBtn.add([
    text("<- BACK", { size: 32, font: "science" }),
    pos(150, 28),
    anchor("center"),
    color(255, 255, 255),
    z(3)
  ]);

    backBtn.add([
    text("<- BACK", { size: 32, font: "science" }),
    pos(151, 29),
    anchor("center"),
    color(0, 255, 255),
    z(2)
  ]);

  backBtn.onClick(() => {
    window.location.href = '/';
  });

  backBtn.onHover(() => {
    backBtn.color = Color.fromHex("#730132");
  });

  backBtn.onHoverEnd(() => {
    backBtn.color = rgb(0, 0, 0);
  });

  createVolumeToggle();

}

export function createCharSelectScene() {
  let selectedIndex = null;

  // BACKGROUND
  add([
    sprite("SelectBG"), 
    pos(0, 0),
    scale(SCREEN_W/500, SCREEN_H/240), 
    z(0)
  ]);
  
  //  TITLE PANEL
  add([
    rect(900, 50, { radius: 30 }),
    pos(50, 15),
    color(17, 12, 30),
    outline(4, Color.fromHex("#dc4ce8")),
    z(1)
  ]);

  add([
    text("Choose Your Feline Fighter!", { 
      size: 32, 
      font: "orbitronBold",
      weight: "bold"
    }),
    pos(SCREEN_W / 2, 40),
    anchor("center"),
    color(255, 255, 255),
    z(3)
  ]);

    add([
    text("Choose Your Feline Fighter!", { 
      size: 32, 
      font: "orbitronBold",
      weight: "bold"
    }),
    pos(SCREEN_W / 2 + 1, 41),
    anchor("center"),
    color(0, 255, 255),
    z(2)
  ]);

  // LEFT PANEL - CHARACTER SELECTIONS
  add([
    rect(560, 400, { radius: 40 }),
    pos(20, 75),
    color(17, 12, 30),
    outline(2, Color.fromHex(Colors.MintBlue)),
    z(1)
  ]);

  const characters = getCharacterList();
  const catPositions = [
    [60, 105], [240, 105], [420, 105],
    [60, 300], [240, 300], [420, 300]
  ];

  const characterCards = [];

  catPositions.forEach((position, i) => {
    const [x, y] = position;
    
    const card = add([
      rect(160, 175, { radius: 30 }),
      pos(x - 20, y - 15),
      color(168, 164, 224),
      opacity(0.6),
      outline(3, Color.fromHex(Colors.CoolGray)),
      area(),
      z(2),
      { index: i }
    ]);

    
    const charSprite = card.add([
      sprite(characters[i].sprites.menu),
      pos(80, 87.5),
      anchor("center"),
      scale(1),
      z(3)
    ]);

  
    card.add([
      text(characters[i].name, { 
        size: 25, 
        font: "science",
        weight: "bold"
      }),
      pos(80, 25),
      anchor("center"),
      color(255, 255, 255),
      z(4)
    ]);

        card.add([
      text(characters[i].name, { 
        size: 25, 
        font: "science",
        weight: "bold"
      }),
      pos(81, 26),
      anchor("center"),
      color(0, 0, 0),
      z(3)
    ]);

    card.onClick(() => {
      selectedIndex = i;
      
      characterCards.forEach((c, idx) => {
        if (idx === i) {
          c.outline.width = 4;
          c.outline.color = Color.fromHex(Colors.Highlight);
        } else {
          c.outline.width = 3;
          c.outline.color = Color.fromHex(Colors.CoolGray);
        }
      });

    
      updatePreview(i);
    });

    card.onHover(() => {
      if (card.index !== selectedIndex) {
        card.outline.color = Color.fromHex(Colors.Mauve);
      }
    });

    card.onHoverEnd(() => {
      if (card.index !== selectedIndex) {
        card.outline.color = Color.fromHex(Colors.CatCardBorder);
      }
    });

    characterCards.push(card);
  });

  // RIGHT PANEL - PREVIEW
  const previewSprite = add([
    sprite(characters[0].sprites.big),
    pos(750, 290),
    anchor("center"),
    scale(1.2),
    z(2),
    opacity(0),
    "preview"
  ]);

  const previewName = add([
    text("", { 
        size: 48, 
        font: "science",
        weight: "bold"
      }),
      pos(789, 140),
      anchor("center"),
      color(0, 0, 0),
      z(2),
      "previewName"
    ]);

  const previewName2 = add([
    text("", { 
      size: 48, 
      font: "science",
      weight: "bold"
    }),
    pos(787, 130),
    anchor("center"),
    color(255, 255, 255),
    z(3),
    "previewName",
    ]);

  function updatePreview(index) {
    const char = characters[index];
    
    previewSprite.use(sprite(char.sprites.big));
    previewSprite.scale = vec2(1.1,1.1);
    previewSprite.opacity = 1;
    
    previewName.text = char.name;
    previewName2.text = char.name;  }

  const confirmBtn = add([
    rect(150, 40, { radius: 30 }),
    pos(625, 425),
    color(Color.fromHex(Colors.Highlight)), 
    outline(3, Color.fromHex(Colors.Highlight)),
    area(),
    z(1),
    opacity(0.4),
    "confirmBtn"
  ]);

  confirmBtn.add([
    text("CONFIRM", { size: 22, font: "science", weight: "bold" }),
    pos(75, 20),
    anchor("center"),
    color(255, 255, 255),
    z(3)
  ]);

    confirmBtn.add([
    text("CONFIRM", { size: 22, font: "science", weight: "bold" }),
    pos(76, 21),
    anchor("center"),
    color(0, 255, 255),
    z(2)
  ]);

confirmBtn.onClick(() => {
  if (selectedIndex !== null) {
    const selectedChar = characters[selectedIndex];
    go("transition", "Transition1", selectedChar);
  }
});

  const backBtn = add([
    rect(150, 40, { radius: 30 }),
    pos(810, 425),
    color(0,0,0), 
    outline(3, Color.fromHex('#730132')),
    area(),
    z(1),
    "backBtn"
  ]);

  backBtn.add([
    text("BACK", { size: 22, font: "science", weight: "bold" }),
    pos(75, 20),
    anchor("center"),
    color(255, 255, 255),
    z(3)
  ]);

    backBtn.add([
    text("BACK", { size: 22, font: "science", weight: "bold" }),
    pos(76, 21),
    anchor("center"),
    color(0, 255, 255),
    z(2)
  ]);

  backBtn.onClick(() => {
    go("menu");
  });

  onUpdate(() => {
    if (selectedIndex !== null) {
      confirmBtn.opacity = 1;
    } else {
      confirmBtn.opacity = 0.4;
    }
  });

  createVolumeToggle();
}