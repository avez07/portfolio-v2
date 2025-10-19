import { useState } from 'react'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import './App.css'
import SenceOne from './pages/sence1'
RectAreaLightUniformsLib.init()

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div style={{height:'100vh', width:'100vw'}}>
    <SenceOne/>
     </div>
    </>
  )
}

export default App
