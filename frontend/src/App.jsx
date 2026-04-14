import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './pages/catalog/Catalog';
import Cabinet from './pages/cabinet/Cabinet';
import RoomDetail from './pages/room/RoomDetail';
import Booking from './pages/booking/Booking';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/room/:roomId" element={<RoomDetail />} /> 
        <Route path="/profile" element={<Cabinet />} />
        <Route path="/booking" element={<Booking />} />    
        <Route path="/booking/:roomId" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;