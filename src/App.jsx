import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Header from './components/Header'
import CommunityAmbassador from './screens/CommunityAmbassador'
import Footer from './components/Footer'
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community-ambassador" element={<CommunityAmbassador />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
