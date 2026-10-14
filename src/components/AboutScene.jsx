import { useEffect, useRef } from "react";

export const AboutScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let cancelled = false;
    let cleanup;

    const initialize = async () => {
      const THREE = await import("three");
      if (cancelled) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
      camera.position.z = 8;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearAlpha(0);
      mount.appendChild(renderer.domElement);

      const accent = getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim() || "#20b2a6";
      const material = new THREE.MeshBasicMaterial({
        color: accent,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });
      const secondaryMaterial = material.clone();
      secondaryMaterial.color.set(0xf0f2f5);
      secondaryMaterial.opacity = 0.055;

      const objects = [
        new THREE.Mesh(new THREE.OctahedronGeometry(1.25, 1), material),
        new THREE.Mesh(new THREE.TorusKnotGeometry(0.75, 0.18, 80, 10), secondaryMaterial),
        new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 1), material),
      ];
      objects[0].position.set(3.3, 1.7, 0);
      objects[1].position.set(-3.7, -1.8, -0.5);
      objects[2].position.set(3.8, -2.7, -1);
      objects.forEach((object) => scene.add(object));

      const updateColor = (event) => material.color.set(event.detail.primary);
      window.addEventListener("portfolio-theme-change", updateColor);

      const cursor = { x: 0, y: 0 };
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let visible = true;
      const onPointerMove = (event) => {
        const bounds = mount.getBoundingClientRect();
        cursor.x = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 0.35;
        cursor.y = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 0.25;
      };
      mount.parentElement?.addEventListener("pointermove", onPointerMove, { passive: true });

      const resize = () => {
        renderer.setSize(mount.clientWidth, mount.clientHeight, false);
        camera.aspect = mount.clientWidth / Math.max(mount.clientHeight, 1);
        camera.updateProjectionMatrix();
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      visibilityObserver.observe(mount);

      let frame;
      const clock = new THREE.Clock();
      const animate = () => {
        if (visible) {
          const elapsed = clock.getElapsedTime();
          if (!reduceMotion) {
            objects.forEach((object, index) => {
              const direction = index % 2 ? -1 : 1;
              object.rotation.x = elapsed * 0.08 * direction + cursor.y;
              object.rotation.y = elapsed * 0.11 * direction + cursor.x;
              object.position.y += Math.sin(elapsed * 0.6 + index) * 0.0008;
            });
          }
          renderer.render(scene, camera);
        }
        frame = requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        mount.parentElement?.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("portfolio-theme-change", updateColor);
        objects.forEach((object) => object.geometry.dispose());
        material.dispose();
        secondaryMaterial.dispose();
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

  return <div ref={mountRef} className="about-scene" aria-hidden="true" />;
};
