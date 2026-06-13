import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Import all videos from the assets/videos folder and take a subset for massive performance gains
const videoModules = import.meta.glob('../assets/videos/*.{mp4,webm,ogg,mov}', { eager: true });
const allVideoPaths = Object.values(videoModules).map((mod: any) => mod.default);
const videoPaths = allVideoPaths.slice(0, 4);

const DEPTH_LAYERS = 5;
const ITEMS_PER_LAYER = 15;
const MAX_WIDTH = 200;
const MAX_HEIGHT = 300;

const LAYER_CONFIG = [
  { scale: 1.5, speed: 250, opacity: 1.0 },
  { scale: 1.0, speed: 180, opacity: 0.85 },
  { scale: 0.8, speed: 130, opacity: 0.7 },
  { scale: 0.6, speed: 90, opacity: 0.55 },
  { scale: 0.5, speed: 60, opacity: 0.4 }
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const InfiniteGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingText, setLoadingText] = useState("Loading gallery...");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    if (videoPaths.length === 0) {
      setLoadingText("No videos found in assets/videos");
      return;
    }

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0); 
    container.appendChild(renderer.domElement);
    
    let camera: THREE.OrthographicCamera;
    let layers: THREE.Sprite[][] = Array.from({ length: DEPTH_LAYERS }, () => []);
    
    // Create exactly one VideoTexture per unique video path to save memory and decoding limits
    const videoTextures: THREE.VideoTexture[] = [];
    const videoElements: HTMLVideoElement[] = [];
    
    let loaded = 0;
    let lastTime = 0;
    let animationFrameId: number;
    let isCleanedUp = false;

    // Load all videos into memory
    const loadVideos = () => {
      videoPaths.forEach((path) => {
        const video = document.createElement('video');
        video.src = path;
        video.crossOrigin = 'anonymous';
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        
        // Wait for enough data to determine dimensions
        video.addEventListener('loadedmetadata', () => {
          if (isCleanedUp) return;
          const texture = new THREE.VideoTexture(video);
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          // Calculate aspect ratio for the texture
          texture.userData = { 
            aspectRatio: video.videoWidth / video.videoHeight 
          };
          
          videoTextures.push(texture);
          videoElements.push(video);
          
          video.play().catch(e => console.warn("Video autoplay prevented", e));
          
          loaded++;
          setLoadingText(`Loading ${Math.round((loaded / videoPaths.length) * 100)}%`);
          
          if (loaded === videoPaths.length) {
            setIsLoaded(true);
            fillViewport();
            lastTime = performance.now();
            animate();
          }
        });
        
        video.load();
      });
    };

    function resize() {
      if (!container || isCleanedUp) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      if (!camera) {
        camera = new THREE.OrthographicCamera(0, w, h, 0, -1000, 1000);
        camera.position.z = 10;
      } else {
        camera.right = w;
        camera.top = h;
        camera.updateProjectionMatrix();
      }
      
      for (const layer of layers) {
        for (const s of layer) {
          scene.remove(s);
          s.material.dispose();
          s.geometry.dispose();
        }
      }
      
      layers = Array.from({ length: DEPTH_LAYERS }, () => []);
      if (videoTextures.length === videoPaths.length) fillViewport();
    }

    window.addEventListener("resize", resize);
    resize();
    loadVideos();

    function addSprite(layerIndex: number, startX: number) {
      const cfg = LAYER_CONFIG[layerIndex];
      const texIndex = Math.floor(Math.random() * videoTextures.length);
      const texture = videoTextures[texIndex];
      
      const mat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: cfg.opacity
      });
      
      const sprite = new THREE.Sprite(mat);
      
      let width = MAX_WIDTH;
      let height = MAX_HEIGHT;
      
      const ratio = texture.userData.aspectRatio || 1;
      if (ratio > 1) {
        width = MAX_WIDTH;
        height = MAX_WIDTH / ratio;
      } else {
        height = MAX_HEIGHT;
        width = MAX_HEIGHT * ratio;
      }
      
      const sizeVar = rand(0.85, 1.15);
      const w = width * cfg.scale * sizeVar;
      const h = height * cfg.scale * sizeVar;
      const spacing = w * rand(0.1, 0.4);
      
      sprite.scale.set(w, h, 1);
      sprite.position.set(startX + w / 2 + spacing, rand(h / 2, container.clientHeight - h / 2), -layerIndex * 50);
      
      sprite.userData = {
        speed: cfg.speed * rand(0.8, 1.2),
        width: w,
        height: h,
        seed: rand(0, 1000),
        baseY: sprite.position.y,
        opacity: cfg.opacity
      };
      
      layers[layerIndex].push(sprite);
      scene.add(sprite);
      return sprite;
    }

    function cleanupSprites() {
      const w = container.clientWidth;
      const bufferZone = w * 0.5;
      for (let l = 0; l < DEPTH_LAYERS; l++) {
        const sprites = layers[l];
        const maxSprites = ITEMS_PER_LAYER + 3;
        if (sprites.length > maxSprites) {
          for (let i = sprites.length - 1; i >= 0; i--) {
            const s = sprites[i];
            const ud = s.userData;
            // Always moving left
            if ((s.position.x + ud.width / 2) < (-bufferZone)) {
              scene.remove(s);
              s.material.dispose();
              sprites.splice(i, 1);
              if (sprites.length <= maxSprites) break;
            }
          }
        }
      }
    }

    function fillViewport() {
      const w = container.clientWidth;
      for (let l = 0; l < DEPTH_LAYERS; l++) {
        let sprites = layers[l];
        let rightMost = sprites.length > 0 ? Math.max(...sprites.map(s => s.position.x + s.userData.width / 2)) : -container.clientWidth * 0.5;
        while (rightMost < w + 200) {
          addSprite(l, rightMost);
          sprites = layers[l];
          rightMost = Math.max(...sprites.map(s => s.position.x + s.userData.width / 2));
        }
      }
    }

    function animate() {
      if (isCleanedUp) return;
      const now = performance.now();
      const dt = Math.min(40, now - lastTime) / 1000;
      lastTime = now;
      const w = container.clientWidth;
      
      if (Math.random() < 0.02) {
        cleanupSprites();
      }
      
      for (const sprites of layers) {
        for (const s of sprites) {
          const ud = s.userData;
          // Constant movement left
          s.position.x -= ud.speed * dt;
          
          if (s.position.x + ud.width / 2 < -w * 0.5) {
            // Find the rightmost sprite in this layer to reposition
            const layerSprites = layers[Math.abs(Math.round(s.position.z / 50))];
            const rightMost = Math.max(...layerSprites.map(ls => ls.position.x + ls.userData.width / 2));
            s.position.x = rightMost + rand(0, ud.width);
          }
          
          const pulse = 1 + Math.sin(now * 0.001 + ud.seed) * 0.015;
          s.scale.x = ud.width * pulse;
          s.scale.y = ud.height * pulse;
          s.position.y = ud.baseY + Math.sin(now * 0.001 + ud.seed) * 5;
        }
      }
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      isCleanedUp = true;
      window.removeEventListener("resize", resize);
      
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      videoElements.forEach(video => {
        video.pause();
        video.removeAttribute('src');
        video.load();
      });
      videoTextures.forEach(tex => tex.dispose());
    };
  }, []);

  return (
    <section id="work" className="relative w-full h-[600px] md:h-[800px] bg-transparent my-12 overflow-hidden flex flex-col items-center scroll-mt-24">
      <div className="z-10 text-center pointer-events-none mt-12 mb-8">
        <h2 className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-secondary tracking-tight px-4">
          Visual <span className="font-serif">Storytelling</span>
        </h2>
        <p className="mt-4 text-primary text-sm max-w-md mx-auto px-6">
          A glimpse into the aesthetic worlds we've created. Scroll to explore the infinite gallery.
        </p>
      </div>

      <div 
        ref={containerRef} 
        className="absolute inset-0 pointer-events-none"
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full text-secondary font-medium shadow-sm">
            {loadingText}
          </div>
        </div>
      )}
    </section>
  );
};
