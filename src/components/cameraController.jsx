import { PerspectiveCamera } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { useState, useRef, useEffect } from "react"
import * as THREE from 'three'


const CameraControl = () => {
    const cameraRef = useRef()
    const [position, setPosition] = useState(new THREE.Vector3(0, 2.5, 50))
    const [rotationY, setRotationY] = useState(0)

    const handleKeyDown = (e) => {
        const moveSpeed = 0.4
        const rotationSpeed = 0.03

        setRotationY((prev) => {
            //  if (e.key === "ArrowUp" || e.key === "ArrowDown") return 0;
            if (e.key === 'ArrowLeft') return prev + rotationSpeed
            if (e.key === 'ArrowRight') return prev - rotationSpeed
            return prev

        })
        setPosition((prev) => {
            const newPos = prev.clone();
            if (!cameraRef.current) return prev;

            // direction based on current rotation
            // const dir = new THREE.Vector3(Math.sin(rotationY), 0, (Math.cos(rotationY)));
            // if (e.key === "ArrowUp" || e.key === "ArrowDown") setRotationY(0)
            if (e.key === "ArrowUp") newPos.z = Math.max(newPos.z - moveSpeed, 5)
            if (e.key === "ArrowDown") newPos.z = Math.min(newPos.z + moveSpeed, 50)

            return newPos;
        });

    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

    }, [rotationY])
    useFrame(() => {
        if (cameraRef.current) {
            cameraRef.current.position.lerp(position, 0.1);
            cameraRef.current.rotation.y += rotationY
            cameraRef.current.rotation.z += rotationY * 0.06

        }
        
    });

    return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2.5, 50]}  far={1000}/>;
}

export default CameraControl