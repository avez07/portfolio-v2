import React, { useRef, useEffect, useState, use } from "react";
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from 'three'
import CameraControl from "../components/cameraController";
import FloorTextures from "../components/textures/floor";
import WallTexture from "../components/textures/wall";
import CellingLight from "../components/textures/ceillingTublight";
import Door from "../components/DoorController";






const Corridor = () => {

    // let it cover the floor exactly

    return (
        <group>
            {/* floor */}
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[15, 110]} />
                <meshStandardMaterial
                    map={FloorTextures()}
                    //   transparent={true}
                   
                />
            </mesh>
            {/* ceilling */}
            <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} >
                <planeGeometry args={[15, 100]} />
                <meshStandardMaterial map={FloorTextures()}  />
            </mesh>
            {Array.from({ length: 8 }, (_, index) => (
                <CellingLight
                    key={index}       // always add a key when mapping
                    position={[index % 2 == 0 ? 2:-2, 5, index * 5]} // example: spread along Z-axis
                />
            ))}
          
            {/* left wall */}
            <mesh position={[-7, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[110, 5]} />
                <meshStandardMaterial map={WallTexture()} roughness='1' metalness='0.1' />
            </mesh>
            <mesh position={[7, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[110, 5]} />
                <meshStandardMaterial map={WallTexture()} roughness='1' metalness='0.1' />
            </mesh>
            <Door/>
        </group>
    )
}
const SenceOne = () => {
    return (
        <Canvas style={{ background: '#ffffff' }}>
            <CameraControl />
            <axesHelper args={[60]} /> Length of axes lines
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 50]} intensity={1} />
            <Corridor />
            <OrbitControls enablePan={false} enableZoom={false} enableRotate={true}/>
        </Canvas>
    )
}

export default SenceOne