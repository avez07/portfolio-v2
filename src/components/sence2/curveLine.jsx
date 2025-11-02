import { Line } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from 'three'

function CurvedConnection({ start, end, controlPoint }) {
  const curve = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const controlVec = new THREE.Vector3(...controlPoint);

    return new THREE.QuadraticBezierCurve3(startVec, controlVec, endVec);
  }, [start, end, controlPoint]);

  const points = curve.getPoints(50);

  return <Line points={points} lineWidth={2} color="white" />;
}
export default CurvedConnection