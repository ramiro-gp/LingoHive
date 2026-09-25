import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Starfield() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch {
      return; // La imagen de fondo sigue visible cuando WebGL no está disponible.
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const starCount = 10000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = Math.random() * -1000;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const sprite = new THREE.TextureLoader().load('data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><circle cx="32" cy="32" r="32" fill="yellow"/></svg>'));
    const material = new THREE.PointsMaterial({
      map: sprite, color: 0xffff00, size: 1.5, transparent: true,
      opacity: 1, sizeAttenuation: true, depthWrite: false, alphaTest: 0.1,
    });
    scene.add(new THREE.Points(geometry, material));
    camera.position.z = 1;

    const resize = () => {
      const width = wrapperRef.current?.clientWidth || window.innerWidth;
      const height = wrapperRef.current?.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
    };
    resize();

    let mouseX = 0;
    let mouseY = 0;
    let frame = 0;
    let visible = false;
    const tick = () => {
      frame = 0;
      if (!visible || document.hidden) return;
      const points = geometry.attributes.position.array;
      for (let i = 0; i < starCount; i++) {
        points[i * 3 + 2] += 0.6;
        if (points[i * 3 + 2] > 0) {
          points[i * 3] = (Math.random() - 0.5) * 2000;
          points[i * 3 + 1] = (Math.random() - 0.5) * 2000;
          points[i * 3 + 2] = -1000 + Math.random() * -500;
        }
      }
      geometry.attributes.position.needsUpdate = true;
      camera.position.x += (mouseX - camera.position.x) * 0.02;
      camera.position.y += (-mouseY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      if (visible && !document.hidden && !frame) frame = requestAnimationFrame(tick);
      else if ((!visible || document.hidden) && frame) { cancelAnimationFrame(frame); frame = 0; }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.01 });
    observer.observe(wrapperRef.current);
    const move = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 4000;
      mouseY = (event.clientY - window.innerHeight / 2) / 4000;
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('resize', resize);

    return () => {
      observer.disconnect();
      document.removeEventListener('mousemove', move);
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
      renderer.dispose(); sprite.dispose(); geometry.dispose(); material.dispose();
    };
  }, []);

  return <div ref={wrapperRef} aria-hidden="true" className="absolute inset-0 z-0 bg-black bg-[url('/starfield.jpg')] bg-cover bg-center"><canvas ref={canvasRef} className="w-full h-full" /></div>;
}
