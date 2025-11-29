// FRACTALS - MOBILE OPTIMIZED
let scene, camera, renderer, uniforms;
let container;
let currentFractal = "mandelbrot";
let material;

function resizeRendererToContainer() {
    if (!renderer || !uniforms || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height, false);
    uniforms.u_resolution.value.set(width, height);
}

// ======================== FRACTAL FORMULAS ========================
const fractalShaders = {
    mandelbrot: `
        z = vec2(
            z.x*z.x - z.y*z.y + c.x,
            2.0*z.x*z.y + c.y
        );
    `,

    power3: `
        z = vec2(
            z.x*z.x*z.x - 3.0*z.x*z.y*z.y + c.x,
            3.0*z.x*z.x*z.y - z.y*z.y*z.y + c.y
        );
    `,

    julia: `
      if (i == 0.0) {
          z = uv;  
          c = vec2(
              sin(u_time * 0.3) * 0.6,
              cos(u_time * 0.2) * 0.4
          );
      }

      z = vec2(
          z.x*z.x - z.y*z.y + c.x,
          2.0*z.x*z.y + c.y
      );
    `,

    tricorn: `
        z = vec2(
            z.x*z.x - z.y*z.y + c.x,
            -2.0*z.x*z.y + c.y
        );
    `,

    burningship: `
        vec2 absz = vec2(abs(z.x), abs(z.y));
        z = vec2(
            absz.x*absz.x - absz.y*absz.y + c.x,
            2.0*absz.x*absz.y + c.y
        );
    `
};

// ======================== SHADER BUILDER ========================
function buildFragmentShader() {
    return `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform float u_zoom;
        uniform vec2 u_offset;

        vec3 colorize(float t) {
            return 0.5 + 0.5 * cos(6.28318 * (vec3(0.0, 0.33, 0.67) + t));
        }

        void main() {
            vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

            vec2 z = uv;
            vec2 c = uv / u_zoom + u_offset;

            float iter = 0.0;
            const float maxIter = 150.0;

            for (float i = 0.0; i < maxIter; i++) {
                if (dot(z,z) > 4.0) break;

                ${fractalShaders[currentFractal]}

                iter = i;
            }

            float t = iter / maxIter;
            vec3 col = colorize(t + u_time * 0.1);
            gl_FragColor = vec4(col, 1.0);
        }
    `;
}

// ======================== MOBILE & DESKTOP CONTROLS ========================
let isDragging = false;
let lastMouse = { x: 0, y: 0 };
let touchStartPos = null;
let pinchDistance = 0;
let initialPinchZoom = 0;
let zoomLevel = 1.0;
const zoomFactor = 1.5;

const getClientPos = (e) => {
    if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
};

const handlePointerStart = (e) => {
    e.preventDefault();
    isDragging = true;
    touchStartPos = getClientPos(e);
    lastMouse = { ...touchStartPos };
    
    if (container) container.style.cursor = "grabbing";
    
    if (e.touches && e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchDistance = Math.sqrt(dx * dx + dy * dy);
        initialPinchZoom = zoomLevel;
    }
};

const handlePointerMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    if (e.touches && e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);
        
        if (pinchDistance > 0) {
            const scale = currentDistance / pinchDistance;
            zoomLevel = initialPinchZoom * scale;
            zoomLevel = Math.max(0.1, Math.min(1000, zoomLevel)); 
            uniforms.u_zoom.value = zoomLevel;
        }
        pinchDistance = currentDistance;
    } 
    // DRAG TO PAN 
    else {
        const currentPos = getClientPos(e);
        const dx = (currentPos.x - lastMouse.x) / container.clientWidth;
        const dy = (currentPos.y - lastMouse.y) / container.clientHeight;

        uniforms.u_offset.value.x -= dx * 3.0 / zoomLevel;
        uniforms.u_offset.value.y += dy * 3.0 / zoomLevel;

        lastMouse = { ...currentPos };
    }
};

const handlePointerEnd = (e) => {
    e.preventDefault();
    isDragging = false;
    touchStartPos = null;
    pinchDistance = 0;
    if (container) container.style.cursor = "grab";
};

function setupMobileControls() {
    if (!container) return;
    
    // Touch events for mobile
    container.addEventListener('touchstart', handlePointerStart, { passive: false });
    container.addEventListener('touchmove', handlePointerMove, { passive: false });
    container.addEventListener('touchend', handlePointerEnd, { passive: false });
    container.addEventListener('touchcancel', handlePointerEnd, { passive: false });
    
    // Mouse events for desktop
    container.addEventListener("mousedown", handlePointerStart);
    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseup", handlePointerEnd);
    container.addEventListener("mouseleave", handlePointerEnd);
    
    // Mouse wheel zoom
    container.addEventListener("wheel", (e) => {
        e.preventDefault();
        const zoomSpeed = e.deltaY > 0 ? 0.9 : 1.1;
        zoomLevel *= zoomSpeed;
        zoomLevel = Math.max(0.1, Math.min(1000, zoomLevel));
        uniforms.u_zoom.value = zoomLevel;
    }, { passive: false });
    
    // Prevent default touch behaviors
    container.style.touchAction = 'none';
    container.style.cursor = "grab";
}

function setupControls() {
    const zoomInBtn = document.getElementById("zoomInBtn");
    const zoomOutBtn = document.getElementById("zoomOutBtn");
    const resetZoomBtn = document.getElementById("resetZoomBtn");

    if (zoomInBtn) {
        zoomInBtn.addEventListener("click", () => {
            zoomLevel *= zoomFactor;
            uniforms.u_zoom.value = zoomLevel;
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener("click", () => {
            zoomLevel /= zoomFactor;
            uniforms.u_zoom.value = zoomLevel;
        });
    }

    if (resetZoomBtn) {
        resetZoomBtn.addEventListener("click", () => {
            zoomLevel = 1.0;
            uniforms.u_zoom.value = 1.0;
            uniforms.u_offset.value.set(-0.5, 0);
        });
    }
    
    // Setup mobile controls after container exists
    setupMobileControls();
}

function init() {
    container = document.getElementById("fractal-container");
    if (!container) {
        console.error("Container 'fractal-container' not found!");
        return;
    }

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });

    uniforms = {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(0, 0) },
        u_mouse: { value: new THREE.Vector2() },
        u_zoom: { value: 1.0 },
        u_offset: { value: new THREE.Vector2(-0.5, 0) }
    };

    const geometry = new THREE.PlaneGeometry(2, 2);

    material = new THREE.ShaderMaterial({
        uniforms,
        fragmentShader: buildFragmentShader()
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    resizeRendererToContainer();
}

function animate(t) {
    uniforms.u_time.value = t * 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// ======================== INITIALIZATION ========================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
        setupControls();
        animate(0);
    });
} else {
    init();
    setupControls();
    animate(0);
}

// ======================== FRACTAL DROPDOWN ========================
window.addEventListener('DOMContentLoaded', () => {
    const fractalSelect = document.getElementById("fractalSelect");
    if (fractalSelect) {
        fractalSelect.addEventListener("change", e => {
            currentFractal = e.target.value;
            material.fragmentShader = buildFragmentShader();
            material.needsUpdate = true;
        });
    }
});

window.addEventListener("resize", resizeRendererToContainer);