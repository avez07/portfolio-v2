import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Connection({ start, end, speed = 0.1 }) {
  const pointRef = useRef();

  // Direction vector and distance
  const dir = new THREE.Vector3(...end).sub(new THREE.Vector3(...start));
  const distance = dir.length();
  dir.normalize();

  // Single moving point along the line
  const pointPosition = new THREE.Vector3(...start);

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * speed) % 1; // loop 0 → 1
    pointPosition.copy(new THREE.Vector3(...start)).add(dir.clone().multiplyScalar(distance * t));
    pointRef.current.position.set(pointPosition.x, pointPosition.y, pointPosition.z);
  });

  return (
    <>
      {/* Solid connection line */}
      <line>
        <bufferGeometry
          attach="geometry"
          >
          <bufferAttribute
            attachObject={['attributes', 'position']}
            array={new Float32Array([...start, ...end])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffae00ff" linewidth={2} />
      </line>

      {/* Moving glowing point */}
      <mesh ref={pointRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial emissive="#ffae00ff" emissiveIntensity={2} color="#ffae00ff" />
      </mesh>
    </>
  );
}
export default Connection