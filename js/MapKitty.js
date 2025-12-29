// LEVEL PLANNER JS - WITH FIXED COW ABDUCTION 🛸🐄✨
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const groundY = 440;
const groundHeight = 50;
let groundSegments = [];
let platforms = [];
let cows = [];
let levelLength = 10000;
let platformColor = "#dc4ce8";
let groundColor = "#58E84C";

let ufo = {
  x: 75, y: 240, vx: 0, vy: 0,
  w: 120, h: 50,
  get left() { return this.x - this.w / 2; },
  get top() { return this.y - this.h / 2; },
  get right() { return this.x + this.w / 2; },
  get bottom() { return this.y + this.h / 2; }
};

let camera = { x: 0 };
const keys = {};
let spaceJustPressed = false;

const ufoSprite = new Image();
ufoSprite.src = "assets/images/UFO3.png";

const cowSpriteSheet = new Image();
cowSpriteSheet.src = "assets/images/cow.png";

const COW_WIDTH = 80;
const COW_HEIGHT = 80;
const COW_FRAME_COUNT = 9;
let cowFrameWidth = 0;
let cowFrameHeight = 0;
let spriteLoaded = false;

cowSpriteSheet.onload = () => {
  cowFrameWidth = cowSpriteSheet.width / COW_FRAME_COUNT;
  cowFrameHeight = cowSpriteSheet.height;
  spriteLoaded = true;
  console.log('✅ Cow sprite loaded!', {
    totalWidth: cowSpriteSheet.width,
    frameWidth: cowFrameWidth,
    frameHeight: cowFrameHeight
  });
};

cowSpriteSheet.onerror = () => {
  console.error('❌ Failed to load cow sprite from assets/images/cow.png');
  console.log('Will use placeholder graphics instead');
};

const ABDUCTION_SPEED = 150;
const BEAM_WIDTH = 50;
const BEAM_COLOR = "rgba(117, 251, 30, 0.63)";
const BEAM_GLOW_COLOR = "rgba(117, 251, 30, 0.2)";

const levelLengthInput = document.getElementById('levelLength');
const numPlatformsInput = document.getElementById('numPlatforms');
const numHolesInput = document.getElementById('numHoles');
const platformColorInput = document.getElementById('platformColor');
const groundColorInput = document.getElementById('groundColor');
const dynamicInputsDiv = document.getElementById('dynamicInputs');
const generateBtn = document.getElementById('generateLevel');
const exportBtn = document.getElementById('exportJson');

function createDynamicInputs() {
  let html = '';
  const numP = parseInt(numPlatformsInput.value) || 0;
  const numH = parseInt(numHolesInput.value) || 0;

  if (numP > 0) {
    html += '<div style="margin-bottom: 20px;"><div class="row"><div class="label-header">X</div><div class="label-header">Y</div><div class="label-header">Width</div><div class="label-header">Height</div></div>';
    for (let i = 0; i < numP; i++) {
      html += `<div class="row">
        <input type="number" class="plat-x" value="${i === 0 ? 300 : 0}" step="10">
        <input type="number" class="plat-y" value="300" step="10">
        <input type="number" class="plat-w" value="150" min="10" step="10">
        <input type="number" class="plat-h" value="20" min="10" step="10">
      </div>`;
    }
    html += '</div>';
  }

  if (numH > 0) {
    html += '<div><div class="row" style="grid-template-columns: 1fr 1fr;"><div class="label-header">Hole Start X</div><div class="label-header">Hole End X</div></div>';
    for (let i = 0; i < numH; i++) {
      html += `<div class="hole-row">
        <input type="number" class="hole-start" value="${i === 0 ? 1000 : 0}" step="50">
        <input type="number" class="hole-end" value="${i === 0 ? 1600 : 600}" step="50">
      </div>`;
    }
    html += '</div>';
  }

  if (numP === 0 && numH === 0) {
    html = '<p style="color: rgba(255,255,255,0.6); text-align:center;">Add platforms or holes to get started!</p>';
  }

  dynamicInputsDiv.innerHTML = html;
}

numPlatformsInput.addEventListener('input', createDynamicInputs);
numHolesInput.addEventListener('input', createDynamicInputs);
createDynamicInputs();

