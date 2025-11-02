import { useRef } from "react";
import * as THREE from "three";

const  CitySurface = () => {
  const ref = useRef();

  return (
    <group>
      {/* Base disk */}
      <mesh ref={ref}>
        <cylinderGeometry args={[11, 11,0.1,100]} />
        <meshPhysicalMaterial
          color="#abe278ff"
          roughness={0.4}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

    
    </group>
  );
}

export default CitySurface


