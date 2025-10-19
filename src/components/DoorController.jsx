import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three'
import DoorTexture from './textures/DoorTexture';
import { useFrame, useLoader } from '@react-three/fiber';
import gsap from 'gsap'

const doors = [
    { name: "Cybersecurity", side: "right", posZ: 5 },
    { name: "Databases", side: "left", posZ: 10 },
    { name: "Backend", side: "right", posZ: 15 },
    { name: "Frontend", side: "left", posZ: 20 },
    { name: "DevOps", side: "right", posZ: 25 },
    { name: "About Me", side: "left", posZ: 30 },
];
const DoorMesh = ({ name, posZ, posX }) => {
    const meshRef = useRef();
    const [open, setOpen] = useState(false);
    // Base rotation for door alignment
    const baseRotation = posX < 0 ? Math.PI / 2 : -Math.PI/2
    const openRotation =
        baseRotation + (posX < 0 ? -Math.PI / 2 : -Math.PI/2)

    const hingeOffsetX = posX < 0 ? -2 / 2 : 2 / 2
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

            <group ref={meshRef} position={[0, 0 , posX < 0 ? 1 : -1]} rotation={[0, posX < 0 ? Math.PI / 2 : -Math.PI / 2, 0]} onClick={() => setOpen(!open)}>
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

            {/* <DoorTexture/> */}
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