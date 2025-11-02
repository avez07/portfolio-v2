import { useRef, useEffect } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial, Text } from "@react-three/drei";

const GlowingCube = ({ position }) => {
    const cubeRef = useRef();
    const edgeRef = useRef();

    const texture = useLoader(THREE.TextureLoader, "src/assets/textues/dockerLogo.png");
 
    return (
        <group re>
            {/* Cube */}
            <mesh ref={cubeRef} position={position}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={texture} emissive='#093355' emissiveIntensity={2} />
            </mesh>
            <lineSegments ref={edgeRef} position={position}>
                <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1,)]} />
                <lineBasicMaterial color="#00ffff" linewidth={0.5} />
            </lineSegments>

        </group>
    );
};

const CubeCluster = ({ count = 8, spread = 2, renderOrder = 2, position,scale }) => {
    const glassref = useRef()
    const containerref = useRef()

    
    const {camera} = useThree()
const SHOW_DISTANCE = 3
     useFrame(() => {
    if (!glassref.current) return;

    const dist = camera.position.distanceTo(glassref.current.position);
    glassref.current.visible = dist < SHOW_DISTANCE;

    if (containerref.current) {
      // Rotate on the y-axis
      containerref.current.rotation.y -= 0.025;
    }
  });
  
    const randomPositions = useMemo(() => {
        const positions = [
            // bottom layer (y = 0)
            [-1.1, 0, -1.1], [0, 0, -1.1], [1.1, 0, -1.1],
            [-1.1, 0, 0], [0, 0, 0], [1.1, 0, 0],
            [-1.1, 0, 1.1], [0, 0, 1.1], [1.1, 0, 1.1],

            // top layer (y = 1)
            [0, 1.1, -1.1],
            [-1.1, 1.1, 0], [0, 1.1, 0], [1.1, 1.1, 0],
            [0, 1.1, 1.1],
        ];
        return positions;
    }, [count, spread]);
    const labels = [
        { position: [0, 0.1, 2.01], rotation: [0, 0, 0] },                    // Front
        { position: [0, 0.1, -2.01], rotation: [0, Math.PI, 0] },            // Back
        { position: [-2.01, 0.1, 0], rotation: [0, -Math.PI / 2, 0] },       // Left
        { position: [2.01, 0.1, 0], rotation: [0, Math.PI / 2, 0] },         // Right
    ];

    return (
        <group ref={containerref} position={position} scale={scale} renderOrder={renderOrder}>
            {randomPositions.map((pos, i) => (
                <GlowingCube key={i} position={pos} />
            ))}
            <mesh position={[0, -0.9, 0]}>
                <boxGeometry args={[4, 0.5, 4]} />
                <meshStandardMaterial color='#0a0f1f' />
                {labels.map((label, index) => (
                    <Text
                        key={index}
                        position={label.position}
                        rotation={label.rotation}
                        fontSize={0.4}
                        fontWeight={600}
                        color="#00ffff"
                        anchorY="middle"
                    >
                        EC2 SERVER
                    </Text>
                ))}
            </mesh>
            <mesh ref={glassref} position={[0, 1, 0]}>
                <boxGeometry args={[4, 3, 4]} />
                <MeshTransmissionMaterial
                    transmission={1}          // Full transparency
                    thickness={0.1}           // Glass depth
                    roughness={0.001}          // <-- makes it slightly blurred
                    ior={1}                 // Glass index
                    chromaticAberration={0.02}
                    distortion={0.05}
                    distortionScale={0.15}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    transparent
                    attenuationColor="#ffffff"   // Purple tint
                    attenuationDistance={3}
                    toneMapped={false}
                    depthTest={false}
                    depthWrite={false}

                />

            </mesh>
        </group>
    );
};

export default CubeCluster;
