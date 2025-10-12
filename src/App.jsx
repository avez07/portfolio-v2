import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SenceOne from './pages/sence1'

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
