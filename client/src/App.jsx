import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {io} from 'socket.io-client'

function App() {

  const [message, setMessage] = useState('')

  const socket = io("http://localhost:3000")


  useEffect(() => {
    socket.on('connect', () => {
      console.log(`socket connected ${socket.id}`)
    })
    socket.on('welcome', (s) => {
      console.log(s)
    })
    socket.on('rbroadcast', (b) => {
      console.log(b)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const sendHandler = (e) => {
    e.preventDefault()
    socket.emit('emit-riad', message)

  }

  return (
    <div className='flex w-full max-h-screen justify-center items-center'>
      <input type="text" placeholder='enter your message' className='border rounded p-2 mr-4' onChange={(e) => setMessage(e.target.value)} value={message} />
      <button className='border p-2 rounded bg-blue-500 text-white cursor-pointer' onClick={sendHandler}>Send</button>
    </div>
  )
}

export default App