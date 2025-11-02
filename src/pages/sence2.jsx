import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Environment, OrbitControls } from "@react-three/drei";
import Connection from "../components/sence2/connection";
import DNSServer from "../components/sence2/DNSServer";
import Crystal from "../components/sence2/user";
import CurvedConnection from "../components/sence2/curveLine";
import ServerCity from "../components/sence2/serverCity";
import CitySurface from "../components/sence2/senceBase";
import GlowingCube from "../components/sence2/serverCity/container";
import LoadBalancer from "../components/sence2/serverCity/Loadbalancer";
import Database from "../components/sence2/serverCity/Database";




const RotatingSence = ()=>{

  const senceRef = useRef()

  useFrame(() => {
    if (senceRef.current) {
      // Rotate on the y-axis
      senceRef.current.rotation.y -= 0.0015;
    }
  });
  return (
 <group ref={senceRef} position={[0, -2, -3]} rotation={[0, 0, 0]}>

        <Crystal />
        <Connection
          start={[-3, 0.5, 9.2]}     
          end={[-1.5, 0.5, 9.2]}        
          speed={0.9}            
        />
        <DNSServer />
        <Connection
          start={[-1.5, 0.5, 9.2]}     
          end={[0, 0.3, 5.3]}        
          speed={0.9}            
        />
        <ServerCity /> 
      <CitySurface />
      </group>
  )
}


export default function DevopsSence() {
 
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{ position: [0, 0.5, 9.5], fov: 100 }}
    >
      <color attach="background" args={["#04082b"]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[1, 15, 1]} intensity={1} />

     
<RotatingSence/>
      

      <EffectComposer>
        <Bloom
          intensity={2.6}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.8}
        />
      </EffectComposer>

      <OrbitControls maxZoom={100} />
    </Canvas>
  );
}
