import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { OrbitControls } from "@react-three/drei";
import Connection from "../components/sence2/connection";



const DNSServer = () =>{
  const meshRef = useRef();
  const edgeRef = useRef();

  // Rotate the crystal slowly
 useFrame(()=>{
    if(meshRef.current.position){
        meshRef.current.rotation.y -= 0.01
        edgeRef.current.rotation.y -= 0.01

    }
 })

  return (
    <>
      {/* Frosted glass icosahedron */}
      <mesh ref={meshRef} position={[2,0,0]}>
        <sphereGeometry args={[1, 64,64]}  />
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
      <lineSegments ref={edgeRef} position={[2,0,0]}>
        <edgesGeometry args={[new THREE.SphereGeometry(1, 14,11)]} />
        <lineBasicMaterial color="#00ffff" linewidth={1} />
      </lineSegments>
    </>
  );
}

const Crystal = () =>{
  const meshRef = useRef();
  const edgeRef = useRef();

  // Rotate the crystal slowly
 useFrame(()=>{
    if(meshRef.current.position){
        meshRef.current.rotation.y += 0.01
        edgeRef.current.rotation.y += 0.01

    }
 })

  return (
    <>
      {/* Frosted glass icosahedron */}
      <mesh ref={meshRef} position={[-1,0,0]}>
        <icosahedronGeometry args={[1, 0]}  />
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
      <lineSegments ref={edgeRef} position={[-1,0,0]}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1, 0)]} />
        <lineBasicMaterial color="#00ffff" linewidth={1} />
      </lineSegments>
    </>
  );
}

export default function DevopsSence() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} style={{background:'#05021dff'}}>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, 5]} intensity={1} />

      {/* Crystal */}
      <Crystal />
      <DNSServer/>
       <Connection
    start={[0, 0, 0]}      // Crystal position
    end={[1, 0, 0]}        // DNS Server position
    speed={0.9}            // How fast the points move
  />

      {/* Bloom for glowing effect */}
      <EffectComposer>
        <Bloom
          threshold={1}
          strength={8.5}
          radius={0.4}
        />
      </EffectComposer>
      <OrbitControls/>
    </Canvas>
  );
}
