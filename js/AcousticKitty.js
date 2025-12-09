
// ========== UTILITY FUNCTIONS ==========
function hexToRgb(hex) {
  hex = hex.replace('#', '').toUpperCase();
  if (hex.length === 3) {
    hex = hex.split('').map(h => h + h).join('');
  }
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return [r, g, b];
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

function downloadDataUrl(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// ========== RECOLOR FUNCTION (Shared by Tab 2 & 3) ==========
function recolorCanvas(srcCanvas, masterColors, newColors) {
  const w = srcCanvas.width;
  const h = srcCanvas.height;
  
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  
  ctx.drawImage(srcCanvas, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  
  const masterRGB = masterColors.map(hexToRgb);
  const newRGB = newColors.map(hexToRgb);
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    
    if (a === 0) continue; 
    
    for (let m = 0; m < masterRGB.length; m++) {
      const [mr, mg, mb] = masterRGB[m];
      
      if (r === mr && g === mg && b === mb) {
        const [nr, ng, nb] = newRGB[m];
        data[i] = nr;
        data[i + 1] = ng;
        data[i + 2] = nb;
        break;
      }
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

// ========== WAIT FOR DOM ==========
document.addEventListener('DOMContentLoaded', () => {
  console.log('🐱 Acoustic Kitty initializing...');

  // ========== TAB SWITCHING ==========
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      

      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(targetTab).classList.add('active');
    });
  });

  // ========== COLOR PICKER SYNC ==========
  function setupColorSync(colorId, hexId) {
    const colorInput = document.getElementById(colorId);
    const hexInput = document.getElementById(hexId);
    
    if (!colorInput || !hexInput) return;
    
    colorInput.addEventListener('input', () => {
      hexInput.value = colorInput.value.toUpperCase();
    });
    
    hexInput.addEventListener('input', () => {
      const hex = hexInput.value.trim();
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        colorInput.value = hex;
      }
    });
  }

  for (let i = 1; i <= 5; i++) {
    setupColorSync(`recolor-master${i}`, `recolor-master${i}-hex`);
    setupColorSync(`recolor-new${i}`, `recolor-new${i}-hex`);
  }

  for (let i = 1; i <= 5; i++) {
    setupColorSync(`batch-master${i}`, `batch-master${i}-hex`);
    setupColorSync(`batch-new${i}`, `batch-new${i}-hex`);
  }

  // ========== TAB 1: BUILD SPRITE SHEET ==========
  const filesEl = document.getElementById('files');
  const colsEl = document.getElementById('cols');
  const padEl = document.getElementById('pad');
  const outnameEl = document.getElementById('outname');
  const preview = document.getElementById('preview');
  const ctx = preview.getContext('2d');
  const buildBtn = document.getElementById('build');
  const downloadBtn = document.getElementById('download');

  let currentSheetCanvas = null;
  let currentSheetFilename = 'sheet.png';

  async function buildSheet(files, cols, padding) {
    const bitmaps = [];
    for (let f of files) {
      const bmp = await createImageBitmap(f);
      bitmaps.push(bmp);
    }
    
    if (bitmaps.length === 0) {
      throw new Error('No frames to process');
    }
    
    const frameW = bitmaps[0].width;
    const frameH = bitmaps[0].height;

    const rows = Math.ceil(bitmaps.length / cols);
    const sheetW = frameW * cols + padding * (cols - 1);
    const sheetH = frameH * rows + padding * (rows - 1);

    const canvas = document.createElement('canvas');
    canvas.width = sheetW;
    canvas.height = sheetH;
    const c = canvas.getContext('2d');

    c.clearRect(0, 0, canvas.width, canvas.height);

    bitmaps.forEach((bmp, i) => {
      const x = (i % cols) * (frameW + padding);
      const y = Math.floor(i / cols) * (frameH + padding);
      c.drawImage(bmp, x, y);
    });

    return canvas;
  }

  buildBtn.addEventListener('click', async () => {
    const fileList = Array.from(filesEl.files || []);
    
    if (!fileList.length) {
      alert('Please upload PNG frames first!');
      return;
    }

    const cols = Math.max(1, parseInt(colsEl.value) || 1);
    const pad = Math.max(0, parseInt(padEl.value) || 0);
    const out = outnameEl.value.trim() || 'sheet.png';

    buildBtn.textContent = 'Building...';
    buildBtn.disabled = true;

    try {
      const canvas = await buildSheet(fileList, cols, pad);

      preview.width = Math.min(canvas.width, 800);
      preview.height = Math.round(preview.width * (canvas.height / canvas.width));
      ctx.clearRect(0, 0, preview.width, preview.height);
      ctx.drawImage(canvas, 0, 0, preview.width, preview.height);

      currentSheetCanvas = canvas;
      currentSheetFilename = out.endsWith('.png') ? out : out + '.png';
      
      downloadBtn.disabled = false;
      alert(`✅ Sprite sheet built successfully! (${fileList.length} frames)`);

    } catch (err) {
      console.error(err);
      alert('❌ Error: ' + err.message);
    }

    buildBtn.textContent = 'Build sheet';
    buildBtn.disabled = false;
  });

  downloadBtn.addEventListener('click', () => {
    if (!currentSheetCanvas) {
      alert('Build the sheet first!');
      return;
    }
    const data = currentSheetCanvas.toDataURL('image/png');
    downloadDataUrl(data, currentSheetFilename);
  });

  // ========== TAB 2: RECOLOR SINGLE SHEET ==========
  const recolorInputEl = document.getElementById('recolor-input');
  const recolorOutputEl = document.getElementById('recolor-output');
  const recolorBtn = document.getElementById('recolor-single');
  const recolorPreview = document.getElementById('recolor-preview');
  const recolorCtx = recolorPreview.getContext('2d');

  recolorBtn.addEventListener('click', async () => {
    const file = recolorInputEl.files[0];
    
    if (!file) {
      alert('Please upload a sprite sheet first!');
      return;
    }
    
    const masterColors = [];
    for (let i = 1; i <= 5; i++) {
      const hex = document.getElementById(`recolor-master${i}-hex`).value.trim();
      masterColors.push(hex);
    }
    
    const newColors = [];
    for (let i = 1; i <= 5; i++) {
      const hex = document.getElementById(`recolor-new${i}-hex`).value.trim();
      newColors.push(hex);
    }
    
    const hexPattern = /^#[0-9A-Fa-f]{6}$/;
    for (let hex of [...masterColors, ...newColors]) {
      if (!hexPattern.test(hex)) {
        alert(`Invalid hex color: ${hex}\nMust be in format #RRGGBB`);
        return;
      }
    }
    
    recolorBtn.textContent = 'Recoloring...';
    recolorBtn.disabled = true;
    
    try {
      const img = await createImageBitmap(file);
      const srcCanvas = document.createElement('canvas');
      srcCanvas.width = img.width;
      srcCanvas.height = img.height;
      const srcCtx = srcCanvas.getContext('2d');
      srcCtx.drawImage(img, 0, 0);
      
      const recoloredCanvas = recolorCanvas(srcCanvas, masterColors, newColors);
      
      recolorPreview.width = Math.min(recoloredCanvas.width, 800);
      recolorPreview.height = Math.round(recolorPreview.width * (recoloredCanvas.height / recoloredCanvas.width));
      recolorCtx.clearRect(0, 0, recolorPreview.width, recolorPreview.height);
      recolorCtx.drawImage(recoloredCanvas, 0, 0, recolorPreview.width, recolorPreview.height);
      
      const outputName = recolorOutputEl.value.trim() || 'recolored.png';
      const filename = outputName.endsWith('.png') ? outputName : outputName + '.png';
      const dataUrl = recoloredCanvas.toDataURL('image/png');
      downloadDataUrl(dataUrl, filename);
      
      alert(`✅ Recolored sheet downloaded as: ${filename}`);
      
    } catch (err) {
      console.error(err);
      alert('❌ Error: ' + err.message);
    }
    
    recolorBtn.textContent = 'Recolor & Download';
    recolorBtn.disabled = false;
  });

  // ========== TAB 3: BATCH RECOLOR ==========
  const batchFilesEl = document.getElementById('batch-files');
  const batchBtn = document.getElementById('batch-recolor');
  const batchStatus = document.getElementById('batch-status');

  batchBtn.addEventListener('click', async () => {
    const files = Array.from(batchFilesEl.files || []);
    
    if (!files.length) {
      alert('Please upload sprite sheets to recolor!');
      return;
    }
    
    const masterColors = [];
    for (let i = 1; i <= 5; i++) {
      const hex = document.getElementById(`batch-master${i}-hex`).value.trim();
      masterColors.push(hex);
    }
    
    const newColors = [];
    for (let i = 1; i <= 5; i++) {
      const hex = document.getElementById(`batch-new${i}-hex`).value.trim();
      newColors.push(hex);
    }
    
    const hexPattern = /^#[0-9A-Fa-f]{6}$/;
    for (let hex of [...masterColors, ...newColors]) {
      if (!hexPattern.test(hex)) {
        alert(`Invalid hex color: ${hex}\nMust be in format #RRGGBB`);
        return;
      }
    }
    
    batchBtn.textContent = 'Processing...';
    batchBtn.disabled = true;
    batchStatus.classList.add('active');
    batchStatus.textContent = 'Starting batch recolor...';
    
    try {
      let processed = 0;
      
      for (let file of files) {
        batchStatus.textContent = `Processing ${processed + 1} of ${files.length}: ${file.name}`;
        
        const img = await createImageBitmap(file);
        const srcCanvas = document.createElement('canvas');
        srcCanvas.width = img.width;
        srcCanvas.height = img.height;
        const srcCtx = srcCanvas.getContext('2d');
        srcCtx.drawImage(img, 0, 0);
        
        const recoloredCanvas = recolorCanvas(srcCanvas, masterColors, newColors);
        
        const originalName = file.name.replace('.png', '');
        const newName = `recolor_${originalName}.png`;
        const dataUrl = recoloredCanvas.toDataURL('image/png');
        downloadDataUrl(dataUrl, newName);
        
        processed++;
        
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      batchStatus.textContent = `✅ Success! Processed ${processed} sprite sheets. Check your downloads folder!`;
      
    } catch (err) {
      console.error(err);
      batchStatus.textContent = `❌ Error: ${err.message}`;
    }
    
    batchBtn.textContent = 'Batch Recolor & Download All';
    batchBtn.disabled = false;
  });

  console.log('🐱 Acoustic Kitty loaded successfully!');
});