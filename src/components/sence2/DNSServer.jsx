import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three'
import {Text} from '@react-three/drei'
const DNSServer = () => {
  const meshRef = useRef();
  const edgeRef = useRef();
  const size = 0.3
  const position = [-1.5, 0.5, 9.2]
  const rotation = [0,0,0]

  // Rotate the crystal slowly
  useFrame(() => {
    if (meshRef.current.position) {
      meshRef.current.rotation.y -= 0.01
      edgeRef.current.rotation.y -= 0.01

    }
  })

  return (
    <>
      {/* Frosted glass icosahedron */}
      <mesh ref={meshRef} rotation={rotation} position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshPhysicalMaterial
          color="#00ffff"
          transparent
          opacity={.4}
          transmission={1}       // glass effect
          thickness={1}          // frosted depth
          roughness={0.2}        // frosted blur
          clearcoat={1}
          clearcoatRoughness={0.3}
          emissive="#00ffff"     // internal glow
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Glowing edges */}
      <lineSegments ref={edgeRef} rotation={rotation} position={position}>
        <edgesGeometry args={[new THREE.SphereGeometry(size, 14, 11)]} />
        <lineBasicMaterial color="#00ffff" linewidth={1} />
      </lineSegments>
      <Text
                position={[-1.5, 1, 9.1]}
                rotation={[0, 0, 0]}
                fontSize={0.2}
                fontWeight={600}
                color="#00ffff"
                anchorX="center"
                anchorY="middle"
            >
                DNS SERVER
            </Text>
    </>
  );
}

export default DNSServer