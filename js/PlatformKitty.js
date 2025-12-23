// PLATFORM PHYSICS TESTER 
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const groundY = 340;
let platforms = [];

let player = {
  x: 50,
  y: groundY - 108,  
  vx: 0,
  vy: 0,
  w: 150,  
  h: 108, 
  onGround: false
};

let camera = { x: 0 };
const keys = {};

const playerSprite = new Image();
playerSprite.src = "assets/images/UFO.png"; 

// ============================================= STARS =============================================
const starsDiv = document.getElementById('stars');
for (let i = 0; i < 200; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.width = star.style.height = Math.random() * 2 + 'px';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';
  star.style.animationDelay = Math.random() * 4 + 's';
  starsDiv.appendChild(star);
}

// ============================================= INPUT  =============================================
const gravityInput     = document.getElementById('gravity');
const jumpForceInput   = document.getElementById('jumpForce');
const speedInput       = document.getElementById('speed');
const spriteWInput     = document.getElementById('spriteW');
const spriteHInput     = document.getElementById('spriteH');
const levelLengthInput = document.getElementById('levelLength');
const jsonFileInput    = document.getElementById('jsonFile');
const jsonTextInput    = document.getElementById('jsonInput');
const loadBtn          = document.getElementById('loadLevel');
const resetBtn         = document.getElementById('resetPlayer');


// ============================================= INPUT HANDLING =============================================
window.addEventListener("keydown", e => {
  keys[e.key] = true;
  if (e.key === "r" || e.key === "R") {
    resetPlayerPosition();
  }
  if (e.key === " ") e.preventDefault();
});

window.addEventListener("keyup", e => {
  keys[e.key] = false;
});

function resetPlayerPosition() {
  player.x = 50;
  player.y = groundY - player.h;
  player.vx = 0;
  player.vy = 0;
  player.onGround = false;
  camera.x = 0;
}

// ============================================= LOAD PLATFORMS FROM FILE or TEXT =============================================
async function loadPlatformsFromInput() {
  let data = null;

  if (jsonFileInput.files && jsonFileInput.files[0]) {
    try {
      const text = await jsonFileInput.files[0].text();
      data = JSON.parse(text);
    } catch (err) {
      alert("Error parsing uploaded file: " + err.message);
      return;
    }
  }
  else if (jsonTextInput.value.trim()) {
    try {
      data = JSON.parse(jsonTextInput.value);
    } catch (err) {
      alert("Error parsing pasted JSON: " + err.message);
      return;
    }
  }

  if (!data || !data.platforms || !Array.isArray(data.platforms)) {
    alert("Invalid format. Please provide a JSON object with a 'platforms' array.");
    return;
  }

  platforms = data.platforms.map(p => ({
    x: Number(p.x) || 0,
    y: Number(p.y) || groundY,
    w: Number(p.w) || 100,
    h: Number(p.h) || 16
  }));

// ============================================= PLAYER =============================================
  player.w = Math.max(1, Math.min(200, Number(spriteWInput.value) || 150));
  player.h = Math.max(1, Math.min(200, Number(spriteHInput.value) || 108));
  player.y = groundY - player.h; 

  resetPlayerPosition();
}

loadBtn.onclick = () => {
  loadPlatformsFromInput();
};

resetBtn.onclick = () => {
  resetPlayerPosition();
};

// ============================================= PHYSICS & COLLISION =============================================
function getConfig() {
  return {
    gravity:   Math.max(0.1, Number(gravityInput.value) || 1600),
    jumpForce: Math.max(1,   Number(jumpForceInput.value) || 780),
    speed:     Math.max(1,   Number(speedInput.value) || 250),
    levelLength: Math.max(800, Number(levelLengthInput.value) || 10000)
  };
}

function collide(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function update() {
  const cfg = getConfig();
  const dt = 1/60;

  player.vx = 0;
  if (keys.a || keys.A || keys.ArrowLeft)  player.vx = -cfg.speed;
  if (keys.d || keys.D || keys.ArrowRight) player.vx = cfg.speed;

  if ((keys[" "] || keys.w || keys.W || keys.ArrowUp) && player.onGround) {
    player.vy = -cfg.jumpForce;
    player.onGround = false;
  }

  player.vy += cfg.gravity * dt;
  player.x += player.vx * dt;
  player.y += player.vy * dt;

  player.onGround = false;

  if (player.y + player.h >= groundY) {
    player.y = groundY - player.h;
    player.vy = 0;
    player.onGround = true;
  }

  for (let p of platforms) {
    if (collide(player, p) && player.vy > 0 && 
        player.y + player.h - player.vy <= p.y) {
      player.y = p.y - player.h;
      player.vy = 0;
      player.onGround = true;
    }
  }

  const targetCameraX = player.x - canvas.width / 3;
  camera.x += (targetCameraX - camera.x) * 0.1;
  camera.x = Math.max(0, camera.x);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(-camera.x, 0);

  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(camera.x, groundY, canvas.width * 2, canvas.height - groundY);

  ctx.strokeStyle = "#67FEBD";
  ctx.beginPath();
  ctx.moveTo(camera.x, groundY);
  ctx.lineTo(camera.x + canvas.width * 2, groundY);
  ctx.stroke();

  platforms.forEach(p => {
    ctx.fillStyle = "#dc4ce8";
    ctx.fillRect(p.x, p.y, p.w, p.h);
  });

if (playerSprite.complete) {
    ctx.drawImage(
      playerSprite,
      player.x,
      player.y,
      player.w,
      player.h
    );
  } else {
    ctx.fillStyle = "#67FEBD";
    ctx.fillRect(player.x, player.y, player.w, player.h);
  }

  ctx.restore();

  // HUD
  ctx.fillStyle = "rgba(0, 255, 255, 0.8)";
  ctx.font = "14px Orbitron";
  ctx.fillText(`Position: ${Math.round(player.x)} px`, 10, 20);
  ctx.fillText(`Platforms loaded: ${platforms.length}`, 10, 40);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// ============================================= PHYSICS & COLLISION =============================================
loop();