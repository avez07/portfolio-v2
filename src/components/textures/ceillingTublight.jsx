import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { RectAreaLight } from 'three'

const CellingLight = ({ position = [0, 5, 0] }) => {
    const lightRef = useRef()
     const meshRef = useRef() 
    useFrame(({ clock }) => {
        const flicker = 1 + Math.sin(clock.elapsedTime * 2) * 0.2

    // Animate emissive intensity of the mesh
    if (meshRef.current) {
      meshRef.current.material.emissiveIntensity = flicker
    }

    // Animate light intensity
    if (lightRef.current) {
      lightRef.current.intensity = flicker * 2  // scale as needed
    }
    });

    return (
        <group position={position}>
            <mesh ref={meshRef} rotation={[0, 0, 0]} >
                <boxGeometry args={[2, 0.2, 2]} />
                <meshStandardMaterial
                    color={0xffffff}
                    emissive={0xffffff}
                    emissiveIntensity={5}
                />
            </mesh>
            <rectAreaLight
                ref={lightRef}
                width={3}
                height={35}
                color={0xffffff}
                intensity={1}
                position={[0,0,0]}
                rotation={[-Math.PI/2, 0, 0]} // faces down
            />
             <rectAreaLight
                ref={lightRef}
                width={1.5}
                height={20}
                color={0xffffff}
                intensity={1}
                position={[0,0,-1.5]}
                rotation={[Math.PI, 0, 0]} // faces up
            />
             
        </group>

    )




}
export default CellingLight