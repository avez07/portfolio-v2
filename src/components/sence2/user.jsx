import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three'


const Crystal = () => {
  const meshRef = useRef();
  const edgeRef = useRef();
  const size = 0.2
  const position = [-3, 0.5, 9.5]
  const rotation = [0,0,-0.6]

  // Rotate the crystal slowly
//   useFrame(() => {
//     if (meshRef.current.position) {
//       meshRef.current.rotation.y += 0.01
//       edgeRef.current.rotation.y += 0.01

//     }
//   })

  return (
    <>
      {/* Frosted glass icosahedron */}
      <mesh ref={meshRef} rotation={rotation} position={position}>
        <icosahedronGeometry args={[size, 0]} />
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
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Glowing edges */}
      <lineSegments ref={edgeRef} rotation={rotation} position={position}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(size, 0)]} />
        <lineBasicMaterial color="#00ffff" linewidth={1} />
      </lineSegments>
    </>
  );
}
export default Crystal