import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function Shield({ size = 8 }) {
  return (
    <mesh position={[0,0,-2.3]}>
      <sphereGeometry args={[size, 64, 64,0, Math.PI * 2, 0, Math.PI / 2]}  />
      <MeshTransmissionMaterial
        transmission={1}          // Full transparency
        thickness={0.4}           // Glass depth
        roughness={0.001}          // <-- makes it slightly blurred
        ior={1.3}                 // Glass index
        chromaticAberration={0.02}
        distortion={0.05}
        distortionScale={0.15}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transparent
        attenuationColor="#ffffff"   // Purple tint
        attenuationDistance={3}
         
        toneMapped={false} 

      />
    </mesh>
  );
}
