import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import * as THREE from "three";
import CubeCluster from "./serverCity/container";
import LoadBalancer from "./serverCity/Loadbalancer";
import Database from "./serverCity/Database";
import Connection from "./connection";


const connections = [
  { start: [0, 0.3, 5], end: [0, 0.5, 3.5] },
  { start: [0, 0.5, 3.5], end: [0, 0.5, 0] },
  { start: [0, 0.5, 3.5], end: [-5.5, 0.5, 3.5] },
  { start: [-5.5, 0.5, 3.5], end: [-5.5, 0.5, 1] },
  { start: [0, 0.5, 3.5], end: [5.5, 0.5, 3.5] },
  { start: [5.5, 0.5, 3.5], end: [5.5, 0.5, 1] },
  { start: [0, 0.5, 0], end: [6, 0.5, 0] },
  { start: [0, 0.5, 0], end: [-6, 0.5, 0] },
  { start: [6, 0.5, 0], end: [6, 0.5, -6] },
];

const cubeClusters = [
  { position: [0, 1.2, 0], scale: [0.9, 0.9, 0.9] },
  { position: [6, 1.2, 0], scale: [0.9, 0.9, 0.9] },
  { position: [-6, 1.2, 0], scale: [0.9, 0.9, 0.9] },
];

const databases = [
  { position: [6, 1.7, -7], scale: [0.9, 2, 1] },
  { position: [4, 0.7, -7], scale: [0.9, 1, 1] },
  { position: [5.3, 0.7, -5], scale: [0.5, 0.5, 0.5] },
];

export default function Shield({ size = 9 }) {
  return (
    <group>

      <mesh position={[0, 0, -2.3]} renderOrder={1}>
        <sphereGeometry args={[size, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <MeshTransmissionMaterial
          transmission={1}          // Full transparency
          thickness={0.4}           // Glass depth
          roughness={0.001}          // <-- makes it slightly blurred
          ior={1}                 // Glass index
          chromaticAberration={0.02}
          distortion={0.05}
          distortionScale={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          attenuationColor="#ffffff"   // Purple tint
          attenuationDistance={3}
          depthWrite={false}
          toneMapped={false}

        />
        <Text
          position={[0, 8, 4.2]}
          rotation={[-1, 0, 0]}
          fontSize={1.5}
          fontWeight={600}
          color="#00ffff"
          curveRadius={-10.2}   // ✅ makes text wrap
          anchorX="center"
          anchorY="middle"
        >
          Server City
        </Text>
      </mesh>
      <LoadBalancer position={[0, 0.3, 5]} scale={[0.2, 0.2, 0.2]} />

      {connections.map((conn, i) => (
        <Connection 
          key={i}
          start={conn.start}
          end={conn.end}
          speed={0.9}
        />
      ))}

      {cubeClusters.map((cube, i) => (
        <CubeCluster 
          key={i}
          renderOrder={2}
          position={cube.position}
          scale={cube.scale}
        />
      ))}

      {databases.map((db, i) => (
        <Database 
          key={i}
          position={db.position}
          scale={db.scale}
        />
      ))}
    </group>

  );
}
