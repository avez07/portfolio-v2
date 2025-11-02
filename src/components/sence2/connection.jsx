import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Connection({ start, end, speed = 0.5, color = "#00ffff" }) {
  const pointRef = useRef();

  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const dir = endVec.clone().sub(startVec);
  const distance = dir.length();
  dir.normalize();

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * speed) % 1;
    const point = startVec.clone().add(dir.clone().multiplyScalar(distance * t));
    pointRef.current.position.copy(point);
  });

  return (
    <>
      {/* Solid line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            array={new Float32Array([...start, ...end])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} linewidth={2} />
      </line>

      {/* Moving glowing dot */}
      <mesh ref={pointRef}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial
          color='#ffae00'
          emissive='#ffae00'
          emissiveIntensity={10}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}
