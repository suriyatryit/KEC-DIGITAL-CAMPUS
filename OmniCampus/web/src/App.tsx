import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Classroom from './pages/Classroom'
import AdminDashboard from './pages/AdminDashboard'
import Attendance from './pages/Attendance'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/classes" element={<Classroom />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