window.addEventListener("keydown", e => {
  if (e.key === " " || e.key === "Space") {
    e.preventDefault();
    if (!keys[" "]) {
      spaceJustPressed = true;
      console.log('🎮 Space pressed! UFO at:', Math.round(ufo.x), Math.round(ufo.y));
    }
  }
  keys[e.key] = true;
});

window.addEventListener("keyup", e => keys[e.key] = false);

function spawnCows() {
  cows = [];
  if (groundSegments.length === 0) return;

  const numCows = 4 + Math.floor(Math.random() * 7);
  console.log(`🐄 Spawning ${numCows} cows...`);

  for (let i = 0; i < numCows; i++) {
    const seg = groundSegments[Math.floor(Math.random() * groundSegments.length)];
    if (seg.width < COW_WIDTH + 40) continue;

    const x = seg.x + 20 + Math.random() * (seg.width - COW_WIDTH - 40);
    cows.push({
      x: x + COW_WIDTH / 2,
      y: groundY - COW_HEIGHT / 2,
      state: "idle",
      frame: 0,
      animTime: 0
    });
  }
  
  console.log(`✅ Spawned ${cows.length} cows`);
}

generateBtn.onclick = () => {
  levelLength = Math.max(1000, parseInt(levelLengthInput.value) || 10000);
  platformColor = platformColorInput.value;
  groundColor = groundColorInput.value;

  platforms = [];
  document.querySelectorAll('.plat-x').forEach((el, i) => {
    platforms.push({
      x: parseFloat(el.value) || 0,
      y: parseFloat(document.querySelectorAll('.plat-y')[i].value) || 300,
      width: Math.max(10, parseFloat(document.querySelectorAll('.plat-w')[i].value) || 150),
      height: Math.max(10, parseFloat(document.querySelectorAll('.plat-h')[i].value) || 20)
    });
  });

  const holes = [];
  document.querySelectorAll('.hole-start').forEach((el, i) => {
    const start = parseFloat(el.value) || 0;
    const end = parseFloat(document.querySelectorAll('.hole-end')[i].value) || 600;
    if (start < end) holes.push({ start, end });
  });
  holes.sort((a, b) => a.start - b.start);

  groundSegments = [];
  let currentX = 0;
  for (let hole of holes) {
    if (hole.start > currentX) {
      groundSegments.push({ x: currentX, y: groundY, width: hole.start - currentX, height: groundHeight });
    }
    currentX = Math.max(currentX, hole.end);
  }
  if (currentX < levelLength) {
    groundSegments.push({ x: currentX, y: groundY, width: levelLength - currentX, height: groundHeight });
  }

  ufo.x = 100;
  ufo.y = canvas.height / 2;
  camera.x = 0;
  spawnCows();
};

exportBtn.onclick = () => {
  const data = { GroundSegments: groundSegments, platforms: platforms };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'MapKittyLevel.json'; a.click();
  URL.revokeObjectURL(url);
};

