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







export default function DevopsSence() {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 5], fov: 100 }}
    >
      <color attach="background" args={["#060c41"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} intensity={1} />

      <group position={[0, -2, -3]} rotation={[0, 0, 0]}>

        {/* <Crystal />
        <Connection
          start={[-3, 0.5, 9.5]}     
          end={[-1.5, 0.5, 9.5]}        
          speed={0.9}            
        />
        <DNSServer />
        <Connection
          start={[-1.5, 0.5, 9.5]}     
          end={[0, 0.5, 5.3]}        
          speed={0.9}            
        /> */}
        {/* <ServerCity /> */}

        {/* <CitySurface /> */}
      </group>

      {/* <CurvedConnection
        start={[-1, -1, -0.5]}      // Crystal position
        end={[1, 1, 1.5]}        // DNS Server position
        controlPoint={[3,-3,0]}             // How fast the points move
      /> */}

      {/* Bloom for glowing effect */}

      <EffectComposer>
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.8}
        />
      </EffectComposer>

      <OrbitControls maxZoom={100} />
    </Canvas>
  );
}
