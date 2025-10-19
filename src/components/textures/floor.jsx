import * as THREE from 'three'

const FloorTextures = () => {
  const size = 512

  // -----------------------------
  // 1️⃣ Base black canvas
  // -----------------------------
  const blackCanvas = document.createElement('canvas')
  blackCanvas.width = size
  blackCanvas.height = size
  const blackCtx = blackCanvas.getContext('2d')
  blackCtx.fillStyle = '#000000'
  blackCtx.fillRect(0, 0, size, size)

  // -----------------------------
  // 2️⃣ Orange tile overlay
  // -----------------------------
  const orangeCanvas = document.createElement('canvas')
  orangeCanvas.width = size
  orangeCanvas.height = size
  const orangeCtx = orangeCanvas.getContext('2d')

  // Settings
  const rows = 15
  const cols = 7
  const padding = 0.1// space around tile for black border

  const tileWidth = size / cols - padding * 2
  const tileHeight = size / rows - padding * 2

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = j * (size / cols) + padding
      const y = i * (size / rows) + padding 
      orangeCtx.fillStyle = '#d39066'
      orangeCtx.fillRect(x, y, tileWidth, tileHeight)
    }
  }

  // -----------------------------
  // 3️⃣ Merge orange onto black
  // -----------------------------
  const finalCanvas = document.createElement('canvas')
  finalCanvas.width = size
  finalCanvas.height = size
  const finalCtx = finalCanvas.getContext('2d')

  // Draw black base
  finalCtx.drawImage(blackCanvas, 0, 0)
  // Draw orange tiles on top
  finalCtx.drawImage(orangeCanvas, 0, 0)

  // -----------------------------
  // 4️⃣ Create texture
  // -----------------------------
  const texture = new THREE.CanvasTexture(finalCanvas)
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping
//   texture.repeat.set(6, 50)

  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.generateMipmaps = false

  return texture
}

export default FloorTextures
