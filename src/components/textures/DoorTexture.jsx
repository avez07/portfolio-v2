import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react'

const DoorTexture = () => {
// const shape = useMemo(()=>{
const s = new THREE.Shape()
s.moveTo(-1.2,-2)
s.lineTo(1.2,-2)
s.lineTo(1.3,2)
s.lineTo(-1.3,2)
s.closePath()
// return s

// },[])

// const geometry = useMemo(()=>{
  const geometry =  new THREE.ExtrudeGeometry(s,{
    depth:0.1,
    bevelEnabled:false
  })
// },[shape])
return geometry
}

export default DoorTexture
