import * as THREE from 'three'
import { Text } from '@react-three/drei'


const Database = ({ position, scale }) => {
    return (
        <group position={position} scale={scale}>
            <mesh position={[0, 0.788, 1]}>
                <cylinderGeometry args={[1, 1, 0]} />
                <meshPhysicalMaterial color="#39a9ff" />
            </mesh>
            {[...Array(3)].map((_, i) => (
                <mesh position={[0, (i - 1) * 0.6, 1]}>
                    <cylinderGeometry args={[1, 1, 0.4, 32, 1, true]} />
                    <meshPhysicalMaterial color="#39a9ff" side={THREE.DoubleSide} />
                </mesh>
            ))}
            <mesh position={[0, 0, 1]}>
                <cylinderGeometry args={[0.95, 0.95, 1.3]} />
                <meshPhysicalMaterial color="blue" emissive='#00ffff' emissiveIntensity={1.3} />
            </mesh>
            <mesh position={[0, -0.788, 1]}>
                <cylinderGeometry args={[1, 1, 0]} />
                <meshPhysicalMaterial color="#39a9ff" />
            </mesh>
            <Text
                position={[0, 0.66, 2.1]}
                rotation={[0, 0, 0]}
                fontSize={0.38}
                fontWeight={600}
                color="#00ffff"
                curveRadius={-1.2}   // ✅ makes text wrap
                anchorX="center"
                anchorY="middle"
            >
                Database
            </Text>
        </group>



    )
}
export default Database