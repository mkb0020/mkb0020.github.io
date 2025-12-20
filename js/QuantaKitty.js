const fileInput = document.getElementById("spriteInput");
const rowsInput = document.getElementById("rows");
const colsInput = document.getElementById("cols");
const speedInput = document.getElementById("speed");
const previewBtn = document.getElementById("previewBtn");

const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");

let sprite = new Image();
let frames = [];
let animTimer = null;

fileInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    sprite.onload = sliceFrames;
    sprite.src = reader.result;
  };
  reader.readAsDataURL(file);
});

rowsInput.addEventListener("input", () => {
  if (sprite.complete && sprite.src) {
    sliceFrames();
  }
});

colsInput.addEventListener("input", () => {
  if (sprite.complete && sprite.src) {
    sliceFrames();
  }
});

let frameW = 0;
let frameH = 0;

function sliceFrames() {
  frames = [];

  const rows = +rowsInput.value;
  const cols = +colsInput.value;

  frameW = Math.floor(sprite.width / cols);
  frameH = Math.floor(sprite.height / rows);


  console.log('Sprite size:', sprite.width, 'x', sprite.height);
  console.log('Grid:', rows, 'rows x', cols, 'cols');
  console.log('Calculated frame size:', frameW, 'x', frameH);

  canvas.width = frameW;
  canvas.height = frameH;
  

  canvas.style.width = (frameW * 2.5) + 'px';
  canvas.style.height = (frameH * 2.5) + 'px';

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      frames.push({
        sx: x * frameW,
        sy: y * frameH
      });
    }
  }
  
  console.log('Total frames:', frames.length);
}

previewBtn.addEventListener("click", () => {
  if (!frames.length) return;

  clearInterval(animTimer);

  let index = 0;
  const delay = +speedInput.value;

  animTimer = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    const f = frames[index];

    ctx.drawImage(
      sprite,
      f.sx, f.sy,      
      frameW, frameH,  
      0, 0,            
      canvas.width,    
      canvas.height    
    );

    index = (index + 1) % frames.length;
  }, delay);
});



const exportBtn = document.getElementById("exportBtn");

exportBtn.addEventListener("click", () => {
  if (!frames.length) {
    alert("Please upload a sprite sheet first!");
    return;
  }

  // CHECK GIF LIBRARY
  if (typeof GIF === 'undefined') {
    alert("GIF library not loaded!");
    return;
  }

  // UPDATE BUTTON
  exportBtn.textContent = "combining discrete packets...";
  exportBtn.disabled = true;

  const gif = new GIF({
    workers: 2,
    quality: 10,
    width: frameW,
    height: frameH,
    workerScript: 'js/gif.worker.js' 
  });

  // ADD FRAMES
  frames.forEach(f => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = frameW;
    tempCanvas.height = frameH;
    const tempCtx = tempCanvas.getContext('2d');
    
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(
      sprite,
      f.sx, f.sy,
      frameW, frameH,
      0, 0,
      frameW, frameH
    );
    
    gif.addFrame(tempCanvas, { delay: +speedInput.value });
  });

  gif.on('finished', blob => {
    // DOWNLOAD GIF
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'animation.gif';
    a.click();
    URL.revokeObjectURL(url);

    // RESET
    exportBtn.textContent = "EXPORT GIF";
    exportBtn.disabled = false;
  });

  gif.render();
});