import * as THREE from 'three'

const WallTexture = ()=>{
const size = 512
const canvas = document.createElement('canvas')
canvas.width = size
canvas.height = size
const ctx = canvas.getContext('2d')
ctx.fillStyle = '#948834'
ctx.fillRect(0,0,size,size)
const textures = new THREE.CanvasTexture(canvas)
return textures
}
export default WallTexture