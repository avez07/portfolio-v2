import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from "@react-three/drei";
import * as Three from 'three'


const doors = [
    { name: "About Me", side: "left", posZ: -5 },
    { name: "DevOps", side: "right", posZ: -10 },
    { name: "Frontend", side: "left", posZ: -15 },
    { name: "Backend", side: "right", posZ: -20 },
    { name: "Databases", side: "left", posZ: -30 },
    { name: "Cybersecurity", side: "right", posZ: -35 },
];
const Door = ({ name, posZ, posX }) => {
    const meshRef = useRef();
    const [open, setOpen] = React.useState(false);
    const rotationY = posX < 0 ? Math.PI/2 : -Math.PI/2

    useFrame(()=>{
        if(meshRef.current){
            meshRef.current.rotation.y = Three.MathUtils.lerp(
                meshRef.current.rotation.y,
                 open ? rotationY + (posX < 0 ? -Math.PI/2 : Math.PI/2) : rotationY,0.1
            )
        }
    })
     return (
        <mesh ref={meshRef} position={[posX, 2, posZ]} rotation={[0, posX < 0 ? Math.PI / 2 : -Math.PI / 2, 0]} onClick={()=>setOpen(!open)}>
            <boxGeometry args={[3, 4, 0.5]} />
            <meshStandardMaterial color="#0af" />
            <Text
                position={[0, 0, 0.3]}
                fontSize={0.5}
                color="#fff"
                anchorX="center"
                anchorY="middle"
            >
                {name}
            </Text>
        </mesh>
    );
};

const Corridor = () => {
    const camref = useRef()
    useFrame(() => {
        if (camref.current) {

        }
    })
    return (
        <group>
            {/* floor */}
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 110]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            {/* ceilling */}
            <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 110]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            {/* left wall */}
            <mesh position={[-10, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[110, 5]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[10, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[110, 5]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {doors.map((door, index) => {
                const x = door.side === "left" ? -8 : 8; // left wall or right wall
                return (
                    <Door key={index} name={door.name} posZ={door.posZ} posX={x} />
                );
            })}
        </group>
    )
}
const SenceOne = () => {
    return (
        <Canvas camera={{ position: [0, 2, 5], far: 100, near: 0.01 }} style={{ background: '#ffffff' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 50]} intensity={1} />
            <Corridor />
            <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
    )
}

export default SenceOne