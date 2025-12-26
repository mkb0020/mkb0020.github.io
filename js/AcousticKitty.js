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

// ========== RESIZE FUNCTION (Tab 4) ==========
async function resizeImage(file, targetWidth) {
  const img = await createImageBitmap(file);
  const originalWidth = img.width;
  const originalHeight = img.height;
  const aspectRatio = originalHeight / originalWidth;
  
  const scaledHeight = Math.round(targetWidth * aspectRatio);
  
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = scaledHeight;
  
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.drawImage(img, 0, 0, targetWidth, scaledHeight);
  
  return { canvas, scaledHeight };
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
  const preview = document.getElementById('preview');
  const ctx = preview.getContext('2d');
  const buildBtn = document.getElementById('build');
  const downloadBtn = document.getElementById('download');

  let currentSheetCanvas = null;

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

    buildBtn.textContent = 'Building...';
    buildBtn.disabled = true;

    try {
      const canvas = await buildSheet(fileList, cols, pad);

      preview.width = Math.min(canvas.width, 800);
      preview.height = Math.round(preview.width * (canvas.height / canvas.width));
      ctx.clearRect(0, 0, preview.width, preview.height);
      ctx.drawImage(canvas, 0, 0, preview.width, preview.height);

      currentSheetCanvas = canvas;
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
    downloadDataUrl(data, 'AcousticKitty_SpriteSheet.png');
  });

  // ========== TAB 2: RECOLOR SINGLE SHEET ==========
  const recolorInputEl = document.getElementById('recolor-input');
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
      if (hex) masterColors.push(hex);
    }
    
    const newColors = [];
    for (let i = 1; i <= 5; i++) {
      const hex = document.getElementById(`recolor-new${i}-hex`).value.trim();
      if (hex) newColors.push(hex);
    }
    
    if (masterColors.length !== newColors.length) {
      alert('Please ensure every used master color has a corresponding new color!');
      return;
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
      
      const dataUrl = recoloredCanvas.toDataURL('image/png');
      downloadDataUrl(dataUrl, 'AcousticKitty_Recolored.png');
      
      alert('✅ Recolored sheet downloaded as: AcousticKitty_Recolored.png');
      
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
      if (hex) masterColors.push(hex);
    }
    
    const newColors = [];
    for (let i = 1; i <= 5; i++) {
      const hex = document.getElementById(`batch-new${i}-hex`).value.trim();
      if (hex) newColors.push(hex);
    }
    
    if (masterColors.length !== newColors.length) {
      alert('Please ensure every used master color has a corresponding new color!');
      return;
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
        
        const originalName = file.name.replace(/\.[^.]*$/, '') || 'image';
        const newName = `AcousticKitty_Recolored_${originalName}.png`;
        const dataUrl = recoloredCanvas.toDataURL('image/png');
        downloadDataUrl(dataUrl, newName);
        
        processed++;
        
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      batchStatus.textContent = `✅ Success! Processed ${processed} sprite sheets as AcousticKitty_Recolored_*.png`;
      
    } catch (err) {
      console.error(err);
      batchStatus.textContent = `❌ Error: ${err.message}`;
    }
    
    batchBtn.textContent = 'Batch Recolor & Download All';
    batchBtn.disabled = false;
  });

  // ========== TAB 4: BATCH RESIZE ==========
  const resizeFilesEl = document.getElementById('resize-files');
  const resizeWidthEl = document.getElementById('resize-width');
  const resizeUniformEl = document.getElementById('resize-uniform');
  const resizeBtn = document.getElementById('resize-batch');
  const resizeStatus = document.getElementById('resize-status');

  resizeBtn.addEventListener('click', async () => {
    const files = Array.from(resizeFilesEl.files || []);
    
    if (!files.length) {
      alert('Please upload images to resize!');
      return;
    }
    
    const targetWidth = parseInt(resizeWidthEl.value);
    if (!targetWidth || targetWidth < 1) {
      alert('Please enter a valid width (positive number)!');
      return;
    }

    const uniformHeight = resizeUniformEl.checked;
    
    resizeBtn.textContent = 'Processing...';
    resizeBtn.disabled = true;
    resizeStatus.classList.add('active');
    resizeStatus.textContent = 'Starting batch resize...';
    
    try {
      let maxHeight = 0;
      if (uniformHeight) {
        for (let file of files) {
          const { scaledHeight } = await resizeImage(file, targetWidth);
          if (scaledHeight > maxHeight) {
            maxHeight = scaledHeight;
          }
        }
      }
      
      const zip = new JSZip();
      let processed = 0;
      
      for (let file of files) {
        resizeStatus.textContent = `Processing ${processed + 1} of ${files.length}: ${file.name}`;
        
        const { canvas, scaledHeight } = await resizeImage(file, targetWidth);
        
        let finalCanvas = canvas;
        
        if (uniformHeight && scaledHeight < maxHeight) {
          const uniformCanvas = document.createElement('canvas');
          uniformCanvas.width = targetWidth;
          uniformCanvas.height = maxHeight;
          const uniformCtx = uniformCanvas.getContext('2d');
          
          uniformCtx.fillStyle = '#FFFFFF';
          uniformCtx.fillRect(0, 0, uniformCanvas.width, uniformCanvas.height);
          
          const yOffset = maxHeight - scaledHeight;
          uniformCtx.drawImage(canvas, 0, yOffset);
          
          finalCanvas = uniformCanvas;
        }
        
        const blob = await new Promise(resolve => finalCanvas.toBlob(resolve, 'image/png'));
        const paddedNumber = processed.toString().padStart(2, '0');
        zip.file(`${paddedNumber}.png`, blob);
        
        processed++;
      }
      
      resizeStatus.textContent = 'Creating zip file...';
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'AcousticKitty_Resized.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      
      resizeStatus.textContent = `✅ Success! Resized ${processed} images. Downloaded as AcousticKitty_Resized.zip!`;
      
    } catch (err) {
      console.error(err);
      resizeStatus.textContent = `❌ Error: ${err.message}`;
    }
    
    resizeBtn.textContent = 'Batch Resize & Download All';
    resizeBtn.disabled = false;
  });

  // ========== TAB 5: REMOVE BACKGROUND (AI-powered) ==========
  const bgremoveFilesEl = document.getElementById('bgremove-files');
  const bgremoveBtn = document.getElementById('bgremove-batch');
  const bgremoveStatus = document.getElementById('bgremove-status');
  const bgremovePreview = document.getElementById('bgremove-preview');
  const bgremoveCtx = bgremovePreview.getContext('2d', { willReadFrequently: true });

  function downloadZip(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function loadBackgroundRemovalLibrary() {
    if (window.imglyRemoveBackground) {
      return window.imglyRemoveBackground;
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/dist/browser.js';
      script.onload = () => {
        if (window.imglyRemoveBackground) {
          resolve(window.imglyRemoveBackground);
        } else {
          reject(new Error('Library loaded but not found on window object'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load background removal library'));
      document.head.appendChild(script);
    });
  }

  bgremoveBtn.addEventListener('click', async () => {
    const files = Array.from(bgremoveFilesEl.files || []);
    
    if (!files.length) {
      alert('Please upload at least one image!');
      return;
    }

    bgremoveBtn.textContent = 'Loading AI model...';
    bgremoveBtn.disabled = true;
    bgremoveStatus.classList.add('active');
    bgremoveStatus.textContent = 'Loading library and model...';

    try {
      const { removeBackground } = await loadBackgroundRemovalLibrary();

      const zip = new JSZip();
      let processed = 0;

      for (let file of files) {
        bgremoveStatus.textContent = `Processing ${processed + 1}/${files.length}: ${file.name}`;

        const blob = await removeBackground(file, {
          progress: (key, current, total) => {
            const percent = ((current / total) * 100).toFixed(0);
            bgremoveStatus.textContent = `${key}: ${percent}% (Image ${processed + 1}/${files.length})`;
          }
        });

        if (processed === 0) {
          const imgBitmap = await createImageBitmap(blob);
          const maxDim = 600;
          const scale = Math.min(maxDim / imgBitmap.width, maxDim / imgBitmap.height, 1);
          const w = imgBitmap.width * scale;
          const h = imgBitmap.height * scale;
          bgremovePreview.width = w;
          bgremovePreview.height = h;
          bgremoveCtx.clearRect(0, 0, w, h);
          bgremoveCtx.drawImage(imgBitmap, 0, 0, w, h);
        }

        const name = file.name.replace(/\.[^.]*$/, '') || 'image';
        zip.file(`${name}.png`, blob);

        processed++;
      }

      bgremoveStatus.textContent = 'Creating zip file...';
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      downloadZip(URL.createObjectURL(zipBlob), 'AcousticKitty_NoBackground.zip');

      bgremoveStatus.textContent = `✅ Success! Processed ${processed} images. Downloaded as AcousticKitty_NoBackground.zip!`;

    } catch (err) {
      console.error('Background removal error:', err);
      bgremoveStatus.textContent = `❌ Error: ${err.message || 'Failed'}`;
      alert('Background removal failed.\n\n' + (err.message || err) + '\n\nMake sure you\'re using a modern browser (Chrome/Edge recommended).');
    } finally {
      bgremoveBtn.textContent = 'REMOVE BACKGROUND & DOWNLOAD';
      bgremoveBtn.disabled = false;
    }
  });

  console.log('🐱 Acoustic Kitty loaded successfully — now with unbreakable branding!');
});