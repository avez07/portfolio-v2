import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three'
import DoorTexture from './textures/DoorTexture';
import { useFrame, useLoader } from '@react-three/fiber';
import gsap from 'gsap'
import { Text } from '@react-three/drei';

const doors = [
    { name: "Animation", side: "right", posZ: 5 },
    { name: "Cybersecurity", side: "left", posZ: 10 },
    { name: "Databases", side: "right", posZ: 15 },
    { name: "Backend", side: "left", posZ: 20 },
    { name: "Frontend", side: "right", posZ: 25 },
    { name: "DevOps", side: "left", posZ: 30 },
];
const DoorMesh = ({ name, posZ, posX }) => {
    const meshRef = useRef();
    const [open, setOpen] = useState(false);

    const baseFontSize = 0.2;
const adjustedFontSize = Math.min(baseFontSize, 1 / name.length * 2); // tweak factor
    // Base rotation for door alignment
    const baseRotation = posX < 0 ? Math.PI / 2 : -Math.PI / 2
    const openRotation =
        baseRotation + (posX < 0 ? -Math.PI / 2 : -Math.PI / 2)

    useEffect(() => {
        if (!meshRef.current) return

        gsap.to(meshRef.current.rotation, {

            y: open ? openRotation : baseRotation,
            duration: 1,
            ease: 'power2.inOut'
        })
    }, [open])
    return (
        <group position={[posX, 2, posZ]} translateZ={-1}>
            <mesh position={[0, 2, 0]}>
                <boxGeometry args={[0.3, 0.2, 3]} />
                <meshPhysicalMaterial color={new THREE.Color('rgba(174, 81, 38, 1)')} clearcoat={1} />
            </mesh>
            <mesh position={[0, 0, 1.3]} rotation={[0.055, 0, 0]}>
                <boxGeometry args={[0.3, 4, 0.2]} />
                <meshPhysicalMaterial color={new THREE.Color('rgba(174, 81, 38, 1)')} clearcoat={1} />
            </mesh>
            <mesh position={[0, 0, -1.3]} rotation={[-0.055, 0, 0]}>
                <boxGeometry args={[0.3, 4, 0.2]} />
                <meshPhysicalMaterial color={new THREE.Color('rgba(174, 81, 38, 1)')} clearcoat={1} />
            </mesh>

            <group ref={meshRef} position={[0, 0, posX < 0 ? 1 : -1]} rotation={[0, posX < 0 ? Math.PI / 2 : -Math.PI / 2, 0]} onClick={() => setOpen(!open)}>
                <axesHelper args={[6]} />
                <mesh position={[1, 0, 0]} geometry={DoorTexture()} >
                    {/* <boxGeometry args={[2, 4, 0.2]} /> */}
                    <meshPhysicalMaterial color={new THREE.Color('rgba(174, 81, 38, 1)')} clearcoat={1} />
                </mesh>

                <mesh position={[1, 1, 0.06]}>
                    <boxGeometry args={[2, 1, 0.1]} />
                    <meshPhysicalMaterial color={new THREE.Color('rgba(243, 243, 243, 1)')} clearcoat={1} />
                </mesh>
                <mesh position={[1.99, 0, 0.13]} scale={0.10}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshPhysicalMaterial color={'yellow'} clearcoat={1} />
                </mesh>
            </group>

            <group>
                <mesh position={[posX < 0 ? 0.19 : -0.19, 1.9, -1.5]} >
                    <planeGeometry args={[2.3, 0.4, 1]} />
                    <meshPhysicalMaterial color={new THREE.Color('rgba(255, 255, 255, 1)')} clearcoat={0.4} roughness={1} metalness={0.2} side={THREE.DoubleSide}/>
                    
                    <Text
                    position={[posX<0 ?0.12: -0.15,0,0.01]}
                    fontSize={adjustedFontSize}
                    fontWeight={600}
                    animations={1}
                    maxWidth={0.7}
                        color={'#000'}
                        anchorX={posX < 0 ?"left": "right"}
                        anchorY="middle"
                    >{name}</Text>
                </mesh>
            </group>
        </group>

    );
};

const Door = () => (
    doors.map((door, index) => {
        const x = door.side === "left" ? -7 : 7; // left wall or right wall
        return (
            <DoorMesh key={index} name={door.name} posZ={door.posZ} posX={x} />
        );
    })
)
export default Door