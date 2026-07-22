import { Route, Routes } from 'react-router'
import Chat from './chat/chat'
import { RegisterForm } from './auth/register'
import { LoginForm } from './auth/login'

function App() {
  return (
    <Routes>

      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  )
}

export default App