function update() {
  const dt = 1/60;
  const speed = 350;

  ufo.vx = ufo.vy = 0;
  if (keys.a || keys.A || keys.ArrowLeft) ufo.vx = -speed;
  if (keys.d || keys.D || keys.ArrowRight) ufo.vx = speed;
  if (keys.w || keys.W || keys.ArrowUp) ufo.vy = -speed;
  if (keys.s || keys.S || keys.ArrowDown) ufo.vy = speed;

  ufo.x += ufo.vx * dt;
  ufo.y += ufo.vy * dt;

  ufo.x = Math.max(ufo.w / 2, Math.min(levelLength - ufo.w / 2, ufo.x));
  ufo.y = Math.max(ufo.h / 2, Math.min(canvas.height - ufo.h / 2, ufo.y));

  if (spaceJustPressed) {
    spaceJustPressed = false;
    
    let foundCow = false;
    for (let cow of cows) {
      if (cow.state === "abducting") continue;

      const dx = Math.abs(ufo.x - cow.x);
      const dy = ufo.bottom - cow.y; 

      if (!foundCow) {
        console.log(`Checking cow at ${Math.round(cow.x)}, ${Math.round(cow.y)} - dx: ${Math.round(dx)}, dy: ${Math.round(dy)}`);
      }

      if (dx < 20 && dy < 10 && dy > -400) {
        cow.state = "abducting";
        cow.animTime = 0;
        cow.frame = 1;
        console.log(`🛸 ABDUCTING cow at ${Math.round(cow.x)}! (dx: ${Math.round(dx)}, dy: ${Math.round(dy)})`);
        foundCow = true;
        break;
      }
    }
    
    if (!foundCow) {
      console.log('❌ No cow in range');
    }
  }

  let removedCount = 0;
  cows = cows.filter(cow => {
    if (cow.state === "abducting") {
      cow.animTime += dt;
      if (cow.animTime >= 0.08) {
        cow.animTime = 0;
        cow.frame = cow.frame >= 8 ? 1 : cow.frame + 1;
      }

      cow.y -= ABDUCTION_SPEED * dt;

      if (cow.y <= ufo.y + 30) {
        console.log('✅ Cow abducted!');
        removedCount++;
        return false;
      }
    }
    return true;
  });

  const targetCameraX = ufo.x - canvas.width / 3;
  camera.x += (targetCameraX - camera.x) * 0.12;
  camera.x = Math.max(0, Math.min(levelLength - canvas.width, camera.x));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(-camera.x, 0);

  groundSegments.forEach(seg => {
    ctx.fillStyle = groundColor;
    ctx.fillRect(seg.x, seg.y, seg.width, seg.height);
  });

  platforms.forEach(p => {
    ctx.fillStyle = platformColor;
    ctx.fillRect(p.x, p.y, p.width, p.height);
  });

  cows.forEach(cow => {
    const drawX = cow.x - COW_WIDTH / 2;
    const drawY = cow.y - COW_HEIGHT / 2;

    if (cow.state === "abducting") {
      const beamTop = ufo.y + ufo.h / 2;
      const beamHeight = cow.y - beamTop + 30;

      ctx.fillStyle = BEAM_GLOW_COLOR;
      ctx.fillRect(cow.x - BEAM_WIDTH * 0.8, beamTop - 10, BEAM_WIDTH * 1.6, beamHeight + 20);

      ctx.fillStyle = BEAM_COLOR;
      ctx.fillRect(cow.x - BEAM_WIDTH / 2, beamTop, BEAM_WIDTH, beamHeight);
    }

    const frameToUse = cow.state === "idle" ? 0 : cow.frame;

    if (spriteLoaded && cowFrameWidth > 0) {
      ctx.drawImage(
        cowSpriteSheet,
        frameToUse * cowFrameWidth, 0,
        cowFrameWidth, cowFrameHeight,
        drawX, drawY,
        COW_WIDTH, COW_HEIGHT
      );
    } else {
      ctx.fillStyle = cow.state === "idle" ? "#FFB6C1" : "#FF69B4";
      ctx.fillRect(drawX, drawY, COW_WIDTH, COW_HEIGHT);
      
      ctx.fillStyle = "#000";
      ctx.fillRect(drawX + 20, drawY + 20, 6, 6);
      ctx.fillRect(drawX + 50, drawY + 20, 6, 6);
      
      ctx.font = "14px Arial";
      ctx.fillText(cow.state === "idle" ? "🐄" : "😱", drawX + 25, drawY + 55);
    }
  });

  const ufoDrawX = ufo.x - ufo.w / 2;
  const ufoDrawY = ufo.y - ufo.h / 2;
  if (ufoSprite.complete) {
    ctx.drawImage(ufoSprite, ufoDrawX, ufoDrawY, ufo.w, ufo.h);
  } else {
    ctx.fillStyle = "#67FEBD";
    ctx.fillRect(ufoDrawX, ufoDrawY, ufo.w, ufo.h);
  }

  ctx.restore();

  ctx.fillStyle = "rgba(0, 255, 255, 0.9)";
  ctx.font = "16px Orbitron";
  ctx.fillText(`UFO COORDINATES:`, 10, 25);
  ctx.fillText(`X:${Math.round(ufo.x)}`, 10, 50);
  ctx.fillText(`Y:${Math.round(ufo.y)}`, 10, 75);
  ctx.fillText(`Cows remaining: ${cows.length}`, 810, 25);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

generateBtn.click();
loop();