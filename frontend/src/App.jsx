import React from 'react'
import Todos from './components/Todos'
import Home from './components/Home'

export default function App() {
  return (
    <div className=' mt-12 '>
      <Home />
      <Todos />
    </div>
  )
}
