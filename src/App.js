import { Routes, Route } from 'react-router-dom'
import { Integration } from './screens/Integration/Integration';
import MainBoard from './screens/MainBoard';
import './App.css';

export default function App() {
  return (
    <Routes >
      <Route path="/" element={<MainBoard />} />
      <Route path="/integration" element={<Integration />} />
    </Routes>
  )
}

