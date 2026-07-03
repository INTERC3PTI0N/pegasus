'use client';

import React, { useRef, useEffect, useState } from 'react';

interface PegasusCombProps {
  activeSection: string;
  scrollProgress: number; // 0 to 1
  mousePos: { x: number; y: number };
  materialOverride?: 'wood' | 'rubber' | 'cellulose';
}

export default function PegasusComb({
  activeSection,
  scrollProgress,
  mousePos,
  materialOverride,
}: PegasusCombProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // Determine material based on active section or override
  let material: 'wood' | 'rubber' | 'cellulose' = 'rubber';
  if (materialOverride) {
    material = materialOverride;
  } else if (activeSection === 'collections-wood') {
    material = 'wood';
  } else if (activeSection === 'collections-cellulose') {
    material = 'cellulose';
  } else if (activeSection === 'about') {
    material = 'wood'; // wood matches company history/vintage feel
  } else {
    material = 'rubber'; // classic black vulcanite hard rubber
  }

  // Handle Resize using ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: Math.max(width, 300),
          height: Math.max(height, 300),
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    let animationId: number;

    // Define 3D projection parameters based on section and scrollProgress
    let targetRotationX = 0; // Pitch
    let targetRotationY = 0; // Yaw
    let targetRotationZ = 0; // Roll
    let targetScale = 1;
    let targetX = 0; // Offset X
    let targetY = 0; // Offset Y
    let explodeFactor = 0; // For technical exploded view

    // Scene interpolation configuration based on active section
    switch (activeSection) {
      case 'preloader':
        // Slow full continuous spin
        targetRotationX = 0.2;
        targetRotationY = Date.now() * 0.001;
        targetRotationZ = 0.3;
        targetScale = 0.75;
        targetX = 0;
        targetY = 0;
        break;

      case 'hero':
        // Suspended, slightly tilted, responding to scroll
        targetRotationX = -0.15 + scrollProgress * 0.4;
        targetRotationY = 0.5 - scrollProgress * 0.6;
        targetRotationZ = -0.5 - scrollProgress * 0.2;
        targetScale = 0.85 + scrollProgress * 0.15;
        targetX = scrollProgress * -50;
        targetY = scrollProgress * 150; // Graceful downward sweep
        break;

      case 'about':
        // Floating vertically on the right side
        targetRotationX = 0.3;
        targetRotationY = 1.35 + scrollProgress * 0.4;
        targetRotationZ = 1.4; // near vertical
        targetScale = 0.65;
        targetX = dimensions.width * 0.25;
        targetY = (scrollProgress - 0.5) * 100;
        break;

      case 'collections-rubber':
      case 'collections-cellulose':
      case 'collections-wood':
        // Front-facing, rotating based on mouse/hover
        targetRotationX = -0.1 + (mousePos.y - 0.5) * 0.3;
        targetRotationY = 0.2 + (mousePos.x - 0.5) * 0.5;
        targetRotationZ = -0.15;
        targetScale = 0.8;
        targetX = 0;
        targetY = 0;
        break;

      case 'technology-glamlock':
      case 'technology-flexinite':
      case 'technology-staticblock':
        // Exploded view or dynamic scan
        targetRotationX = 0.35;
        targetRotationY = 0.8;
        targetRotationZ = -0.4;
        targetScale = 0.75;
        targetX = -dimensions.width * 0.1;
        targetY = 0;
        // Explode teeth slightly if in tech-flexinite
        explodeFactor = activeSection === 'technology-flexinite' ? 0.3 : 0.1;
        break;

      case 'ai-consultant':
        // Small decorative floating comb in bottom right
        targetRotationX = 0.2 + Math.sin(Date.now() * 0.001) * 0.15;
        targetRotationY = 0.5 + Math.cos(Date.now() * 0.0015) * 0.2;
        targetRotationZ = -0.6;
        targetScale = 0.55;
        targetX = dimensions.width * 0.2;
        targetY = dimensions.height * 0.1;
        break;

      case 'whoweserve':
        targetRotationX = 0.4;
        targetRotationY = 1.8;
        targetRotationZ = 0.5;
        targetScale = 0.6;
        targetX = -dimensions.width * 0.2;
        targetY = 0;
        break;

      case 'blog':
        targetRotationX = -0.2;
        targetRotationY = 0.4;
        targetRotationZ = -0.8;
        targetScale = 0.5;
        targetX = dimensions.width * 0.28;
        targetY = -50;
        break;

      case 'brochure':
        targetRotationX = 0.1;
        targetRotationY = 0.1;
        targetRotationZ = -0.2;
        targetScale = 0.6;
        targetX = dimensions.width * 0.22;
        targetY = dimensions.height * 0.05;
        break;

      case 'contact':
        targetRotationX = 0.5;
        targetRotationY = 2.4;
        targetRotationZ = 0.2;
        targetScale = 0.5;
        targetX = -dimensions.width * 0.25;
        targetY = dimensions.height * 0.15;
        break;

      default:
        targetRotationX = 0.2;
        targetRotationY = 0.5;
        targetRotationZ = -0.3;
        targetScale = 0.7;
    }

    // Current interpolation state
    let curRotX = targetRotationX;
    let curRotY = targetRotationY;
    let curRotZ = targetRotationZ;
    let curScale = targetScale;
    let curX = targetX;
    let curY = targetY;
    let curExplode = explodeFactor;

    // Lighting vector determined by mouse coordinates (Spotlight/Specular simulation)
    const lightVector = {
      x: (mousePos.x - 0.5) * 4,
      y: -(mousePos.y - 0.5) * 4,
      z: 3,
    };
    // Normalize light vector
    const lightLength = Math.sqrt(lightVector.x ** 2 + lightVector.y ** 2 + lightVector.z ** 2);
    lightVector.x /= lightLength;
    lightVector.y /= lightLength;
    lightVector.z /= lightLength;

    const render = () => {
      // Clear with soft gradient based on section
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Smooth step towards target variables (creates natural organic heavy easing)
      curRotX += (targetRotationX - curRotX) * 0.1;
      // Handle modular wrapping for continuous rotation in preloader
      if (activeSection === 'preloader') {
        curRotY = targetRotationY;
      } else {
        curRotY += (targetRotationY - curRotY) * 0.1;
      }
      curRotZ += (targetRotationZ - curRotZ) * 0.1;
      curScale += (targetScale - curScale) * 0.1;
      curX += (targetX - curX) * 0.1;
      curY += (targetY - curY) * 0.1;
      curExplode += (explodeFactor - curExplode) * 0.1;

      // Draw subtle shadow behind the comb
      ctx.save();
      ctx.translate(dimensions.width / 2 + curX + 15, dimensions.height / 2 + curY + 25);
      ctx.rotate(curRotZ);
      ctx.scale(curScale, curScale);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.filter = 'blur(16px)';
      ctx.fillRect(-180, -25, 360, 50);
      ctx.restore();

      // Render the comb components
      ctx.save();
      // Translate to the virtual center plus scroll offset
      ctx.translate(dimensions.width / 2 + curX, dimensions.height / 2 + curY);
      ctx.rotate(curRotZ);
      ctx.scale(curScale, curScale);

      // 3D parameters
      const combLength = 340;
      const spineHeight = 36;
      const teethCount = 48;
      const toothLength = 52;
      const toothWidth = 3.5;
      const spineOffset = -22; // Offset to center the comb relative to its core

      // Material color presets
      let primaryColor = '#151515';
      let accentColor = '#2d2d2d';
      let edgeColor = '#0d0d0d';
      let highlightColor = '#ffffff';

      if (material === 'wood') {
        primaryColor = '#d2a679'; // warm beechwood body
        accentColor = '#bf8f5f'; // wood shading
        edgeColor = '#80593f'; // dark grain edge
        highlightColor = '#ffebad'; // golden highlights
      } else if (material === 'cellulose') {
        primaryColor = '#8a5a16'; // amber tortoiseshell base
        accentColor = '#e3a834'; // translucent honey spots
        edgeColor = '#3d1d03'; // dark black/brown spots
        highlightColor = '#fff5df'; // bright reflection
      }

      // 1. Draw backbone/spine
      const gradient = ctx.createLinearGradient(-combLength / 2, spineOffset, combLength / 2, spineOffset + spineHeight);
      
      if (material === 'wood') {
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(0.3, highlightColor);
        gradient.addColorStop(0.5, accentColor);
        gradient.addColorStop(0.8, primaryColor);
        gradient.addColorStop(1, edgeColor);
      } else if (material === 'cellulose') {
        gradient.addColorStop(0, edgeColor);
        gradient.addColorStop(0.2, primaryColor);
        gradient.addColorStop(0.4, accentColor);
        gradient.addColorStop(0.65, edgeColor);
        gradient.addColorStop(0.85, primaryColor);
        gradient.addColorStop(1, accentColor);
      } else {
        // Polished premium hard rubber / vulcanite
        gradient.addColorStop(0, '#101010');
        gradient.addColorStop(0.4, '#242426');
        gradient.addColorStop(0.5, '#444446'); // Chrome shine line
        gradient.addColorStop(0.6, '#1e1e1f');
        gradient.addColorStop(1, '#080808');
      }

      ctx.fillStyle = gradient;
      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = 1;

      // Draw beautifully rounded spine rectangle
      ctx.beginPath();
      const spineRadius = 8;
      const x = -combLength / 2;
      const y = spineOffset;
      const w = combLength;
      const h = spineHeight;

      ctx.moveTo(x + spineRadius, y);
      ctx.lineTo(x + w - spineRadius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + spineRadius);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x, y + spineRadius);
      ctx.quadraticCurveTo(x, y, x + x, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Tortoiseshell spot accents
      if (material === 'cellulose') {
        ctx.save();
        ctx.clip();
        ctx.fillStyle = 'rgba(20, 10, 0, 0.75)';
        for (let i = 0; i < 20; i++) {
          ctx.beginPath();
          const spotX = -combLength / 2 + (i * 20 + Math.sin(i * 1.5) * 15);
          const spotY = spineOffset + 10 + (Math.cos(i) * 12);
          const rX = 12 + Math.sin(i) * 6;
          const rY = 6 + Math.cos(i) * 4;
          ctx.ellipse(spotX, spotY, rX, rY, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Beechwood grain accents
      if (material === 'wood') {
        ctx.save();
        ctx.clip();
        ctx.strokeStyle = 'rgba(90, 50, 20, 0.12)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 12; i++) {
          ctx.beginPath();
          ctx.moveTo(-combLength / 2 - 10, spineOffset + i * 4);
          ctx.bezierCurveTo(
            -100, spineOffset + i * 4 - 5,
            100, spineOffset + i * 4 + 8,
            combLength / 2 + 10, spineOffset + i * 4 + 2
          );
          ctx.stroke();
        }
        ctx.restore();
      }

      // Specular Reflection highlights on Backbone
      ctx.save();
      ctx.globalCompositeOperation = 'overlay';
      const spineShine = ctx.createLinearGradient(0, spineOffset, 0, spineOffset + spineHeight);
      const lightDotY = 0.5 + lightVector.y * 0.3;
      spineShine.addColorStop(0, 'rgba(255,255,255,0.4)');
      spineShine.addColorStop(lightDotY - 0.1, 'rgba(255,255,255,0.05)');
      spineShine.addColorStop(lightDotY, 'rgba(255,255,255,0.75)'); // specular core
      spineShine.addColorStop(lightDotY + 0.1, 'rgba(255,255,255,0.05)');
      spineShine.addColorStop(1, 'rgba(0,0,0,0.4)');
      ctx.fillStyle = spineShine;
      ctx.beginPath();
      ctx.rect(x + 1, y + 1, w - 2, h - 2);
      ctx.fill();
      ctx.restore();

      // Engraved Brand Logo on Spine
      ctx.save();
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.letterSpacing = '5px';
      ctx.textAlign = 'center';
      
      // Shadow layer (gives deep engraving relief look)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillText('[P] PEGASUS', 1, spineOffset + 21);
      
      // Highlight edge layer
      if (material === 'wood') {
        ctx.fillStyle = 'rgba(70, 40, 20, 0.8)';
      } else if (material === 'cellulose') {
        ctx.fillStyle = '#fff5df';
      } else {
        ctx.fillStyle = '#c5a880'; // Subtle metallic gold engraved logo
      }
      ctx.fillText('[P] PEGASUS', 0, spineOffset + 20);
      ctx.restore();

      // 2. Draw Teeth (Seamless Rounded Hand-Cut style)
      // Exploded View modifies spine-teeth separation
      const toothStartY = spineOffset + spineHeight + curExplode * 18;

      for (let i = 0; i < teethCount; i++) {
        // Interpolate spacing. Wide teeth on one end, fine styling teeth on other.
        const normalX = i / (teethCount - 1);
        let toothX = -combLength / 2 + 10 + normalX * (combLength - 20);

        // Individual tooth lighting normal calculation (tilt slightly for 3D curved feel)
        const toothNormalX = Math.sin(curRotY) + (normalX - 0.5) * 0.5;
        const toothNormalY = Math.cos(curRotX);
        const toothNormalZ = 1.0;
        
        // Dot product between light and normal
        const toothDot = toothNormalX * lightVector.x + toothNormalY * lightVector.y + toothNormalZ * lightVector.z;
        const toothBrightness = Math.max(0.2, Math.min(1.0, toothDot));

        // Draw individual tooth
        ctx.save();
        ctx.translate(toothX, toothStartY);

        // Individual tooth width and shape variations
        let currentWidth = toothWidth;
        let currentLength = toothLength;

        // Taper lengths near ends for styling elegance
        if (i < 4) {
          currentLength = toothLength - (4 - i) * 3;
        } else if (i > teethCount - 5) {
          currentLength = toothLength - (i - (teethCount - 5)) * 2;
        }

        // Draw rounded tooth shape
        const toothGradient = ctx.createLinearGradient(-currentWidth/2, 0, currentWidth/2, currentLength);
        
        if (material === 'wood') {
          // Render wood teeth
          const baseR = 210, baseG = 166, baseB = 121;
          const r = Math.floor(baseR * toothBrightness);
          const g = Math.floor(baseG * toothBrightness);
          const b = Math.floor(baseB * toothBrightness);
          toothGradient.addColorStop(0, `rgb(${r},${g},${b})`);
          toothGradient.addColorStop(0.6, `rgb(${Math.floor(r*0.9)},${Math.floor(g*0.9)},${Math.floor(b*0.9)})`);
          toothGradient.addColorStop(1, `rgb(${Math.floor(r*0.75)},${Math.floor(g*0.75)},${Math.floor(b*0.75)})`);
        } else if (material === 'cellulose') {
          // Translucent amber tortoiseshell
          const alpha = 0.85 + Math.sin(i * 0.7) * 0.15;
          const hue = i % 4 === 0 ? 'rgba(40, 15, 2, 0.95)' : `rgba(180, 110, 30, ${alpha})`;
          toothGradient.addColorStop(0, hue);
          toothGradient.addColorStop(1, 'rgba(61, 29, 3, 0.95)');
        } else {
          // Classic black hard rubber (vulcanite)
          const tone = Math.floor(25 + toothBrightness * 45);
          const spec = Math.floor(65 + toothBrightness * 120);
          toothGradient.addColorStop(0, `rgb(${tone},${tone},${tone + 5})`);
          toothGradient.addColorStop(0.2, `rgb(${spec},${spec},${spec + 8})`); // specular peak
          toothGradient.addColorStop(0.8, `rgb(${tone - 10},${tone - 10},${tone - 8})`);
          toothGradient.addColorStop(1, '#09090a');
        }

        ctx.fillStyle = toothGradient;

        // Seamless rounded tip drawing
        ctx.beginPath();
        ctx.moveTo(-currentWidth / 2, 0);
        ctx.lineTo(currentWidth / 2, 0);
        ctx.lineTo(currentWidth / 2, currentLength - 4);
        
        // Perfect hand-cut styling rounded tips (GLAMLOCK tech visualization)
        ctx.quadraticCurveTo(currentWidth / 2, currentLength, 0, currentLength);
        ctx.quadraticCurveTo(-currentWidth / 2, currentLength, -currentWidth / 2, currentLength - 4);
        
        ctx.closePath();
        ctx.fill();

        // Highlight scanning overlays for GLAMLOCK/FLEXINITE/STATICBLOCK technologies
        if (activeSection.startsWith('technology-')) {
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          
          if (activeSection === 'technology-flexinite' && i > 12 && i < 28) {
            // Flexible core green/gold pulse
            const pulse = 0.15 + Math.sin(Date.now() * 0.005 + i * 0.4) * 0.15;
            ctx.fillStyle = `rgba(197, 168, 128, ${pulse})`;
            ctx.fill();
          } else if (activeSection === 'technology-glamlock') {
            // Round tip glow overlay
            const pulse = 0.2 + Math.cos(Date.now() * 0.004 + i * 0.2) * 0.15;
            ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
            ctx.beginPath();
            ctx.arc(0, currentLength - 2, currentWidth / 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (activeSection === 'technology-staticblock') {
            // Static dissipation cyan sparks overlay
            if (i % 5 === 0 && Math.sin(Date.now() * 0.01 + i) > 0.7) {
              ctx.fillStyle = 'rgba(0, 240, 255, 0.75)';
              ctx.beginPath();
              ctx.arc(0, currentLength * 0.4, 1.2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.restore();
        }

        ctx.restore();
      }

      ctx.restore();

      // Trigger next frame
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions, activeSection, scrollProgress, mousePos, material]);

  return (
    <div
      ref={containerRef}
      id="comb-container"
      className="relative w-full h-full flex items-center justify-center pointer-events-none select-none z-10"
    >
      <canvas
        ref={canvasRef}
        id="comb-canvas"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
