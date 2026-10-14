import { useEffect, useRef } from "react";

export const SectionScene = ({ variant }) => {
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
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
      camera.position.z = 9;
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
      renderer.setClearAlpha(0);
      mount.appendChild(renderer.domElement);

      const accent = getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim() || "#20b2a6";
      const material = new THREE.MeshBasicMaterial({ color: accent, wireframe: true, transparent: true, opacity: 0.09 });
      const geometrySets = {
        projects: [new THREE.TorusGeometry(1.5, 0.3, 12, 72), new THREE.DodecahedronGeometry(1.1, 1), new THREE.TetrahedronGeometry(0.8, 1)],
        experience: [new THREE.BoxGeometry(1.8, 1.8, 1.8, 3, 3, 3), new THREE.OctahedronGeometry(1.1, 1), new THREE.TorusKnotGeometry(0.65, 0.16, 64, 8)],
        education: [new THREE.ConeGeometry(1.1, 1.8, 6, 2), new THREE.TorusGeometry(1, 0.08, 8, 48), new THREE.IcosahedronGeometry(0.8, 2)],
        contact: [new THREE.SphereGeometry(1.15, 12, 8), new THREE.TorusKnotGeometry(0.72, 0.12, 72, 8), new THREE.OctahedronGeometry(0.85, 2)],
      };
      const geometries = geometrySets[variant] || geometrySets.projects;
      const meshes = geometries.map((geometry) => new THREE.Mesh(geometry, material));
      meshes[0].position.set(-4.4, 1.2, -1);
      meshes[1].position.set(4.3, -1.5, -0.5);
      meshes[2].position.set(3.2, 2.8, -1.8);
      meshes.forEach((mesh) => scene.add(mesh));

      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(54 * 3);
      for (let index = 0; index < 54; index += 1) {
        particlePositions[index * 3] = ((index * 47) % 100) / 8 - 6.25;
        particlePositions[index * 3 + 1] = ((index * 73) % 100) / 10 - 5;
        particlePositions[index * 3 + 2] = -1 - (index % 6) * 0.35;
      }
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      const particleMaterial = new THREE.PointsMaterial({ color: accent, size: 0.025, transparent: true, opacity: 0.3 });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      const updateColor = (event) => {
        material.color.set(event.detail.primary);
        particleMaterial.color.set(event.detail.primary);
      };
      window.addEventListener("portfolio-theme-change", updateColor);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let visible = true;
      const resize = () => {
        renderer.setSize(mount.clientWidth, mount.clientHeight, false);
        camera.aspect = mount.clientWidth / Math.max(mount.clientHeight, 1);
        camera.updateProjectionMatrix();
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      visibilityObserver.observe(mount);

      let frame;
      const clock = new THREE.Clock();
      const animate = () => {
        if (visible) {
          const elapsed = clock.getElapsedTime();
          if (!reduceMotion) meshes.forEach((mesh, index) => {
            mesh.rotation.x = elapsed * (0.06 + index * 0.025);
            mesh.rotation.y = elapsed * (index % 2 ? -0.09 : 0.08);
          });
          particles.rotation.z = reduceMotion ? 0 : elapsed * 0.012;
          renderer.render(scene, camera);
        }
        frame = requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        window.removeEventListener("portfolio-theme-change", updateColor);
        geometries.forEach((geometry) => geometry.dispose());
        particleGeometry.dispose();
        particleMaterial.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    initialize();
    return () => { cancelled = true; cleanup?.(); };
  }, [variant]);

  return <div ref={mountRef} className="section-scene" aria-hidden="true" />;
};
