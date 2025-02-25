import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import AllSchedules from './components/AllSchedules'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import { ProfileProvider } from "./components/ProfileContext";
import ForgotPassword from './components/ForgetPassword'
function App() {
  const [count, setCount] = useState(0)

  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allschedules" element={<AllSchedules />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  )
}

export default App
