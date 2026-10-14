import { useEffect, useRef } from "react";

export const HeroScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(max-width: 767px)").matches) return undefined;

    let cancelled = false;
    let cleanup;

    const initialize = async () => {
      const THREE = await import("three");
      if (cancelled) return;

      const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearAlpha(0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(1.75, 2);
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim() || "#20b2a6";
    const material = new THREE.MeshBasicMaterial({
      color: accent,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const shape = new THREE.Mesh(geometry, material);
    group.add(shape);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xf0f2f5,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.018, 8, 96), ringMaterial);
    ring.rotation.x = Math.PI / 2.7;
    group.add(ring);

    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(72 * 3);
    for (let index = 0; index < 72; index += 1) {
      const angle = index * 2.399;
      const radius = 2.2 + (index % 7) * 0.18;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = Math.sin(angle) * radius;
      positions[index * 3 + 2] = ((index % 11) - 5) * 0.22;
    }
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMaterial = new THREE.PointsMaterial({ color: accent, size: 0.035, transparent: true, opacity: 0.45 });
    const points = new THREE.Points(
      pointsGeometry,
      pointsMaterial
    );
    group.add(points);

    const updateColor = (event) => {
      material.color.set(event.detail.primary);
      pointsMaterial.color.set(event.detail.primary);
    };
    window.addEventListener("portfolio-theme-change", updateColor);

    const pointer = { x: 0, y: 0 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.35;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.25;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    let frame;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      if (!reduceMotion) {
        group.rotation.y = elapsed * 0.09 + pointer.x;
        group.rotation.x += (pointer.y - group.rotation.x) * 0.025;
        ring.rotation.z = elapsed * -0.06;
        shape.scale.setScalar(1 + Math.sin(elapsed * 0.7) * 0.025);
      }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

      cleanup = () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("portfolio-theme-change", updateColor);
      geometry.dispose();
      material.dispose();
      ring.geometry.dispose();
      ringMaterial.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      };
    };

    initialize();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className="hero-scene" aria-hidden="true" />;
};
