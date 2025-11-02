import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";


const HollowBox = ({ width = 4.1, height = 0.6, depth = 3.9, thickness = 0.2, position }) => {
    const walls = useMemo(() => {
        const w = width / 2;
        const d = depth / 2;
        return [
            // Front wall
            { pos: [0, 0, d], rot: [0, 0, 0] },
            // Back wall
            { pos: [0, 0, -d], rot: [0, Math.PI, 0] },
            // Left wall
            { pos: [-w, 0, 0], rot: [0, Math.PI / 2, 0] },
            // Right wall
            { pos: [w, 0, 0], rot: [0, -Math.PI / 2, 0] },
        ];
    }, [width, height, depth]);

    return (
        <group position={position}>
            {walls.map((wall, i) => (
                <mesh
                    key={i}
                    position={wall.pos}
                    rotation={wall.rot}
                >
                    <boxGeometry args={[width, height, thickness]} />
                    <meshStandardMaterial color="#39a9ff" />
                </mesh>
            ))}
        </group>
    );
};


const LoadBalancer = ({ position, scale }) => {
    const loadref = useRef()

    useFrame(() => {
    if (loadref.current) {
      // Rotate on the y-axis
      loadref.current.rotation.y += 0.07;
    }
  });


   

    return (
        <group  position={position} scale={scale}>
            <group ref={loadref}>
            <mesh position={[0, 2.3, 0]}>
                <boxGeometry args={[4, 0.3, 4]} />
                <meshPhysicalMaterial color='#39a9ff' />
            </mesh>

            {[...Array(2)].map((_, i) => (
                <HollowBox key={i} position={[0, i * 1.3, 0]} />
            ))}
            <mesh position={[0, -1, 0]}>
                <boxGeometry args={[4, 0.3, 4]} />
                <meshPhysicalMaterial color='#39a9ff' />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[3.5, 3, 3.5]} />
                <meshPhysicalMaterial color='#8cc3ec' emissive='#8cc3ec' emissiveIntensity={2} />
            </mesh>
            {[...Array(3)].map((_, i) => (
                <mesh position={[0.82, 1.3, (-i + 4) * 0.4]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.1, 0, 0]} />
                    <meshPhysicalMaterial color='#8cc3ec' emissive='#8cc3ec' emissiveIntensity={2} />
                </mesh>
            ))}
            </group>

            <Text
                position={[0, 5, 0.5]}
                rotation={[0, 0, 0]}
                fontSize={1}
                fontWeight={600}
                color="#00ffff"
                anchorX="center"
                anchorY="middle"
            >
                LoadBalancer
            </Text>
        </group>
    );
};

export default LoadBalancer;
